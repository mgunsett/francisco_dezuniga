// Footer: logo, navegación y créditos
import { Box, Flex, Text } from '@chakra-ui/react'
import { playerData } from '../../data/playerData'
import { Eyebrow, FooterBottom, navLinks, goTo } from '../Contact/contactShared'
import { useT } from '../../i18n'

export default function Footer() {
  const t = useT()
  return (
  <Box as="footer" bg="#060706" px={{ base: 5, md: 12, lg: 10 }} pt={{ base: 12, lg: 14 }} pb={8} borderTop="1px solid" borderColor="whiteAlpha.200">
      <Box maxW="1200px" mx="auto">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap={6} mb={10}>
          <Box as="a" href="#hero" onClick={(e) => goTo(e, '#hero')}>
            <Text fontFamily="heading" fontSize="5xl" lineHeight={1} letterSpacing="0.06em">
              {playerData.initials}<Box as="span" color="brand.greenBright">_</Box>
            </Text>
            <Eyebrow fontSize="9px">Arquero · Deportivo Riestra</Eyebrow>
          </Box>
          <Flex gap={{ base: 4, md: 8 }} wrap="wrap">
            {navLinks.map((l) => (
              <Text key={l.href} as="a" href={l.href} onClick={(e) => goTo(e, l.href)} fontFamily="mono" fontSize="11px"
                letterSpacing="0.2em" textTransform="uppercase" color="brand.gray2" _hover={{ color: 'white' }}>{t(l.label)}</Text>
            ))}
          </Flex>
        </Flex>
        <FooterBottom />
      </Box>
    </Box>
  )
}
