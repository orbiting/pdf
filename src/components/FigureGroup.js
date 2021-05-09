import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    width: '455',
    marginLeft: -60,
    '@media max-width: 420': {
      width: '100%',
      marginLeft: 0
    },
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  }
})

const Center = ({ children }) => {
  return (
    <View
      style={styles.container}
    >
      {children}
    </View>
  )
}

export default Center
