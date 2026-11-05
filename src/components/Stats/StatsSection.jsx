import { Box, Grid, Text, Flex, Image, VStack, Button, useDisclosure } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { playerData } from '../../data/playerData'
import {
  SectionShell, BlockTitle, Eyebrow, overallOf,
  BuenaFeImage, BuenaFeLens, BuenaFeLightbox, buenaFeBox,
} from './statsShared'
import { useT } from '../../i18n'

const MotionBox = motion(Box)
const ease = [0.16, 1, 0.3, 1]
const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } }

// Foto del jugador 
function PlayerRating({ value }) {
  const t = useT()
  return (
    <MotionBox position="relative" flexShrink={0} w={{ base: '100%', md: '270px', lg: '300px' }}
      h={{ base: '420px', md: '500px', lg: '540px' }}
      {...inView} variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease } } }}>
      {/* marco con doble borde (guiño al escudo de Riestra) */}
      <Box position="absolute" left="50%" transform="translateX(-50%)" bottom={0} w={{ base: '78%', md: '100%' }} h="78%"
        border="1px solid" borderColor="whiteAlpha.400" borderRadius="16px 16px 60px 60px"
        bg="linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(52,184,110,0.10))">
        <Box position="absolute" inset="8px" border="1px solid" borderColor="whiteAlpha.200" borderRadius="10px 10px 52px 52px" />
      </Box>
      <Image src={playerData.statsImage} alt={`${playerData.displayName}, ${t('arquero de {club}', { club: playerData.currentClub })}`}
        position="absolute" bottom={0} left="50%" transform="translateX(-50%)" h="100%" w="auto" maxW="none"
        objectFit="contain" loading="lazy" draggable={false}
        sx={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }} />
      {/* insignia de valoración */}
      <MotionBox position="absolute" bottom={{ base: '18px', md: '22px' }} right={{ base: '12%', md: '-14px' }}
        bg="brand.white" color="brand.black" borderRadius="12px" px={4} pt={2} pb={2.5} textAlign="center"
        boxShadow="0 14px 36px rgba(0,0,0,0.55)"
        {...inView} variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease, delay: 0.6 } } }}>
        <Text fontFamily="heading" fontSize={{ base: '44px', lg: '52px' }} lineHeight={0.9}>{value}</Text>
        <Text fontFamily="mono" fontSize="9px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase">{t('Valoración')}</Text>
        <Box h="2px" bg="brand.greenBright" mt={1.5} />
      </MotionBox>
    </MotionBox>
  )
}

function SegmentBar({ label, value, index }) {
  const t = useT()
  const score = value / 10
  return (
    <MotionBox {...inView}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: index * 0.08 } } }}>
      <Flex justify="space-between" align="baseline" mb={2}>
        <Text fontFamily="mono" fontWeight="700" fontSize={{ base: 'xs', lg: 'sm' }} letterSpacing="wider" textTransform="uppercase">
          {t(label)}
        </Text>
        <Text fontFamily="heading" fontSize={{ base: 'xl', lg: '2xl' }} lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
          {score.toFixed(1)}<Box as="span" fontSize="sm" color="brand.gray"> / 10</Box>
        </Text>
      </Flex>
      <Grid templateColumns="repeat(10, 1fr)" gap={{ base: '3px', lg: '4px' }}>
        {Array.from({ length: 10 }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, score - i))
          return (
            <Box key={i} h={{ base: '10px', lg: '12px' }} bg="rgba(255,255,255,0.12)" borderRadius="2px" overflow="hidden" position="relative">
              <MotionBox position="absolute" inset={0} bg={i === Math.ceil(score) - 1 ? 'brand.greenBright' : 'brand.white'}
                transformOrigin="left center"
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: fill, transition: { duration: 0.45, ease } } }} />
            </Box>
          )
        })}
      </Grid>
    </MotionBox>
  )
}

