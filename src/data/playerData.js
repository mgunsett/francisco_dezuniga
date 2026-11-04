import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import polaco1 from '@assets/polaco1.webp'

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


const name = 'LISANDRO'
const fullName = 'ALZUGARAY'

export const playerData = {
  name,
  fullName,
  initials: `${name[0]}${fullName[0]}`, // iniciales para logos (PF)
  displayName: `${name} ${fullName}`,   // nombre completo para textos legales / alt
  number: 30,
  position: 'Mediocampista',
  positionShort: 'MID',
  nationality: 'Argentina',
  nationalityFlag: argentina,
  age: 36,
  height: '1.76m',
  weight: '70kg',
  foot: 'Derecho',
  birthDate: '17 / 04 / 1990',
  birthPlace: 'Viale, Argentina',
  currentClub: 'Universitario',
  logoCurrentClub: universitario,
  image: polaco1,
  

  stats: [
    { label: 'Velocidad',      value: 91 },
    { label: 'Definición',     value: 88 },
    { label: 'Regate',         value: 84 },
    { label: 'Pases Completos',    value: 79 },
    { label: 'Presión Alta',   value: 82 },
    { label: 'Visión de Juego',value: 79 },
  ],

  seasonStats: [
    { label: 'Partidos',    value: 16 },
    { label: 'Goles',       value: 3 },
    { label: 'Asistencias', value: 1  },
    { label: 'Tiros al árco', value: 8  },
    { label: 'Min / Part.', value: "1,022'" },
    { label: 'Valoración', value: 7.4  },

  ],

  clubs: [
    {
      name:    'Universitario',
      country: 'Perú',
      years:   '2026 — Actualidad',
      logo:    universitario,
      titles:  [],
      info:    '',
    },
    {
      name:    'Liga de Quito',
      country: 'Ecuador',
      years:   '2023 — 2025',
      logo:    escudoLigadequito,
      titles:  ['Serie A Ecuador 2023','Copa Sudamericana 2023', 'Serie A Ecuador 2024', 'Supercopa Ecuador 2024'],
      info:    '',
    },
    {
      name:    'Al-Hali Saudi',
      country: 'Arabia Saudita',
      years:   '2022',
      logo:    escudoAlhali,
      titles:  [],
      info:    '',
    },
    {
      name:    'Universidad Católica',
      country: 'Ecuador',
      years:   '2021 — 2022',
      logo:    escudoUcatolica,
      titles:  [],
      info:    '11 ideal de la Serie A de Ecuador 2021',
    },
    {
      name:    'S.D Aucas',
      country: 'Ecuador',
      years:   '2020',
      logo:    escudoAucas,
      titles:  [],
      info:    '',
    },
    {
      name:    'Central Córdoba',
      country: 'Argentina',
      years:   '2019',
      logo:    escudoCentralCordoba,
      titles:  [],
      info:    '',
    },
    {
      name:    'Newell\'s Old Boys',
      country: 'Argentina',
      years:   '2018',
      logo:    escudoNewells,
      titles:  [],
      info:    '',
    },
    {
      name:    'Chaco For Ever',
      country: 'Argentina',
      years:   '2013-2014 / 2017',
      logo:    escudoChaco,
      titles:  [],
      info:    '',
    },
    {
      name:    'San José',
      country: 'Argentina',
      years:   '2016 — 2017',
      logo:    escudoSanjose,
      titles:  [],
      info:    '',
    },
    {
      name:    'Atlético Paraná',
      country: 'Argentina',
      years:   '2011-2013 / 2015',
      logo:    escudoAtlParana,
      titles:  [],
      info:    '',
    },
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
