import React from 'react';
import { Text, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  subheadline: {
    fontSize: 22,
    marginBottom: 5,
    // fontFamily: 'Republik',
  },
});

const H2 = ({ children }) => (
  <Text style={styles.subheadline}>{children}</Text>
);

export default H2;
