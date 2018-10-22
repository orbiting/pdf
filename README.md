# Render Mdast as PDF

Implemented with [`react-pdf`](https://github.com/diegomura/react-pdf).

```sh
yarn
yarn run dev

open http://localhost:3007/example
```

## Env

```sh
API_URL=https://api.republik.ch/graphql
FRONTEND_BASE_URL=https://republik.ch
ASSETS_SERVER_BASE_URL=https://cdn.republik.space
```

You can create a local `.env` file which will be auto loaded.

## Documents sequencer fetcher

This project includes a script that runs a batch of PDF generation processes. To run it, provide your session cookie as `API_COOKIE`:

```sh
CONCURRENCY=1 API_COOKIE=connect.sid=s%... node test/renderToFile.js
```

With `DOTENV=1` you can also use your `.env` file.
