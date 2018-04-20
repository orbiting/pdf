import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 5,
    position: 'relative'
  },
  listitem: {
    flex: 1,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: fontFamilies.serifRegular
  },
  bulletPoint: {
    width: 30,
    left: -37,
    fontSize: 10,
    textAlign: 'right',
    position: 'absolute',
    fontFamily: fontFamilies.serifRegular
  }
})

const List = ({ children }) => (
  <View>{children}</View>
)

export const ListItem = ({
  index,
  parent,
  children
}) => {
  const bullet = parent.ordered ? `${index + 1}.` : '–'

  return (
    <View style={styles.item}>
      <Text style={styles.bulletPoint}>{bullet}</Text>
      {children}
    </View>
  )
}

export const ListItemContent = ({ children }) => (
  <Text style={styles.listitem}>{children}</Text>
)

List.Item = ListItem
List.ItemContent = ListItemContent

export default List
