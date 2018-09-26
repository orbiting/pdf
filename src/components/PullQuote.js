import React, { Children } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 20
  },
  narrowContainer: {
    maxWidth: 450,
    textAlign: 'center'
  },
  figure: {
    width: 80,
    marginRight: 10
  },
  text: {
    fontSize: 13,
    width: '100%',
    marginBottom: 10,
    fontFamily: fontFamilies.serifTitle
  },
  source: {
    fontSize: 8,
    lineHeight: 1.3,
    fontFamily: fontFamilies.sansSerifRegular
  }
})

const PullQuote = ({ size, hasFigure, children }) => {
  const containerClass = !hasFigure && size === 'narrow' && styles.narrowContainer
  const figure = Children.toArray(children).filter(child => child.type === PullQuoteFigure)
  const childs = Children.toArray(children).filter(child => child.type !== PullQuoteFigure)

  return (
    <View wrap={false} style={[styles.container, containerClass]}>
      {figure}
      <View style={{ flex: 1 }}>
        {childs}
      </View>
    </View>
  )
}

const PullQuoteFigure = ({ children, ...props }) => (
  <View style={styles.figure}>
    {React.Children.map(children, child => (
      React.cloneElement(child, { ...props })))
    }
  </View>
)

const PullQuoteText = ({ children, ...props }) => (
  <Text style={styles.text}>{children}</Text>
)

const PullQuoteSource = ({ children, ...props }) => (
  <Text style={styles.source}>{children}</Text>
)

PullQuote.Text = PullQuoteText
PullQuote.Figure = PullQuoteFigure
PullQuote.Source = PullQuoteSource

export default PullQuote
