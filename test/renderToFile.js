const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { queue } = require('d3-queue')
const { createApolloFetch } = require('apollo-fetch')
const { version } = require('@react-pdf/renderer')

if (process.env.DOTENV) {
  require('dotenv').config()
}

const {
  CONCURRENCY = 1,
  BASE_URL = 'http://localhost:3007',
  API_URL = 'https://api.republik.ch/graphql',
  OFFSET = 0,
  FIRST = 500
} = process.env

const query = `
{
  documents(first: ${FIRST}, template: "article") {
    totalCount
    nodes {
      meta {
        path
        template
      }
    }
  }
}
`

const apolloFetch = createApolloFetch({
  uri: API_URL
})

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {}
  }
  options.headers.Cookie = process.env.API_COOKIE

  next()
})

const run = async () => {
  const fetchDocs = await apolloFetch({ query })

  const docs = fetchDocs.data.documents.nodes
    .filter(doc => !doc.meta.template || doc.meta.template === 'article')
    .slice(+OFFSET)

  let docsCount = 0
  const docsAmount = docs.length

  console.log(`React-pdf version: ${version}`)
  console.log(`Run ${CONCURRENCY}x, start index ${+OFFSET}, ${docsAmount} docs`)

  const outDir = path.join(__dirname, 'out')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
  }

  function fetchDoc (doc) {
    return fetch(`${BASE_URL}${doc.meta.path}`)
      .then(res => res.buffer())
      .then(buffer => {
        const file = path.join(
          outDir,
          `${doc.meta.path
            .replace(/\//g, ' ')
            .trim()
            .replace(/ /g, '-')}.pdf`
        )
        fs.writeFileSync(file, buffer)
        console.log(`${++docsCount}/${docsAmount} -  Done ${doc.meta.path}`)
        return {
          doc
        }
      })
      .catch(err => {
        console.error('Broken', doc.meta.path, err)
        return {
          doc,
          err
        }
      })
  }

  const queueDocs = ({ docs, onError, onFinish }) => {
    const q = queue(+CONCURRENCY)
    docs.forEach(doc =>
      q.defer(callback => {
        fetchDoc(doc).then(info => {
          if (info.err && onError) {
            onError(info)
          }
          callback()
        })
      })
    )
    q.awaitAll(error => {
      if (error) throw error
      onFinish && onFinish()
    })
  }

  const brokenDocs = []
  queueDocs({
    docs,
    onError: ({ doc }) => {
      brokenDocs.push(doc)
    },
    onFinish: () => {
      if (brokenDocs.length) {
        const retryFails = []
        console.log(`Retrying ${brokenDocs.length} docs`)
        queueDocs({
          docs: brokenDocs,
          onError: ({ doc }) => {
            retryFails.push(doc)
          },
          onFinish: () => {
            if (retryFails.length) {
              console.log(`Failed:\n${retryFails.map(doc => `- ${doc.meta.path}\n`).join('')}`)
            }
            const success = 1 - retryFails.length / docs.length
            console.log(`${Math.round(success * 100)}% success`)
            process.exit(success < 1 ? 1 : 0)
          }
        })
        return
      }
      console.log('100% success')
      process.exit(0)
    }
  })
}

run()
