import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

export const makeList = (fontFamily = 'serifRegular') => {
  const styles = StyleSheet.create({
    li: {
      flexDirection: 'row',
      marginBottom: 5,
      position: 'relative'
    },
    liContent: {
      flex: 1,
      fontSize: 10,
      paddingLeft: 15,
      textAlign: 'justify',
      fontFamily: fontFamilies[fontFamily]
    },
    liBulletPoint: {
      width: 30,
      left: -20,
      fontSize: 10,
      textAlign: 'right',
      position: 'absolute',
      fontFamily: fontFamilies[fontFamily]
    }
  })

  const List = ({ children }) => (
    <View>{children}</View>
  )

  const ListItem = ({
    index,
    parent,
    children
  }) => {
    const bullet = parent.ordered ? `${index + 1}.` : '–'

    return (
      <View style={styles.li}>
        <Text style={styles.liBulletPoint}>{bullet}</Text>
        {children}
      </View>
    )
  }

  const ListItemContent = ({ children }) => (
    <Text style={styles.liContent}>{children}</Text>
  )

  List.Item = ListItem
  List.ItemContent = ListItemContent

  return List
}

export default makeList()
