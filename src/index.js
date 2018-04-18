import React from 'react'
import express from 'express'
import fs from 'fs'
import path from 'path'
import 'regenerator-runtime/runtime'
import { createElement, pdf, PDFRenderer } from '@react-pdf/core'
import { createApolloFetch } from 'apollo-fetch'
import Document from './components/Document'

const PORT = process.env.PORT || 3007

if (process.env.NODE_ENV !== 'production') {
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
        color
        format {
          meta {
            path
            title
            color
            kind
          }
        }
      }
    }
  }
`

const server = express()

const render = async (mdast, response) => {
  const container = createElement('ROOT')
  const node = PDFRenderer.createContainer(container)

  PDFRenderer.updateContainer(
    <Document article={mdast} />,
    node,
    null
  )

  const output = await pdf(container).toBuffer()
  output.pipe(response)
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
