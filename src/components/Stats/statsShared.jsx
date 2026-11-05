// Piezas de la sección Estadísticas (encabezado, títulos y Lista de buena fe)
import { useEffect, useRef } from 'react'
import {
  Box, Text, Flex, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton,
} from '@chakra-ui/react'
import useScrubReveal from '../../hooks/useScrubReveal'
import { playerData } from '../../data/playerData'
import { useT } from '../../i18n'

export const overallOf = (stats) =>
  Math.round(stats.reduce((sum, s) => sum + s.value, 0) / stats.length)

export function Eyebrow({ children, color = 'brand.gray', ...rest }) {
  const t = useT()
  return (
    <Text fontFamily="mono" fontSize={{ base: '10px', lg: '11px' }} fontWeight="700"
      letterSpacing="0.26em" textTransform="uppercase" color={color} {...rest}>
      {typeof children === 'string' ? t(children) : children}
    </Text>
  )
}

// Título de bloque con la barrita verde (detalle)
export function BlockTitle({ eyebrow, title, right, ...rest }) {
  const t = useT()
  return (
    <Flex align="flex-end" justify="space-between" gap={4} mb={{ base: 5, lg: 7 }} {...rest}>
      <Box>
        <Flex align="center" gap={3} mb={1}>
          
          <Eyebrow>{eyebrow}</Eyebrow>
        </Flex>
        <Text as="h3" fontFamily="heading" fontSize={{ base: '4xl', lg: '5xl' }} lineHeight={1}>
          {t(title)}
        </Text>
      </Box>
      {right}
    </Flex>
  )
}

// Contenedor de la sección con su encabezado
export function SectionShell({ children }) {
  const t = useT()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  useScrubReveal(sectionRef, {
    elements: [{ ref: titleRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })
  return (
    <Box
      as="section" id="estadisticas" ref={sectionRef} bg="brand.dark"
      pt={{ base: 16, lg: 24 }} pb={{ base: 16, lg: 24 }} px={{ base: 5, lg: 10 }}
      borderTopLeftRadius={{ base: '14px', lg: '22px' }} borderTopRightRadius={{ base: '14px', lg: '22px' }}
      boxShadow="0 -24px 80px rgba(0,0,0,0.65)"
      borderTop="1px solid" borderColor="whiteAlpha.200"
    >
      <Box maxW="1300px" mx="auto">
        <Box ref={titleRef} mb={{ base: 8, lg: 12 }}>
          <Eyebrow color="brand.bone">Perfil</Eyebrow>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '6xl', lg: '8xl' }} lineHeight={0.9}>
            {t('Estadísticas')}
          </Text>
        </Box>
        {children}
      </Box>
    </Box>
  )
}

// ── Lista de buena fe · CONMEBOL Sudamericana ─────────────────
// Recuadro de la línea del jugador expresado en % de la imagen
export function buenaFeBox() {
  const { size, highlight: h } = playerData.buenaFe
  return {
    left: (h.x / size.w) * 100, top: (h.y / size.h) * 100,
    width: (h.w / size.w) * 100, height: (h.h / size.h) * 100,
  }
}

// Imagen completa con el recuadro verde sobre su nombre
export function BuenaFeImage({ markClass, onOpen, hideMark = false, children, ...rest }) {
  const t = useT()
  const { image, title, competition } = playerData.buenaFe
  const b = buenaFeBox()
  return (
    <Box as={onOpen ? 'button' : 'div'} type={onOpen ? 'button' : undefined} onClick={onOpen}
      position="relative" display="block" w="100%" overflow="hidden" borderRadius="10px"
      cursor={onOpen ? 'zoom-in' : 'default'} aria-label={onOpen ? `${t('Ampliar')} ${t(title)} · ${competition}` : undefined}
      {...rest}>
      <Image src={image} alt={`${t(title)} · ${competition} · Deportivo Riestra`} w="100%" display="block" loading="lazy" />
      {!hideMark && <Box className={markClass} position="absolute" pointerEvents="none"
        left={`${b.left}%`} top={`${b.top}%`} w={`${b.width}%`} h={`${b.height}%`}
        border="2px solid" borderColor="brand.greenBright" borderRadius="4px"
        boxShadow="0 0 0 9999px rgba(0,0,0,0.38), 0 0 24px rgba(52,184,110,0.55)" />}
      {children}
    </Box>
  )
}

// Recorte ampliado de su línea, como una lupa
export function BuenaFeLens({ ...rest }) {
  const t = useT()
  const { image, size, highlight: h } = playerData.buenaFe
  const b = buenaFeBox()
  return (
    <Box role="img" aria-label={t('44. Francisco de Zúñiga, en la lista de buena fe')}
      w="100%" sx={{ aspectRatio: `${h.w} / ${h.h}` }}
      bgImage={`url(${image})`} bgRepeat="no-repeat"
      bgSize={`${(size.w / h.w) * 100}% auto`}
      bgPosition={`${(b.left / (100 - b.width)) * 100}% ${(b.top / (100 - b.height)) * 100}%`}
      border="2px solid" borderColor="brand.greenBright" borderRadius="6px" {...rest} />
  )
}

// Visor a pantalla completa
export function BuenaFeLightbox({ isOpen, onClose }) {
  const t = useT()
  const { image, title, competition } = playerData.buenaFe
  useEffect(() => {
    const l = typeof window !== 'undefined' && window.__lenis
    if (!l) return
    if (isOpen) l.stop(); else l.start()
  }, [isOpen])
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="scale">
      <ModalOverlay bg="rgba(0,0,0,0.88)" backdropFilter="blur(6px)" />
      <ModalContent bg="transparent" boxShadow="none" m={0} onClick={onClose}
        display="flex" alignItems="center" justifyContent="center" p={{ base: 4, lg: 8 }}>
        <ModalCloseButton color="brand.white" size="lg" top={4} right={4} />
        {/* ancho atado al alto para que la imagen (4:5) entre siempre completa */}
        <Box onClick={(e) => e.stopPropagation()} w="min(92vw, 66vh, 720px)">
          <BuenaFeImage />
          <Text fontFamily="mono" fontSize="xs" color="brand.gray2" textAlign="center" mt={3}
            letterSpacing="0.2em" textTransform="uppercase">
            {t(title)} · {competition}
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  )
}