function TimelineItem({ item, side }) {
  const t = useT()
  const isClub = item.kind === 'club'
  return (
    <MotionBox {...inView}
      variants={{ hidden: { opacity: 0, x: side === 'left' ? -30 : 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } }}
      border="1px solid" borderColor={item.current ? 'brand.white' : 'whiteAlpha.300'} borderRadius="12px"
      p={{ base: 4, lg: 5 }} bg="brand.dark" textAlign={{ base: 'left', lg: side === 'left' ? 'right' : 'left' }}>
      <Flex gap={4} align="center" direction={{ base: 'row', lg: side === 'left' ? 'row-reverse' : 'row' }}>
        {item.logo ? (
          <Flex boxSize="56px" flexShrink={0} borderRadius="full" overflow="hidden" align="center" justify="center"
            bg={isClub ? 'transparent' : 'transparent'} border="1px solid" borderColor={isClub ? 'transparent' : 'whiteAlpha.400'}>
            <Image src={item.logo} alt={`${t('Logo de')} ${item.name}`} objectFit={isClub ? 'contain' : 'cover'}
              boxSize={isClub ? '50px' : '100%'} loading="lazy" />
          </Flex>
        ) : (
          <Flex boxSize="56px" flexShrink={0} borderRadius="full" border="1px solid" borderColor="whiteAlpha.500"
            align="center" justify="center">
            <Text fontFamily="heading" fontSize="md" letterSpacing="wider">{item.short}</Text>
          </Flex>
        )}
        <Box minW={0}>
          <Text fontFamily="mono" fontSize="10px" letterSpacing="0.2em" textTransform="uppercase"
            color={item.current ? 'brand.greenBright' : 'brand.gray'}>
            {t(item.years)} {isClub ? '' : ` · ${t('Formación')}`}
          </Text>
          <Text fontFamily="heading" fontSize={{ base: '2xl', lg: '3xl' }} lineHeight={1}>{t(item.name)}</Text>
        </Box>
      </Flex>
      <VStack align={{ base: 'flex-start', lg: side === 'left' ? 'flex-end' : 'flex-start' }} spacing={1} mt={3}>
        {item.lines.map((l) => (
          <Text key={l} fontFamily="mono" fontSize="xs" color="brand.gray2">{t(l)}</Text>
        ))}
      </VStack>
    </MotionBox>
  )
}

function CareerTimeline() {
  const t = useT()
  const clubs = playerData.clubs.map((c, i) => ({
    kind: 'club', name: c.name, years: c.years, logo: c.logo, current: i === 0,
    lines: [].concat(c.info).filter(Boolean), sort: c.to * 10 + c.from / 1000,
  }))
  const academies = playerData.academies.map((a) => ({
    kind: 'academy', name: a.name, short: a.short, years: a.years, logo: a.logo,
    lines: [`${t('Referencias')}: ${a.reference.replace(' y ', ` ${t('y')} `)}`], sort: a.to * 10 + a.from / 1000,
  }))
  const coaches = playerData.coaches

  return (
    <Box>
      <BlockTitle eyebrow="Trayectoria" title="Clubes y formación" />
      <Grid templateColumns={{ base: '1fr', lg: '1fr 56px 1fr' }} gap={{ base: 4, lg: 0 }} position="relative">
        {/* línea central: con borde y no con fondo, porque un fondo de 1px puede redondearse a 0 con zoom < 100% */}
        <Box display={{ base: 'none', lg: 'block' }} position="absolute" left="50%" top={0} bottom={0} w={0}
          borderLeft="1px solid" sx={{ borderImage: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.1)) 1' }} />
        {/* Columna formación (izquierda) */}
        <VStack spacing={4} align="stretch" order={{ base: 2, lg: 1 }} pt={{ lg: 16 }}>
          <Eyebrow display={{ base: 'block', lg: 'none' }} mt={4}>Formación</Eyebrow>
          {academies.map((a) => <TimelineItem key={a.name} item={a} side="left" />)}
          <MotionBox {...inView}
            variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } }}
            p={{ base: 4, lg: 5 }} textAlign={{ base: 'left', lg: 'right' }}>
            <Eyebrow mb={3}>Entrenadores de arqueros</Eyebrow>
            <VStack align={{ base: 'flex-start', lg: 'flex-end' }} spacing={3}>
              {coaches.map((c) => (
                <Box key={c.names}>
                  <Text fontFamily="mono" fontWeight="700" fontSize="md" letterSpacing="0.1em" textTransform="uppercase">
                    <Box as="span" color="brand.greenBright">{c.year}</Box> · {c.names.replace(' y ', ` ${t('y')} `)}
                  </Text>
                  <Text fontFamily="mono" fontSize="xs" color="brand.gray">{t(c.role)}</Text>
                </Box>
              ))}
            </VStack>
          </MotionBox>
        </VStack>
        {/* eje central */}
        <Box display={{ base: 'none', lg: 'block' }} order={2} />
        {/* Columna clubes (derecha) */}
        <VStack spacing={4} align="stretch" order={{ base: 1, lg: 3 }}>
          <Eyebrow display={{ base: 'block', lg: 'none' }}>Clubes</Eyebrow>
          {clubs.map((c) => <TimelineItem key={c.name} item={c} side="right" />)}
        </VStack>
      </Grid>
    </Box>
  )
}

