import { createFileRoute } from '@tanstack/react-router'

/**
 * Quote-form endpoint. Replaces Netlify Forms, which has no equivalent on
 * Vercel. Accepts the same url-encoded POST the form already sends and forwards
 * the enquiry by email through Resend's HTTP API (no SDK dependency).
 *
 * Required environment variables:
 *   RESEND_API_KEY     — Resend API key
 *   QUOTE_FROM_EMAIL   — verified sender, e.g. "URBISCOR CONSTRUCT <oferte@urbiscor.ro>"
 * Optional:
 *   QUOTE_TO_EMAIL     — defaults to contact@urbiscor.ro
 */
const REQUIRED_FIELDS = ['nume', 'telefon', 'localitate', 'tip_proiect', 'acord_gdpr'] as const

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export const Route = createFileRoute('/api/quote')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let form: FormData
        try {
          form = await request.formData()
        } catch {
          return Response.json({ ok: false, error: 'invalid_body' }, { status: 400 })
        }

        const fields: Record<string, string> = {}
        for (const [key, value] of form.entries()) if (typeof value === 'string') fields[key] = value

        // Honeypot: pretend success so bots do not learn they were filtered.
        if (fields['bot-field']) return Response.json({ ok: true })

        for (const name of REQUIRED_FIELDS) {
          if (!fields[name]?.trim()) return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 })
        }

        const apiKey = process.env.RESEND_API_KEY
        const from = process.env.QUOTE_FROM_EMAIL
        const to = process.env.QUOTE_TO_EMAIL ?? 'contact@urbiscor.ro'
        if (!apiKey || !from) {
          console.error('Quote form is not configured: set RESEND_API_KEY and QUOTE_FROM_EMAIL.')
          return Response.json({ ok: false, error: 'not_configured' }, { status: 500 })
        }

        const rows: Array<[string, string]> = [
          ['Sursă', fields.sursa ?? ''],
          ['Nume', fields.nume ?? ''],
          ['Telefon', fields.telefon ?? ''],
          ['Email', fields.email ?? ''],
          ['Localitate', fields.localitate ?? ''],
          ['Tip proiect', fields.tip_proiect ?? ''],
          ['Suprafață', fields.suprafata ?? ''],
          ['Proiect tehnic', fields.proiect_tehnic ?? 'Nu'],
          ['Detalii', fields.detalii ?? ''],
        ]
        const html = `<h2>Solicitare de ofertă</h2><table cellpadding="6">${rows
          .map(([label, value]) => `<tr><th align="left">${label}</th><td>${escapeHtml(value).replaceAll('\n', '<br>')}</td></tr>`)
          .join('')}</table>`
        const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')

        try {
          const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: fields.email?.trim() || undefined,
              subject: 'Solicitare de ofertă · URBISCOR CONSTRUCT',
              html,
              text,
            }),
          })
          if (!response.ok) {
            console.error('Resend rejected the quote email', response.status, await response.text())
            return Response.json({ ok: false, error: 'send_failed' }, { status: 502 })
          }
        } catch (error) {
          console.error('Quote email failed', error)
          return Response.json({ ok: false, error: 'send_failed' }, { status: 502 })
        }

        // A no-JavaScript native submit navigates back to the page; the scripted
        // form reads the JSON response instead.
        if ((request.headers.get('accept') ?? '').includes('text/html')) {
          return Response.redirect(new URL('/contact?oferta=trimis#oferta', request.url), 303)
        }
        return Response.json({ ok: true })
      },
    },
  },
})
