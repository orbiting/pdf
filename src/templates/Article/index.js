import React from 'react'
import { View } from '@react-pdf/core'
import {
  matchType,
  matchZone,
  matchHeading,
  matchParagraph,
  matchImageParagraph
} from 'mdast-react-render/lib/utils'
import {
  Paragraph,
  Legend,
  Image,
  TitleBlock,
  H1,
  H2,
  Lead,
  Anchor,
  List,
  Credit,
  Strong,
  Infobox
} from '../../components'

const link = {
  matchMdast: matchType('link'),
  props: node => ({
    title: node.title,
    href: node.url
  }),
  component: Anchor
}

const paragraph = {
  matchMdast: matchParagraph,
  component: Paragraph,
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
      component: Image,
      props: node => ({
        src: node.children[0].url,
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

const infobox = {
  matchMdast: matchZone('INFOBOX'),
  component: Infobox,
  rules: [
    {
      matchMdast: matchZone('FIGURE'),
      props: (node, index, parent) => ({
        size: parent.data.size,
        figureSize: parent.data.figureSize,
        figureFloat: parent.data.figureFloat
      }),
      component: Infobox.Figure,
      rules: [
        {
          matchMdast: matchImageParagraph,
          component: Infobox.Image,
          props: node => ({
            src: node.children[0].url.split('?')[0], // ?size=... breaks it.
            alt: node.children[0].alt
          }),
          isVoid: true
        }
      ]
    },
    {
      matchMdast: matchHeading(3),
      component: Infobox.Heading
    },
    paragraph
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
          props: node => ({
            center: node.data.center
          }),
          rules: [
            {
              matchMdast: matchHeading(1),
              component: H1
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
          component: ({ children }) => children,
          rules: [
            {
              matchMdast: matchHeading(2),
              component: H2
            },
            paragraph,
            figure,
            infobox,
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
                  component: List.Item,
                  props: (node, index, parent) => ({
                    node,
                    index,
                    parent
                  }),
                  rules: [
                    {
                      matchMdast: matchParagraph,
                      component: List.ItemContent,
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
