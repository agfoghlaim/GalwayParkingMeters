import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

// TODO - ridiculous ternarys, need to sort this or change to bool in db
const MeterTile = props => {
  return (
    <TouchableOpacity style={styles.tile} onPress={props.onPress}>
      <View
        style={{
          ...styles.tileContainer,
          ...{ backgroundColor: props.currentColor }
        }}
      >
        <View style={styles.meterAndTextWrap}>
          <Image source={require('../assets/meter.png')} />
          <Text style={styles.text}>{props.meterId}</Text>
          <Text style={styles.text}>{props.workingOrNot}</Text>
        </View>

        <View style={styles.iconAndTextWrap}>
          <Text style={styles.infoText}>
            {props.workingOrNot === true || props.workingOrNot === 'true'
              ? 'It works!'
              : props.workingOrNot === false || props.workingOrNot === 'false'
              ? 'It\'s broken!'
              : '?'}
          </Text>
          <Ionicons
            name={props.workingOrNot === true || props.workingOrNot === 'true'
            ? 'md-thumbs-up'
            : props.workingOrNot === false || props.workingOrNot === 'false'
            ? 'md-thumbs-down'
            : 'md-sad' }
      
            size={40}
            color={
              props.workingOrNot === true || props.workingOrNot === 'true'
                ? colors.green
                : colors.brown
            }
          />
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.purple5,
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 12
  },
  iconAndTextWrap: {
    alignItems: 'center',
    width: '40%',
    justifyContent: 'space-between'
  },
  infoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default MeterTile;
