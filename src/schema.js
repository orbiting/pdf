import React from 'react'

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core'
import { P, IMG, TITLEBLOCK, H1, LEAD, A, LIST, LISTITEM, LISTITEMP, CREDIT, STRONG } from './components/index.js'

import {
  matchType,
  matchZone,
  matchHeading,
  matchParagraph,
  matchImageParagraph
} from 'mdast-react-render/lib/utils'

const matchLast = (node, index, parent) => index === parent.children.length - 1

const link = {
  matchMdast: matchType('link'),
  props: node => ({
    title: node.title,
    href: node.url
  }),
  component: A
}

const paragraph = {
  matchMdast: matchParagraph,
  component: P,
  rules: [
    {
      matchMdast: matchType('strong'),
      component: STRONG
    }
  ]
}

const figure = {
  matchMdast: matchZone('FIGURE'),
  component: ({ children, ...props }) => <View {...props}>{children}</View>,
  props: node => ({
    size: node.data.size
  }),
  rules: [
    {
      matchMdast: matchImageParagraph,
      component: IMG,
      props: node => ({
        src: node.children[0].url.split('?')[0],  // ?size=... breaks it.
        alt: node.children[0].alt
      }),
      isVoid: true
    }
  ]
}

const schema = {
  rules: [
    {
      matchMdast: matchType('root'),
      component: ({ children }) => <View>{children}</View>,
      rules: [
        {
          matchMdast: matchZone('TITLE'),
          component: TITLEBLOCK,
          props: (node, index, parent) => ({
            center: node.data.center
          }),
          rules: [
            {
              matchMdast: matchHeading(1),
              component: H1,
            },
            
            {
              matchMdast: (node, index) => matchParagraph(node) && index === 1,
              component: LEAD,
              rules: []
            },
            
            {
              matchMdast: matchParagraph,
              component: CREDIT,
              rules: [link]
            }
            
          ]
        },
        figure,
        {
          matchMdast: matchZone('CENTER'),
          component: ({ children, ...props }) => <View>{children}</View>,
          rules: [
            paragraph,
            {
              matchMdast: matchType('list'),
              component: LIST,
              props: node => ({
                data: {
                  ordered: node.ordered,
                  start: node.start
                }
              }),
              rules: [
                {
                  matchMdast: matchType('listItem'),
                  component: LISTITEM,
                  props: (node, index, parent) => ({
                    node: node,
                    index: index,
                    parent: parent
                  }),
                  rules: [
                    {
                      matchMdast: matchParagraph,
                      component: LISTITEMP,
                      rules: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default schema
