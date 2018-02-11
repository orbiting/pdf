import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  listitem: {
    fontSize: 13,
    fontFamily: fontFamilies.serifRegular
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
    fontFamily: fontFamilies.serifRegular
  }
})

const List = ({ children }) => (
  <View style={styles.section}>{children}</View>
)

export const ListItem = ({
  index,
  parent,
  children
}) => {
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

export const ListItemContent = ({ children }) => (
  <Text style={styles.listitem}>{children}</Text>
)

List.Item = ListItem
List.ItemContent = ListItemContent

export default List
