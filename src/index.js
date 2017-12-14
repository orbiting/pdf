import 'regenerator-runtime/runtime'

import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core'
import ReactPDF from '@react-pdf/node'
import { createApolloFetch } from 'apollo-fetch'
import PdfDocument  from './components/PdfDocument.js'

import { createElement, pdf, PDFRenderer } from '@react-pdf/core';

const DEV = process.env.NODE_ENV
  ? process.env.NODE_ENV !== 'production'
  : true
if (DEV || process.env.DOTENV) {
  require('dotenv').config()
}

import express from 'express'

const PORT = process.env.PORT || 3007
console.log('env', process.env.API_URL)

//const uri = 'http://localhost:3020/graphql'
const query = `
  query getDocument($slug: String!) {
    article: document(slug: $slug) {
      content
      meta {
        template
        slug
        title
        description
        image
      }
    }
  }
`

const server = express()

server.use(express.static('static'))
//http://localhost:3007/2017/12/08/daniels-artikel

server.get('/:year/:month/:day/:slug*', async (req, res) => {
  const { year, month, day, slug } = req.params
  const variables = {
    slug: `${year}/${month}/${day}/${slug}`
  }

  const apolloFetch = createApolloFetch({ uri: process.env.API_URL })
  const response = await apolloFetch({ query, variables })

  const container = createElement('ROOT')
  const node = PDFRenderer.createContainer(container)

  // Remove paged prop to render everything on one page.
  // TODO: Implement paging logic based on element heights.
  PDFRenderer.updateContainer(
    <PdfDocument article={response.data.article} paged={!!req.query.paged} />,
    node,
    null
  )

  // measure text here
  console.log(
    node.containerInfo.document.root.heightOfString('Hallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo HalloHallo Hallo', {
      width: 400
    })
  )

  // walk tree
  console.log(
    require('util').inspect(
      node.containerInfo.document
        .children[0] // Page
        .children[1], // Mdast Root
      {depth: 3}
    )
  )

  const output = await pdf(container).toBuffer()
  output.pipe(res)
})

server.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready on port ${PORT}`)
})
