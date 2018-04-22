import React from 'react'
import express from 'express'
import fs from 'fs'
import path from 'path'
import 'regenerator-runtime/runtime'
import { createElement, pdf, PDFRenderer } from '@react-pdf/core'
import { createApolloFetch } from 'apollo-fetch'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3007

const Document = require('./components/Document').default

const query = `
  query getDocument($path: String!) {
    article: document(path: $path) {
      id
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

const render = async (article, response) => {
  const container = createElement('ROOT')
  const node = PDFRenderer.createContainer(container)

  PDFRenderer.updateContainer(
    <Document article={article} />,
    node,
    null
  )

  const output = await pdf(container).toBuffer()
  output.pipe(response)
}

server.get('/fixtures/:path', (req, res) => {
  const fixturePath = path.join(
    __dirname, '..', 'fixtures',
    `${req.path}.json`
  )
  if (!fs.existsSync(fixturePath)) {
    res.status(404).end('No Fixture Found')
    return
  }
  const api = JSON.parse(
    fs.readFileSync(fixturePath, 'utf8')
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
    res.status(404).end('No Article Found')
    return
  }
  render(api.data.article, res)
})

server.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready on port ${PORT}`)
})
