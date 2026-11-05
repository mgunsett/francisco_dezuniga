import { Children } from 'react'
import { Box, Grid } from '@chakra-ui/react'
import useGlyph from '../../hooks/useGlyph'

const ICON_GAP = 0.35 // separación ícono-texto, relativa al alto de las letras

/**
 * Fila de items con un título vertical adelante, del mismo alto que los items.
 * El ancho de la columna del título sale de la proporción del texto y la de los items
 * (itemRatio = alto / ancho), así el texto llena el alto a cualquier ancho de pantalla.
 */
export function VerticalTitleRow({ title, icon: Icon, itemRatio, fontFamily = 'heading', titleClassName, children, ...props }) {
  const { glyph, font, fontSize } = useGlyph(title, fontFamily)

  const thickness = glyph.h
  const iconSpace = Icon ? thickness * (1 + ICON_GAP) : 0
  const length = iconSpace + glyph.w
  const titleColumn = (thickness / length) * itemRatio

  return (
    <Grid templateColumns={`${titleColumn}fr repeat(${Children.count(children)}, 1fr)`} {...props}>
      <Box as="h3" aria-label={title} className={titleClassName} position="relative" color="brand.white">
        <svg aria-hidden="true" width="100%" height="100%" fill="currentColor"
          viewBox={`0 ${-length} ${thickness} ${length}`} style={{ position: 'absolute', inset: 0 }}>
          {Icon && <Icon x={0} y={-thickness} size={thickness} />}
          <text transform="rotate(-90)" x={iconSpace - glyph.x} y={-glyph.y} fontFamily={font} fontSize={fontSize}>
            {title}
          </text>
        </svg>
      </Box>
      {children}
    </Grid>
  )
}
