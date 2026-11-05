// ─────────────────────────────────────────────────────────────
// NAVBAR · mínimo y fijo
// Logo a la izquierda; selector de idioma y botón redondo MENÚ a la
// derecha, siempre visibles durante el scroll. El menú se abre con un
// círculo que crece desde el botón y muestra links gigantes (la sección
// activa en blanco); al pasar el mouse, una foto sigue al cursor.
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { playerData } from '../../data/playerData'
import { links, scrollToSection, useActiveSection, useScrollState, useLockScroll, LangSwitch, Logo } from './navShared'
import { useT } from '../../i18n'

// foto que acompaña a cada link del menú
const previewPhotos = [playerData.image, playerData.gallery[2]?.src, playerData.highlight.poster, playerData.gallery[4]?.src, playerData.gallery[10]?.src]

export default function Navbar() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const active = useActiveSection()
  const { scrolled } = useScrollState(60)
  useLockScroll(open)
  const overlay = useRef(null)
  const btn = useRef(null)
  const cursor = useRef(null)
  const bar = useRef(null)

  useEffect(() => { gsap.fromTo(bar.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.6 }) }, [])

  // círculo que crece desde el botón
  useEffect(() => {
    const el = overlay.current
    if (!el) return
    const r = btn.current.getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    const rad = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))
    gsap.killTweensOf(el)
    if (open) {
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(el, { clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(${rad}px at ${cx}px ${cy}px)`, duration: 0.8, ease: 'power3.inOut' })
      gsap.fromTo(el.querySelectorAll('.nc-link'), { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.06, ease: 'expo.out', delay: 0.3 })
      gsap.fromTo(el.querySelectorAll('.nc-foot'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.6 })
    } else {
      gsap.to(el, { clipPath: `circle(0px at ${cx}px ${cy}px)`, duration: 0.6, ease: 'power3.inOut', onComplete: () => gsap.set(el, { display: 'none' }) })
    }
  }, [open])

  const onMove = (e) => {
    if (!cursor.current) return
    gsap.to(cursor.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out' })
  }
  const go = (e, href) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToSection(href), 450) }
  const me = playerData.contact.people[0]
  const ig = playerData.socialMedia.find((s) => s.label === 'Instagram')

  return (
    <>
      <Flex ref={bar} as="nav" position="fixed" top={0} left={0} right={0} zIndex={1001} align="center" justify="space-between"
        px={{ base: 4, md: 8, lg: 10 }} pt={{ base: 4, lg: 5 }} pb={3} pointerEvents="none" style={{ opacity: 0 }}
        bg={scrolled && !open ? 'linear-gradient(to bottom, rgba(10,11,10,0.85), transparent)' : 'transparent'} transition="background 0.4s">
        <Box pointerEvents="auto"><Logo onClick={(e) => go(e, '#hero')} size={{ base: '2xl', lg: '3xl' }} /></Box>

        <Flex pointerEvents="auto" align="center" gap={3}>
          <LangSwitch bg="rgba(10,11,10,0.6)" backdropFilter="blur(10px)" />
          <Flex ref={btn} as="button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? t('Cerrar menú') : t('Abrir menú')}
            align="center" gap={3} h="44px" pl={4} pr="4px" borderRadius="full" role="group"
            bg={open ? 'brand.dark' : 'brand.white'} color={open ? 'white' : 'brand.dark'} transition="all 0.4s"
            border="1px solid" borderColor={open ? 'whiteAlpha.400' : 'brand.white'}>
            <Text fontFamily="mono" fontSize="11px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase">{open ? t('Cerrar') : t('Menú')}</Text>
            <Flex boxSize="36px" borderRadius="full" bg={open ? 'brand.white' : 'brand.dark'} align="center" justify="center"
              direction="column" gap="4px" transition="all 0.4s" _groupHover={{ transform: 'rotate(90deg)' }}>
              {[0, 1].map((i) => (
                <Box key={i} w="14px" h="1.5px" bg={open ? 'brand.dark' : 'white'} transition="all 0.35s"
                  transform={open ? (i ? 'translateY(-2.75px) rotate(-45deg)' : 'translateY(2.75px) rotate(45deg)') : 'none'} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* Menú a pantalla completa */}
      <Flex ref={overlay} position="fixed" inset={0} zIndex={1000} bg="#060706" display="none" direction="column"
        justify="space-between" px={{ base: 5, md: 10, lg: 16 }} pt={{ base: 24, lg: 28 }} pb={{ base: 6, lg: 10 }}
        onMouseMove={onMove} style={{ clipPath: 'circle(0px at 100% 0%)' }}>
        {/* foto que sigue al cursor */}
        <Box ref={cursor} position="fixed" top={0} left={0} w="260px" h="340px" ml="-130px" mt="-170px" pointerEvents="none"
          borderRadius="12px" overflow="hidden" zIndex={0} display={{ base: 'none', lg: 'block' }}
          opacity={hover === null ? 0 : 1} transform="scale(1)" transition="opacity 0.3s">
          {previewPhotos.map((src, i) => src && (
            <Image key={i} src={src} alt="" position="absolute" inset={0} w="100%" h="100%" objectFit="cover"
              opacity={hover === i ? 1 : 0} transition="opacity 0.35s" />
          ))}
        </Box>

        <Box position="relative" zIndex={1}>
          {links.map((l, i) => {
            const on = active === l.href
            return (
              <Box key={l.href} overflow="hidden">
                <Flex className="nc-link" as="a" href={l.href} onClick={(e) => go(e, l.href)} align="baseline" gap={{ base: 3, lg: 6 }}
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} role="group" w="fit-content">
                  <Text fontFamily="mono" fontSize={{ base: '11px', lg: 'sm' }} color={on ? 'brand.greenBright' : 'brand.gray'}>
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Text fontFamily="heading" fontSize={{ base: '16vw', md: '11vw', lg: '8.5vw' }} lineHeight={0.92}
                    color={on ? 'white' : 'transparent'} transition="all 0.35s"
                    sx={on ? {} : { WebkitTextStroke: { base: '1px rgba(255,255,255,0.75)', lg: '1.5px rgba(255,255,255,0.75)' } }}
                    _groupHover={{ color: 'white', transform: 'translateX(14px)' }}>
                    {t(l.label)}
                  </Text>
                </Flex>
              </Box>
            )
          })}
        </Box>

        <Flex className="nc-foot" position="relative" zIndex={1} justify="space-between" align={{ base: 'flex-start', md: 'flex-end' }}
          direction={{ base: 'column', md: 'row' }} gap={4} borderTop="1px solid" borderColor="whiteAlpha.200" pt={5}>
          <Box>
            <Text fontFamily="heading" fontSize="2xl" lineHeight={1}>{playerData.displayName}</Text>
            <Text fontFamily="mono" fontSize="10px" letterSpacing="0.2em" textTransform="uppercase" color="brand.gray">
              {t('Arquero')} · #1 · {playerData.currentClub}
            </Text>
          </Box>
          <Flex gap={3} align="center">
            <Flex as="a" href={`https://wa.me/${me.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              boxSize="44px" borderRadius="full" border="1px solid" borderColor="whiteAlpha.400" align="center" justify="center"
              _hover={{ bg: 'brand.white', color: 'brand.dark' }} transition="all 0.3s"><Box as={FaWhatsapp} /></Flex>
            <Flex as="a" href={`mailto:${me.email}`} aria-label="Email" boxSize="44px" borderRadius="full" border="1px solid"
              borderColor="whiteAlpha.400" align="center" justify="center" _hover={{ bg: 'brand.white', color: 'brand.dark' }}
              transition="all 0.3s"><Box as={FaEnvelope} /></Flex>
            {ig?.url && (
              <Flex as="a" href={ig.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" boxSize="44px"
                borderRadius="full" border="1px solid" borderColor="whiteAlpha.400" align="center" justify="center"
                _hover={{ bg: 'brand.white', color: 'brand.dark' }} transition="all 0.3s"><Box as={FaInstagram} /></Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
