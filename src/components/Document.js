import React from 'react'
import { StyleSheet, Document, Page, Text, Font, View } from '@react-pdf/core'
import { renderMdast } from 'mdast-react-render'
import hyphenationCallback from '../lib/Hyphenation'
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
    height: 2,
    marginBottom: 10,
    backgroundColor: '#3cb842'
  },
  footer: {
    left: 30,
    bottom: 25,
    fontSize: 10,
    position: 'absolute',
    fontFamily: fontFamilies.serifTitle
  }
})

const MdastDocument = ({ article }) => {
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
    article.content,
    articleSchema,
    {
      MissingNode
    }
  )

  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        <View fixed style={styles.decorator} />
        {mdast.props.children}
        <Text fixed style={styles.footer}>REPUBLIK</Text>
      </Page>
    </Document>
  )
}

export default MdastDocument
