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
    backgroundColor: '#fff',
    marginTop: 50,
    marginLeft: 50
  }
})

const PdfDocument = ({ article, paged=false }) => {
  // If paged is true, we break each mdast child to a new page for demo reasons.
  // This should eventually become some smart logic based on element heights.
  const schema = createSchema()
  const mdast = renderMdast(article.content, schema, { MissingNode: MissingPdfNode })
  return (
    <Document>
     {paged && mdast.props.children.map(child => (
      <Page size="A4" style={styles.page}>
        {child}
      </Page>
      ))}
     {!paged && (
      <Page size="A4" style={styles.page}>
        {mdast}
      </Page>
      )}
    </Document>
  )
}

export default PdfDocument
