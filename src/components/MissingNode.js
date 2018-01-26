import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Link
} from '@react-pdf/core'

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FF5555',
    width: 500,
    marginTop: 10,
    marginBottom: 10
  },
  missingText: {
    fontSize: 13
  },
  missingInline: {
    color: '#FF5555',
    fontSize: 13
  }
})

export default ({ node, ancestors, children }) => {
  const message = `Missing Markdown node type "${node.type}" ${node.identifier ? `with identifier "${node.identifier}"` : ''} `

  // prevent illegal nesting
  if (ancestors.find(parent => parent.type === 'paragraph')) {
    return <Link style={styles.missingInline}>{message}</Link>
  }

  return (
    <View style={styles.section}>
      <Text style={styles.missingText}>
        {message}
      </Text>
    </View>
  )
}
