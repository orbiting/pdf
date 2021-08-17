import React, { Children } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'
import Legend from './Legend'

const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f7f7f7'
  },
  text: {
    fontSize: 9,
    marginBottom: 10,
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const BlockQuoteText = ({ children, ...props }) => (
  <Text style={styles.text}>{children}</Text>
)

const BlockQuote = ({ children }) => {
  const texts = Children.toArray(children).filter(child => child.type !== Legend)
  const legend = Children.toArray(children).filter(child => child.type === Legend)

  return (
    <View>
      <View style={styles.container}>
        {texts}
      </View>
      {legend}
    </View>
  )
}

BlockQuote.Text = BlockQuoteText

export default BlockQuote
