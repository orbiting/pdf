import React, { Component, Children } from 'react'
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
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  section: {
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
    fontFamily: fontFamilies.serifRegular
  },
  headline: {
    fontSize: 28,
    marginBottom: 5,
    fontFamily: fontFamilies.serifTitle
  },
  subheadline: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: fontFamilies.serifTitle
  },
  lead: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: fontFamilies.serifRegular
  },
  credit: {
    fontSize: 12,
    fontFamily: fontFamilies.sansSerifRegular
  },
  listitem: {
    fontSize: 13,
    fontFamily: fontFamilies.serifRegular
  },
  link: {
    color: '#00508C',
    fontSize: 13,
    fontFamily: fontFamilies.sansSerifRegular
  },
  strong: {
    color: '#000',
    fontSize: 13,
    fontFamily: fontFamilies.serifBold,
    textDecoration: 'none'
  },
  image: {
    backgroundColor: 'grey',
    padding: 0,
    maxWidth: 500,
    marginBottom: 10,
  },
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
  },
  infobox: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  infoboxImage: {
    marginRight: 10,
  },
  infoboxheading: {
    fontSize: 18,
    paddingTop: 5,
    marginBottom: 5,
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
})

export const TitleBlock = ({ children, ...props }) => (
  <View
    style={[
      styles.titleblock,
      { textAlign: props.center ? 'center' : 'left' }
    ]}
    {...props}>
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

export const Img = ({ src, ...props }) => {
  return <Image style={styles.image} src={src} />
}

export const List = ({ data, children }) => {
  return <View style={styles.section}>{children}</View>
}

export const InfoBox = ({ children }) => {
  const image = Children.toArray(children).filter(child => child.type === InfoBoxFigure);
  const childs = Children.toArray(children).filter(child => child.type !== InfoBoxFigure);

  return (
    <View style={styles.infobox}>
      {image}
      <View style={{ flex: 1 }}>
        {childs}
      </View>
    </View>
  );
}

export const InfoBoxFigure = ({ children, ...props }) => (
  <View>
    {React.Children.map(children, child => (
      React.cloneElement(child, { ...props }))
    )}
  </View>
);

export const InfoBoxHeading = ({ children }) => {
  return <Text style={styles.infoboxheading}>{children}</Text>
}

export const InfoBoxImage = ({ figureSize, src }) => {
  let width;

  switch (figureSize) {
    case 'XS':
      width = 70;
      break;
    case 'S':
      width = 100;
      break;
    case 'M':
      width = 160;
      break;
    default:
      width = 200;
  }

  return <Image style={[styles.infoboxImage, { width }]} src={src} />
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
