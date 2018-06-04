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

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {}
  }
  options.headers['Authorization'] = process.env.API_AUTHORIZATION_HEADER

  next()
})

export const getDocument = ({ path }) => apolloFetch({
  query,
  variables: {
    path
  }
})
