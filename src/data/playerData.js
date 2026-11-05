import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import polaco1 from '@assets/polaco1.webp'
import fotoHero from '@assets/foto_hero1.webp'
import fotoHeroBg from '@assets/foto_herobg.webp'
import fotoHeroBg1 from '@assets/foto_herobg1.webp'
import escudoRiestra from '@assets/escudo_riestra.webp'
import escudoDefensores from '@assets/escudos/escudo_defensores.webp'
import polonia from '@assets/polonia.svg'
import fotoStats from '@assets/foto_stats.webp'
import logoAer from '@assets/academias/logo_aer.webp'
import logoTocalli from '@assets/academias/logo_tocalli.webp'
import listaBuenaFe from '@assets/docs/lista_buena_fe_sudamericana.webp'

import argentina from '@assets/argentina.webp'
import universitario from '@assets/escudo_univ.webp'
//Escudos trayectoria
import escudoAtlParana from '@assets/escudos/escudo_atlparana.webp'
import escudoNewells from '@assets/escudos/escudo_newells.webp'
import escudoAlhali from '@assets/escudos/escudo_alhali.webp'
import escudoCentralCordoba from '@assets/escudos/escudo_centralcordoba.webp'
import escudoChaco from '@assets/escudos/escudo_chaco.webp'
import escudoLigadequito from '@assets/escudos/escudo_ligadequito.webp'
import escudoSanjose from '@assets/escudos/escudo_sanjose.webp'
import escudoUcatolica from '@assets/escudos/escudo_ucatolica.webp'
import escudoAucas from '@assets/escudos/escudo_aucas.webp'
//Gallery
import image1 from '@assets/gallery/image1.webp'
import image2 from '@assets/gallery/image2.webp'
import image3 from '@assets/gallery/image3.webp'
import image4 from '@assets/gallery/image4.webp'
import image5 from '@assets/gallery/image5.webp'
import image6 from '@assets/gallery/image6.webp'
import image7 from '@assets/gallery/image7.webp'
import image8 from '@assets/gallery/image8.webp'
//Video
import photoGraph from '@assets/perfil_video.webp'
//Prensa
import logo1 from '@assets/logos/logo1.webp'
import logo2 from '@assets/logos/logo2.webp'
import logo3 from '@assets/logos/logo3.webp'
//Redes
import transfermkt from '@assets/contact2.svg'
import ledsports from '@assets/contact3.webp'
import moon from '@assets/contact4.webp'


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
  currentDivision: 'Primera División · Liga Profesional AFA',
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
    { label: 'Club actual',   value: 'Deportivo Riestra' },
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
      info:    ['Primera División y titular en Proyección (2026)', 'Convocado a la CONMEBOL Sudamericana', 'Titular en 6ta división (2025)'],
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

  videos: [
    {
      id: 'v1',
      // instagramId: código del reel. En https://www.instagram.com/reel/DXXXXXXXXXX/ es "DXXXXXXXXXX"
      instagramId: 'DXvelmBtUmJ',
      title: 'Libertadores 26',
      fullTitle: 'Lisandro Alzugaray | Jugadas destacadas 2026',
      season: 'GOL VS NACIONAL',
      league: 'CONMEBOL Libertadores 2026',
      thumbnail: image7,
      cover: image7,
      category: 'Highlights',
    },
    {
      id: 'v2',
      instagramId: 'DWEUMU0AL2f',
      title: '2026',
      fullTitle: 'Lisandro Alzugaray | Compilado de goles',
      season: 'Compilado',
      league: 'CONMEBOL Libertadores 2025',
      thumbnail: image1,
      cover: image1,
      category: 'Goles',
    },
    {
      id: 'v3',
      instagramId: 'DTlGApKkWzo',
      title: 'Temporada 2025',
      fullTitle: 'Lisandro Alzugaray | Asistencias y juego',
      season: 'Liga de Quito',
      league: 'Liga de Quito',
      thumbnail: image4,
      cover: image4,
      category: 'Asistencias',
    },
  ],

  press: [
    {
      media: 'ESPN Deportes',
      logo:  logo1,
      title: 'Lisandro Alzugaray volvió con gol clave para Universitario en CONMEBOL Libertadores',
      date:  'Abril 2026',
      url:   'https://espndeportes.espn.com/futbol/copa-libertadores/nota/_/id/16648033/lisandro-alzugaray-volvio-con-gol-clave-para-universitario-en-conmebol-libertadores',
    },
    {
      media: 'CONMEBOL Libertadores',
      logo:  logo3,
      title: '🔥⚽🇵🇪 Un delantero siempre presente en la CONMEBOL #Libertadores: @lisandroalzugaray',
      date:  'Mayo 2026',
      url:   'https://www.instagram.com/p/DYSwt6NDBIC/?hl=es&img_index=4',
    },
    {
      media: 'CONMEBOL Libertadores',
      logo:  logo3,
      title: '¡El equipo de la semana! Lisandro Alzugaray en el 11 ideal tras la semifinal de ida de la CONMEBOL #Libertadores.',
      date:  'Octubre 2025',
      url:   'https://x.com/Libertadores/status/1981820492257669422/photo/1?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1981820492257669422%7Ctwgr%5E81681f2548c9342a151787ad10c31eabb903f3c2%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fwww.teleamazonas.com%2Fdeportes%2Ffutbol%2Flibertadores%2Fseis-futbolistas-liga-quito-equipo-ideal-semana-copa-libertadores-105112%2F',
    },
  ],

  gallery: [
    { id: 1, src: image1, alt: 'Francisco Fydriszewski', caption: 'Liga Profesional 2024', category: 'Partido', aspect: 'wide' },
    { id: 2, src: image2, alt: 'Francisco Fydriszewski', caption: 'Festejo ante Racing',    category: 'Festejo', aspect: 'tall' },
    { id: 3, src: image3, alt: 'Francisco Fydriszewski', caption: 'Pretemporada 2025',       category: 'Entrenamiento', aspect: 'square' },
    { id: 4, src: image4, alt: 'Francisco Fydriszewski', caption: 'Copa Argentina 2024',     category: 'Partido', aspect: 'wide' },
    { id: 5, src: image5, alt: 'Francisco Fydriszewski', caption: 'Plantel Talleres 2024',   category: 'Equipo',  aspect: 'wide' },
    { id: 6, src: image6, alt: 'Francisco Fydriszewski', caption: 'Foto oficial 2024',       category: 'Retrato', aspect: 'tall' },
    { id: 7, src: image7, alt: 'Francisco Fydriszewski', caption: 'Liga Profesional 2025', category: 'Partido', aspect: 'wide' },
  ],

  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      iconBg: FaInstagram,
      handle: '@lisandroalzugaray',
      url: 'https://www.instagram.com/lisandroalzugaray/',
      hoverColor: '#E1306C',
      hoverGradient: 'insta-gradient',
    },
    {
      label: 'TransferMarkt',
      image: transfermkt,
      iconBg: IoMdStats,
      handle: '@lisandro-alzugaray',
      url: 'https://www.transfermarkt.com.ar/lisandro-alzugaray/profil/spieler/396920',
      hoverColor: 'brand.brownLight',
    },
  ],

  contact: [
    {
      title:      'Representante Deportivo',
      label:      'Moon Sports Group',
      image:       moon,
      handle:     '@moonsportsgroup_',
      url:        'https://www.instagram.com/moonsportsgroup_/',
      hoverColor: 'rgba(139,69,19,0.18)',
    },
    {
      title:      'Contacto Marketing',
      label:      'led sports marketing',
      image: ledsports,
      handle:     '@_ledsports',
      url:        'https://www.instagram.com/_ledsports/',
      hoverColor: 'rgba(212,168,75,0.18)',
    },
  ],
}
