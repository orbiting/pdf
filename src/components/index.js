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
    marginTop: 20,
    marginBottom: 40
  },
  legend: {
    marginTop: 5,
    marginBottom: 10,
    width: 500,
    fontSize: 12
  },
  text: {
    // columns: 2,
    width: 500,
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 2, // not supported.
    // align: 'justify'
    // fontFamily: 'Rubis Regular',
  },
  headline: {
    fontSize: 28,
    marginBottom: 5,
    // fontFamily: 'Republik',
  },
  subheadline: {
    fontSize: 22,
    marginBottom: 5,
    // fontFamily: 'Republik',
  },
  lead: {
    fontSize: 16,
    marginBottom: 5,
    // fontFamily: 'Rubis Regular',
  },
  credit: {
    fontSize: 12,
    // fontFamily: 'GT America Regular'
  },
  listitem: {
    fontSize: 13,
    // fontFamily: 'Rubis Regular',
  },
  link: {
    color: '#00508C',
    fontSize: 13,
    // fontFamily: 'GT America Regular'
  },
  strong: {
    color: '#000',
    fontSize: 13,
    // fontFamily: 'Rubis Bold',
    textDecoration: 'none'
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
    fontSize: 13,
    // fontFamily: 'Rubis Regular'
  },
  itemContent: {
    fontSize: 10
  }
})

// These font files must be available in /lib/components/fonts,
// otherwise things break.

// Font.register(`${__dirname}/fonts/gt-america-standard-regular.ttf`, {
//   family: 'GT America Regular'
// })

// Font.register(`${__dirname}/fonts/rubis-regular.ttf`, {
//   family: 'Rubis Regular'
// })

// Font.register(`${__dirname}/fonts/rubis-bold.ttf`, {
//   family: 'Rubis Bold'
// })

// Font.register(`${__dirname}/fonts/RepublikSerif-Black.ttf`, {
//   family: 'Republik'
// })

export const TitleBlock = ({ children, ...props }) => (
  <View {...props} style={styles.titleblock}>
    {children}
  </View>
)

export const P = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>
}
export const Legend = ({ children }) => {
  return <Text style={styles.legend}>{children}</Text>
}

export const A = ({ children, href }) => {
  return <Link style={styles.link} src={href}>{children}</Link>
}

export const Strong = ({ children }) => {
  // react-pdf's Text expects canonical inline children with a render() method,
  // so let's abuse Link for now. We should eventually use some generic
  // react-pdf compatible inline element.
  return <Link style={styles.strong}>{children}</Link>
}

export const H1 = ({ children }) => {
  return <Text style={styles.headline}>{children}</Text>
}

export const H2 = ({ children }) => {
  return <Text style={styles.subheadline}>{children}</Text>
}

export const Lead = ({ children }) => {
  return <Text style={styles.lead}>{children}</Text>
}

export const Credit = ({ children }) => {
  return <Text style={styles.credit}>{children}</Text>
}

export const Img = ({ src }) => {
  return <Image style={styles.image} src={src} />
}

export const List = ({ data, children }) => {
  return <View style={styles.section}>{children}</View>
}

export const ListItem = ({ node, index, parent, children }) => {
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
export const ListItemP = ({ children }) => {
  return <Text style={styles.listitem}>{children}</Text>
}
