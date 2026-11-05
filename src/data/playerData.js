import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { IoMdStats } from 'react-icons/io'

//Hero
import fotoHero from '@assets/foto_hero1.webp'
import fotoHeroBg from '@assets/foto_herobg.webp'
import fotoHeroBg1 from '@assets/foto_herobg1.webp'
import escudoRiestra from '@assets/escudo_riestra.webp'
import escudoDefensores from '@assets/escudos/escudo_defensores.webp'
import polonia from '@assets/polonia.svg'
import fotoStats from '@assets/foto_stats.webp'
import logoAer from '@assets/academias/logo_aer.webp'
import logoTocalli from '@assets/academias/logo_tocalli.webp'
import highlightsVideo from '@assets/videos/highlights.mp4'
import highlightsPoster from '@assets/highlights_poster.webp'
import listaBuenaFe from '@assets/docs/lista_buena_fe_sudamericana.webp'

import argentina from '@assets/argentina.webp'
//Galería
import fz01 from '@assets/gallery/fz01.webp'
import fz02 from '@assets/gallery/fz02.webp'
import fz03 from '@assets/gallery/fz03.webp'
import fz04 from '@assets/gallery/fz04.webp'
import fz05 from '@assets/gallery/fz05.webp'
import fz06 from '@assets/gallery/fz06.webp'
import fz07 from '@assets/gallery/fz07.webp'
import fz08 from '@assets/gallery/fz08.webp'
import fz09 from '@assets/gallery/fz09.webp'
import fz10 from '@assets/gallery/fz10.webp'
import fz11 from '@assets/gallery/fz11.webp'
import fz12 from '@assets/gallery/fz12.webp'
import fz13 from '@assets/gallery/fz13.webp'
import fz14 from '@assets/gallery/fz14.webp'
import fz15 from '@assets/gallery/fz15.webp'
//Redes
import transfermkt from '@assets/contact2.svg'

const name = 'FRANCISCO'
const fullName = 'DE ZÚÑIGA'

