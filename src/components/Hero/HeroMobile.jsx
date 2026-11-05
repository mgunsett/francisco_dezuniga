// ─────────────────────────────────────────────────────────────
// HERO MOBILE (< 992px). El escritorio no cambia.
// La foto es la protagonista y el nombre va por detrás. Los datos
// largos (grilla de stats, pasaporte) se resumen en una sola línea.
// Usa las mismas clases que anima la intro de Hero.jsx
// (hc-photo, hc-char, hc-meta, hc-badge, hc-cta, hc-number).
// Diseño elegido: nombre en vertical detrás de la foto.
// ─────────────────────────────────────────────────────────────
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react'
import { playerData } from '../../data/playerData'
import { useT } from '../../i18n'

const Chars = ({ text }) =>
  text.split('').map((ch, i) => (
    <Box as="span" key={i} className="hc-char" display="inline-block" whiteSpace="pre">{ch}</Box>
  ))

const outline = (w = '1.5px', c = 'rgba(255,255,255,0.85)') => ({ color: 'transparent', WebkitTextStroke: `${w} ${c}` })

function Photo({ h, bottom = 0, left = '50%', x = '-50%', fade = 82 }) {
  return (
    <Box position="absolute" zIndex={2} left={left} bottom={bottom} h={h} transform={`translateX(${x})`} pointerEvents="none">
      <Box className="hc-photo-wrap" h="100%" transformOrigin="bottom center">
        <Image className="hc-photo" src={playerData.image} alt={playerData.displayName} h="100%" w="auto" maxW="none"
          objectFit="contain" draggable={false} filter="drop-shadow(0 30px 40px rgba(0,0,0,0.6))"
          style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          sx={{ maskImage: `linear-gradient(to bottom, black ${fade}%, transparent)`, WebkitMaskImage: `linear-gradient(to bottom, black ${fade}%, transparent)` }} />
      </Box>
    </Box>
  )
}

// Línea única con los datos clave (reemplaza la grilla de 4 stats + badge)
function DataLine({ t, ...rest }) {
  const items = [playerData.height.replace('m', ' m'), playerData.weight.replace('kg', ' kg'), t('Zurdo')]
  return (
    <Flex className="hc-badge" opacity={0} align="center" gap={2} wrap="wrap" fontFamily="mono" fontSize="10px" fontWeight="700"
      letterSpacing="0.16em" textTransform="uppercase" color="brand.gray2" {...rest}>
      {items.map((it, i) => (
        <Flex key={i} align="center" gap={2}>
          {i > 0 && <Box w="3px" h="3px" borderRadius="full" bg="whiteAlpha.500" />}
          <Text>{it}</Text>
        </Flex>
      ))}
      <Box w="3px" h="3px" borderRadius="full" bg="whiteAlpha.500" />
      <Flex align="center" gap={1}>
        <Image src={playerData.nationalityFlag} alt="Argentina" w="15px" />
        <Image src={playerData.secondNationalityFlag} alt={t('Polonia')} w="15px" />
        <Text color="brand.greenBright">{t('UE')}</Text>
      </Flex>
    </Flex>
  )
}

function ClubLine({ t, ...rest }) {
  return (
    <Flex className="hc-meta" opacity={0} align="center" gap={2.5} {...rest}>
      <Image src={playerData.logoCurrentClub} alt={t('Escudo de {club}', { club: playerData.currentClub })} h="26px" />
      <Box lineHeight={1.1}>
        <Text fontFamily="heading" fontSize="md" letterSpacing="wider">{playerData.currentClub}</Text>
        <Text fontFamily="mono" fontSize="9px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="brand.greenBright">
          {t(playerData.position)} · {t('Clase')} {playerData.category}
        </Text>
      </Box>
    </Flex>
  )
}

function Ctas({ t, go, size = 'md', ...rest }) {
  const base = {
    as: 'button', type: 'button', className: 'hc-cta', opacity: 0, fontFamily: 'mono', fontWeight: '700',
    fontSize: size === 'sm' ? '10px' : 'xs', letterSpacing: 'widest', textTransform: 'uppercase', textAlign: 'center',
    h: size === 'sm' ? '40px' : '46px', borderRadius: '10px', _active: { transform: 'scale(0.97)' },
  }
  return (
    <Grid templateColumns="1fr 1fr" gap={2.5} {...rest}>
      <Box {...base} bg="brand.white" color="brand.black" onClick={() => go('#videos')}>{t('Ver videos')}</Box>
      <Box {...base} border="1px solid" borderColor="whiteAlpha.500" bg="rgba(10,11,10,0.35)" backdropFilter="blur(6px)"
        onClick={() => go('#contact')}>{t('Contacto')}</Box>
    </Grid>
  )
}

const bottomFade = (h = '34%', solid = 45) => (
  <Box position="absolute" left={0} right={0} bottom={0} h={h} zIndex={3} pointerEvents="none"
    bg={`linear-gradient(to top, #0A0B0A ${solid}%, rgba(10,11,10,0.75) 70%, transparent)`} />
)

// Nombre en vertical a todo el alto por detrás, foto grande a la
// derecha y abajo club + datos + CTAs. Partidos: pestaña lateral (Hero.jsx).
export default function HeroMobile({ go }) {
  const t = useT()
  return (
    <Box position="absolute" inset={0} display={{ base: 'block', lg: 'none' }} zIndex={3} overflow="hidden">
      <Box className="hc-content" position="absolute" zIndex={1} left="3%" top="calc(64px + 2dvh)" bottom="calc(150px + 5dvh)" as="h1"
        display="flex" flexDirection="column" justifyContent="flex-start" fontFamily="heading" lineHeight={0.84} fontSize="min(15dvh, 30vw)" whiteSpace="nowrap"
        sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        <Box overflow="hidden" color="rgba(255,255,255,0.92)"><Chars text={playerData.name} /></Box>
        <Box overflow="hidden" sx={outline('1.5px', 'rgba(255,255,255,0.8)')}><Chars text={playerData.fullName} /></Box>
      </Box>
      <Photo h="min(74dvh, 176vw)" bottom="calc(140px + 4dvh)" left="58%" x="-50%" fade={80} />
      {bottomFade('38%', 46)}
      <Flex position="absolute" left="5%" right="5%" bottom="max(22px, 3.5dvh)" zIndex={4} direction="column" gap="1.6dvh">
        <ClubLine t={t} />
        <DataLine t={t} />
        <Ctas t={t} go={go} />
      </Flex>
    </Box>
  )
}
