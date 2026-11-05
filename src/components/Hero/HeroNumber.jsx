import { useLayoutEffect, useRef, useState } from 'react'
import { Box, chakra } from '@chakra-ui/react'
import useGlyph from '../../hooks/useGlyph'

// <text> de SVG con props de estilo de Chakra (Text de Chakra renderiza <p>, inválido dentro de <svg>)
const SvgText = chakra('text')

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
  const text = String(value)
  const { glyph, fontSize } = useGlyph(text, fontFamily)

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
          <SvgText x={0} y={0} fontFamily={fontFamily} fontSize={fontSize}
            fill={fill} stroke={stroke} strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke" {...textProps}>
            {text}
          </SvgText>
        </svg>
      </Box>
    </Box>
  )
}
