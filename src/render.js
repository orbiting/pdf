import React from 'react'
import ReactPDF from '@react-pdf/renderer'
import Document from './components/Document'
import colors from './lib/colors'

export const renderDocument = async (article, query, response) => {
  const format = article.meta.format || {}
  const formatMeta = format.meta || {}
  const formatTitle = formatMeta.title
  const formatColor = formatMeta.color || colors[formatMeta.kind]
  const formatKind = formatMeta.kind

  response.set('Content-Type', 'application/pdf')
  if (query.download) {
    const fileName = article.meta.path
      .split('/')
      .filter(Boolean)
      .join('-')
    response.set(
      'Content-Disposition',
      `attachment; filename="${fileName}.pdf"`
    )
  }

  const output = ReactPDF.renderToStream(
    <Document article={article} options={{
      formatTitle,
      formatColor,
      formatKind,
      images: query.images !== '0',
      size: query.size || 'A4'
    }} />
  )

  output.pipe(response)
}
