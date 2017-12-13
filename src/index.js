import 'regenerator-runtime/runtime'

import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core'
import ReactPDF from '@react-pdf/node'
import { createApolloFetch } from 'apollo-fetch'
//import gql from 'graphql-tag'
import PdfDocument  from './components/PdfDocument.js'
//const PdfDocument = require('../components/PdfDocument.js')

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
  //console.log(req.params)
  const { year, month, day, slug } = req.params
  const variables = {
    slug: `${year}/${month}/${day}/${slug}`
  }

  const apolloFetch = createApolloFetch({ uri: process.env.API_URL })
  const response = await apolloFetch({ query, variables })

  console.log(response)

  const container = createElement('ROOT')
  const node = PDFRenderer.createContainer(container)

  PDFRenderer.updateContainer(
    <PdfDocument article={response.data.article} />,
    node,
    null
  )

  // require('util').inspect(node, {depth: null})

  const output = await pdf(container).toBuffer()

  // res.end(buffer)
  output.pipe(res)
  // return await pdf(container).toBuffer();
})

server.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready on port ${PORT}`)
})
