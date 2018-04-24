import React, { Children } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/core'
import { branch, renderComponent } from '../lib/hocs'
import { fontFamilies } from '../lib/fonts'
import SafeImage from './SafeImage'
import { Alt } from './Image'

const styles = StyleSheet.create({
  infobox: {
    flexDirection: 'row',
    marginVertical: 20
  },
  image: {
    marginRight: 10
  },
  alt: {
    marginRight: 10,
    width: 70
  },
  heading: {
    width: '100%',
    fontSize: 11,
    lineHeight: 1.2,
    paddingTop: 5,
    marginBottom: 5,
    borderTopWidth: 1,
    borderTopColor: 'black',
    fontFamily: fontFamilies.sansSerifMedium
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.2,
    fontFamily: fontFamilies.sansSerifRegular,
    marginBottom: 10,
    textAlign: 'justify',
    position: 'relative'
  }
})

const InfoboxFigure = ({ children, ...props }) => (
  <View>
    {React.Children.map(children, child => (
      React.cloneElement(child, { ...props })))
    }
  </View>
)

const InfoboxHeading = ({ children }) => {
  return <Text style={styles.heading}>{children}</Text>
}

const InfoboxParagraph = ({ children }) => {
  return <Text style={styles.paragraph}>{children}</Text>
}

const InfoBoxAlt = ({ alt }) => (
  <View style={styles.alt}>
    <Alt>
      {`Bild${alt ? `: ${alt}` : ''}`}
    </Alt>
  </View>
)

const InfoboxSafeImage = ({ figureSize, src }) => {
  let width
  switch (figureSize) {
    case 'XS':
      width = 70
      break
    case 'S':
      width = 100
      break
    case 'M':
      width = 160
      break
    case 'L':
      width = 200
      break
    default:
      width = 100
  }

  return <SafeImage style={[styles.image, { width }]} src={src} />
}

const InfoboxImage = branch(
  props => props.skip,
  renderComponent(InfoBoxAlt)
)(InfoboxSafeImage)

const Infobox = ({ children }) => {
  const figure = Children.toArray(children).filter(child => child.type === InfoboxFigure)
  const childs = Children.toArray(children).filter(child => child.type !== InfoboxFigure)

  return (
    <View style={styles.infobox} wrap={false}>
      {figure}
      <View style={{ flex: 1 }}>
        {childs}
      </View>
    </View>
  )
}

Infobox.Image = InfoboxImage
Infobox.Figure = InfoboxFigure
Infobox.Heading = InfoboxHeading
Infobox.Paragraph = InfoboxParagraph

export default Infobox
