import { extendTheme } from '@chakra-ui/react'

// Paleta de marca — fuente única de verdad para los colores del proyecto
// Base blanco y negro del escudo de Deportivo Riestra; el verde del buzo
// de arquero queda solo para detalles.
const riestra = {
  black:       '#0A0B0A', // negro (fondo)
  white:       '#FFFFFF', // blanco (texto / acento principal)
  green:       '#1F7A46', // verde del buzo
  greenBright: '#34B86E', // verde de detalle (legible sobre negro)
  greenDeep:   '#0D3A22', // verde profundo
  smoke:       '#8E918F', // gris neutro (texto secundario)
}

// Mantiene las keys del template para que todas las secciones se re-pinten solas
const brand = {
  brown:      riestra.greenBright,          // detalles finos (barritas, hovers)
  brownDark:  riestra.greenDeep,
  brownLight: riestra.greenBright,
  amber:      riestra.white,                // acento principal
  amber2:     'rgba(255,255,255,0.55)',
  amberDark:  '#D9DCDA',
  amberLight: 'rgba(255,255,255,0.28)',
  dorado:     '#c0ab32',
  orange:     '#a36b2c',
  orangeDark: '#7a4e1f',
  orangeLight:'#c08b4a',
  dark:       riestra.black,                // fondo
  dark3:      'rgba(10,11,10,0.62)',        // fondo translúcido (navbar)
  dark2:      '#B9BFBB',
  gray:       riestra.smoke,                // texto secundario
  gray2:      '#C9CCCA',
  bone:       riestra.white,                // texto principal
  boneWarm:   '#E9ECEA',
  rec:        '#E5484D',                    // rojo del indicador REC
  bgRef:      'rgba(255,255,255,0.06)',     // bg de hover en cajas
  accent:     riestra.greenBright,          // scrollbar
  ...riestra,
}

// Colores de la firma del desarrollador (crédito en el footer)
const dev = {
  green: '#2D5A47',
  cream: '#E8D5A3',
}

const theme = extendTheme({
  colors: { brand, dev },
  fonts: {
    heading:   `'Bebas Neue', sans-serif`,
    body:      `'Barlow', sans-serif`,
    mono:      `'Barlow Condensed', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: brand.dark,
        color: 'white',
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { bg: brand.dark },
      '::-webkit-scrollbar-thumb': { bg: brand.accent, borderRadius: '2px' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
