import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Box, chakra, useToken } from '@chakra-ui/react'

// <text> de SVG con props de estilo de Chakra (Text de Chakra renderiza <p>, inválido dentro de <svg>)
const SvgText = chakra('text')

const FONT_SIZE = 1000

// Caja real del dígito (sin el aire de la tipografía), para que el trazo toque arriba y abajo
function measureGlyph(text, fontFamily) {
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.font = `${FONT_SIZE}px ${fontFamily}`
  const m = ctx.measureText(text)
  return {
    x: -m.actualBoundingBoxLeft,
    y: -m.actualBoundingBoxAscent,
    w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
    h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
  }
}

export function HeroNumber({
  value,
  fontFamily = 'heading',
  fill = 'transparent',
  stroke = 'rgba(124, 209, 145, 0.84)',
  strokeWidth = 1.5,
  textProps,
  ...props
}) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  const [fontsReady, setFontsReady] = useState(0)
  const [resolvedFont] = useToken('fonts', [fontFamily])
  const text = String(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const glyph = useMemo(() => measureGlyph(text, resolvedFont), [text, resolvedFont, fontsReady])

  // Remide cuando termina de cargar una fuente web
  useLayoutEffect(() => {
    document.fonts?.ready.then(() => setFontsReady((n) => n + 1))
  }, [])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.height * (glyph.w / glyph.h))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [glyph])

  return (
    <Box ref={ref} position="relative" alignSelf="stretch" flexShrink={0} aria-hidden
      style={{ width }} {...props}>
      <Box className="hc-number" position="absolute" inset={0} opacity={0}>
        <svg width="100%" height="100%" overflow="visible"
          viewBox={`${glyph.x} ${glyph.y} ${glyph.w} ${glyph.h}`}>
          <SvgText x={0} y={0} fontFamily={fontFamily} fontSize={FONT_SIZE}
            fill={fill} stroke={stroke} strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke" {...textProps}>
            {text}
          </SvgText>
        </svg>
      </Box>
    </Box>
  )
}
