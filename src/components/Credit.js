import React from 'react';
import { Text, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  credit: {
    fontSize: 12,
    // fontFamily: 'GT America Regular'
  },
});

const Credit = ({ children }) => (
  <Text style={styles.credit}>{children}</Text>
);

export default Credit;
