export const GLYPH_FONT_SIZE = 1000

// Caja real del texto a GLYPH_FONT_SIZE, sin el aire que agrega la tipografía
export function measureGlyph(text, fontFamily) {
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.font = `${GLYPH_FONT_SIZE}px ${fontFamily}`
  const m = ctx.measureText(text)
  return {
    x: -m.actualBoundingBoxLeft,
    y: -m.actualBoundingBoxAscent,
    w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
    h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
  }
}
