import { createApolloFetch } from 'apollo-fetch'

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

const apolloFetch = createApolloFetch({
  uri: process.env.API_URL
})

export const getDocument = ({ path }) => apolloFetch({
  query,
  variables: {
    path
  }
})
