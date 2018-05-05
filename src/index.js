const regiment = require('regiment')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const WEB_CONCURRENCY = process.env.WEB_CONCURRENCY || 1
const WEB_MEMORY = process.env.WEB_MEMORY || 512
const MIN_MEMORY = 100

if (WEB_MEMORY < MIN_MEMORY * 2) {
  console.warn('WEB_MEMORY too small! Server will constantly spawn new workers.', {WEB_MEMORY, MIN_MEMORY})
}

const start = (workerId) => {
  const express = require('express')
  const fs = require('fs')
  const path = require('path')
  require('regenerator-runtime/runtime')

  const PORT = process.env.PORT || 3007

  const { renderDocument } = require('./render')
  const { getDocument } = require('./fetch')

  const server = express()

  server.use(regiment.middleware.MemoryFootprint(WEB_MEMORY - MIN_MEMORY))

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

  return server.listen(PORT, err => {
    if (err) throw err
    console.log(`[${workerId}] Listening on ${PORT}`)
  })
}

regiment(start, {
  numWorkers: WEB_CONCURRENCY,
  deadline: 30000
})
