// Piezas de la sección Highlights: reproductor con portada y adelanto,
// tarjeta de reel de Instagram, visor del reel y slider mobile.
import { useEffect, useRef, useState, useCallback } from 'react'
import { Box, Flex, Text, AspectRatio } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlay, FiPause, FiMaximize, FiX } from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa'
import { playerData } from '../../data/playerData'

const MotionBox = motion(Box)
export const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Eyebrow({ children, color = 'brand.gray', ...rest }) {
  return (
    <Text fontFamily="mono" fontSize={{ base: '10px', lg: '11px' }} fontWeight="700"
      letterSpacing="0.26em" textTransform="uppercase" color={color} {...rest}>
      {children}
    </Text>
  )
}

// ── Estado del reproductor ─────────────────────────────────────
// mode: 'cover' (portada) · 'preview' (adelanto al hover) · 'full' (reproducción)
export function usePlayer() {
  const ref = useRef(null)
  const [mode, setMode] = useState('cover')
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const modeRef = useRef('cover')
  const setM = (m) => { modeRef.current = m; setMode(m) }
  const pv = playerData.highlight.preview

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const on = {
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      timeupdate: () => {
        // el adelanto se repite en bucle dentro de su tramo
        if (modeRef.current === 'preview' && v.currentTime >= pv.end) v.currentTime = pv.start
        if (modeRef.current === 'full') setTime(v.currentTime)
      },
      loadedmetadata: () => setDuration(v.duration),
      durationchange: () => setDuration(v.duration),
      ended: () => { setPlaying(false); setM('cover'); setTime(0) },
    }
    Object.entries(on).forEach(([k, f]) => v.addEventListener(k, f))
    if (v.readyState >= 1) setDuration(v.duration)
    return () => Object.entries(on).forEach(([k, f]) => v.removeEventListener(k, f))
  }, [pv.start, pv.end])

  const startPreview = useCallback(() => {
    const v = ref.current
    if (!v || modeRef.current !== 'cover') return
    setM('preview')
    v.currentTime = pv.start
    v.play().catch(() => {})
  }, [pv.start])
  const stopPreview = useCallback(() => {
    const v = ref.current
    if (!v || modeRef.current !== 'preview') return
    v.pause()
    setM('cover')
  }, [])
  const playFull = useCallback((from = 0) => {
    const v = ref.current
    if (!v) return
    setM('full')
    v.currentTime = from
    setTime(from)
    v.play().catch(() => {})
  }, [])
  const toggle = useCallback(() => {
    const v = ref.current
    if (!v) return
    if (modeRef.current !== 'full') return playFull(0)
    if (v.paused) v.play().catch(() => {}); else v.pause()
  }, [playFull])
  const seek = useCallback((t) => {
    const v = ref.current
    if (!v) return
    if (modeRef.current !== 'full') return playFull(t)
    v.currentTime = t
    v.play().catch(() => {})
  }, [playFull])
  const fullscreen = useCallback(() => {
    const v = ref.current
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen()
  }, [])
  return { ref, mode, playing, time, duration, toggle, seek, fullscreen, startPreview, stopPreview, playFull }
}

