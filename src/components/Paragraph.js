import React from 'react';
import { Text, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  text: {
    // columns: 2,
    width: 500,
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 2, // not supported.
    // align: 'justify'
    // fontFamily: 'Rubis Regular',
  },
});

const Paragraph = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
);

export default Paragraph;
