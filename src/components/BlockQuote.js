import React, { Children } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f7f7f7'
  },
  text: {
    marginBottom: 10
  }
})

const BlockQuoteText = ({ children, ...props }) => (
  <Text style={styles.text}>{children}</Text>
)

const BlockQuote = ({ children }) => {
  const texts = Children.toArray(children).filter(child => child.type === BlockQuoteText)
  const legend = Children.toArray(children).filter(child => child.type !== BlockQuoteText)

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
