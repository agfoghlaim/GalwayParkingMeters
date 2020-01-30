import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const LocationTile = props => {
  return (
    <TouchableOpacity style={styles.tile} onPress={props.onPress}>
      <View
        style={{
          ...styles.tileContainer,
          ...{ backgroundColor: props.data.color }
        }}
      >
        <Text style={styles.text}>
          {props.data.name}({props.data.count})
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 10,
    height: 150
  },
  tileContainer: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default LocationTile;
