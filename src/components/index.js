import React, { Component } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Link
} from '@react-pdf/core'
import ReactPDF from '@react-pdf/node'

// has issues.
/*Font.register(`${__dirname}/fonts/gt-america-standard-regular.ttf`, {
  family: 'GT America Regular',
})*/

const styles = StyleSheet.create({
  page: {
    //flexDirection: 'row',
    backgroundColor: '#fff'
  },
  section: {
    width: 500,
    marginTop: 10,
    marginBottom: 10
  },
  titleblock: {
    width: 500,
    marginTop: 30,
    marginBottom: 10
  },
  text: {
    columns: 2,
    color: 'green',
    width: 400,
    fontSize: 12,
    lineHeight: 2, // not supported.
    //align: 'justify'
    //fontFamily: 'GT America Regular',  
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',  // not supported.
    marginBottom: 5
  },
  lead: {
    fontSize: 17,
    marginBottom: 5
  },
  credit: {
    fontSize: 12
  },
  listitem: {
    fontSize: 12
  },
  link: {
    color: 'blue'
  },
  missing: {
    backgroundColor: '#FF5555',
    fontSize: 12
  },
  image: { backgroundColor: 'grey', padding: 0, maxWidth: 500 },
  item: {
    flexDirection: 'row',
    marginBottom: 5
  },
  itemLeftColumn: {
    flexDirection: 'column',
    marginRight: 10
  },
  itemRightColumn: {
    flexDirection: 'column',
    flexGrow: 9
  },
  bulletPoint: {
    fontSize: 12
  },
  itemContent: {
    fontSize: 10
  }
})

Font.register(`${__dirname}/fonts/gt-america-standard-regular.ttf`, {
  family: 'GT America Regular'
})

export const MissingPdfNode = ({ node, children }) => (
  <View style={styles.section}>
    <Text style={styles.missing}>
      Missing Markdown node type "{node.type}"
      {node.identifier ? `with identifier "${node.identifier}"` : ''}{' '}
    </Text>
  </View>
)

// Create Document Component

export const TITLEBLOCK = ({ children, ...props }) => (
  <View {...props} style={styles.titleblock}>
    {children}
  </View>
)

export class P extends Component {
  constructor (...args) {
    super(...args)
    this.setRef = ref => {
      this.p = ref
    }
  }
  componentDidMount () {
    console.log(this.p.getHeight(400))
  }
  render () {
    const { children } = this.props
    return (
      <View style={styles.section}>
        <Text ref={this.setRef} style={styles.text}>{children}</Text>
      </View>
    )
  }
}

export const A = ({ children }) => {
  return <Link style={styles.link}>{children}</Link>
}

export const H1 = ({ children }) => {
  return <Text style={styles.headline}>{children}</Text>
}

// Create Document Component
export const LEAD = ({ children }) => {
  return <Text style={styles.lead}>{children}</Text>
}

export const CREDIT = ({ children }) => {
  //console.log('CREDIT', children)
  return <Text style={styles.credit}>{children}</Text>
}

export const IMG = ({ src }) => {
  return <Image style={styles.image} src={src} />
}

export const LIST = ({ data, children }) => {
  //console.log('LIST', data)
  return <View style={styles.section}>{children}</View>
}

export const LISTITEM = ({ node, index, parent, children }) => {
  //console.log('LISTITEM', parent.ordered)
  const bullet = parent.ordered ? `${index + 1}.` : '–'
  return (
    <View style={styles.item}>
      <View style={styles.itemLeftColumn}>
        <Text style={styles.bulletPoint}>{bullet}</Text>
      </View>
      <View style={styles.itemRightColumn}>{children}</View>
    </View>
  )
}
export const LISTITEMP = ({ children }) => {
  return <Text style={styles.listitem}>{children}</Text>
}
