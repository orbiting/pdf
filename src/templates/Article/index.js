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
  Sup,
  Sub,
  Lead,
  Note,
  Anchor,
  List,
  Credit,
  Infobox,
  Figure,
  Editorial,
  Interaction,
  FigureGroup,
  Center,
  PullQuote,
  BlockQuote,
  EmbedTwitter
} from '../../components'

const matchFigure = matchZone('FIGURE')
const matchLast = (node, index, parent) => index === parent.children.length - 1

const globalInlines = [
  {
    matchMdast: matchType('sub'),
    component: Sub
  },
  {
    matchMdast: matchType('sup'),
    component: Sup
  },
  {
    matchMdast: matchType('break'),
    component: () => '\n'
  }
]

const link = {
  matchMdast: matchType('link'),
  props: node => ({
    title: node.title,
    href: node.url
  }),
  component: Anchor
}

const interactionParagraphRules = [
  ...globalInlines,
  {
    matchMdast: matchType('strong'),
    component: Interaction.Emphasis
  },
  {
    matchMdast: matchType('emphasis'),
    component: Interaction.Cursive
  },
  link
]

const editorialParagraphRules = [
  ...globalInlines,
  {
    matchMdast: matchType('strong'),
    component: Editorial.Emphasis
  },
  {
    matchMdast: matchType('emphasis'),
    component: Editorial.Cursive
  },
  link
]

const h2 = {
  matchMdast: matchHeading(2),
  component: H2
}

const paragraph = {
  matchMdast: matchParagraph,
  component: Paragraph,
  rules: editorialParagraphRules
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
      rules: interactionParagraphRules
    }
  ]
}

const legendEmphasis = {
  matchMdast: matchType('emphasis'),
  component: Legend.Credit
}

const legend = {
  matchMdast: matchParagraph,
  component: Legend,
  rules: [
    legendEmphasis,
    ...editorialParagraphRules
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
    legend
  ]
}

const figureGroup = {
  matchMdast: matchZone('FIGUREGROUP'),
  component: FigureGroup,
  rules: [
    figure,
    legend
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
        },
        legend
      ]
    },
    {
      matchMdast: matchHeading(3),
      component: Infobox.Heading
    },
    {
      matchMdast: matchParagraph,
      component: Infobox.Paragraph,
      rules: interactionParagraphRules
    }
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
      ...paragraph,
      component: List.ItemContent
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
  component: PullQuote,
  props: node => ({
    size: node.data.size,
    hasFigure: !!node.children.find(matchFigure)
  }),
  rules: [
    {
      ...figure,
      component: PullQuote.Figure
    },
    {
      matchMdast: (node, index, parent) => (
        matchParagraph(node) &&
          (
            index === 0 ||
            (index === 1 && matchFigure(parent.children[0])) ||
            !matchLast(node, index, parent)
          )
      ),
      component: PullQuote.Text
    },
    {
      matchMdast: (node, index, parent) =>
        matchParagraph(node) &&
        matchLast(node, index, parent),
      component: PullQuote.Source,
      rules: [...globalInlines, link]
    }
  ]
}

const blockQuote = {
  matchMdast: matchZone('BLOCKQUOTE'),
  component: BlockQuote,
  rules: [
    {
      matchMdast: matchType('blockquote'),
      component: BlockQuote.Text
    },
    legend
  ]
}

const embedTweet = {
  matchMdast: matchZone('EMBEDTWITTER'),
  props: node => node.data,
  component: EmbedTwitter
}

const note = {
  matchMdast: matchZone('NOTE'),
  component: props => props.children,
  rules: [{
    matchMdast: matchParagraph,
    component: Note,
    rules: interactionParagraphRules
  }]
}

const center = {
  matchMdast: matchZone('CENTER'),
  component: Center,
  rules: [
    h2,
    pullQuote,
    blockQuote,
    paragraph,
    figure,
    figureGroup,
    infobox,
    list,
    note,
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
