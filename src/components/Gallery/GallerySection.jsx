// ─────────────────────────────────────────────────────────────
// GALERÍA · "Mosaico con filtros"
// Grilla tipo masonry con filtros por categoría (Atajadas, Partido,
// Entrenamiento, Previa). Las fotos se reacomodan con animación al
// filtrar y muestran su pie al hover. Animación MEDIA con Framer Motion.
// ─────────────────────────────────────────────────────────────
import { useMemo, useState } from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { FiMaximize2 } from 'react-icons/fi'
import { playerData } from '../../data/playerData'
import { Eyebrow, Lightbox, pad } from './galleryShared'
import { useT } from '../../i18n'

const MotionBox = motion(Box)
const ease = [0.16, 1, 0.3, 1]

export default function GallerySection() {
  const t = useT()
  const all = playerData.gallery
  const cats = useMemo(() => ['Todas', ...Array.from(new Set(all.map((p) => p.category)))], [all])
  const [cat, setCat] = useState('Todas')
  const [open, setOpen] = useState(null)
  const photos = cat === 'Todas' ? all : all.filter((p) => p.category === cat)
  const count = (c) => (c === 'Todas' ? all.length : all.filter((p) => p.category === c).length)

  return (
    <Box as="section" id="galeria" bg="brand.dark" px={{ base: 5, md: 12, lg: 10 }} pt={{ base: 20, lg: 28 }} pb={{ base: 16, lg: 28 }}>
      <Box maxW="1300px" mx="auto">
        <MotionBox initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}>
          <Flex justify="space-between" align="flex-end" wrap="wrap" gap={4} mb={{ base: 6, lg: 8 }}>
            <Box>
              <Eyebrow color="brand.bone">Fotos</Eyebrow>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '6xl', lg: '8xl' }} lineHeight={0.9}>{t('Galería')}</Text>
            </Box>
            <Text fontFamily="mono" fontSize="sm" color="brand.gray" letterSpacing="wider">{t('{n} fotos', { n: pad(photos.length) })}</Text>
          </Flex>

          {/* Filtros */}
          <Flex gap={2} mb={{ base: 6, lg: 10 }} overflowX="auto" pb={1} mx={{ base: -5, md: 0 }} px={{ base: 5, md: 0 }}
            sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            <LayoutGroup id="gal-filters">
              {cats.map((c) => {
                const on = c === cat
                return (
                  <Box key={c} as="button" type="button" onClick={() => setCat(c)} position="relative" flexShrink={0}
                    px={4} py={2} borderRadius="full" border="1px solid" borderColor={on ? 'brand.white' : 'whiteAlpha.300'}
                    color={on ? 'brand.dark' : 'white'} transition="color 0.3s, border-color 0.3s">
                    {on && <MotionBox layoutId="gal-pill" position="absolute" inset={0} borderRadius="full" bg="brand.white"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <Text position="relative" fontFamily="mono" fontSize="11px" fontWeight="700" letterSpacing="0.18em" textTransform="uppercase">
                      {t(c)} <Box as="span" opacity={0.5}>{count(c)}</Box>
                    </Text>
                  </Box>
                )
              })}
            </LayoutGroup>
          </Flex>
        </MotionBox>

        {/* Mosaico */}
        <Box sx={{ columnCount: { base: 2, md: 3, lg: 4 }, columnGap: { base: '10px', lg: '16px' } }}>
          <AnimatePresence mode="popLayout">
            {photos.map((p, i) => (
              <MotionBox key={p.id} layout role="group" position="relative" mb={{ base: '10px', lg: '16px' }}
                borderRadius="12px" overflow="hidden" cursor="zoom-in" sx={{ breakInside: 'avoid' }}
                initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.55, ease, delay: Math.min(i, 8) * 0.04 }}
                onClick={() => setOpen(photos.indexOf(p))}>
                <Image src={p.src} alt={`${playerData.displayName} · ${t(p.caption)}`} w="100%" display="block" loading="lazy" draggable={false}
                  transition="transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.5s" filter="grayscale(0.15)"
                  _groupHover={{ transform: 'scale(1.05)', filter: 'none' }} />
                <Box position="absolute" inset={0} bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%)"
                  opacity={{ base: 1, lg: 0 }} _groupHover={{ opacity: 1 }} transition="opacity 0.4s" />
                <Box position="absolute" left={3} right={3} bottom={3} opacity={{ base: 1, lg: 0 }}
                  transform={{ base: 'none', lg: 'translateY(10px)' }} _groupHover={{ opacity: 1, transform: 'none' }}
                  transition="all 0.4s cubic-bezier(0.22,1,0.36,1)">
                  <Eyebrow color="brand.greenBright" fontSize="9px">{p.category}</Eyebrow>
                  <Text fontFamily="heading" fontSize={{ base: 'md', lg: 'xl' }} lineHeight={1}>{t(p.caption)}</Text>
                </Box>
                <Flex position="absolute" top={3} right={3} boxSize="32px" borderRadius="full" bg="rgba(0,0,0,0.5)"
                  border="1px solid" borderColor="whiteAlpha.400" align="center" justify="center" opacity={0}
                  _groupHover={{ opacity: 1 }} transition="opacity 0.3s" display={{ base: 'none', lg: 'flex' }}>
                  <Box as={FiMaximize2} fontSize="13px" />
                </Flex>
              </MotionBox>
            ))}
          </AnimatePresence>
        </Box>
      </Box>
      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Box>
  )
}
