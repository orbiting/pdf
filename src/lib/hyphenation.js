import createHyphenator from 'hyphen'
import patterns from 'hyphen/patterns/de-ch'

const SOFT_HYPHEN = '\u00AD'

const hypenator = createHyphenator(patterns)

const hyphenateString = (string) => {
  if (string.includes(SOFT_HYPHEN)) {
    return string.split(SOFT_HYPHEN)
  }

  return hypenator(string).split(SOFT_HYPHEN)
}

const endsOnLigature = (part) => {
  const glyph = part.glyphAtIndex(part.length - 1)
  // ToDo: use glyph.isLigature once available
  return glyph.name.indexOf('_') !== -1
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
