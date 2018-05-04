const rw = require('rw')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

// GraphQL Query
// {
//   documents {
//     nodes {
//       meta {
//         path
//         template
//       }
//     }
//   }
// }
const docs = JSON.parse(rw.readFileSync('/dev/stdin', 'utf8')).data.documents.nodes
  .filter(doc => !doc.meta.template || doc.meta.template === 'article')
  // .slice(231)

async function fetchDocs (docs) {
  for (const doc of docs) {
    await fetch(`http://localhost:3007${doc.meta.path}`)
      .then(res => res.buffer())
      .then(buffer => {
        const file = path.join(
          __dirname,
          'out',
          `${doc.meta.path.replace(/\//g, ' ').trim().replace(/ /g, '-')}.pdf`
        )
        fs.writeFileSync(file, buffer)
      })
      .catch(err => {
        console.error('Broken', doc.meta.path, err)
        process.exit()
      })
  }
}

fetchDocs(docs)
