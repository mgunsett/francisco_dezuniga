import { useEffect, useMemo, useState } from 'react'
import { useToken } from '@chakra-ui/react'
import { GLYPH_FONT_SIZE, measureGlyph } from '../utils/measureGlyph'

// Mide el texto en la fuente indicada (token de Chakra o nombre) y remide cada vez
// que termina de cargar una fuente web: hasta entonces el navegador usa la de reemplazo
export default function useGlyph(text, fontFamily) {
  const [font] = useToken('fonts', [fontFamily])
  const [fontsVersion, setFontsVersion] = useState(0)

  useEffect(() => {
    const fonts = document.fonts
    if (!fonts) return undefined
    const remeasure = () => setFontsVersion((v) => v + 1)
    fonts.addEventListener('loadingdone', remeasure)
    return () => fonts.removeEventListener('loadingdone', remeasure)
  }, [])

  const glyph = useMemo(() => measureGlyph(text, font), [text, font, fontsVersion])
  return { glyph, font, fontSize: GLYPH_FONT_SIZE }
}
