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
  HR,
  Lead,
  Anchor,
  List,
  Credit,
  Strong,
  Infobox,
  Figure,
  FigureGroup,
  Center,
  Quote,
  EmbedTwitter
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

const horizontalRule = {
  matchMdast: matchType('thematicBreak'),
  component: HR
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
  component: Figure,
  props: (node, index, parent, { ancestors }) => {
    const columns = parent.data && parent.data.columns
    const inCenter = !!ancestors.find(matchZone('CENTER'))

    return {
      inCenter,
      size: node.data.size,
      width: columns ? `${(100 - columns) / columns}%` : null
    }
  },
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

const figureGroup = {
  matchMdast: matchZone('FIGUREGROUP'),
  component: FigureGroup,
  rules: [
    figure
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
            src: node.children[0].url,
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

const pullQuote = {
  matchMdast: matchZone('QUOTE'),
  component: Quote,
  props: node => ({
    size: node.data.size
  }),
  rules: [
    figure,
    {
      matchMdast: matchParagraph,
      component: Quote.Text
    }
  ]
}

const embedTweet = {
  matchMdast: matchZone('EMBEDTWITTER'),
  props: node => node.data,
  component: EmbedTwitter
}

const center = {
  matchMdast: matchZone('CENTER'),
  component: Center,
  rules: [
    h2,
    pullQuote,
    paragraph,
    figure,
    figureGroup,
    infobox,
    list,
    embedTweet,
    horizontalRule
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
