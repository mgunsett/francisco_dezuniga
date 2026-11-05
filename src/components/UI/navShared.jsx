// Piezas compartidas del Navbar: links, scroll suave, sección activa,
// progreso de scroll y selector de idioma.
import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi'
import { LANGS, useI18n } from '../../i18n'

const MotionBox = motion(Box)

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

// Selector de idioma: ES (predeterminado) / EN / IT / FR
export function LangSwitch({ size = 'sm', ...rest }) {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const cur = LANGS.find((l) => l.code === lang) || LANGS[0]
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onDoc); window.removeEventListener('keydown', onKey) }
  }, [open])
  const h = size === 'sm' ? '34px' : '40px'
  return (
    <Box ref={ref} position="relative" {...rest}>
      <Flex as="button" type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}
        aria-label={`Idioma: ${cur.label}`} align="center" gap={1.5} h={h} pl={3} pr={2.5} borderRadius="full"
        border="1px solid" borderColor={open ? 'brand.white' : 'whiteAlpha.400'} bg="rgba(10,11,10,0.6)" backdropFilter="blur(10px)"
        color="white" transition="border-color 0.25s" _hover={{ borderColor: 'brand.white' }}>
        <Box as={FiGlobe} fontSize="13px" opacity={0.8} />
        <Text fontFamily="mono" fontSize="11px" fontWeight="700" letterSpacing="0.14em">{cur.short}</Text>
        <Box as={FiChevronDown} fontSize="13px" transition="transform 0.3s" transform={open ? 'rotate(180deg)' : 'none'} />
      </Flex>
      <AnimatePresence>
        {open && (
          <MotionBox role="listbox" aria-label="Idioma" position="absolute" top={`calc(${h} + 8px)`} right={0} minW="168px" zIndex={1100}
            bg="rgba(10,11,10,0.96)" backdropFilter="blur(14px)" border="1px solid" borderColor="whiteAlpha.300" borderRadius="14px"
            p={1.5} boxShadow="0 18px 50px rgba(0,0,0,0.6)"
            initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: 'top right' }}>
            {LANGS.map((l) => {
              const on = l.code === lang
              return (
                <Flex key={l.code} as="button" type="button" role="option" aria-selected={on} lang={l.code}
                  onClick={() => { setLang(l.code); setOpen(false) }} w="100%" align="center" gap={3} px={3} py={2.5}
                  borderRadius="10px" bg={on ? 'whiteAlpha.100' : 'transparent'} _hover={{ bg: 'whiteAlpha.100' }} transition="background 0.2s">
                  <Text fontFamily="mono" fontSize="11px" fontWeight="700" letterSpacing="0.14em" w="22px" textAlign="left"
                    color={on ? 'brand.greenBright' : 'brand.gray'}>{l.short}</Text>
                  <Text fontFamily="heading" fontSize="lg" lineHeight={1} flex={1} textAlign="left">{l.label}</Text>
                  {on && <Box as={FiCheck} fontSize="14px" color="brand.greenBright" />}
                </Flex>
              )
            })}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
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
