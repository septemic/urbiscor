import type { IconName } from '@/components/Icons'

/** Homepage service cards. */
export const serviceCards: { n: string; title: string; text: string; icon: IconName }[] = [
  { n: '01', title: 'Construcții case la roșu', icon: 'house', text: 'Execuția structurii complete a locuinței, de la fundație până la zidărie și placa finală.' },
  { n: '02', title: 'Fundații', icon: 'foundation', text: 'Trasare, săpături, armare, cofrare și turnare conform proiectului tehnic.' },
  { n: '03', title: 'Structuri din beton armat', icon: 'frame', text: 'Execuție stâlpi, grinzi, centuri și plăci din beton armat.' },
  { n: '04', title: 'Cofrare și turnare', icon: 'pour', text: 'Cofraje profesionale și turnări realizate organizat, cu echipamente adecvate fiecărei etape.' },
  { n: '05', title: 'Zidărie', icon: 'masonry', text: 'Execuție zidărie din BCA sau cărămidă conform proiectului.' },
  { n: '06', title: 'Sistem Doka propriu', icon: 'formwork', text: 'Dispunem de sistem profesional de cofrare Doka și popi metalici proprii pentru o execuție eficientă și organizată.' },
]

/** Detailed sections on /servicii. `id` is used as the page anchor. */
export const serviceDetails: {
  id: string
  title: string
  icon: IconName
  image: string
  imageAlt: string
  intro: string
  includes: string[]
}[] = [
  {
    id: 'constructii-la-rosu',
    title: 'Construcții la roșu',
    icon: 'house',
    image: '/img/casa-rosu.jpg',
    imageAlt: 'Casă în stadiul la roșu, cu structură din beton armat, zidărie din cărămidă și schelă',
    intro:
      'Executăm structura completă a casei — etapa „la roșu” — pe baza proiectului tehnic. Lucrarea se desfășoară etapizat, de la fundație până la placa finală, cu echipamentele noastre de cofrare și susținere.',
    includes: [
      'Organizarea șantierului și trasarea construcției',
      'Fundații, plăci și elevații din beton armat',
      'Stâlpi, grinzi, centuri și plăci',
      'Zidărie exterioară și interioară din BCA sau cărămidă',
      'Comunicare pe parcurs cu beneficiarul la fiecare etapă',
    ],
  },
  {
    id: 'fundatii',
    title: 'Fundații',
    icon: 'foundation',
    image: '/img/fundatii.jpg',
    imageAlt: 'Fundație continuă cu armătură montată în tranșee și cofraj pregătit pentru turnare',
    intro:
      'Fundația preia încărcările întregii construcții, de aceea o executăm strict conform proiectului: cote, dimensiuni și armare verificate înainte de fiecare turnare.',
    includes: [
      'Trasarea construcției pe teren',
      'Săpături pentru fundații',
      'Armarea fundațiilor conform proiectului',
      'Cofrarea elevațiilor',
      'Turnarea și compactarea betonului',
    ],
  },
  {
    id: 'structuri-beton-armat',
    title: 'Structuri din beton armat',
    icon: 'frame',
    image: '/img/structuri.jpg',
    imageAlt: 'Stâlpi din beton armat cu mustăți de armătură deasupra unei plăci turnate',
    intro:
      'Stâlpii, grinzile, centurile și plăcile formează scheletul casei. Lucrăm ordonat: armare, verificare, cofrare, turnare — fiecare element în etapa lui.',
    includes: [
      'Fasonarea și montarea armăturii',
      'Execuție stâlpi și grinzi',
      'Centuri și buiandrugi',
      'Plăci din beton armat',
      'Decofrare la termenele potrivite',
    ],
  },
  {
    id: 'cofrare',
    title: 'Cofrare',
    icon: 'formwork',
    image: '/img/cofraje.jpg',
    imageAlt: 'Cofraj Doka pentru placă, cu grinzi H20 și popi metalici telescopici',
    intro:
      'Cofrajul dă forma și precizia elementelor din beton. Folosim sistem profesional de cofrare și popi metalici proprii, montați în funcție de fiecare element structural.',
    includes: [
      'Cofraje pentru fundații și elevații',
      'Cofraje pentru stâlpi, grinzi și centuri',
      'Cofrare plăci cu sistem Doka',
      'Susținere cu popi metalici',
      'Verificarea cofrajului înainte de turnare',
    ],
  },
  {
    id: 'turnare-beton',
    title: 'Turnare beton',
    icon: 'pour',
    image: '/img/turnare.jpg',
    imageAlt: 'Turnare beton pe placa unei case cu pompa de beton',
    intro:
      'Turnarea se pregătește din timp: armătura și cofrajul sunt verificate, betonul este comandat în clasa din proiect, iar echipa și echipamentele sunt pregătite înainte de sosirea pompei.',
    includes: [
      'Planificarea turnării și a accesului pe șantier',
      'Coordonarea livrării de beton și a pompei',
      'Turnare și vibrare',
      'Finisarea suprafeței plăcii',
      'Protejarea și udarea betonului după turnare',
    ],
  },
  {
    id: 'zidarie',
    title: 'Zidărie',
    icon: 'masonry',
    image: '/img/zidarie.jpg',
    imageAlt: 'Zidărie din BCA între stâlpi din beton armat, cu zidar și nivelă',
    intro:
      'Executăm zidărie din BCA sau cărămidă, conform proiectului. Atenție la planeitate, verticalitate și la golurile pentru uși și ferestre.',
    includes: [
      'Zidărie exterioară din BCA sau cărămidă',
      'Pereți interiori de compartimentare',
      'Goluri pentru uși și ferestre',
      'Buiandrugi și centuri',
      'Verificare cu nivelă și fir cu plumb',
    ],
  },
  {
    id: 'doka',
    title: 'Sistem Doka propriu',
    icon: 'props',
    image: '/img/schela.jpg',
    imageAlt: 'Panouri de cofraj Doka, popi metalici și schelă depozitate ordonat pe șantier',
    intro:
      'Avem în dotare sistem profesional de cofrare Doka, popi metalici și schelă proprii. Echipamentele proprii ne permit să organizăm mai eficient lucrările și să reducem dependența de închirieri pentru echipamentele principale.',
    includes: [
      'Sistem de cofrare Doka pentru plăci',
      'Popi metalici telescopici proprii',
      'Schelă proprie pentru lucrul la înălțime',
      'Planificarea echipamentelor pe etape',
      'Montaj și demontaj organizat',
    ],
  },
]