// Documento: la lista buena Fe
function BuenaFeDossier() {
  const t = useT()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bf = playerData.buenaFe
  const b = buenaFeBox()
  return (
    <Grid templateColumns={{ base: '1fr', lg: '1fr 0.9fr' }} gap={{ base: 10, lg: 16 }} alignItems="center">
      <Box order={{ base: 2, lg: 1 }}>
        <BlockTitle eyebrow="Documento oficial" title="Lista de buena fe" mb={{ base: 4, lg: 5 }} />
        <MotionBox {...inView} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}>
          <Text fontFamily="mono" fontSize={{ base: 'sm', lg: 'md' }} color="brand.gray2" maxW="520px" lineHeight={1.7}>
            {t('Inscripto por {club} en la lista de buena fe para la', { club: bf.club })}{' '}
            <Box as="span" color="brand.white" fontWeight="700">{bf.competition}</Box>
          </Text>
        </MotionBox>
        <MotionBox mt={{ base: 6, lg: 8 }} maxW="520px" {...inView}
          variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease, delay: 0.15 } } }}>
          <Eyebrow fontSize="9px" mb={2}>Extracto</Eyebrow>
          <BuenaFeLens />
        </MotionBox>
        <Grid templateColumns="1fr 1fr" gap={0} mt={{ base: 6, lg: 8 }} maxW="520px" border="1px solid" borderColor="whiteAlpha.300" borderRadius="10px">
          {[['Competencia', 'CONMEBOL Sudamericana'], ['Temporada', '2026'], ['Club', bf.club], ['Dorsal', bf.dorsal]].map(([k, v], i) => (
            <Box key={k} p={4} borderLeft={i % 2 ? '1px solid' : 'none'} borderTop={i > 1 ? '1px solid' : 'none'} borderColor="whiteAlpha.300">
              <Eyebrow fontSize="9px">{k}</Eyebrow>
              <Text fontFamily="heading" fontSize={{ base: 'xl', lg: '2xl' }} lineHeight={1.05} mt={1}>{v}</Text>
            </Box>
          ))}
        </Grid>
        <Button onClick={onOpen} mt={{ base: 6, lg: 8 }} bg="brand.white" color="brand.dark" borderRadius="xl"
          fontFamily="mono" fontSize="xs" letterSpacing="0.2em" textTransform="uppercase" px={6}
          _hover={{ bg: 'brand.greenBright' }}>
          {t('Ver documento')}
        </Button>
      </Box>

      {/* Hoja inclinada */}
      <Box order={{ base: 1, lg: 2 }} position="relative" maxW={{ base: '320px', md: '400px', lg: '440px' }} mx="auto" w="100%">
        <Box position="absolute" inset={0} transform="rotate(6deg) translate(14px, 8px)" border="1px solid"
          borderColor="whiteAlpha.300" borderRadius="10px" bg="rgba(255,255,255,0.03)" />
        <MotionBox position="relative" {...inView}
          variants={{ hidden: { opacity: 0, rotate: -9, y: 40 }, show: { opacity: 1, rotate: -3, y: 0, transition: { duration: 1, ease } } }}
          whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.4 } }}>
          <BuenaFeImage hideMark onOpen={onOpen} boxShadow="0 30px 70px rgba(0,0,0,0.7)">
            {/* resaltador */}
            <MotionBox position="absolute" pointerEvents="none"
              left={`${b.left}%`} top={`${b.top}%`} w={`${b.width}%`} h={`${b.height}%`}
              bg="rgba(52,184,110,0.42)" borderRadius="3px" transformOrigin="left center"
              sx={{ mixBlendMode: 'screen' }}
              {...inView} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease, delay: 0.9 } } }} />
          </BuenaFeImage>
        </MotionBox>
        {/* sello */}
        <MotionBox position="absolute" bottom={{ base: '-18px', lg: '-26px' }} left={{ base: '-12px', lg: '-34px' }}
          boxSize={{ base: '96px', lg: '118px' }} borderRadius="full" border="2px solid" borderColor="brand.greenBright"
          bg="brand.dark" display="flex" flexDirection="column" alignItems="center" justifyContent="center"
          {...inView} variants={{ hidden: { opacity: 0, scale: 1.6, rotate: -30 }, show: { opacity: 1, scale: 1, rotate: -12, transition: { duration: 0.5, ease, delay: 1.3 } } }}>
          <Text fontFamily="mono" fontSize="8px" fontWeight="700" letterSpacing="0.22em" color="brand.greenBright" textTransform="uppercase">{t('Convocado')}</Text>
          <Text fontFamily="heading" fontSize={{ base: '34px', lg: '42px' }} lineHeight={1}>#{bf.dorsal}</Text>
          <Text fontFamily="mono" fontSize="8px" fontWeight="700" letterSpacing="0.22em" color="brand.greenBright">2026</Text>
        </MotionBox>
      </Box>
      <BuenaFeLightbox isOpen={isOpen} onClose={onClose} />
    </Grid>
  )
}

