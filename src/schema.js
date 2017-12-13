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
  component: A,
  editorModule: 'link'
}

// TODO: Use break rule in text.
const br = {
  matchMdast: matchType('break'),
  component: () => <br />,
  isVoid: true
}

const paragraph = {
  matchMdast: matchParagraph,
  component: ({ children, ...props }) => <P {...props}>{children}</P>,
  editorModule: 'paragraph',
  editorOptions: {
  },
  rules: [
    // TODO: br,
    {
      matchMdast: matchType('strong'),
      component: ({ children, ...props }) => <STRONG {...props}>{children}</STRONG>,
      editorModule: 'mark',
      editorOptions: {
        type: 'strong'
      }
    }
  ]
}

const figure = {
  matchMdast: matchZone('FIGURE'),
  component: ({ children, ...props }) => <View {...props}>{children}</View>,
  props: node => ({
    size: node.data.size
  }),
  editorModule: 'figure',
  editorOptions: {
  },
  rules: [
    {
      matchMdast: matchImageParagraph,
      component: IMG,
      props: node => ({
        src: node.children[0].url.split('?')[0],  // ?size=... breaks it.
        alt: node.children[0].alt
      }),
      editorModule: 'figureImage',
      isVoid: true
    },
    // TODO: figureCaption
  ]
}

const createSchema = (
  {
    documentEditorOptions = {},
    titleBlockAppend = null,
    repoPrefix = 'article-'
  } = {}
) => ({
  repoPrefix,
  rules: [
    {
      matchMdast: matchType('root'),
      component: ({ children, ...props }) => <View {...props}>{children}</View>,
      props: node => ({
        //meta: node.meta
      }),
      editorModule: 'documentPlain',
      editorOptions: documentEditorOptions,
      rules: [
        {
          matchMdast: () => false,
          editorModule: 'meta',
          editorOptions: {}
        },
        {
          matchMdast: matchZone('TITLE'),
          component: TITLEBLOCK,
          props: (node, index, parent) => ({
            center: node.data.center
          }),
          editorModule: 'title',
          editorOptions: {
          },
          rules: [
            {
              matchMdast: matchHeading(1),
              component: H1,
              editorModule: 'headline',
              editorOptions: {
              }
            },
            
            {
              matchMdast: (node, index) => matchParagraph(node) && index === 1,
              component: LEAD,
              editorModule: 'paragraph',
              editorOptions: {
              },
              rules: []
            },
            
            {
              matchMdast: matchParagraph,
              component: CREDIT,
              editorModule: 'paragraph',
              editorOptions: {
              },
              rules: [link]
            }
            
          ]
        },
        figure,
        {
          matchMdast: matchZone('CENTER'),
          component: ({ children, ...props }) => children,
          editorModule: 'center',
          rules: [
            /*{
              matchMdast: matchHeading(2),
              component: ({ children, ...props }) => <Text {...props}>{children}</Text>,
              editorModule: 'headline',
              editorOptions: {
               
              }
            },*/
            paragraph,
            // TODO: figure
            {
              matchMdast: matchType('list'),
              component: LIST,
              props: node => ({
                data: {
                  ordered: node.ordered,
                  start: node.start
                }
              }),
              editorModule: 'list',
              rules: [
                {
                  matchMdast: matchType('listItem'),
                  component: LISTITEM,
                  props: (node, index, parent) => ({
                    node: node,
                    index: index,
                    parent: parent
                  }),
                  editorModule: 'listItem',
                  rules: [
                    {
                      matchMdast: matchParagraph,
                      component: LISTITEMP,
                      editorModule: 'paragraph',
                      editorOptions: {
                      },
                      rules: [
                        // TODO: br
                      ]
                    }

                  ]
                }
              ]
            },
            
          ]
        },
        {
          editorModule: 'specialchars'
        }
      ]
    }
  ]
})

export default createSchema
