const throng = require('throng')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const WEB_CONCURRENCY = process.env.WEB_CONCURRENCY || 1

const start = (workerId) => {
  const express = require('express')
  const fs = require('fs')
  const path = require('path')
  require('regenerator-runtime/runtime')

  const PORT = process.env.PORT || 3007

  const { renderDocument } = require('./render')
  const { getDocument } = require('./fetch')

  const server = express()

  const stripDotPdf = path => path.replace(/\.pdf$/, '')

  server.get('/fixtures/:path', (req, res) => {
    const fixturePath = path.join(
      __dirname, '..', 'fixtures',
      `${stripDotPdf(req.params.path)}.json`
    )
    if (!fs.existsSync(fixturePath)) {
      res.status(404).end('No Fixture Found')
      return
    }
    const api = JSON.parse(
      fs.readFileSync(fixturePath, 'utf8')
    )
    renderDocument(api.data.document, req.query, res)
  })

  server.get('/:path*', async (req, res) => {
    const api = await getDocument({
      path: stripDotPdf(req.path)
    })

    if (!api.data.article) {
      res.status(404).end('No Article Found')
      return
    }
    renderDocument(api.data.article, req.query, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`[${workerId}] Listening on ${PORT}`)
  })
}

throng({
  workers: WEB_CONCURRENCY,
  lifetime: Infinity
}, start)