export default function StatsSection() {
  const t = useT()
  const overall = overallOf(playerData.stats)
  return (
    <SectionShell>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 14 }} alignItems="center">
        {/* Izquierda: foto + valoración y perfil */}
        <Flex gap={{ base: 8, md: 8, lg: 10 }} direction={{ base: 'column', md: 'row' }} align={{ md: 'center' }}>
          <PlayerRating value={overall} />
          <Box flex={1} minW={0}>
            <Eyebrow color="brand.white" mb={3}>Perfil</Eyebrow>
            <Grid templateColumns={{ base: '1fr 1fr', md: '1fr' }} columnGap={6} rowGap={{ base: 4, md: 3 }}>
              {playerData.profile.map((p) => (
                <Box key={p.label} borderTop="1px solid" borderColor="whiteAlpha.200" pt={2} minW={0}>
                  <Eyebrow fontSize="9px" letterSpacing="0.16em">{p.label}</Eyebrow>
                  <Text fontFamily="mono" fontWeight="600" fontSize={{ base: 'sm', lg: 'md' }}>{t(p.value)}</Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Flex>

        {/* Derecha: informe técnico */}
        <Box border="1px solid" borderColor="whiteAlpha.300" borderRadius="14px" p={{ base: 5, lg: 8 }}>
          <Flex justify="space-between" align="baseline" mb={6}>
            <Eyebrow color="brand.white">Informe técnico</Eyebrow>
            <Eyebrow fontSize="9px">Escala 1 — 10</Eyebrow>
          </Flex>
          <VStack spacing={{ base: 5, lg: 6 }} align="stretch">
            {playerData.stats.map((s, i) => <SegmentBar key={s.label} {...s} index={i} />)}
          </VStack>
        </Box>
      </Grid>

      {/* Hitos */}
      <Grid mt={{ base: 12, lg: 16 }} templateColumns={{ base: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={3}>
        {playerData.milestones.map((m, i) => (
          <MotionBox key={m.title} {...inView}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: i * 0.08 } } }}
            borderTop="2px solid" borderColor={i === 0 ? 'brand.greenBright' : 'brand.white'} pt={4} pr={4}>
            <Text fontFamily="heading" fontSize="lg" color="brand.gray">{m.year}</Text>
            <Text fontFamily="heading" fontSize={{ base: '2xl', lg: '2xl' }} lineHeight={1.05}>{t(m.title)}</Text>
            
          </MotionBox>
        ))}
      </Grid>

      <Box mt={{ base: 16, lg: 24 }}><BuenaFeDossier /></Box>

      <Box mt={{ base: 16, lg: 24 }}><CareerTimeline /></Box>
    </SectionShell>
  )
}
