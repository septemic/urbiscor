import { Link, createFileRoute } from '@tanstack/react-router'
import { site } from '@/config/site'
import { LegalPage } from '@/components/LegalPage'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/politica-de-confidentialitate')({
  head: () =>
    pageHead({
      title: 'Politica de confidențialitate | URBISCOR CONSTRUCT',
      description: 'Cum colectează, folosește și protejează URBISCOR CONSTRUCT datele personale transmise prin site, conform GDPR.',
      path: '/politica-de-confidentialitate',
    }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <LegalPage title="Politica de confidențialitate" updated="6 octombrie 2026">
      <p>
        Această politică explică modul în care {site.name} („noi”) prelucrează datele cu caracter personal ale persoanelor care folosesc acest site,
        în conformitate cu Regulamentul (UE) 2016/679 („GDPR”) și cu legislația română aplicabilă.
      </p>

      <h2>1. Operatorul datelor</h2>
      <p>
        Operatorul datelor este {site.name}. Pentru orice întrebare privind datele personale ne poți contacta la telefon{' '}
        <a href={site.phoneHref}>{site.phoneDisplay}</a> (persoană de contact: {site.contactPerson}).
      </p>

      <h2>2. Ce date colectăm</h2>
      <p>Colectăm doar datele pe care ni le transmiți voluntar prin formularul de ofertă sau când ne contactezi:</p>
      <ul>
        <li>nume, număr de telefon și, opțional, adresă de email;</li>
        <li>localitatea construcției, tipul proiectului, suprafața aproximativă și detaliile pe care alegi să le descrii;</li>
        <li>informația dacă deții proiectul tehnic.</li>
      </ul>
      <p>Te rugăm să nu incluzi în formular date sensibile care nu sunt necesare pentru ofertare.</p>

      <h2>3. Scopul și temeiul prelucrării</h2>
      <ul>
        <li>
          <strong>Răspunsul la solicitarea de ofertă</strong> și discuțiile premergătoare unui eventual contract — temei: art. 6 alin. (1) lit. b) GDPR
          (demersuri la cererea ta înainte de încheierea unui contract).
        </li>
        <li>
          <strong>Funcționarea în siguranță a site-ului</strong> (de exemplu, protecția formularului împotriva mesajelor automate) — temei: interesul
          legitim, art. 6 alin. (1) lit. f) GDPR.
        </li>
      </ul>
      <p>Nu folosim datele tale pentru marketing automat și nu le vindem sau închiriem terților.</p>

      <h2>4. Cui transmitem datele</h2>
      <ul>
        <li>
          <strong>Netlify, Inc.</strong> — furnizorul de găzduire al site-ului, care stochează mesajele trimise prin formular. Transferul în afara
          Spațiului Economic European se face pe baza garanțiilor prevăzute de GDPR (de exemplu, clauze contractuale standard).
        </li>
        <li>
          <strong>ImprovMX și Google (Gmail)</strong> — notificările cu datele trimise prin formular sunt redirecționate prin ImprovMX către căsuța
          noastră de email Gmail, pentru a putea răspunde solicitării tale.
        </li>
        <li>
          <strong>WhatsApp (Meta)</strong> — doar dacă alegi să ne scrii pe WhatsApp; în acest caz se aplică și politica de confidențialitate WhatsApp.
        </li>
        <li>Autorități publice, numai atunci când legea ne obligă.</li>
      </ul>

      <h2>5. Cât timp păstrăm datele</h2>
      <p>
        Păstrăm datele din solicitările de ofertă cât timp este necesar pentru a-ți răspunde și pentru discuțiile legate de proiect. Dacă nu se încheie
        un contract, ștergem solicitarea în cel mult 12 luni. Dacă se încheie un contract, datele se păstrează pe durata impusă de legislația
        aplicabilă.
      </p>

      <h2>6. Drepturile tale</h2>
      <p>Conform GDPR, ai dreptul:</p>
      <ul>
        <li>de acces la datele tale și de a primi o copie a acestora;</li>
        <li>la rectificarea datelor inexacte;</li>
        <li>la ștergerea datelor („dreptul de a fi uitat”);</li>
        <li>la restricționarea prelucrării și la portabilitatea datelor;</li>
        <li>de a te opune prelucrării bazate pe interesul legitim;</li>
        <li>
          de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) —{' '}
          <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">
            www.dataprotection.ro
          </a>
          .
        </li>
      </ul>
      <p>
        Pentru exercitarea acestor drepturi ne poți contacta la <a href={site.phoneHref}>{site.phoneDisplay}</a>.
      </p>

      <h2>7. Securitate</h2>
      <p>Site-ul folosește conexiune criptată (HTTPS). Accesul la solicitările primite este limitat la persoanele care se ocupă de ofertare.</p>

      <h2>8. Cookie-uri</h2>
      <p>
        Informații despre cookie-uri găsești în <Link to="/politica-cookies">Politica cookies</Link>.
      </p>

      <h2>9. Modificări</h2>
      <p>Putem actualiza această politică atunci când se schimbă modul de prelucrare a datelor. Data ultimei actualizări este afișată la începutul paginii.</p>
    </LegalPage>
  )
}
