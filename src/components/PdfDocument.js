import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/core'
import ReactPDF from '@react-pdf/node'
//import { createApolloFetch } from 'apollo-fetch'
//import gql from 'graphql-tag'
import { renderMdast } from 'mdast-react-render'
import createSchema from '../schema'
import { MissingPdfNode } from './index.js'

const util = require('util')


const styles = StyleSheet.create({
  page: {
    //flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 50,
    marginLeft: 50
    //padding: 20,
  },
  pageTitle: {
    fontSize: 10,
    align: 'center',
    width: 500
  }
})

const PdfDocument = ({ article }) => {
  //console.log('CONTENT', article.content)
  const schema = createSchema()
  const pageTitle = `PDF proof-of-concept for: ${article.meta.title}`
  const mdast = renderMdast(article.content, schema, { MissingNode: MissingPdfNode })
  console.log(util.inspect(mdast, {depth: null}))
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageTitle}>{pageTitle}</Text>
        {mdast}
      </Page>
    </Document>
  )
}

export default PdfDocument
