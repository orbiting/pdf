import React from 'react'
import express from 'express'
import fs from 'fs'
import path from 'path'

import 'regenerator-runtime/runtime'
import {
  createElement, pdf, PDFRenderer,
  Page, Text, View, Document, StyleSheet
} from '@react-pdf/core'

import { createApolloFetch } from 'apollo-fetch'
import PdfDocument  from './components/PdfDocument.js'

const PORT = process.env.PORT || 3007
const DEV = process.env.NODE_ENV !== 'production'

if (DEV) {
  require('dotenv').config()
}

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

const render = async (mdast, response, autoPage) => {
  const container = createElement('ROOT')
  const node = PDFRenderer.createContainer(container)

  // Remove autoPage prop to render everything on one page
  PDFRenderer.updateContainer(
    <PdfDocument article={mdast} autoPage={autoPage} />,
    node,
    null
  )

  // we could measure text here
  // console.log(
  //   node.containerInfo.document.root.heightOfString('Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt. Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.', {
  //     width: 400
  //   })
  // )

  // or walk and split tree here
  // console.log(
  //   require('util').inspect(
  //     node.containerInfo.document
  //       .children[0], // Page
  //     {depth: 3}
  //   )
  // )

  const output = await pdf(container).toBuffer()
  output.pipe(response)
}

server.get('/example', (req, res) => {
  const api = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'example.json'), 'utf8')
  )
  render(api.data.document, res, req.query.autoPage !== undefined)
})

server.get('/:year/:month/:day/:slug*', async (req, res) => {
  const { year, month, day, slug } = req.params
  const variables = {
    slug: `${year}/${month}/${day}/${slug}`
  }

  const apolloFetch = createApolloFetch({
    uri: process.env.API_URL
  })
  const api = await apolloFetch({ query, variables })

  if (!api.data.article) {
    res.status(404).end('No Article')
  }
  render(api.data.article, res, req.query.autoPage !== undefined)
})

server.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready on port ${PORT}`)
})
