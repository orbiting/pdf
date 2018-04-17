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
  Infobox,
  Center
} from '../../components'

const h2 = {
  matchMdast: matchHeading(2),
  component: H2
}

const link = {
  matchMdast: matchType('link'),
  props: node => ({
    title: node.title,
    href: node.url
  }),
  component: Anchor
}

const breakType = {
  matchMdast: matchType('break'),
  component: () => '\n'
}

const paragraph = {
  matchMdast: matchParagraph,
  component: Paragraph,
  rules: [
    {
      matchMdast: matchType('strong'),
      component: Strong
    },
    link,
    breakType
  ]
}

const title = {
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

const listItem = {
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

const list = {
  matchMdast: matchType('list'),
  component: List,
  props: node => ({
    data: {
      ordered: node.ordered,
      start: node.start
    }
  }),
  rules: [
    listItem
  ]
}

const quote = {
  matchMdast: matchZone('QUOTE'),
  component: ({ children }) => <View>{children}</View>
}

const embedTweet = {
  matchMdast: matchZone('EMBEDTWITTER'),
  component: ({ children }) => <View>{children}</View>
}

const center = {
  matchMdast: matchZone('CENTER'),
  component: Center,
  rules: [
    h2,
    paragraph,
    figure,
    infobox,
    list,
    quote,
    embedTweet
  ]
}

const schema = {
  rules: [
    {
      matchMdast: matchType('root'),
      component: ({ children }) => <View>{children}</View>,
      rules: [
        title,
        figure,
        center
      ]
    }
  ]
}

export default schema
