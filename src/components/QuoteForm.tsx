import { Link } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { site, whatsappMessage } from '@/config/site'
import { Icon } from './Icons'

/**
 * Quote request form, handled by Netlify Forms.
 * The static skeleton in /public/__forms.html registers the "oferta" form at
 * build time — keep its field list in sync with this component.
 */
export const projectTypes = ['Casă parter', 'Casă P+1', 'Casă P+M', 'Alt proiect'] as const

type Status = 'idle' | 'sending' | 'success' | 'error'

export function QuoteForm({ source }: { source: string }) {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setStatus('sending')
    const data = new FormData(form)
    if (!data.has('proiect_tehnic')) data.set('proiect_tehnic', 'Nu')
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="ticks flex min-h-[420px] flex-col items-start justify-center border border-line bg-surface p-8 md:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink">
          <Icon name="check" size={28} />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold">Mulțumim! Solicitarea a fost trimisă.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-steel">
          Te contactăm telefonic pentru detalii despre proiect. Dacă dorești să discutăm mai repede, sună-ne la{' '}
          <a href={site.phoneHref} className="font-semibold text-foreground underline underline-offset-4">
            {site.phoneDisplay}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn btn-outline-dark mt-8">
          Trimite o altă solicitare
        </button>
      </div>
    )
  }

  return (
    <form
      name="oferta"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="ticks border border-line bg-surface p-6 sm:p-8 md:p-10"
      aria-describedby="oferta-nota"
    >
      <input type="hidden" name="form-name" value="oferta" />
      <input type="hidden" name="sursa" value={source} />
      <p className="hidden" aria-hidden="true">
        <label>
          Nu completa acest câmp: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${source}-nume`} className="label">
            Nume <span className="text-gold-deep">*</span>
          </label>
          <input id={`${source}-nume`} name="nume" required autoComplete="name" className="field" placeholder="Numele și prenumele" />
        </div>
        <div>
          <label htmlFor={`${source}-telefon`} className="label">
            Telefon <span className="text-gold-deep">*</span>
          </label>
          <input
            id={`${source}-telefon`}
            name="telefon"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="\+?[0-9 \-\.]{9,18}"
            title="Introdu un număr de telefon valid"
            className="field"
            placeholder="07xx xxx xxx"
          />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className="label">
            Email
          </label>
          <input id={`${source}-email`} name="email" type="email" autoComplete="email" className="field" placeholder="adresa@email.ro" />
        </div>
        <div>
          <label htmlFor={`${source}-localitate`} className="label">
            Localitatea construcției <span className="text-gold-deep">*</span>
          </label>
          <input id={`${source}-localitate`} name="localitate" required className="field" placeholder="Ex.: localitate, județ" />
        </div>
        <div>
          <label htmlFor={`${source}-tip`} className="label">
            Tip proiect <span className="text-gold-deep">*</span>
          </label>
          <select id={`${source}-tip`} name="tip_proiect" required defaultValue="" className="field field-select">
            <option value="" disabled>
              Alege tipul proiectului
            </option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${source}-suprafata`} className="label">
            Suprafață aproximativă <span className="font-normal text-steel">(opțional)</span>
          </label>
          <input id={`${source}-suprafata`} name="suprafata" inputMode="numeric" className="field" placeholder="Ex.: 140 mp" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${source}-detalii`} className="label">
            Detalii despre proiect
          </label>
          <textarea
            id={`${source}-detalii`}
            name="detalii"
            rows={4}
            className="field resize-y"
            placeholder="Etapele dorite (fundație, structură, zidărie), stadiul actual, perioada în care vrei să începi..."
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
          <input type="checkbox" name="proiect_tehnic" value="Da" className="mt-0.5 h-5 w-5 shrink-0 accent-gold-deep" />
          <span>Am proiectul tehnic</span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-steel">
          <input type="checkbox" name="acord_gdpr" value="Da" required className="mt-0.5 h-5 w-5 shrink-0 accent-gold-deep" />
          <span>
            Sunt de acord ca datele trimise să fie folosite pentru a fi contactat în legătură cu solicitarea mea, conform{' '}
            <Link to="/politica-de-confidentialitate" className="font-medium text-foreground underline underline-offset-4">
              Politicii de confidențialitate
            </Link>
            . <span className="text-gold-deep">*</span>
          </span>
        </label>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-6 border-l-2 border-error-border bg-error-surface px-4 py-3 text-sm text-error-text">
          Solicitarea nu a putut fi trimisă. Încearcă din nou sau contactează-ne direct la{' '}
          <a href={site.phoneHref} className="font-semibold underline">
            {site.phoneDisplay}
          </a>{' '}
          ori pe{' '}
          <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            WhatsApp
          </a>
          .
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === 'sending'} className="btn btn-gold w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {status === 'sending' ? 'Se trimite...' : 'Trimite solicitarea'}
          <Icon name="arrow" size={18} className="arrow" />
        </button>
        <p id="oferta-nota" className="text-xs text-steel">
          Câmpurile marcate cu * sunt obligatorii. Ofertarea este gratuită.
        </p>
      </div>
    </form>
  )
}
