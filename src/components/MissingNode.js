import React from 'react'
import {
  Text
} from '@react-pdf/renderer'
import RenderAsImage from './RenderAsImage'

export default ({ node, ancestors, children }) => {
  const message = `Missing Markdown node type "${node.type}" ${node.identifier ? `with identifier "${node.identifier}"` : ''} `
  console.warn(message)

  // ignore missing inline, render children (text)
  if (ancestors.find(parent => parent.type === 'paragraph')) {
    return <Text>{children}</Text>
  }

  return (
    <RenderAsImage node={node} ancestors={ancestors} />
  )
}