// Portada del video: foto del jugador, título y botón de play.
// Se desvanece al pasar el mouse para dejar ver el adelanto.
function Cover({ visible, previewing, onPlay }) {
  const hl = playerData.highlight
  return (
    <Box position="absolute" inset={0} zIndex={2} cursor="pointer" onClick={onPlay}
      opacity={visible ? 1 : 0} pointerEvents={visible || previewing ? 'auto' : 'none'}
      transition="opacity 0.6s cubic-bezier(0.22,1,0.36,1)">
      <Box position="absolute" inset={0} bgImage={`url(${hl.poster})`} bgSize="cover" bgPosition="center"
        filter="grayscale(0.35) brightness(0.55) blur(2px)" transform="scale(1.04)" />
      <Box position="absolute" inset={0}
        bg="linear-gradient(90deg, rgba(10,11,10,0.95) 0%, rgba(10,11,10,0.75) 45%, rgba(10,11,10,0.15) 100%)" />
      <Box position="absolute" right="-6%" bottom="-10%" w="70%" h="100%"
        bg="radial-gradient(closest-side, rgba(52,184,110,0.30), transparent)" />
      <Box as="img" src={playerData.statsImage} alt="" position="absolute" bottom={0} right={{ base: '2%', md: '6%' }}
        h={{ base: '96%', md: '104%' }} w="auto" maxW="none" draggable={false} pointerEvents="none"
        sx={{ maskImage: 'linear-gradient(to bottom, black 78%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent)' }} />

      <Flex position="absolute" inset={0} direction="column" justify="center"
        pl={{ base: 5, md: 10, lg: 16 }} pr="40%" gap={{ base: 1, lg: 2 }}>
        <Flex align="center" gap={3}>
          <Box w={{ base: '16px', lg: '26px' }} h="2px" bg="brand.greenBright" />
          <Eyebrow color="brand.gray2" fontSize={{ base: '8px', md: '10px', lg: '12px' }}>Video · {hl.duration}</Eyebrow>
        </Flex>
        <Text fontFamily="heading" lineHeight={0.85} fontSize={{ base: '42px', sm: '64px', md: '96px', lg: '132px' }}>Highlights</Text>
        <Text fontFamily="heading" lineHeight={0.85} fontSize={{ base: '42px', sm: '64px', md: '96px', lg: '132px' }}
          color="transparent" sx={{ WebkitTextStroke: { base: '1px #fff', lg: '2px #fff' } }}>2026</Text>
        <Flex align="center" gap={{ base: 2, lg: 4 }} mt={{ base: 2, lg: 6 }}>
          <Flex boxSize={{ base: '36px', md: '52px', lg: '64px' }} borderRadius="full" bg="brand.white" color="brand.dark"
            align="center" justify="center" flexShrink={0} boxShadow="0 0 0 8px rgba(255,255,255,0.12)"
            transition="transform 0.35s cubic-bezier(0.22,1,0.36,1)" _groupHover={{ transform: 'scale(1.08)' }}>
            <Box as={FiPlay} fontSize={{ base: '14px', md: '20px', lg: '24px' }} ml="3px" />
          </Flex>
          <Box display={{ base: 'none', sm: 'block' }}>
            <Text fontFamily="heading" fontSize={{ sm: 'lg', lg: '2xl' }} lineHeight={1}>{playerData.displayName}</Text>
            <Eyebrow fontSize={{ base: '8px', lg: '10px' }} mt={1}>Arquero · Deportivo Riestra</Eyebrow>
          </Box>
        </Flex>
      </Flex>
      <Box as="img" src={playerData.logoCurrentClub} alt="" position="absolute" top={{ base: 3, lg: 6 }} right={{ base: 3, lg: 6 }}
        h={{ base: '28px', md: '40px', lg: '52px' }} opacity={0.9} />
    </Box>
  )
}

