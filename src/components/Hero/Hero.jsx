import { useRef, useEffect } from 'react'
import { Box, Text, Flex, Image, HStack, Grid } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MatchBox from './MatchBox'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'

gsap.registerPlugin(ScrollTrigger)

function scrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -20 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

const Chars = ({ text }) =>
  text.split('').map((ch, i) => (
    <Box as="span" key={i} className="hc-char" display="inline-block" whiteSpace="pre">
      {ch}
    </Box>
  ))

// Intensidad de las fotos de fondo [patada, agachado]
const BG_OPACITY = [0.42, 0.34]

const stats = [
  { label: 'Altura',    value: 1.85, decimals: 2, suffix: ' m' },
  { label: 'Peso',      value: 77,   decimals: 0, suffix: ' kg' },
  { label: 'Edad',      value: 18,   decimals: 0, suffix: '' },
  { label: 'Pie hábil', text: 'Zurdo' },
]

export default function Hero() {
  const outerRef = useRef(null)
  const stageRef = useRef(null)
  const { matches } = useMatches()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(stageRef)

      if (reduce) {
        gsap.set(q('.hc-curtain'), { display: 'none' })
        gsap.set(q('.hc-number, .hc-meta, .hc-char, .hc-stat, .hc-badge, .hc-cta, .hc-match'), { opacity: 1 })
        gsap.set(q('.hc-bg-0'), { opacity: BG_OPACITY[0] })
        gsap.set(q('.hc-bg-1'), { opacity: BG_OPACITY[1] })
        gsap.set(q('.hc-photo'), { clipPath: 'inset(0% 0% 0% 0%)' })
        q('.hc-count').forEach((el) => {
          el.textContent = Number(el.dataset.value).toFixed(+el.dataset.decimals) + el.dataset.suffix
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl
        // Telón: línea verde que cruza y se abre
        .fromTo(q('.hc-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' })
        .to(q('.hc-curtain-top'), { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, '+=0.05')
        .to(q('.hc-curtain-bottom'), { yPercent: 100, duration: 1.1, ease: 'power4.inOut' }, '<')
        .to(q('.hc-line'), { opacity: 0, duration: 0.3 }, '<0.2')
        // Número gigante
        .fromTo(q('.hc-number'), { scale: 1.5, opacity: 0, filter: 'blur(20px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.6 }, '<0.2')
        // Fotos de fondo
        .fromTo(q('.hc-bg'), { opacity: 0, x: (i) => (i ? 90 : -90) },
          { opacity: (i) => BG_OPACITY[i], x: 0, duration: 1.8, stagger: 0.12 }, '<0.1')
        // Foto principal
        .fromTo(q('.hc-photo'), { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'power3.out' }, '<0.15')
        // Club + eyebrow
        .fromTo(q('.hc-meta'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, '<0.3')
        // Letras del nombre
        .fromTo(q('.hc-char'), { yPercent: 115, rotateX: -80, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.1, stagger: 0.03 }, '<0.1')
        // Datos + contadores
        .fromTo(q('.hc-stat'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.07 }, '<0.45')
        .add(() => {
          q('.hc-count').forEach((el) => {
            const obj = { v: 0 }
            const dec = +el.dataset.decimals
            gsap.to(obj, {
              v: +el.dataset.value, duration: 1.4, ease: 'power2.out',
              onUpdate: () => { el.textContent = obj.v.toFixed(dec) + el.dataset.suffix },
            })
          })
        }, '<')
        .fromTo(q('.hc-badge'), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' }, '<0.3')
        .fromTo(q('.hc-cta'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '<0.15')
        // Panel de resultados
        .fromTo(q('.hc-match'), { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '<0.1')

      // Parallax con scroll mientras el hero queda sticky
      const st = { trigger: outerRef.current, start: 'top top', end: '+=90vh', scrub: 1 }
      gsap.to(q('.hc-bg-0'), { yPercent: -18, ease: 'none', scrollTrigger: st })
      gsap.to(q('.hc-bg-1'), { yPercent: -32, ease: 'none', scrollTrigger: st })
      gsap.to(q('.hc-number-wrap'), { yPercent: -25, ease: 'none', scrollTrigger: st })
      gsap.to(q('.hc-photo-wrap'), { scale: 1.06, yPercent: -4, ease: 'none', scrollTrigger: st })
      gsap.to(q('.hc-content'), { y: -70, opacity: 0.15, ease: 'none', scrollTrigger: st })
      gsap.fromTo(q('.hc-vignette'), { opacity: 0 }, { opacity: 0.85, ease: 'none', scrollTrigger: st })
    }, stageRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={outerRef} h="200vh" position="relative" zIndex={1} id="hero">
      <Box
        ref={stageRef}
        position="sticky" top={0} h="100vh" overflow="hidden" bg="brand.dark"
        sx={{
          // En mobile el fundido inferior es más corto para no apagar los CTAs
          maskImage: { base: 'linear-gradient(black 96%, transparent)', lg: 'linear-gradient(black 90%, transparent)' },
          WebkitMaskImage: { base: 'linear-gradient(black 96%, transparent)', lg: 'linear-gradient(black 90%, transparent)' },
          '@supports (height: 100dvh)': { height: '100dvh' },
          perspective: '800px',
        }}
      >
      
        {/* Fotos de fondo (B/N difuminadas) */}
        <Image className="hc-bg hc-bg-0" src={playerData.heroBg1} alt="" aria-hidden draggable={false}
          position="absolute" zIndex={1} objectFit="contain" opacity={0}
          left={{ base: '-28%', md: '-8%', lg: '2%' }} top={{ base: '9%', lg: '10%' }} h={{ base: '30vh', md: '40vh', lg: '56vh' }}
          filter="grayscale(1) contrast(1.2) brightness(0.9) blur(0.5px)" />
        <Image className="hc-bg hc-bg-1" src={playerData.heroBg} alt="" aria-hidden draggable={false}
          position="absolute" zIndex={1} objectFit="contain" opacity={0}
          right={{ base: '-34%', md: '-10%', lg: '4%' }} bottom={{ base: '46%', md: '42%', lg: '-6%' }} h={{ base: '28vh', md: '38vh', lg: '68vh' }}
          filter="grayscale(1) contrast(1.2) brightness(0.9) blur(1px)" />

        {/* Composición centrada: foto + número | ficha */}
        <Flex position="absolute" inset={0} justify="center" zIndex={3}>
          <Flex w={{ base: '100%', lg: 'auto' }} h="100%"
            align={{ lg: 'stretch' }} >

            {/* IZQUIERDA — número + foto principal */}
            <Box position={{ base: 'absolute', lg: 'relative' }} inset={{ base: 0, lg: 'auto' }}
              w={{ lg: 'min(36vw, 500px)' }} flexShrink={0} h="100%" pointerEvents="none">
              <Box position="absolute" zIndex={0}
                left={{ base: '50%', lg: '45%' }} top={{ base: '9%', lg: '10%' }}
                transform={{ base: 'translateX(-20%)', lg: 'translateX(-88%)' }}>
                <Box className="hc-number-wrap">
                  <Text className="hc-number" fontFamily="heading" lineHeight={0.8} color="transparent" opacity={0}
                    fontSize={{ base: '44vh', md: '52vh', lg: '90vh' }}
                    sx={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.43)' }}>
                    {playerData.number}
                  </Text>
                </Box>
              </Box>
              <Box position="absolute" zIndex={1}
                left="50%" bottom={{ base: '38%', md: '36%', lg: 0 }}
                h={{ base: 'min(54vh, 150vw)', md: '58vh', lg: '94vh' }}
                transform={{ base: 'translateX(-62%)', md: 'translateX(-70%)', lg: 'translateX(-50%)' }}>
                <Box className="hc-photo-wrap" h="100%" transformOrigin="bottom center">
                  <Image className="hc-photo"
                    src={playerData.image}
                    alt={`${playerData.displayName}, ${playerData.position.toLowerCase()} de ${playerData.currentClub}`}
                    h="100%" w="auto" maxW="none" objectFit="contain" draggable={false}
                    filter="drop-shadow(0 40px 50px rgba(0,0,0,0.65))"
                    style={{ clipPath: 'inset(100% 0% 0% 0%)' }} />
                </Box>
              </Box>
            </Box>

            {/* Degradé inferior para legibilidad en mobile */}
            <Box position="absolute" left={0} right={0} bottom={0} h="58%" zIndex={1} pointerEvents="none"
              display={{ base: 'block', lg: 'none' }}
              bg="linear-gradient(to top, #0A0B0A 58%, rgba(10,11,10,0.8) 78%, transparent)" />

            {/* DERECHA — ficha */}
            <Flex position={{ base: 'absolute', lg: 'relative' }} zIndex={2}
              left={{ base: 'max(20px, 5%)', md: '8%', lg: 'auto' }} right={{ base: 'max(20px, 5%)', md: 'auto', lg: 'auto' }}
              bottom={{ base: 'max(28px, 5.5vh)', md: '7vh', lg: 'auto' }} maxW={{ md: '560px', lg: 'none' }}
              flex={{ lg: '0 0 auto' }} align="center" minW={0}>
              <Flex className="hc-content" direction="column" gap={{ base: 'clamp(10px, 1.6vh, 16px)', lg: 5 }} w="100%">

                <HStack className="hc-meta" spacing={3} opacity={0}>
                  <Image src={playerData.logoCurrentClub} alt="Escudo Deportivo Riestra" h={{ base: '32px', lg: '50px' }} />
                  <Box>
                    <Text fontFamily="heading" fontSize={{ base: 'lg', lg: '2xl' }} letterSpacing="wider" lineHeight={1}>
                      {playerData.currentClub}
                    </Text>
                    <Text fontFamily="mono" fontSize={{ base: '10px', lg: 'xs' }} color="brand.gray"
                      letterSpacing="widest" textTransform="uppercase">
                      {playerData.currentDivision}
                    </Text>
                  </Box>
                </HStack>

                <Box>
                  <HStack className="hc-meta" spacing={3} opacity={0} mb={{ base: 1, lg: 2 }}>
                    
                    <Text fontFamily="mono" fontWeight="700" fontSize={{ base: 'xs', lg: 'sm' }} color="brand.green"
                      letterSpacing="widest" textTransform="uppercase">
                      {playerData.position} · Clase {playerData.category}
                    </Text>
                  </HStack>
                  <Box as="h1" fontFamily="heading" lineHeight={0.86} fontSize={{ base: 'min(21vw, 11vh)', md: '14vw', lg: 'min(9vw, 140px)' }}
                    sx={{ transformStyle: 'preserve-3d' }}>
                    <Box display="block" overflow="hidden" pt="0.12em" mt="-0.12em" color="brand.white">
                      <Chars text={playerData.name} />
                    </Box>
                    <Box display="block" overflow="hidden" pt="0.12em" mt="-0.12em" color="transparent"
                      sx={{ WebkitTextStroke: { base: '1.5px #fff', lg: '2px #fff' } }}>
                      <Chars text={playerData.fullName} />
                    </Box>
                  </Box>
                </Box>

                {/* Datos clave */}
                <Grid templateColumns={{ base: 'repeat(4, minmax(0, 1fr))', md: 'repeat(4, auto)' }} gap={{ base: 2, md: 6, lg: 8 }} justifyContent="start">
                  {stats.map((s) => (
                    <Box key={s.label} className="hc-stat" opacity={0} borderLeft="1px solid" borderColor="whiteAlpha.300" pl={{ base: 2, lg: 3 }}>
                      <Text fontFamily="mono" fontSize={{ base: '9px', lg: '10px' }} color="brand.gray"
                        letterSpacing="widest" textTransform="uppercase">{s.label}</Text>
                      <Text fontFamily="heading" fontSize={{ base: 'clamp(20px, 6.4vw, 26px)', md: '3xl', lg: '4xl' }} lineHeight={1} whiteSpace="nowrap"
                        sx={{ fontVariantNumeric: 'tabular-nums' }}>
                        {s.text ?? (
                          <span className="hc-count" data-value={s.value} data-decimals={s.decimals} data-suffix={s.suffix}>
                            {(0).toFixed(s.decimals) + s.suffix}
                          </span>
                        )}
                      </Text>
                    </Box>
                  ))}
                </Grid>

                {/* Pasaporte comunitario */}
                <HStack className="hc-badge" opacity={0} alignSelf="flex-start" spacing={3}
                  border="1px solid" borderColor="whiteAlpha.500" borderRadius="full"
                  bg="whiteAlpha.50" backdropFilter="blur(8px)"
                  px={{ base: 3, lg: 4 }} py={{ base: 1.5, lg: 2 }}>
                  <HStack spacing={1}>
                    <Image src={playerData.nationalityFlag} alt="Argentina" w="20px" />
                    <Image src={playerData.secondNationalityFlag} alt="Polonia" w="20px" />
                  </HStack>
                  <Text fontFamily="mono" fontWeight="700" fontSize={{ base: '10px', lg: 'xs' }}
                    letterSpacing="widest" textTransform="uppercase">
                    Argentino - Polaco <Box as="span" color="brand.greenBright">· UE</Box>
                  </Text>
                </HStack>

                {/* CTAs */}
                <Grid templateColumns={{ base: '1fr 1fr', md: 'auto auto' }} gap={3} justifyContent="start" pt={{ base: 0.5, lg: 2 }}>
                  <Box as="button" type="button" className="hc-cta" opacity={0} onClick={() => scrollTo('#videos')}
                    bg="brand.white" color="brand.black" fontFamily="mono" fontWeight="700" fontSize={{ base: 'xs', lg: 'sm' }}
                    letterSpacing="widest" textTransform="uppercase" px={{ base: 4, lg: 7 }} py={{ base: 3, lg: 3.5 }} textAlign="center"
                    borderRadius="10px" transition="transform 0.2s, background 0.2s, color 0.2s"
                    _hover={{ bg: 'brand.greenBright', transform: 'translateY(-2px)' }} _active={{ transform: 'scale(0.97)' }}
                    _focusVisible={{ outline: '2px solid', outlineColor: 'brand.greenBright', outlineOffset: '3px' }}>
                    Ver videos
                  </Box>
                  <Box as="button" type="button" className="hc-cta" opacity={0} onClick={() => scrollTo('#contact')}
                    border="1px solid" borderColor="whiteAlpha.500" fontFamily="mono" fontWeight="700" fontSize={{ base: 'xs', lg: 'sm' }}
                    letterSpacing="widest" textTransform="uppercase" px={{ base: 4, lg: 7 }} py={{ base: 3, lg: 3.5 }} textAlign="center"
                    borderRadius="10px" transition="border-color 0.2s, transform 0.2s"
                    _hover={{ borderColor: 'brand.greenBright', transform: 'translateY(-2px)' }}
                    _active={{ transform: 'scale(0.97)' }}
                    _focusVisible={{ outline: '2px solid', outlineColor: 'brand.greenBright', outlineOffset: '3px' }}>
                    Contacto
                  </Box>
                </Grid>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Panel colapsado de resultados (último / próximo partido) */}
        <Box className="hc-match" opacity={0} position="absolute" right={0} zIndex={12}
          top={{ base: '15%', lg: '22%' }}
          sx={{
            '@media (max-width: 991px)': { '& > div > button': { minHeight: '180px', py: 4, px: 2.5 } },
            '@media (max-width: 991px) and (max-height: 700px)': { top: '12%', '& > div > button': { minHeight: '140px', py: 3, gap: 2 } },
          }}>
          <MatchBox last={matches.last} next={matches.next} variant="card" />
        </Box>

        {/* Viñeta fija (desktop) + oscurecido con scroll */}
        <Box position="absolute" inset={0} zIndex={11} pointerEvents="none" display={{ base: 'none', lg: 'block' }}
          background="radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.45) 100%)" />
        <Box className="hc-vignette" position="absolute" inset={0} zIndex={20} pointerEvents="none" opacity={0}
          background="radial-gradient(ellipse at center, rgba(0,0,0,0.35) 20%, rgba(0,0,0,0.8) 100%)" />

        {/* Telón de intro */}
        <Box className="hc-curtain hc-curtain-top" position="absolute" left={0} right={0} top={0} h="50.5%" bg="brand.black" zIndex={40} />
        <Box className="hc-curtain hc-curtain-bottom" position="absolute" left={0} right={0} bottom={0} h="50.5%" bg="brand.black" zIndex={40} />
        <Box className="hc-curtain hc-line" position="absolute" left={0} right={0} top="50%" h="2px" bg="brand.greenBright"
          zIndex={41} transformOrigin="left center" transform="scaleX(0)" />
      </Box>
    </Box>
  )
}
