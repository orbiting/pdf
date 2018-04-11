import React, { Children } from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  infobox: {
    flexDirection: 'row',
    marginVertical: 20
  },
  image: {
    marginRight: 10
  },
  heading: {
    fontSize: 18,
    paddingTop: 5,
    marginBottom: 5,
    borderTopWidth: 1,
    borderTopColor: 'black',
    fontFamily: fontFamilies.serifBold
  }
})

const InfoboxFigure = ({ children, ...props }) => (
  <View>
    {React.Children.map(children, child => (
      React.cloneElement(child, { ...props })))
    }
  </View>
)

const InfoboxHeading = ({ children }) => (
  <Text style={styles.heading}>{children}</Text>
)

const InfoboxImage = ({ figureSize, src }) => {
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
    default:
      width = 200
  }

  return <Image style={[styles.image, { width }]} src={src} />
}

const Infobox = ({ children }) => {
  const image = Children.toArray(children).filter(child => child.type === InfoboxImage)
  const childs = Children.toArray(children).filter(child => child.type !== InfoboxImage)

  return (
    <View style={styles.infobox} wrap={false}>
      {image}
      <View style={{ flex: 1 }}>
        {childs}
      </View>
    </View>
  )
}

Infobox.Image = InfoboxImage
Infobox.Figure = InfoboxFigure
Infobox.Heading = InfoboxHeading

export default Infobox
