import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const Pill = props => {

  // TODO - messy CSS situation
  const active = () => {
    return props.active ? colors.purple1 : 'white';
  };
  const textColor = () => {
    return props.active ? 'white' : colors.purple1;
  };
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ backgroundColor: active(), ...styles.pillWrap }}>
        {props.showActivity ? (
          <ActivityIndicator
            style={styles.indicators}
            size={20}
            color="white"
          />
        ) : (
          <Ionicons
            style={styles.indicators}
            name="md-checkmark-circle"
            size={20}
            color={colors.white}
          />
        )}
        <Text style={{ color: textColor(), ...styles.pillText }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillWrap: {
    paddingRight: 20,
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: colors.purple1,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pillText: {
    marginLeft: 10
  },
  indicators: {
    width: 20,
    height: 20
  }
});

export default Pill;
