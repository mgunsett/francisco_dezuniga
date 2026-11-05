// Piezas compartidas de Contacto + Footer
import { useState } from 'react'
import { Box, Flex, Grid, Text, Input, Textarea, Select, Image } from '@chakra-ui/react'
import { FaWhatsapp, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { FiArrowUpRight, FiCheck, FiArrowUp } from 'react-icons/fi'
import { playerData } from '../../data/playerData'

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

export const waLink = (num, text = `Hola, los contacto desde la web de ${playerData.displayName}.`) =>
  `https://wa.me/${num}?text=${encodeURIComponent(text)}`

export const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Estadísticas', href: '#estadisticas' },
  { label: 'Highlights', href: '#videos' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contact' },
]
export function goTo(e, href) {
  e?.preventDefault()
  const t = document.querySelector(href)
  if (!t) return
  if (window.__lenis) window.__lenis.scrollTo(t, { offset: -20 }); else t.scrollIntoView({ behavior: 'smooth' })
}

// ── Formulario (FormSubmit: llega por email sin backend propio) ──
export function ContactForm({ compact = false, ...rest }) {
  const [state, setState] = useState('idle') // idle | sending | ok | error
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    if (data._honey) return
    setState('sending')
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${playerData.contact.formEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `Web ${playerData.displayName} · ${data.perfil} · ${data.nombre}`, _template: 'table' }),
      })
      if (!r.ok) throw new Error()
      setState('ok'); e.currentTarget?.reset?.()
    } catch { setState('error') }
  }
  const field = {
    bg: 'rgba(255,255,255,0.03)', border: '1px solid', borderColor: 'whiteAlpha.300', borderRadius: '10px',
    fontFamily: 'mono', fontSize: 'sm', color: 'white', h: '48px',
    _placeholder: { color: 'whiteAlpha.500' }, _hover: { borderColor: 'whiteAlpha.500' },
    _focusVisible: { borderColor: 'brand.greenBright', boxShadow: '0 0 0 1px #34B86E' },
  }
  if (state === 'ok') {
    return (
      <Flex direction="column" align="flex-start" justify="center" gap={3} minH="320px" {...rest}>
        <Flex boxSize="52px" borderRadius="full" bg="brand.greenBright" color="brand.dark" align="center" justify="center">
          <Box as={FiCheck} fontSize="24px" />
        </Flex>
        <Text fontFamily="heading" fontSize="4xl" lineHeight={1}>¡Mensaje enviado!</Text>
        <Text fontFamily="mono" fontSize="sm" color="brand.gray2">Gracias por escribir. Te vamos a responder a la brevedad.</Text>
        <Box as="button" type="button" onClick={() => setState('idle')} fontFamily="mono" fontSize="xs" letterSpacing="0.2em"
          textTransform="uppercase" color="brand.gray" textDecoration="underline" mt={2}>Enviar otro</Box>
      </Flex>
    )
  }
  return (
    <Box as="form" onSubmit={onSubmit} {...rest}>
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <Grid templateColumns={{ base: '1fr', md: compact ? '1fr' : '1fr 1fr' }} gap={3}>
        <Input name="nombre" placeholder="Nombre y apellido" required aria-label="Nombre y apellido" {...field} />
        <Input name="email" type="email" placeholder="Email" required aria-label="Email" {...field} />
        <Select name="perfil" aria-label="Perfil" defaultValue="Club" {...field} sx={{ option: { bg: '#0A0B0A' } }}>
          {['Club', 'Scout / Ojeador', 'Agente / Representante', 'Prensa', 'Marca / Sponsor', 'Otro'].map((o) => <option key={o}>{o}</option>)}
        </Select>
        <Input name="organizacion" placeholder="Club u organización (opcional)" aria-label="Club u organización" {...field} />
        <Textarea name="mensaje" placeholder="Mensaje" required aria-label="Mensaje" rows={5} gridColumn={{ md: compact ? 'auto' : '1 / -1' }}
          {...field} h="auto" py={3} resize="vertical" />
      </Grid>
      <Flex mt={4} align="center" justify="space-between" gap={4} wrap="wrap">
        <Text fontFamily="mono" fontSize="10px" color="brand.gray" maxW="300px">
          El mensaje llega directo a la familia de {playerData.name.charAt(0) + playerData.name.slice(1).toLowerCase()}.
        </Text>
        <Box as="button" type="submit" disabled={state === 'sending'} display="inline-flex" alignItems="center" gap={2}
          bg="brand.white" color="brand.dark" borderRadius="full" px={6} h="48px" fontFamily="mono" fontWeight="700"
          fontSize="xs" letterSpacing="0.2em" textTransform="uppercase" transition="all 0.3s"
          _hover={{ bg: 'brand.greenBright' }} opacity={state === 'sending' ? 0.6 : 1}>
          {state === 'sending' ? 'Enviando…' : 'Enviar mensaje'} <Box as={FiArrowUpRight} fontSize="16px" />
        </Box>
      </Flex>
      {state === 'error' && (
        <Text fontFamily="mono" fontSize="xs" color="#ff6b6b" mt={3}>
          No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.
        </Text>
      )}
    </Box>
  )
}

