import createHyphenator from 'hyphen'
import patterns from 'hyphen/patterns/de-ch-1901'

const SOFT_HYPHEN = '\u00AD'

const hypenator = createHyphenator(patterns)

const hyphenate = (string) => {
  if (string.includes(SOFT_HYPHEN)) {
    return string.split(SOFT_HYPHEN).filter(Boolean)
  }

  return hypenator(string).split(SOFT_HYPHEN)
}

export default hyphenate