// ── Reproductor con portada, adelanto al hover y controles propios ──
export function HighlightPlayer({ player, radius = '16px', showChapters = true, ...rest }) {
  const hl = playerData.highlight
  const { ref, mode, playing, time, duration, toggle, seek, fullscreen, startPreview, stopPreview, playFull } = player
  const total = duration || 142
  const barRef = useRef(null)
  const full = mode === 'full'

  const onBar = (e) => {
    const r = barRef.current.getBoundingClientRect()
    seek(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * total)
  }

  return (
    <Box position="relative" overflow="hidden" borderRadius={radius} bg="black" role="group"
      onMouseEnter={startPreview} onMouseLeave={stopPreview}
      boxShadow="0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)" {...rest}>
      <AspectRatio ratio={16 / 9}>
        <Box as="video" ref={ref} src={hl.src} poster={hl.poster} playsInline muted preload="metadata"
          onClick={toggle} cursor="pointer" objectFit="cover" w="100%" h="100%"
          aria-label={`${playerData.displayName} · ${hl.title}`} />
      </AspectRatio>

      <Cover visible={mode === 'cover'} previewing={mode === 'preview'} onPlay={() => playFull(0)} />

      {/* Etiqueta del adelanto */}
      <Flex position="absolute" left={{ base: 3, lg: 6 }} bottom={{ base: 3, lg: 6 }} zIndex={3} align="center" gap={3}
        opacity={mode === 'preview' ? 1 : 0} transform={mode === 'preview' ? 'none' : 'translateY(8px)'}
        transition="all 0.4s ease" pointerEvents="none">
        <Flex align="center" gap={2} bg="rgba(0,0,0,0.6)" backdropFilter="blur(8px)" border="1px solid" borderColor="whiteAlpha.300"
          borderRadius="full" px={3} py={1.5}>
          <Box boxSize="7px" borderRadius="full" bg="brand.greenBright" />
          <Eyebrow color="brand.white" fontSize="10px">Adelanto</Eyebrow>
        </Flex>
        <Eyebrow color="brand.white" fontSize="10px" textShadow="0 1px 8px rgba(0,0,0,0.8)">Click para ver completo</Eyebrow>
      </Flex>

      {/* Barra de controles (solo en reproducción completa) */}
      <Box position="absolute" left={0} right={0} bottom={0} zIndex={3} px={{ base: 3, lg: 5 }} pb={{ base: 2, lg: 4 }} pt={8}
        bg="linear-gradient(to top, rgba(0,0,0,0.75), transparent)"
        display={full ? 'block' : 'none'} opacity={{ base: 1, lg: playing ? 0 : 1 }} _groupHover={{ opacity: 1 }} transition="opacity 0.3s ease">
        <Box ref={barRef} position="relative" h="16px" cursor="pointer" onClick={onBar} role="slider"
          aria-label="Línea de tiempo" aria-valuemin={0} aria-valuemax={Math.round(total)} aria-valuenow={Math.round(time)}>
          <Box position="absolute" left={0} right={0} top="7px" h="3px" bg="whiteAlpha.300" borderRadius="full" />
          <Box position="absolute" left={0} top="7px" h="3px" bg="brand.white" borderRadius="full" w={`${(time / total) * 100}%`} />
          {showChapters && hl.chapters.map((c) => (
            <Box key={c.t} position="absolute" top="5px" h="7px" w="3px" borderRadius="1px" left={`${(c.t / total) * 100}%`}
              bg={c.replay ? 'brand.greenBright' : 'brand.white'} />
          ))}
        </Box>
        <Flex align="center" gap={3} mt={1}>
          <Box as="button" type="button" onClick={toggle} aria-label={playing ? 'Pausa' : 'Reproducir'} color="white" display="flex">
            <Box as={playing ? FiPause : FiPlay} fontSize="16px" />
          </Box>
          <Text fontFamily="mono" fontSize="11px" color="whiteAlpha.800" sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {fmt(time)} / {fmt(total)}
          </Text>
          <Box flex={1} />
          <Box as="button" type="button" onClick={fullscreen} aria-label="Pantalla completa" color="white" display="flex">
            <Box as={FiMaximize} fontSize="15px" />
          </Box>
        </Flex>
      </Box>

      {/* Play central al pausar */}
      <Flex position="absolute" inset={0} zIndex={2} align="center" justify="center" pointerEvents="none"
        opacity={full && !playing ? 1 : 0} transition="opacity 0.3s">
        <Flex as="button" type="button" onClick={toggle} pointerEvents={full && !playing ? 'auto' : 'none'} aria-label="Reproducir"
          boxSize={{ base: '56px', lg: '80px' }} borderRadius="full" bg="brand.white" color="brand.dark" align="center" justify="center">
          <Box as={FiPlay} fontSize={{ base: '22px', lg: '30px' }} ml="4px" />
        </Flex>
      </Flex>
    </Box>
  )
}

