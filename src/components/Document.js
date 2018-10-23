import React, { Fragment } from 'react'
import { StyleSheet, Document, Page, Text, Link, Font, View } from '@react-pdf/renderer'
import { renderMdast } from 'mdast-react-render'
import hyphenationCallback from '../lib/hyphenation'
import articleSchema from '../templates/Article'
import MissingNode from './MissingNode'
import { fontFamilies } from '../lib/fonts'
import { timeFormatLocale } from 'd3-time-format'
import timeDefinition from 'd3-time-format/locale/de-CH'

const swissTime = timeFormatLocale(timeDefinition)
const generationTimeFormat = swissTime.format('%d.%m.%Y %H:%M')

// Register custom hyphenation algorithm & emoji source
Font.registerHyphenationCallback(hyphenationCallback)
Font.registerEmojiSource({ url: 'https://twemoji.maxcdn.com/2/72x72/' })

const SUPPORTED_PAGE_SIZES = ['A4', 'A5']

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingTop: 35,
    paddingBottom: 50,
    paddingHorizontal: 40
  },
  decorator: {
    marginBottom: 15
  },
  logo: {
    left: 40,
    top: 809,
    right: 40,
    fontSize: 10,
    position: 'absolute',
    fontFamily: fontFamilies.serifTitle
  },
  link: {},
  path: {
    fontSize: 8,
    color: '#000',
    left: 105,
    top: 807,
    right: 65,
    position: 'absolute',
    fontFamily: fontFamilies.sansSerifRegular,
    textDecoration: 'none'
  },
  numbers: {
    left: 40,
    right: 40,
    top: 807,
    fontSize: 8,
    textAlign: 'right',
    position: 'absolute',
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const { FRONTEND_BASE_URL } = process.env

const renderArticleLink = (article, now) => ({ pageNumber, totalPages }) => {
  const isFirst = pageNumber === 1
  const isLast = pageNumber === totalPages
  if (isFirst || isLast) {
    return [
      [FRONTEND_BASE_URL.replace(/^https?:\/\/(www\.)?/, ''), article.meta.path].join(''),
      isLast && `(PDF generiert: ${generationTimeFormat(now)})`
    ]
      .filter(Boolean)
      .join(' ')
  }
  return ''
}

const renderPageNumbers = ({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`

const isValidPageSize = size => SUPPORTED_PAGE_SIZES.includes(size.toUpperCase())

const Footer = ({ article }) => (
  <Fragment>
    <Text style={styles.logo} fixed>
      REPUBLIK
    </Text>
    <Link
      style={styles.path}
      src={FRONTEND_BASE_URL + article.meta.path}
      render={renderArticleLink(article, new Date())}
      fixed
    />
    <Text style={styles.numbers} render={renderPageNumbers} fixed />
  </Fragment>
)

const MdastDocument = ({ article, options }) => {
  let pageSize = isValidPageSize(options.size) ? options.size.toUpperCase() : 'A4'

  if (article.meta.template !== 'article') {
    return (
      <Document>
        <Page size={pageSize} style={styles.page}>
          <Text>Template «{article.meta.template}» not supported</Text>
        </Page>
      </Document>
    )
  }

  const mdast = renderMdast(
    {
      ...article.content,
      options,
      id: article.id,
      path: article.meta.path
    },
    articleSchema,
    {
      MissingNode
    }
  )

  const meta = article.meta
  const formatMeta = meta.template === 'format' ? meta : meta.format && meta.format.meta

  const formatColor = formatMeta && formatMeta.color

  return (
    <Document>
      <Page size={pageSize} style={styles.page} wrap>
        <View
          style={[
            styles.decorator,
            {
              backgroundColor: formatColor || '#000',
              height: formatColor ? 2 : 1
            }
          ]}
        />
        {mdast.props.children}
        <Footer article={article} />
      </Page>
    </Document>
  )
}

export default MdastDocument
