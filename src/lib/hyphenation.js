import createHyphenator from 'hyphen'
import patterns from 'hyphen/patterns/de-ch'

const SOFT_HYPHEN = '\u00AD'

const hypenator = createHyphenator(patterns)

// Mac OS Roman Code Points 222 / 223
// - https://en.wikipedia.org/wiki/Mac_OS_Roman#Codepage_layout
// - https://github.com/devongovett/fontkit/blob/e2ff84e69f83272a0f05179d537a86a462aea299/src/glyph/StandardNames.js#L19
// AGL (Adobe Glyph List Specification)
// - https://github.com/adobe-type-tools/agl-aglfn/blob/5de337bfa018e480bf15b77973e27ccdbada8e56/glyphlist.txt#L1870
// - https://github.com/adobe-type-tools/agl-aglfn/blob/5de337bfa018e480bf15b77973e27ccdbada8e56/glyphlist.txt#L1920
const standardLigatureNames = [
  'ff',
  'ffi',
  'ffl',
  'fi',
  'fl'
]

// ToDo: use glyph.isLigature once available
const isLigature = (glyph) => (
  glyph.name.indexOf('_') !== -1 || standardLigatureNames.includes(glyph.name)
)

const hyphenateString = (string) => {
  if (string.includes(SOFT_HYPHEN)) {
    return string.split(SOFT_HYPHEN)
  }

  return hypenator(string).split(SOFT_HYPHEN)
}

const endsOnLigature = (part) => {
  const glyph = part.glyphAtIndex(part.length - 1)
  return glyph && isLigature(glyph)
}

const getGlyphIndex = (string, index) => {
  let result = string.glyphIndexForStringIndex(index)

  if (!result || result === Infinity || result === -Infinity) {
    result = 0
  }

  return result
}

const hyphenateWord = (glyphString) => {
  const hyphenated = hyphenateString(glyphString.string)

  let index = 0
  let offset = 0
  const parts = []

  for (var i = 0; i < hyphenated.length; i++) {
    const part = hyphenated[i]
    const isLast = i === hyphenated.length - 1

    offset += part.length

    const startIndex = getGlyphIndex(glyphString, index)
    const endIndex = getGlyphIndex(glyphString, index + offset)
    const res = glyphString.slice(startIndex, endIndex)

    if (isLast || !endsOnLigature(res)) {
      index += offset
      offset = 0
      parts.push(res)
    }
  }

  return parts
}

const hyphenationCallback = (words) => (
  words.map(word => hyphenateWord(word))
)

export default hyphenationCallback
