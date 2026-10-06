import type { ServiceId } from '@/config/servicePaths'

/** Helpful project guidance; no invented prices, timelines or business claims. */
export const servicePages: Record<ServiceId, {
  guidance: { title: string; text: string }[]
  questions: { question: string; answer: string }[]
}> = {
  'constructii-la-rosu': {
    guidance: [
      { title: 'Ce înseamnă etapa la roșu', text: 'Pe această pagină, etapa la roșu se referă la lucrările de fundație, structură din beton armat și zidărie descrise mai jos. Lucrările exacte se stabilesc din proiect și din ofertă, astfel încât să fie clar ce se execută și ce rămâne pentru etapele următoare.' },
      { title: 'De la proiect la execuție', text: 'Proiectul tehnic stabilește dimensiunile, armarea și materialele. Execuția urmează succesiunea fundație, elemente structurale, plăci și zidărie. Sistemul Doka, popii metalici și schela proprie susțin organizarea acestor etape.' },
      { title: 'Pregătirea unei oferte', text: 'Trimite localitatea terenului, tipul casei, suprafața aproximativă și stadiul actual al proiectului. Dacă ai proiectul tehnic, îl poți trimite pe WhatsApp. Aceste informații ne ajută să discutăm lucrările solicitate și să stabilim ce trebuie inclus în ofertă.' },
    ],
    questions: [
      { question: 'Ce lucrări intră în oferta pentru o casă la roșu?', answer: 'Oferta se stabilește în funcție de proiect și de etapele solicitate: fundații, elemente din beton armat, plăci și zidărie. Acoperișul, instalațiile și finisajele nu trebuie presupuse incluse; lista exactă a lucrărilor se clarifică înainte de execuție.' },
      { question: 'Se poate estima costul numai din suprafața casei?', answer: 'Suprafața ajută la o discuție inițială, dar nu este suficientă pentru o ofertă exactă. Soluția de fundare, structura, cantitățile din proiect, accesul pe șantier și lucrările solicitate influențează costul.' },
      { question: 'Unde executați construcții de case la roșu?', answer: 'Executăm lucrări rezidențiale în Oltenia. Pentru localitatea proiectului tău sau pentru lucrări din alte zone, contactează-ne pentru a verifica disponibilitatea.' },
    ],
  },
  fundatii: {
    guidance: [
      { title: 'Soluția de fundare pornește de la proiect', text: 'Tipul fundației, cotele și armarea se stabilesc prin proiectul tehnic, ținând cont de teren și de construcție. Execuția urmează această soluție; dimensiunile nu se aleg numai după suprafața sau numărul de niveluri al casei.' },
      { title: 'Etapele înainte de turnare', text: 'Lucrarea începe cu trasarea și săpăturile, apoi continuă cu armarea și cofrarea prevăzute în proiect. Cotele, dimensiunile și armătura se verifică înainte de turnare, iar accesul pentru beton se pregătește din timp.' },
      { title: 'Ce informații ajută la ofertare', text: 'Pentru o ofertă, sunt utile localitatea terenului, proiectul de structură, stadiul săpăturilor și informațiile despre acces. Precizează dacă dorești numai fundația sau și elevațiile, placa și etapele de structură care urmează.' },
    ],
    questions: [
      { question: 'Executați numai fundația, fără restul structurii?', answer: 'Poți solicita o ofertă pentru etapa de fundație. Lucrările incluse se stabilesc din proiect și din stadiul șantierului, inclusiv dacă sunt necesare elevații sau plăci.' },
      { question: 'Cum se stabilește costul unei fundații?', answer: 'Costul depinde de soluția din proiect, cantitățile de beton și armătură, săpături, cofrare și accesul pe teren. O valoare pe metru pătrat, fără aceste detalii, nu descrie complet lucrarea.' },
      { question: 'Ce documente sunt utile pentru discuția inițială?', answer: 'Planurile de fundație și detaliile de armare din proiectul tehnic sunt cele mai utile. Poți trimite și fotografii ale terenului sau ale lucrărilor existente, pentru a explica stadiul actual.' },
    ],
  },
  'structuri-beton-armat': {
    guidance: [
      { title: 'Elementele care formează structura', text: 'Stâlpii, grinzile, centurile și plăcile lucrează împreună conform proiectului de structură. Dimensiunile și armarea fiecărui element trebuie respectate; modificările de execuție se discută cu proiectantul.' },
      { title: 'Armare, cofrare și turnare', text: 'Fiecare etapă se pregătește în ordinea potrivită: montarea armăturii, cofrarea și susținerea, verificarea înainte de turnare, apoi betonarea. Folosim echipamentele proprii de cofrare și susținere pentru organizarea lucrării.' },
      { title: 'O ofertă pentru stadiul real al șantierului', text: 'Precizează localitatea, numărul de niveluri și ce elemente sunt deja executate. Planurile de structură, detaliile de armare și fotografiile șantierului ajută la delimitarea lucrărilor pe care le soliciți.' },
    ],
    questions: [
      { question: 'Puteți continua o structură deja începută?', answer: 'Trimite proiectul și fotografii ale stadiului actual pentru a discuta lucrările rămase. Continuarea se stabilește după clarificarea elementelor existente și a cerințelor din proiect.' },
      { question: 'Sunt incluse cofrarea și turnarea betonului?', answer: 'Aceste etape fac parte din execuția elementelor din beton armat, dar oferta trebuie să precizeze lucrările și responsabilitățile exacte. Cerințele se discută în funcție de proiect și de șantier.' },
      { question: 'Când se poate îndepărta cofrajul?', answer: 'Momentul decofrării și al îndepărtării susținerilor depinde de element, beton și condițiile de execuție. Se respectă proiectul și cerințele tehnice aplicabile; nu folosim un termen universal pentru toate lucrările.' },
    ],
  },
  cofrare: {
    guidance: [
      { title: 'Cofrajul urmărește geometria din proiect', text: 'Cofrajul stabilește forma și dimensiunile elementului din beton. Montajul, îmbinările și susținerea se pregătesc pentru elementul executat, apoi se verifică înainte de turnare.' },
      { title: 'Sistem propriu pentru organizarea lucrării', text: 'Dispunem de sistem profesional Doka, popi metalici și schelă proprii. Pentru plăci, echipamentele de cofrare și susținere se organizează în funcție de geometrie, cote și cerințele lucrării.' },
      { title: 'Ce trebuie precizat pentru ofertă', text: 'Trimite planurile elementelor de cofrat, localitatea șantierului și stadiul armării. Precizează dacă soliciți doar etapa de cofrare sau și armare, turnare și celelalte lucrări de structură.' },
    ],
    questions: [
      { question: 'Pentru ce elemente realizați cofraje?', answer: 'Realizăm cofraje pentru fundații și elevații, stâlpi, grinzi, centuri și plăci. Soluția și susținerea se stabilesc în funcție de element și de proiect.' },
      { question: 'Sistemul Doka este propriu?', answer: 'Da. URBISCOR CONSTRUCT dispune de sistem profesional de cofrare Doka, popi metalici și schelă proprii, utilizate la organizarea etapelor de execuție.' },
      { question: 'Ce informații trimit pentru o ofertă de cofrare?', answer: 'Trimite localitatea șantierului, planurile elementelor de cofrat și stadiul lucrării. Precizează dacă soliciți cofrare pentru o etapă sau execuția mai multor elemente ale structurii.' },
    ],
  },
  'turnare-beton': {
    guidance: [
      { title: 'Pregătirea turnării', text: 'Armătura și cofrajul se verifică înainte de betonare. Clasa betonului urmează proiectul, iar accesul pentru livrare și pompă se discută înainte de sosirea betonului.' },
      { title: 'Punerea în operă și îngrijirea betonului', text: 'Turnarea se organizează în funcție de elementul executat și continuă cu vibrarea și finisarea necesară. Protejarea și îngrijirea betonului după turnare țin cont de condițiile din șantier și de cerințele tehnice.' },
      { title: 'Clarificarea responsabilităților', text: 'Pentru ofertă, trimite proiectul, localitatea, elementele de turnat și stadiul cofrajului și armării. Discutăm din timp organizarea livrării și a pompei, precum și lucrările care trebuie incluse.' },
    ],
    questions: [
      { question: 'Pentru ce lucrări realizați turnări?', answer: 'Turnarea betonului face parte din execuția fundațiilor, elevațiilor și elementelor structurale ale caselor, precum stâlpi, grinzi, centuri și plăci, conform proiectului.' },
      { question: 'Clasa betonului se alege la fața locului?', answer: 'Clasa betonului și cerințele elementului sunt stabilite în proiect. Acestea se clarifică înainte de comandă și de turnare, nu se înlocuiesc cu o recomandare generală.' },
      { question: 'Pompa și livrarea sunt automat incluse în ofertă?', answer: 'Nu trebuie presupus acest lucru. Oferta și organizarea șantierului trebuie să precizeze responsabilitățile pentru livrare, pompă și lucrările de punere în operă.' },
    ],
  },
  zidarie: {
    guidance: [
      { title: 'Materialul și grosimea urmează proiectul', text: 'BCA-ul sau cărămida, grosimea pereților și detaliile de execuție se stabilesc din proiect. Materialele nu se înlocuiesc numai pe baza unei preferințe, fără clarificarea cerințelor construcției.' },
      { title: 'Pereți, compartimentări și goluri', text: 'Executăm pereți exteriori și compartimentări interioare, cu atenție la planeitate și verticalitate. Pozițiile golurilor pentru uși și ferestre, buiandrugii și legăturile prevăzute în proiect se urmăresc în etapa de zidărie.' },
      { title: 'Ce ajută la calcularea lucrării', text: 'Trimite localitatea, planurile pereților, materialul prevăzut și stadiul structurii. Suprafețele, grosimile și numărul de goluri ajută la delimitarea lucrărilor și a cantităților necesare pentru ofertă.' },
    ],
    questions: [
      { question: 'Executați atât zidărie BCA, cât și din cărămidă?', answer: 'Da. Executăm zidărie exterioară și interioară din BCA sau cărămidă, în funcție de materialul și detaliile prevăzute în proiect.' },
      { question: 'Pot cere o ofertă numai pentru compartimentări?', answer: 'Poți solicita o ofertă pentru pereții interiori. Trimite planurile, materialul, localitatea și stadiul construcției, pentru a discuta lucrarea.' },
      { question: 'Materialele sunt incluse în prețul zidăriei?', answer: 'Acest lucru se clarifică în ofertă. Precizează dacă soliciți manoperă sau și organizarea materialelor; nu presupune că două oferte includ aceleași lucrări și materiale.' },
    ],
  },
}
