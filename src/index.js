import React from 'react'
import express from 'express'
import fs from 'fs'
import path from 'path'

import 'regenerator-runtime/runtime'
import ReactPDF from '@react-pdf/node';
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
  query getDocument($path: String!) {
    article: document(path: $path) {
      content
      meta {
        template
        path
        title
        description
        image
      }
    }
  }
`

const server = express()

const render = async (mdast, response, autoPage) => {
  const buffer = await ReactPDF.renderToStream(
    <PdfDocument article={mdast} />
  );

  response.contentType('application/pdf');
  buffer.pipe(response)
}

server.get('/example', (req, res) => {
  const api = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'example.json'), 'utf8')
  )
  render(api.data.document, res)
})

server.get('/:path*', async (req, res) => {
  const variables = {
    path: req.path
  }

  const apolloFetch = createApolloFetch({
    uri: process.env.API_URL
  })
  const api = await apolloFetch({ query, variables })

  if (!api.data.article) {
    res.status(404).end('No Article')
    return
  }
  render(api.data.article, res)
})

server.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready on port ${PORT}`)
})
