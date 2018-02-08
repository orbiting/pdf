import React from 'react';
import { Text, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  legend: {
    marginTop: 5,
    marginBottom: 10,
    width: 500,
    fontSize: 12,
  },
});

const Legend = ({ children }) => (
  <Text style={styles.legend}>{children}</Text>
);

export default Legend;
