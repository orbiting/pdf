import React from 'react'
import {
  Text
} from '@react-pdf/renderer'

import { getRanges } from '../lib/ranges'
import RenderAsImage from './RenderAsImage'

const IGNORE_IDENTIFIERS = ['SERIES_NAV', 'ARTICLECOLLECTION']

export default ({ node, ancestors, children }) => {
  if (node.identifier && IGNORE_IDENTIFIERS.includes(node.identifier)) {
    return null
  }

  console.warn(`Missing Markdown node type "${node.type}" ${node.identifier ? `with identifier "${node.identifier}"` : ''} (${getRanges({ node, ancestors }).join(':')})`)

  // ignore missing inline, render children (text)
  if (ancestors.find(parent => parent.type === 'paragraph')) {
    return <Text>{children}</Text>
  }

  return (
    <RenderAsImage node={node} ancestors={ancestors} />
  )
}
