import React from 'react';
import { Text, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  lead: {
    fontSize: 16,
    marginBottom: 5,
    // fontFamily: 'Rubis Regular',
  },
});

const Lead = ({ children }) => (
  <Text style={styles.lead}>{children}</Text>
);

export default Lead;
