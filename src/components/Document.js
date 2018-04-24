import React, { Fragment } from 'react'
import { StyleSheet, Document, Page, Text, Font, View } from '@react-pdf/core'
import { renderMdast } from 'mdast-react-render'
import hyphenationCallback from '../lib/hyphenation'
import articleSchema from '../templates/Article'
import MissingNode from './MissingNode'
import { fontFamilies } from '../lib/fonts'

// Register custom hyphenation algorithm
Font.registerHyphenationCallback(hyphenationCallback)

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingTop: 35,
    paddingBottom: 50,
    paddingHorizontal: 40
  },
  decorator: {
    height: 1,
    marginBottom: 15,
    backgroundColor: '#000'
  },
  logo: {
    left: 40,
    bottom: 25,
    fontSize: 10,
    position: 'absolute',
    fontFamily: fontFamilies.serifTitle
  },
  path: {
    left: 105,
    bottom: 28,
    fontSize: 8,
    position: 'absolute',
    fontFamily: fontFamilies.sansSerifRegular
  },
  numbers: {
    right: 40,
    bottom: 25,
    fontSize: 10,
    position: 'absolute',
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const renderArticleLink = article => ({ pageNumber, totalPages }) => {
  if (
    pageNumber === 1 ||
    pageNumber === totalPages
  ) {
    return `republik.ch${article.content.meta.path}`
  }

  return ''
}

const renderPageNumbers = ({ pageNumber, totalPages }) => (
  `${pageNumber} / ${totalPages}`
)

const Footer = ({ article }) => (
  <Fragment>
    <Text style={styles.logo} fixed>REPUBLIK</Text>
    <Text style={styles.path} render={renderArticleLink(article)} fixed />
    <Text style={styles.numbers} render={renderPageNumbers} fixed />
  </Fragment>
)

const MdastDocument = ({ article, options }) => {
  if (article.meta.template !== 'article') {
    return (
      <Document>
        <Page size='A4' style={styles.page}>
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
  const formatMeta = meta.template === 'format'
    ? meta
    : meta.format && meta.format.meta

  const formatColor = formatMeta && formatMeta.color
  const decoratorStyle = formatColor
    ? StyleSheet.create({
      decorator: {
        height: 2,
        marginBottom: 15,
        backgroundColor: formatColor
      }
    }).decorator
    : styles.decorator

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <View style={decoratorStyle} fixed />
        {mdast.props.children}
        <Footer article={article} />
      </Page>
    </Document>
  )
}

export default MdastDocument