// ── Tarjeta de reel (Instagram) ────────────────────────────────
export function ReelCard({ video, index = 0, onOpen, tilt = 0, ...rest }) {
  const ready = Boolean(video.instagramId)
  return (
    <Box className="reel-card" role="group" cursor={ready ? 'pointer' : 'default'} position="relative"
      onClick={() => ready && onOpen?.(video)} transform={`rotate(${tilt}deg)`} {...rest}>
      <AspectRatio ratio={9 / 16}>
        <Box borderRadius="16px" overflow="hidden" bg="#0c0d0d" boxShadow="0 24px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)">
          <Box as="img" src={video.cover} alt="" position="absolute" inset={0} w="100%" h="100%" objectFit="cover"
            objectPosition="center 30%" filter={ready ? 'none' : 'grayscale(0.6) brightness(0.7)'}
            transition="transform 0.7s ease" _groupHover={{ transform: 'scale(1.06)' }} />
          <Box position="absolute" inset={0} bg="linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 35%, rgba(0,0,0,0.85) 100%)" />
          <Flex position="absolute" top={3} left={3} right={3} justify="space-between" align="center">
            <Text fontFamily="mono" fontSize="9px" letterSpacing="0.24em" textTransform="uppercase"
              bg="rgba(0,0,0,0.5)" backdropFilter="blur(6px)" border="1px solid" borderColor="whiteAlpha.400"
              px="8px" py="4px" borderRadius="5px" color="white">{video.category}</Text>
            <Flex boxSize="28px" borderRadius="8px" align="center" justify="center" bg="rgba(0,0,0,0.5)"
              border="1px solid" borderColor="whiteAlpha.400" transition="all 0.3s"
              _groupHover={ready ? { bg: 'brand.white', color: 'brand.dark' } : {}}>
              <Box as={FaInstagram} fontSize="14px" />
            </Flex>
          </Flex>
          {ready && (
            <Flex position="absolute" inset={0} align="center" justify="center">
              <Flex boxSize="56px" borderRadius="full" align="center" justify="center" border="1px solid" borderColor="whiteAlpha.800"
                bg="rgba(0,0,0,0.35)" backdropFilter="blur(8px)" transition="all 0.35s"
                _groupHover={{ bg: 'brand.white', color: 'brand.dark', transform: 'scale(1.08)' }}>
                <Box as={FiPlay} fontSize="20px" ml="3px" />
              </Flex>
            </Flex>
          )}
          <Flex position="absolute" left={4} right={4} bottom={4} align="flex-end" justify="space-between" gap={2}>
            <Box minW={0}>
              <Text fontFamily="mono" fontSize="9px" letterSpacing="0.22em" textTransform="uppercase"
                color={ready ? 'brand.greenBright' : 'brand.gray2'}>{ready ? 'Ver en Instagram' : video.season}</Text>
              <Text fontFamily="heading" fontSize="2xl" lineHeight={1} noOfLines={1}>{video.title}</Text>
            </Box>
            <Text fontFamily="heading" fontSize="3xl" lineHeight={0.8} color="transparent"
              sx={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>{String(index + 1).padStart(2, '0')}</Text>
          </Flex>
        </Box>
      </AspectRatio>
    </Box>
  )
}

// ── Visor del reel ─────────────────────────────────────────────
export function ReelModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return
    const l = window.__lenis
    l?.stop()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { l?.start(); window.removeEventListener('keydown', onKey) }
  }, [video, onClose])
  return (
    <AnimatePresence>
      {video && (
        <MotionBox position="fixed" inset={0} zIndex={2000} bg="rgba(5,6,5,0.94)" backdropFilter="blur(12px)"
          display="flex" alignItems="center" justifyContent="center" p={4}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <Box as="button" type="button" position="absolute" top={5} right={5} aria-label="Cerrar" color="white"
            onClick={onClose} _hover={{ transform: 'rotate(90deg)' }} transition="transform 0.3s">
            <Box as={FiX} fontSize="30px" />
          </Box>
          <MotionBox w="100%" maxW="400px" borderRadius="16px" overflow="hidden" bg="black"
            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()}>
            <AspectRatio ratio={9 / 16}>
              <Box as="iframe" src={`https://www.instagram.com/reel/${video.instagramId}/embed`} title={video.fullTitle}
                border="none" scrolling="no" allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />
            </AspectRatio>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

// Slider horizontal para mobile (las 3 tarjetas)
export function ReelSlider({ videos, onOpen }) {
  return (
    <Flex overflowX="auto" gap={4} mx={-5} px={5} pb={2}
      sx={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
      {videos.map((v, i) => (
        <Box key={v.id} flex="0 0 72%" scrollSnapAlign="center">
          <ReelCard video={v} index={i} onOpen={onOpen} />
        </Box>
      ))}
    </Flex>
  )
}
