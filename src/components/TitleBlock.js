import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'

const styles = StyleSheet.create({
  titleblock: {
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: 90,
    '@media max-width: 420': {
      marginTop: 15,
      marginBottom: 20,
      paddingHorizontal: 0
    }
  },
  formatTitle: {
    fontSize: 12,
    marginBottom: 15,
    fontFamily: fontFamilies.sansSerifMedium
  }
})

const TitleBlock = ({
  formatTitle,
  formatColor,
  children,
  ...props
}) => (
  <View
    style={[
      styles.titleblock,
      { textAlign: props.center ? 'center' : 'left' }
    ]}
    {...props}
  >
    {formatTitle && (
      <Text
        style={[
          styles.formatTitle,
          { color: formatColor }
        ]}
      >
        {formatTitle}
      </Text>
    )}
    {children}
  </View>
)

TitleBlock.defaultProps = {
  formatColor: '#000000'
}

export default TitleBlock
