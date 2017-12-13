import 'regenerator-runtime/runtime'

import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core'
import ReactPDF from '@react-pdf/node'
import { createApolloFetch } from 'apollo-fetch'
//import gql from 'graphql-tag'
import PdfDocument  from './components/PdfDocument.js'
//const PdfDocument = require('../components/PdfDocument.js')


const dotenv = require('dotenv')

const DEV = process.env.NODE_ENV
  ? process.env.NODE_ENV !== 'production'
  : true
if (DEV || process.env.DOTENV) {
  dotenv.config()
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

server.get('/:year/:month/:day/:slug*', (req, res) => {
  //console.log(req.params)
  const { year, month, day, slug } = req.params
  const variables = {
    slug: `${year}/${month}/${day}/${slug}`
  }

  const apolloFetch = createApolloFetch({ uri: process.env.API_URL })
  apolloFetch({ query, variables })
    .then(data => {
      //console.log('data', data.data.article.content)
      const filename = `${__dirname}/files/${year}-${month}-${day}-${slug}.pdf`

      ReactPDF.render(<PdfDocument article={data.data.article} />, filename)
        .then(
          // TODO: use stream
          //res.set('Content-Type', 'application/pdf')
          //setTimeout(undefined, 3000)
          res.sendFile(filename)
        )
        .catch(error => {
          console.log(error)
          return res.send('Error')
        })
    })
    .catch(e => console.log(e))
})

server.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready on port ${PORT}`)
})
