import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const Headline = props => {

  // TODO - got distracted, this would be handy
  const { color, weight, size } = props;

  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.purple3,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10
  }
});

export default Headline;
