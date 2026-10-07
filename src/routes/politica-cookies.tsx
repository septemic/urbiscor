import { Link, createFileRoute } from '@tanstack/react-router'
import { site } from '@/config/site'
import { LegalPage } from '@/components/LegalPage'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/politica-cookies')({
  head: () =>
    pageHead({
      title: 'Politica cookies | URBISCOR CONSTRUCT',
      description: 'Informații despre cookie-urile necesare, preferințele de afișare și măsurarea Google Ads, activată numai cu acordul tău.',
      path: '/politica-cookies',
    }),
  component: CookiesPage,
})

function CookiesPage() {
  return (
    <LegalPage title="Politica cookies" updated="7 octombrie 2026">
      <p>
        Cookie-urile sunt fișiere mici stocate în browser atunci când vizitezi un site. Această pagină explică ce folosește site-ul {site.name}.
      </p>

      <h2>Pe scurt</h2>
      <p>
        <strong>Măsurarea Google Ads este opțională și se activează numai după acordul tău.</strong> Dacă refuzi, formularul și celelalte funcții
        ale site-ului rămân disponibile. Nu folosim Google Analytics sau Facebook Pixel, iar fonturile sunt găzduite pe propriul server.
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

      <h2>Măsurarea reclamelor Google Ads</h2>
      <p>
        Dacă accepți măsurarea, încărcăm eticheta Google Ads pentru a înțelege dacă reclamele noastre duc la solicitări de ofertă.
        Google poate prelucra identificatori ai clicurilor pe reclame, cookie-uri, adresa IP și informații despre browser și pagina vizitată.
        Înregistrăm conversia numai după trimiterea cu succes a formularului. Nu trimitem către această etichetă numele, telefonul,
        emailul sau detaliile completate în formular și nu activăm personalizarea reclamelor.
      </p>
      <p>
        Cookie-urile de măsurare Google Ads, precum cele cu prefixul <code>_gcl_</code>, pot fi păstrate de Google pentru atribuirea conversiilor;
        durata depinde de cookie și de setările serviciului. Mai multe informații:{' '}
        <a href="https://policies.google.com/technologies/cookies?hl=ro" target="_blank" rel="noopener noreferrer">Politica Google privind cookie-urile</a>.
      </p>

      <h2 id="preferinte">Alegerea și retragerea acordului</h2>
      <p>
        Poți accepta sau refuza măsurarea din panoul de preferințe. Alegerea este păstrată în browser, în stocarea locală, timp de 180 de zile.
        O poți modifica oricând din linkul „Preferințe cookies” aflat în subsol. La retragerea acordului oprim înregistrarea conversiilor
        și eliminăm cookie-urile de măsurare Google Ads accesibile pe domeniul nostru. Pentru cookie-urile domeniilor Google, folosește
        setările browserului. Fără JavaScript, eticheta Google Ads nu este încărcată.
      </p>

      <h2>Cum controlezi cookie-urile</h2>
      <p>
        Poți șterge sau bloca cookie-urile din setările browserului (Chrome, Firefox, Safari, Edge). Blocarea cookie-urilor strict necesare poate afecta
        trimiterea formularului.
      </p>

      <h2>Modificări</h2>
      <p>
        Dacă schimbăm instrumentele de măsurare sau scopurile utilizării cookie-urilor, actualizăm această politică și solicităm acordul
        corespunzător înainte de activare.
      </p>

      <h2>Contact</h2>
      <p>
        Pentru întrebări: <a href={site.phoneHref}>{site.phoneDisplay}</a>. Detalii despre datele personale găsești în{' '}
        <Link to="/politica-de-confidentialitate">Politica de confidențialitate</Link>.
      </p>
    </LegalPage>
  )
}
