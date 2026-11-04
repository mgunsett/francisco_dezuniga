import { useEffect, useRef } from 'react'
import { Box, Flex, Text, HStack, Link, useToken } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LiaLaptopCodeSolid } from 'react-icons/lia'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const ref = useRef(null)
  const [devCream] = useToken('colors', ['dev.cream'])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: false, // avoid a leftover 3D layer that blurs text
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
            once: true,
          },
          // strip the inline transform once done → text renders crisp
          onComplete: () => gsap.set(ref.current, { clearProps: 'transform' }),
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={ref}
      as="footer"
      bg="brand.brown"
      py={16}
      px={{ base: 6, md: 12, lg: 20 }}
       sx={{
          maskImage: 'linear-gradient(to bottom, #2324249f 0%, black 12%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #2324249f   0%, black 12%)',
        }}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        flexWrap="wrap"
        gap={{ base: 8, md: 4 }}
      >
        <Box
          as="a"
          href="#hero"
          style={{ textDecoration: 'none' }}
        >
          <Text
            fontFamily="heading"
            fontSize={{ base: '46px', md: '36px' }}
            letterSpacing="0.08em"
            color="brand.amber"
          >
            {playerData.initials}
            <Box as="span" color="brand.gray2" ml="1px">_</Box>
          </Text>
        </Box>

        <Text
          fontFamily="mono"
          fontSize="12px"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="brand.bone"
          textAlign="center"
        >
          © 2026 {playerData.displayName} · Todos los derechos reservados
        </Text>

        <Text fontSize="12px" color="brand.bone" letterSpacing="0.05em">
            Desarrollo Web -{' '}
            <Link
            href="https://matiasgunsett.netlify.app/"
            isExternal
            color="dev.green"
            _hover={{ borderColor: 'rgba(232,213,163,0.44)', color: 'rgba(232,213,163,0.5)' }}
            transition="color 0.3s"
            fontSize="14px"
            >
              Matias Gunsett <LiaLaptopCodeSolid style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', fontSize: '20px', color: devCream }} />
            </Link>
          </Text>
      </Flex>
    </Box>
  )
}
