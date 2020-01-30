import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const UserDataTile = props => {

  const meterWorking = props.data.meterWorking;
  const meterMsg = props.data.meterMsg || 'pretend'; // TODO - wtf is pretend for?

  return (
    <TouchableOpacity style={styles.outside} onPress={props.onPress}>
      <View
        style={{
          ...styles.locationContainer,
          ...{
            backgroundColor:
              meterWorking === true || meterWorking === 'true'
                ? colors.purple3
                : colors.purple5
          }
        }}
      >
        <Text style={styles.text}>
          {meterWorking === true || meterWorking === 'true'
            ? 'working'
            : 'broken'}{' '}
          {meterMsg}
        </Text>

        <Ionicons
          name={
            meterWorking === true || meterWorking === 'true'
              ? 'md-thumbs-up'
              : 'md-thumbs-down'
          }
          size={32}
          color={
            meterWorking === true || meterWorking === 'true'
              ? colors.green
              : colors.brown
          }
        />

        <Text style={styles.text}>{props.data.createdAt.substring(0, 10)}</Text>
        <Text style={styles.text}>
          {' '}
          at {props.data.createdAt.substring(11, 16)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    elevation: 3,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%'
  },
  outside: {
    marginVertical: 5,
    width: '100%'
  },
  text: {
    color: 'white',
    fontSize: 14
  }
});

export default UserDataTile;
