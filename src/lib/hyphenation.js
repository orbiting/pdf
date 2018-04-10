import createHyphenator from 'hyphen'
import patterns from 'hyphen/patterns/de'

const SOFT_HYPHEN = '\u00AD'

const hypenator = createHyphenator(patterns)

const hyphenateString = (string) => {
  if (string.includes(SOFT_HYPHEN)) {
    return string.split(SOFT_HYPHEN)
  }

  return hypenator(string).split(SOFT_HYPHEN)
}

const hyphenateWord = (glyphString) => {
  const hyphenated = hyphenateString(glyphString.string)

  let index = 0
  const parts = hyphenated.map(part => {
    const res = glyphString.slice(index, index + part.length)
    index += part.length
    return res
  })

  return parts
}

const hyphenationCallback = (words) => (
  words.map(word => hyphenateWord(word))
)

export default hyphenationCallback