// ── Tarjeta de persona de contacto ─────────────────────────────
export function PersonCard({ person, highlight = false, ...rest }) {
  const btn = {
    as: 'a', target: '_blank', rel: 'noopener noreferrer', display: 'inline-flex', alignItems: 'center', gap: 2,
    h: '40px', px: 4, borderRadius: 'full', border: '1px solid', fontFamily: 'mono', fontSize: '11px', fontWeight: '700',
    letterSpacing: '0.14em', textTransform: 'uppercase', transition: 'all 0.3s',
  }
  return (
    <Box border="1px solid" borderColor={highlight ? 'brand.white' : 'whiteAlpha.300'} borderRadius="14px"
      p={{ base: 5, lg: 6 }} bg="rgba(255,255,255,0.02)" position="relative" overflow="hidden" {...rest}>
      {highlight && <Box position="absolute" left={0} top={0} bottom={0} w="3px" bg="brand.greenBright" />}
      <Eyebrow color={highlight ? 'brand.greenBright' : 'brand.gray'}>{person.role}</Eyebrow>
      <Text fontFamily="heading" fontSize={{ base: '3xl', lg: '4xl' }} lineHeight={1} mt={1}>{person.name}</Text>
      <Box mt={3} fontFamily="mono" fontSize="sm" color="brand.gray2">
        <Text as="a" href={`tel:+${person.whatsapp}`} display="block" _hover={{ color: 'white' }}>{person.phone}</Text>
        <Text as="a" href={`mailto:${person.email}`} display="block" _hover={{ color: 'white' }} wordBreak="break-all">{person.email}</Text>
      </Box>
      <Flex gap={2} mt={5} wrap="wrap">
        <Box {...btn} href={waLink(person.whatsapp)} bg="brand.white" color="brand.dark" borderColor="brand.white"
          _hover={{ bg: 'brand.greenBright', borderColor: 'brand.greenBright' }}>
          <Box as={FaWhatsapp} fontSize="15px" /> WhatsApp
        </Box>
        <Box {...btn} href={`mailto:${person.email}`} borderColor="whiteAlpha.400" color="white"
          _hover={{ borderColor: 'white', bg: 'whiteAlpha.100' }}>
          <Box as={FaEnvelope} fontSize="13px" /> Email
        </Box>
      </Flex>
    </Box>
  )
}

