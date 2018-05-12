import React from 'react'
import { createElement, pdf, PDFRenderer } from '@react-pdf/core'
import Document from './components/Document'

export const renderDocument = async (article, query, response) => {
  const container = createElement('ROOT')
  const node = PDFRenderer.createContainer(container)

  const format = article.meta.format || {}
  const formatMeta = format.meta || {}
  const formatTitle = formatMeta.title
  const formatColor = formatMeta.color

  PDFRenderer.updateContainer(
    <Document article={article} options={{
      formatTitle,
      formatColor,
      images: query.images !== '0',
      size: query.size || 'A4'
    }} />,
    node,
    null
  )

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

  const output = await pdf(container).toBuffer()
  output.pipe(response)
}
