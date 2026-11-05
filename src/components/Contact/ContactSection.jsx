// ─────────────────────────────────────────────────────────────
// CONTACTO · tarjetas, redes, Europa y formulario
// Encabezado, tarjetas de contacto (jugador y padre), redes y debajo el
// formulario junto al bloque "Disponible para Europa". Footer de una
// fila con logo, links y créditos. Animación SUTIL (scrub de GSAP).
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react'
import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'
import { Eyebrow, ContactForm, PersonCard, Availability, SocialLinks, reduceMotion } from './contactShared'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const root = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ca-rev').forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 60%', scrub: 1 } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={root}>
      <Box as="section" id="contact" bg="brand.dark" px={{ base: 5, md: 12, lg: 10 }} pt={{ base: 20, lg: 28 }} pb={{ base: 16, lg: 24 }}>
        <Box maxW="1200px" mx="auto">
          <Box className="ca-rev" mb={{ base: 8, lg: 12 }}>
            <Eyebrow color="brand.bone">Hablemos</Eyebrow>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '6xl', lg: '8xl' }} lineHeight={0.9}>Contacto</Text>
          </Box>

          <Grid className="ca-rev" templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            {playerData.contact.people.map((p, i) => <PersonCard key={p.email} person={p} highlight={i === 0} />)}
          </Grid>

          <Box className="ca-rev" mt={4}>
            <Eyebrow mb={3}>Redes</Eyebrow>
            <SocialLinks />
          </Box>

          <Grid className="ca-rev" templateColumns={{ base: '1fr', lg: '0.85fr 1.15fr' }} gap={{ base: 8, lg: 12 }} mt={{ base: 12, lg: 16 }}
            border="1px solid" borderColor="whiteAlpha.300" borderRadius="14px" p={{ base: 5, md: 8, lg: 10 }}>
            <Box>
              <Text fontFamily="heading" fontSize={{ base: '4xl', lg: '5xl' }} lineHeight={1} mb={4}>Escribinos</Text>
              <Availability />
            </Box>
            <ContactForm />
          </Grid>
        </Box>
      </Box>

    </Box>
  )
}
