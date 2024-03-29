import React from 'react'
import { View } from '@react-pdf/renderer'
import {
  matchType,
  matchZone,
  matchHeading,
  matchParagraph,
  matchImage,
  matchImageParagraph,
  imageSizeInfo
} from 'mdast-react-render/lib/utils'
import {
  H1,
  H2,
  HR,
  Sup,
  Sub,
  Subject,
  Lead,
  Note,
  List,
  Image,
  Legend,
  Credit,
  Figure,
  Center,
  Anchor,
  Infobox,
  Paragraph,
  PullQuote,
  Editorial,
  TitleBlock,
  BlockQuote,
  EmbedVideo,
  Interaction,
  FigureGroup,
  EmbedTwitter
} from '../../components'

const matchImagesParagraph = node =>
  matchImageParagraph(node) ||
  (matchParagraph(node) &&
    node.children.length === 3 &&
    matchImage(node.children[0]) &&
    matchImage(node.children[2]))

const matchFigure = matchZone('FIGURE')
const matchLast = (node, index, parent) => index === parent.children.length - 1

const mdastToString = node =>
  node
    ? node.value ||
      (node.children && node.children.map(mdastToString).join('')) ||
      ''
    : ''

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
    component: Interaction.Strong
  },
  {
    matchMdast: matchType('emphasis'),
    component: Interaction.Emphasis
  },
  link
]

const editorialParagraphRules = [
  ...globalInlines,
  {
    matchMdast: matchType('strong'),
    component: Editorial.Strong,
    rules: [
      {
        matchMdast: matchType('emphasis'),
        component: Editorial.StrongEmphasis
      },
      ...globalInlines,
      link
    ]
  },
  {
    matchMdast: matchType('emphasis'),
    component: Editorial.Emphasis,
    rules: [
      {
        matchMdast: matchType('strong'),
        component: Editorial.StrongEmphasis
      },
      ...globalInlines,
      link
    ]
  },
  link
]

const h2 = {
  matchMdast: matchHeading(2),
  component: H2,
  rules: globalInlines
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

const mdastPlaceholder = '\u2063'
const title = {
  matchMdast: matchZone('TITLE'),
  component: TitleBlock,
  props: (node, index, parent, { ancestors }) => {
    const rootNode = ancestors[ancestors.length - 1]
    const { formatTitle, formatColor } = rootNode.options

    return {
      formatTitle,
      formatColor,
      center: node.data.center
    }
  },
  rules: [
    {
      matchMdast: matchHeading(1),
      component: ({ children, kind }) => <H1 kind={kind}>{children}</H1>,
      props: (node, index, parent, { ancestors }) => {
        const rootNode = ancestors[ancestors.length - 1]
        const { formatKind } = rootNode.options
        return {
          kind: formatKind
        }
      },
      rules: globalInlines
    },
    {
      matchMdast: matchHeading(2),
      component: Subject
    },
    {
      matchMdast: (node, index, parent) => {
        const numHeadings = parent.children.filter(
          child => child.type === 'heading'
        ).length
        return (
          matchParagraph(node) &&
          index === numHeadings
        )
      },
      component: ({ children, ...props }) => {
        if (
          children &&
          children.length === 1 &&
          children[0] === mdastPlaceholder
        ) {
          return null
        }
        return <Lead {...props}>{children}</Lead>
      }
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
    ...interactionParagraphRules
  ]
}

const getImageProps = (node, index, parent, { ancestors }) => {
  const rootNode = ancestors[ancestors.length - 1]
  return {
    src: node.children[0].url,
    alt: node.children[0].alt,
    skip: !rootNode.options.images,
    isCover: (
      ancestors.length === 2 &&
      rootNode.children.indexOf(parent) === 0
    )
  }
}

const figure = {
  matchMdast: matchZone('FIGURE'),
  component: ({ empty, isCover, aspectRatio, ...props }) => {
    if (empty) {
      return null
    }

    if (isCover && aspectRatio && aspectRatio < 0.9 && props.size !== 'tiny') {
      return (
        <Center>
          <Figure {...props} />
        </Center>
      )
    }

    return <Figure {...props} />
  },
  props: (node, index, parent, { ancestors }) => {
    const rootNode = ancestors[ancestors.length - 1]
    const columns = parent.data && parent.data.columns
    const inCenter = !!ancestors.find(matchZone('CENTER'))
    const isCover = ancestors[0].type === 'root'
    const image = node.children.find(matchImagesParagraph).children[0]
    const srcSize = image && imageSizeInfo(image.url)
    const aspectRatio = srcSize && srcSize.width / srcSize.height

    return {
      isCover,
      inCenter,
      aspectRatio,
      size: rootNode.options.images
        ? node.data.size
        : undefined,
      width: columns ? `${(100 - columns) / columns}%` : null,
      skip: !rootNode.options.images,
      empty: (
        !rootNode.options.images &&
        node.children.length === 1 &&
        matchImagesParagraph(node.children[0]) &&
        !node.children[0].children[0].alt
      )
    }
  },
  rules: [
    {
      matchMdast: matchImagesParagraph,
      component: Image,
      props: getImageProps,
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

const makeListRule = (Base, paragraphRules) => ({
  matchMdast: matchType('list'),
  component: Base,
  props: node => ({
    data: {
      ordered: node.ordered,
      start: node.start
    }
  }),
  rules: [
    {
      matchMdast: matchType('listItem'),
      component: Base.Item,
      props: (node, index, parent) => ({
        node,
        index,
        parent
      }),
      rules: [
        {
          matchMdast: matchParagraph,
          component: Base.ItemContent,
          rules: paragraphRules
        }
      ]
    }
  ]
})

const infobox = {
  matchMdast: matchZone('INFOBOX'),
  component: Infobox,
  props: (node) => ({
    wrap: mdastToString(node).length > 500
  }),
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
          matchMdast: matchImagesParagraph,
          component: Infobox.Image,
          props: getImageProps,
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
      matchMdast: matchHeading(4),
      component: Infobox.Heading2
    },
    {
      matchMdast: matchParagraph,
      component: Infobox.Paragraph,
      rules: interactionParagraphRules
    },
    makeListRule(Infobox.List, interactionParagraphRules)
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
      component: View,
      rules: [
        {
          matchMdast: matchParagraph,
          component: BlockQuote.Text
        }
      ]
    },
    legend
  ]
}

const embedTweet = {
  matchMdast: matchZone('EMBEDTWITTER'),
  props: node => node.data,
  component: EmbedTwitter
}

const embedVideo = {
  matchMdast: matchZone('EMBEDVIDEO'),
  component: EmbedVideo,
  props: (node, index, parent, { ancestors }) => {
    const rootNode = ancestors[ancestors.length - 1]
    return {
      data: {
        ...node.data,
        url: node.children[0].children[0].url,
        skip: !rootNode.options.images
      }
    }
  }
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
    makeListRule(List, editorialParagraphRules),
    note,
    embedTweet,
    embedVideo,
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
