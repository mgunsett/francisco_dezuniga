// ─────────────────────────────────────────────────────────────
// HIGHLIGHTS · Video principal (portada + adelanto al hover) + reels
// Estructura del template: encabezado, video principal enmarcado y
// las 3 tarjetas de Instagram en fila (slider en mobile).
// Animación SUTIL: reveal con GSAP + número fantasma con parallax.
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaInstagram } from 'react-icons/fa'
import { playerData } from '../../data/playerData'
import { Eyebrow, HighlightPlayer, ReelCard, ReelModal, ReelSlider, usePlayer, reduceMotion } from './videoShared'

gsap.registerPlugin(ScrollTrigger)

export default function VideosSection() {
  const hl = playerData.highlight
  const player = usePlayer()
  const [open, setOpen] = useState(null)
  const root = useRef(null)

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.va-head', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.va-head', start: 'top 85%', once: true } })
      gsap.fromTo('.va-player', { y: 60, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.va-player', start: 'top 85%', once: true } })
      gsap.fromTo('.reel-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.va-reels', start: 'top 85%', once: true } })
      gsap.to('.va-ghost', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <Box as="section" id="videos" ref={root} position="relative" bg="brand.dark" overflow="hidden"
      px={{ base: 5, md: 12, lg: 10 }} pt={{ base: 20, lg: 28 }} pb={{ base: 16, lg: 28 }}>
      <Text className="va-ghost" aria-hidden position="absolute" top="6%" right={{ base: '-8%', md: '2%' }}
        fontFamily="heading" fontSize={{ base: '70vw', md: '42vw' }} lineHeight={0.8} color="transparent"
        sx={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.06)' }} pointerEvents="none">{playerData.number}</Text>

      <Box maxW="1200px" mx="auto" position="relative">
        <Flex className="va-head" justify="space-between" align="flex-end" wrap="wrap" gap={4} mb={{ base: 6, lg: 10 }}>
          <Box>
            <Eyebrow color="brand.bone">Videos</Eyebrow>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '6xl', lg: '8xl' }} lineHeight={0.9}>Highlights</Text>
          </Box>
          <Flex align="center" gap={3}>
            <Box w="22px" h="2px" bg="brand.greenBright" />
            <Eyebrow>{hl.subtitle}</Eyebrow>
          </Flex>
        </Flex>

        <Box className="va-player">
          <HighlightPlayer player={player} />
          <Flex justify="space-between" align="center" mt={4} gap={4} wrap="wrap">
            <Text fontFamily="heading" fontSize={{ base: '2xl', lg: '3xl' }} lineHeight={1}>
              {hl.title} <Box as="span" color="brand.gray">· {hl.duration}</Box>
            </Text>
            <Flex gap={2} wrap="wrap">
              {hl.chapters.filter((c) => c.replay).map((c, i) => (
                <Box key={c.t} as="button" type="button" onClick={() => player.seek(c.t)}
                  fontFamily="mono" fontSize="10px" letterSpacing="0.16em" textTransform="uppercase"
                  border="1px solid" borderColor="whiteAlpha.300" borderRadius="full" px={3} py={1.5}
                  _hover={{ borderColor: 'brand.white' }} transition="border-color 0.3s">
                  <Box as="span" color="brand.greenBright">●</Box> {c.label} {String(i + 1).padStart(2, '0')}
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>

        <Box className="va-reels" mt={{ base: 14, lg: 20 }}>
          <Flex align="center" gap={3} mb={{ base: 5, lg: 7 }}>
            <Box as={FaInstagram} fontSize="18px" />
            <Text fontFamily="heading" fontSize={{ base: '3xl', lg: '4xl' }} lineHeight={1}>En Instagram</Text>
          </Flex>
          <Grid display={{ base: 'none', md: 'grid' }} templateColumns="repeat(3, 1fr)" gap={{ md: 5, lg: 10 }} maxW="1040px" mx="auto">
            {playerData.videos.map((v, i) => <ReelCard key={v.id} video={v} index={i} onOpen={setOpen} />)}
          </Grid>
          <Box display={{ base: 'block', md: 'none' }}><ReelSlider videos={playerData.videos} onOpen={setOpen} /></Box>
        </Box>
      </Box>
      <ReelModal video={open} onClose={() => setOpen(null)} />
    </Box>
  )
}
