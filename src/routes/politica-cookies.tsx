import { Link, createFileRoute } from '@tanstack/react-router'
import { site } from '@/config/site'
import { LegalPage } from '@/components/LegalPage'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/politica-cookies')({
  head: () =>
    pageHead({
      title: 'Politica cookies | URBISCOR CONSTRUCT',
      description: 'Informații despre cookie-uri pe site-ul URBISCOR CONSTRUCT. Site-ul nu folosește cookie-uri de urmărire sau de marketing.',
      path: '/politica-cookies',
    }),
  component: CookiesPage,
})

function CookiesPage() {
  return (
    <LegalPage title="Politica cookies" updated="6 octombrie 2026">
      <p>
        Cookie-urile sunt fișiere mici stocate în browser atunci când vizitezi un site. Această pagină explică ce folosește site-ul {site.name}.
      </p>

      <h2>Pe scurt</h2>
      <p>
        <strong>Site-ul nu folosește cookie-uri de analiză, de urmărire sau de marketing.</strong> Nu încărcăm scripturi de tip Google Analytics,
        Facebook Pixel sau similare, iar fonturile sunt găzduite pe propriul server, fără conexiuni către terți. Din acest motiv, nu îți cerem
        consimțământul printr-un banner de cookie-uri.
      </p>

      <h2>Cookie-uri strict necesare</h2>
      <p>
        Furnizorul de găzduire (Netlify) poate folosi elemente tehnice strict necesare pentru livrarea în siguranță a paginilor și pentru protecția
        formularului împotriva mesajelor automate. Acestea nu servesc la identificarea ta în scopuri de marketing și nu necesită consimțământ, conform
        legislației aplicabile.
      </p>

      <h2>Preferința de afișare</h2>
      <p>
        Site-ul urmează implicit modul luminos sau întunecat al dispozitivului. Dacă schimbi modul folosind butonul din antet, alegerea este
        păstrată doar în browserul tău, în stocarea locală (localStorage), pentru vizitele următoare. Această preferință nu este trimisă către server
        și nu este folosită pentru urmărire. O poți elimina ștergând datele site-ului din setările browserului.
      </p>

      <h2>Linkuri externe</h2>
      <p>
        Când apeși butonul WhatsApp sau un link către o rețea socială, părăsești site-ul nostru. Serviciile respective pot folosi propriile cookie-uri,
        conform politicilor lor.
      </p>

      <h2>Cum controlezi cookie-urile</h2>
      <p>
        Poți șterge sau bloca cookie-urile din setările browserului (Chrome, Firefox, Safari, Edge). Blocarea cookie-urilor strict necesare poate afecta
        trimiterea formularului.
      </p>

      <h2>Modificări</h2>
      <p>
        Dacă pe viitor vom adăuga instrumente de analiză sau alte cookie-uri care nu sunt strict necesare, acestea vor fi activate doar după ce îți
        exprimi acordul, iar această politică va fi actualizată.
      </p>

      <h2>Contact</h2>
      <p>
        Pentru întrebări: <a href={site.phoneHref}>{site.phoneDisplay}</a>. Detalii despre datele personale găsești în{' '}
        <Link to="/politica-de-confidentialitate">Politica de confidențialitate</Link>.
      </p>
    </LegalPage>
  )
}
