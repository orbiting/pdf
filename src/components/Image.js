import React from 'react';
import { Image, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'grey',
    padding: 0,
    maxWidth: 500,
    marginBottom: 10,
  },
});

export default ({ src }) => (
  <Image style={styles.image} src={src} />
);
