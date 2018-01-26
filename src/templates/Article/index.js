import React from 'react'

import { View } from '@react-pdf/core'
import { P, Legend, Img, TitleBlock, H1, Lead, A, List, ListItem, ListItemP, Credit, Strong } from '../../components'

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
      component: Strong
    },
    link
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
      component: Img,
      props: node => ({
        src: node.children[0].url.split('?')[0],  // ?size=... breaks it.
        alt: node.children[0].alt
      }),
      isVoid: true
    },
    {
      ...paragraph,
      component: Legend
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
          component: TitleBlock,
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
              component: Lead,
              rules: []
            },
            
            {
              matchMdast: matchParagraph,
              component: Credit,
              rules: [link]
            }
            
          ]
        },
        figure,
        {
          matchMdast: matchZone('CENTER'),
          component: ({ children, ...props }) => children,
          rules: [
            paragraph,
            figure,
            {
              matchMdast: matchType('list'),
              component: List,
              props: node => ({
                data: {
                  ordered: node.ordered,
                  start: node.start
                }
              }),
              rules: [
                {
                  matchMdast: matchType('listItem'),
                  component: ListItem,
                  props: (node, index, parent) => ({
                    node: node,
                    index: index,
                    parent: parent
                  }),
                  rules: [
                    {
                      matchMdast: matchParagraph,
                      component: ListItemP,
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
