// Piezas compartidas de la Galería: encabezado y visor de fotos.
import { useEffect, useRef } from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const MotionBox = motion(Box)

export function Eyebrow({ children, color = 'brand.gray', ...rest }) {
  return (
    <Text fontFamily="mono" fontSize={{ base: '10px', lg: '11px' }} fontWeight="700"
      letterSpacing="0.26em" textTransform="uppercase" color={color} {...rest}>
      {children}
    </Text>
  )
}

export const pad = (n) => String(n).padStart(2, '0')

// Visor a pantalla completa con flechas, teclado y swipe
export function Lightbox({ photos, index, onClose, onIndex }) {
  const open = index !== null && index !== undefined
  const total = photos.length
  const touch = useRef(0)
  const prev = () => onIndex((index - 1 + total) % total)
  const next = () => onIndex((index + 1) % total)

  useEffect(() => {
    if (!open) return
    const l = window.__lenis
    l?.stop()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => { l?.start(); window.removeEventListener('keydown', onKey) }
  })

  const photo = open ? photos[index] : null
  const arrow = {
    as: 'button', type: 'button', position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    boxSize: { base: '40px', lg: '52px' }, borderRadius: 'full', border: '1px solid', borderColor: 'whiteAlpha.400',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 2,
    bg: 'rgba(0,0,0,0.4)', _hover: { bg: 'brand.white', color: 'brand.dark' }, transition: 'all 0.25s',
  }
  return (
    <AnimatePresence>
      {open && (
        <MotionBox position="fixed" inset={0} zIndex={2000} bg="rgba(5,6,5,0.95)" backdropFilter="blur(10px)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
          display="flex" alignItems="center" justifyContent="center"
          onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (dx > 50) prev(); if (dx < -50) next() }}>
          <AnimatePresence mode="wait">
            <MotionBox key={photo.id} onClick={(e) => e.stopPropagation()} textAlign="center"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}>
              <Image src={photo.src} alt={photo.alt} maxH={{ base: '72vh', lg: '80vh' }} maxW="88vw" objectFit="contain"
                borderRadius="10px" mx="auto" draggable={false} />
              <Flex justify="center" align="center" gap={3} mt={4}>
                <Eyebrow color="brand.greenBright">{photo.category}</Eyebrow>
                <Box w="4px" h="4px" borderRadius="full" bg="whiteAlpha.500" />
                <Text fontFamily="heading" fontSize="xl" lineHeight={1}>{photo.caption}</Text>
              </Flex>
            </MotionBox>
          </AnimatePresence>
          <Box {...arrow} left={{ base: 2, lg: 8 }} aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); prev() }}>
            <Box as={FiChevronLeft} fontSize="22px" />
          </Box>
          <Box {...arrow} right={{ base: 2, lg: 8 }} aria-label="Foto siguiente" onClick={(e) => { e.stopPropagation(); next() }}>
            <Box as={FiChevronRight} fontSize="22px" />
          </Box>
          <Text position="absolute" top={6} left={6} fontFamily="mono" fontSize="xs" letterSpacing="0.2em" color="brand.gray2">
            {pad(index + 1)} / {pad(total)}
          </Text>
          <Box as="button" type="button" position="absolute" top={5} right={5} aria-label="Cerrar" color="white"
            onClick={onClose} _hover={{ transform: 'rotate(90deg)' }} transition="transform 0.3s">
            <Box as={FiX} fontSize="28px" />
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}
