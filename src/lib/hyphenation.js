import createHyphenator from 'hyphen'
import patterns from 'hyphen/patterns/de-ch'
import ligatures from './ligatures'

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
  return glyph ? ligatures.includes(glyph.name) : false
}

const hyphenateWord = (glyphString) => {
  const hyphenated = hyphenateString(glyphString.string)

  let index = 0
  let offset = 0
  const parts = []

  for (var i = 0; i < hyphenated.length; i++) {
    const part = hyphenated[i]
    offset += part.length

    const startIndex = glyphString.glyphIndexForStringIndex(index)
    const endIndex = glyphString.glyphIndexForStringIndex(index + offset)
    const res = glyphString.slice(startIndex, endIndex)

    if (!endsOnLigature(res)) {
      index += offset
      offset = 0
      parts.push(res)
    }
  }

  return parts
}

const hyphenationCallback = (words) => {
  return words.map(word => hyphenateWord(word))
}

export default hyphenationCallback
