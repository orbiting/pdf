import 'regenerator-runtime/runtime'

import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core'
import ReactPDF from '@react-pdf/node'

import express from 'express'

const PORT = process.env.PORT || 3007

const server = express()

server.get('/:slug*', (req, res) => {
  console.log(req.params)

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  })

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )

  ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`)

  return res.send('Done')
})

server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`> Ready on port ${PORT}`)
})
