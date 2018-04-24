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
    width: '100%',
    fontSize: 10,
    paddingTop: 5,
    marginBottom: 5,
    borderTopWidth: 1,
    borderTopColor: 'black',
    fontFamily: fontFamilies.sansSerifMedium
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

const InfoboxImage = ({ figureSize, src }) => {
  let width

  if (!src) {
    return null
  }

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

  return <Image style={[styles.image, { width }]} src={src} />
}

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

export default Infobox
