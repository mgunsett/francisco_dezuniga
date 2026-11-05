// Piezas compartidas del Navbar: links, scroll suave, sección activa,
// progreso de scroll y selector de idioma (visual hasta la traducción).
import { useEffect, useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

export const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Estadísticas', href: '#estadisticas' },
  { label: 'Highlights', href: '#videos' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contact' },
]

export function scrollToSection(href) {
  const t = document.querySelector(href)
  if (!t) return
  if (window.__lenis) window.__lenis.scrollTo(t, { offset: href === '#hero' ? 0 : -20 })
  else t.scrollIntoView({ behavior: 'smooth' })
}

// Sección visible ahora (la última cuyo tope pasó el 40% de la pantalla)
export function useActiveSection() {
  const [active, setActive] = useState('#hero')
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const y = window.innerHeight * 0.4
      let cur = '#hero'
      for (const l of links) {
        const el = document.querySelector(l.href)
        if (el && el.getBoundingClientRect().top <= y) cur = l.href
      }
      // al final de la página, siempre Contacto
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = '#contact'
      setActive(cur)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(check) }
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    check()
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return active
}

// Estado del scroll: pasó el umbral, dirección y progreso total (0–1)
export function useScrollState(threshold = 80) {
  const [s, setS] = useState({ scrolled: false, down: false, progress: 0 })
  useEffect(() => {
    let last = window.scrollY
    const on = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setS({ scrolled: y > threshold, down: y > last && y > 300, progress: max > 0 ? y / max : 0 })
      last = y
    }
    window.addEventListener('scroll', on, { passive: true })
    on()
    return () => window.removeEventListener('scroll', on)
  }, [threshold])
  return s
}

// Bloquea el scroll mientras el menú mobile está abierto
export function useLockScroll(locked) {
  useEffect(() => {
    const l = window.__lenis
    if (locked) l?.stop(); else l?.start()
    return () => l?.start()
  }, [locked])
}

// Selector de idioma (solo visual por ahora: se activa con la traducción)
export function LangSwitch({ size = 'sm', ...rest }) {
  const [lang, setLang] = useState('ES')
  return (
    <Flex border="1px solid" borderColor="whiteAlpha.300" borderRadius="full" p="2px" gap="2px" {...rest}
      role="group" aria-label="Idioma">
      {['ES', 'EN'].map((l) => (
        <Box key={l} as="button" type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
          px={size === 'sm' ? 2 : 3} h={size === 'sm' ? '22px' : '30px'} borderRadius="full"
          bg={lang === l ? 'brand.white' : 'transparent'} color={lang === l ? 'brand.dark' : 'whiteAlpha.700'}
          transition="all 0.25s" _hover={{ color: lang === l ? 'brand.dark' : 'white' }}>
          <Text fontFamily="mono" fontSize={size === 'sm' ? '9px' : '11px'} fontWeight="700" letterSpacing="0.14em">{l}</Text>
        </Box>
      ))}
    </Flex>
  )
}

export function Logo({ onClick, size = '2xl' }) {
  return (
    <Text as="a" href="#hero" onClick={onClick} fontFamily="heading" fontSize={size} letterSpacing="wider" lineHeight={1}
      color="brand.white" _hover={{ color: 'brand.gray2' }} transition="color 0.2s">
      FZ<Box as="span" color="brand.greenBright">_</Box>
    </Text>
  )
}

export function Burger({ open, onClick, ...rest }) {
  return (
    <Flex as="button" type="button" onClick={onClick} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}
      direction="column" justify="center" align="center" gap="5px" boxSize="40px" {...rest}>
      {[0, 1, 2].map((i) => (
        <Box key={i} w="22px" h="1.5px" bg="white" transition="all 0.3s cubic-bezier(0.22,1,0.36,1)"
          transform={open ? (i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)') : 'none'} />
      ))}
    </Flex>
  )
}