// ── Bloque Europa: disponibilidad + pasaporte + idiomas ────────
export function Availability({ variant = 'card', ...rest }) {
  const a = playerData.contact.availability
  return (
    <Box {...rest}>
      <Flex align="center" gap={3} mb={3}>
        <Box position="relative" boxSize="10px">
          <Box position="absolute" inset={0} borderRadius="full" bg="brand.greenBright" />
          <Box position="absolute" inset="-4px" borderRadius="full" border="1px solid" borderColor="brand.greenBright" opacity={0.5}
            sx={{ animation: 'fzPulse 2s ease-out infinite', '@keyframes fzPulse': { '0%': { transform: 'scale(0.6)', opacity: 0.8 }, '100%': { transform: 'scale(1.8)', opacity: 0 } } }} />
        </Box>
        <Eyebrow color="brand.greenBright">{a.title}</Eyebrow>
      </Flex>
      {variant !== 'mini' && (
        <Text fontFamily="mono" fontSize={{ base: 'sm', lg: 'md' }} color="brand.gray2" lineHeight={1.7} maxW="520px">{a.text}</Text>
      )}
      <Flex gap={2} mt={variant === 'mini' ? 0 : 5} wrap="wrap" align="center">
        <Flex align="center" gap={2} border="1px solid" borderColor="whiteAlpha.300" borderRadius="full" h="34px" px={3}>
          <Image src={playerData.secondNationalityFlag} alt="" h="12px" borderRadius="2px" />
          <Text fontFamily="mono" fontSize="10px" fontWeight="700" letterSpacing="0.16em" textTransform="uppercase">
            Pasaporte <Box as="span" color="brand.greenBright">UE</Box>
          </Text>
        </Flex>
        {a.languages.map((l) => (
          <Flex key={l.code} align="center" gap={2} border="1px solid" borderColor="whiteAlpha.300" borderRadius="full" h="34px" px={3}
            title={`${l.label} · ${l.level}`}>
            <Text fontFamily="heading" fontSize="md" lineHeight={1}>{l.code}</Text>
            <Text fontFamily="mono" fontSize="9px" letterSpacing="0.14em" textTransform="uppercase" color="brand.gray">{l.level}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

// ── Redes (con estado "pendiente" hasta tener el link) ─────────
export function SocialLinks({ size = 'md', ...rest }) {
  return (
    <Flex gap={3} wrap="wrap" {...rest}>
      {playerData.socialMedia.map((s) => {
        const ready = Boolean(s.url)
        return (
          <Flex key={s.label} as={ready ? 'a' : 'div'} href={s.url || undefined} target="_blank" rel="noopener noreferrer"
            align="center" gap={3} border="1px solid" borderColor="whiteAlpha.300" borderRadius="12px"
            px={size === 'sm' ? 3 : 4} py={size === 'sm' ? 2 : 3} opacity={ready ? 1 : 0.55}
            transition="all 0.3s" _hover={ready ? { borderColor: 'white', bg: 'whiteAlpha.100' } : {}}>
            <Box as={s.icon || FaInstagram} fontSize={size === 'sm' ? '16px' : '20px'} />
            <Box>
              <Text fontFamily="mono" fontSize="9px" letterSpacing="0.2em" textTransform="uppercase" color="brand.gray">{s.label}</Text>
              <Text fontFamily="heading" fontSize={size === 'sm' ? 'md' : 'lg'} lineHeight={1}>{s.handle}</Text>
            </Box>
          </Flex>
        )
      })}
    </Flex>
  )
}

// ── Pie legal + crédito de desarrollo ──────────────────────────
export function FooterBottom({ ...rest }) {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }}
      gap={3} pt={6} borderTop="1px solid" borderColor="whiteAlpha.200" {...rest}>
      <Text fontFamily="mono" fontSize="11px" letterSpacing="0.12em" textTransform="uppercase" color="brand.gray">
        © {new Date().getFullYear()} {playerData.displayName} · Todos los derechos reservados
      </Text>
      <Text fontFamily="mono" fontSize="11px" color="brand.gray" letterSpacing="0.06em">
        Desarrollo web ·{' '}
        <Box as="a" href="https://matiasgunsett.netlify.app/" target="_blank" rel="noopener noreferrer" color="brand.white"
          _hover={{ color: 'brand.greenBright' }} transition="color 0.3s">Matias Gunsett</Box>
      </Text>
    </Flex>
  )
}

export function BackToTop(props) {
  return (
    <Flex as="button" type="button" onClick={(e) => goTo(e, '#hero')} aria-label="Volver arriba" align="center" gap={2}
      fontFamily="mono" fontSize="11px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="white"
      role="group" {...props}>
      Volver arriba
      <Flex boxSize="36px" borderRadius="full" border="1px solid" borderColor="whiteAlpha.400" align="center" justify="center"
        transition="all 0.3s" _groupHover={{ bg: 'brand.white', color: 'brand.dark', transform: 'translateY(-3px)' }}>
        <Box as={FiArrowUp} />
      </Flex>
    </Flex>
  )
}