export const playerData = {
  name,
  fullName,
  initials: 'FZ', // iniciales para logos
  displayName: 'Francisco de Zúñiga',   // nombre completo para textos legales / alt
  number: 1,
  position: 'Arquero',
  positionShort: 'GK',
  nationality: 'Argentina',
  nationalityFlag: argentina,
  // Pasaporte comunitario: dato clave para clubes europeos
  secondNationality: 'Polonia',
  secondNationalityFlag: polonia,
  euPassport: true,
  age: 18,
  category: 2008,
  height: '1.85m',
  weight: '77kg',
  foot: 'Izquierdo',
  hand: 'Derecha',
  birthDate: '20 / 03 / 2008',
  birthPlace: 'Buenos Aires, Argentina',
  currentClub: 'Deportivo Riestra',
  currentDivision: 'Liga Profesional AFA',
  logoCurrentClub: escudoRiestra,
  image: fotoHero,
  heroBg: fotoHeroBg,
  heroBg1: fotoHeroBg1,

  // ⚠️ PLACEHOLDERS: valores inventados hasta tener datos reales
  stats: [
    { label: 'Reflejos',           value: 86 },
    { label: 'Juego aéreo',        value: 82 },
    { label: 'Uno contra uno',     value: 80 },
    { label: 'Posicionamiento',    value: 84 },
    { label: 'Juego con los pies', value: 85 },
    { label: 'Saque',              value: 83 },
  ],

  // Ficha de perfil (altura y peso ya se muestran en el Hero)
  profile: [
    { label: 'Posición',      value: 'Arquero' },
    { label: 'Pie hábil',     value: 'Izquierdo' },
    { label: 'Mano hábil',    value: 'Derecha' },
    { label: 'Ojo dominante', value: 'Derecho' },
    { label: 'Edad',          value: '18 años' },
    { label: 'Nacimiento',    value: '20 / 03 / 2008' },
    { label: 'Origen',        value: 'Buenos Aires, Argentina' },
    { label: 'Nacionalidad',  value: 'Argentina · Polonia (UE)' },
  ],

  // Hitos reales del CV (reemplazan a "última temporada" mientras no haya números)
  milestones: [
    { year: '2026', title: 'Plantel de Primera División', detail: 'Arquero de Primera · Liga Profesional AFA' },
    { year: '2026', title: 'Titular en Proyección',       detail: 'Categoría Proyección · Liga Profesional AFA' },
    { year: '2026', title: 'Convocado a la CONMEBOL Sudamericana', detail: 'Lista de buena fe del club' },
    { year: '2025', title: 'Titular en 6ta división',     detail: 'Citado a entrenar con Reserva y Primera' },
  ],

  // Recorte del jugador (fondo transparente) usado en Estadísticas
  statsImage: fotoStats,

  // Lista de buena fe · CONMEBOL Sudamericana 2026 (imagen oficial del club)
  buenaFe: {
    image: listaBuenaFe,
    title: 'Lista de buena fe',
    competition: 'CONMEBOL Sudamericana 2026',
    club: 'Deportivo Riestra',
    dorsal: 44,
    // Recuadro de su línea ("44. Francisco DE ZUÑIGA") en px sobre la imagen original
    size: { w: 1024, h: 1280 },
    highlight: { x: 506, y: 858, w: 392, h: 46 },
  },

  clubs: [
    {
      name:    'Deportivo Riestra',
      country: 'Argentina',
      years:   '2025 — Actualidad',
      from: 2025, to: 2026,
      logo:    escudoRiestra,
      titles:  [],
      info:    ['Primera División y titular Torneo Proyección (2026)', 'Titular en 6ta división (2025)'],
    },
    {
      name:    'Defensores de Belgrano',
      country: 'Argentina',
      years:   '2024',
      from: 2024, to: 2024,
      logo:    escudoDefensores,
      titles:  [],
      info:    'Arquero de 7ma división (categoría 2008)',
    },
  ],

  // Formación específica de arqueros
  academies: [
    { name: 'Academia Saccone', short: 'AER',   years: '2018 — 2025', from: 2018, to: 2025, reference: 'Alejandro Saccone', logo: logoAer },
    { name: 'Academia Tocalli', short: 'CEFAT', years: '2023 — 2025', from: 2023, to: 2025, reference: 'Martín Tocalli y Fernando Escobar', logo: logoTocalli },
  ],

  coaches: [
    { year: '2026', names: 'Gastón "Pato" Romero y Gustavo Ruhl', role: 'Entrenadores de arqueros de Primera · Deportivo Riestra' },
    { year: '2025', names: 'Néstor Frutos y Leo Cuerdo',          role: 'Entrenadores de arqueros juveniles · River Plate' },
    { year: '2025', names: 'Fernando Escobar',                     role: 'Entrenador de arqueros Sub-20 · Selección Argentina' },
  ],

  // Video principal de la sección Highlights (compilación propia, 16:9)
  highlight: {
    src: highlightsVideo,
    poster: highlightsPoster,
    title: 'Highlights 2026',
    subtitle: 'Atajadas · Juego con los pies · Repeticiones',
    duration: '2:22',
    // adelanto que se reproduce al pasar el mouse por la portada (segundos)
    preview: { start: 109, end: 121 },
    chapters: [
      { t: 4,   label: 'Atajadas' },
      { t: 65,  label: 'Juego con los pies' },
      { t: 88,  label: 'Tiro libre', replay: true },
      { t: 98,  label: 'Tiro libre', replay: true },
      { t: 109, label: 'Reacción en el área', replay: true },
      { t: 126, label: 'Mano a mano', replay: true },
    ],
  },

  // Videos de Instagram (debajo del video principal).
  // instagramId: código de la publicación. En https://www.instagram.com/reel/DXXXXXXXXXX/ es "DXXXXXXXXXX"
  // instagramType: 'reel' o 'p' según el link (/reel/... o /p/...)
  videos: [
    { id: 'v1', instagramId: 'DQNKi2eEWAs', instagramType: 'p',    title: 'Primera División', fullTitle: 'Francisco de Zúñiga | Entrenamiento Primera División', category: 'Entrenamiento', cover: fz12 },
    { id: 'v2', instagramId: 'DXFlI8RkZG2', instagramType: 'reel', title: 'vs Barracas',            fullTitle: 'Francisco de Zúñiga | Partido vs Barracas',            category: 'Partido',       cover: fz08 },
    { id: 'v3', instagramId: 'DXAqEJQES9Q', instagramType: 'reel', title: 'Entrada en Calor',               fullTitle: 'Francisco de Zúñiga | Entrada en Calor',               category: 'Previa',        cover: fz01 },
  ],

  gallery: [
    { id: 1, src: fz01, alt: 'Francisco de Zúñiga · Antes del partido', caption: 'Antes del partido', category: 'Previa', aspect: 'tall' },
    { id: 2, src: fz02, alt: 'Francisco de Zúñiga · Concentración', caption: 'Concentración', category: 'Partido', aspect: 'tall' },
    { id: 3, src: fz03, alt: 'Francisco de Zúñiga · Achique en el mano a mano', caption: 'Achique en el mano a mano', category: 'Atajadas', aspect: 'tall' },
    { id: 4, src: fz04, alt: 'Francisco de Zúñiga · Camino al arco', caption: 'Camino al arco', category: 'Partido', aspect: 'tall' },
    { id: 5, src: fz05, alt: 'Francisco de Zúñiga · Estirada', caption: 'Estirada', category: 'Atajadas', aspect: 'wide' },
    { id: 6, src: fz06, alt: 'Francisco de Zúñiga · Al piso', caption: 'Al piso', category: 'Atajadas', aspect: 'tall' },
    { id: 7, src: fz07, alt: 'Francisco de Zúñiga · Trabajo de arqueros', caption: 'Trabajo de arqueros', category: 'Entrenamiento', aspect: 'tall' },
    { id: 8, src: fz08, alt: 'Francisco de Zúñiga · Saque largo', caption: 'Saque largo', category: 'Partido', aspect: 'tall' },
    { id: 9, src: fz09, alt: 'Francisco de Zúñiga · Saque de arco', caption: 'Saque de arco', category: 'Partido', aspect: 'tall' },
    { id: 10, src: fz10, alt: 'Francisco de Zúñiga · Práctica', caption: 'Práctica', category: 'Entrenamiento', aspect: 'tall' },
    { id: 11, src: fz11, alt: 'Francisco de Zúñiga · Reflejos', caption: 'Reflejos', category: 'Entrenamiento', aspect: 'tall' },
    { id: 12, src: fz12, alt: 'Francisco de Zúñiga · Entrenamiento', caption: 'Entrenamiento', category: 'Entrenamiento', aspect: 'tall' },
    { id: 13, src: fz13, alt: 'Francisco de Zúñiga · Ordenando la defensa', caption: 'Ordenando la defensa', category: 'Partido', aspect: 'tall' },
    { id: 14, src: fz14, alt: 'Francisco de Zúñiga · Juego con los pies', caption: 'Juego con los pies', category: 'Partido', aspect: 'tall' },
    { id: 15, src: fz15, alt: 'Francisco de Zúñiga · El 1', caption: 'El 1', category: 'Partido', aspect: 'tall' },
  ],

  // Redes (url: null = se muestra como pendiente)
  socialMedia: [
    { label: 'Instagram',     icon: FaInstagram, handle: '@frandezuniga', url: 'https://www.instagram.com/frandezuniga/' },
    { label: 'Transfermarkt', icon: IoMdStats, image: transfermkt, handle: 'Francisco de Zúñiga', url: 'https://www.transfermarkt.com.ar/francisco-de-zuniga/profil/spieler/1512045' },
  ],

  // Contacto (dirección y datos de la madre NO se publican, a pedido)
  contact: {
    // Los mensajes del formulario llegan a este email (vía FormSubmit)
    formEmail: 'mdzuniga30@gmail.com',
    people: [
      {
        role: 'Jugador',
        name: 'Francisco de Zúñiga',
        phone: '+54 9 11 4528-1499',
        whatsapp: '5491145281499',
        email: 'franciscodezuniga0@gmail.com',
      },
      {
        role: 'Padre · Contacto familiar',
        name: 'Martín de Zúñiga',
        phone: '+54 9 11 6180-6966',
        whatsapp: '5491161806966',
        email: 'mdzuniga30@gmail.com',
      },
    ],
    // Mensaje para scouts y clubes de Europa (del CV: "Intereses profesionales")
    availability: {
      title: 'Disponible para pruebas en Europa',
      text: 'Interesado en continuar su desarrollo profesional en Europa. Pasaporte comunitario (Polonia) y nacionalidad española en trámite.',
      languages: [
        { code: 'ES', label: 'Español', level: 'Nativo' },
        { code: 'EN', label: 'Inglés', level: 'Avanzado' },
        { code: 'FR', label: 'Francés', level: 'Intermedio' },
        { code: 'IT', label: 'Italiano', level: 'Intermedio' },
      ],
    },
  },
}
