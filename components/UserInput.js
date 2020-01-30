import React, { useState, useReducer } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Modal,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import colors from '../constants/colors';

// meterId: TBC,
// meterWorking: {type: String, default: 'unknown'},
// meterMsg: ,
// userId: TBC ,
// userName: ,
// createdAt: {type: Date, default: Date.now},
// timeAt: Date,

// TODO don't need meterWorking, safer to handle in data screen
// TODO - this is way over complicated, doesn't need to useReducer, check it when users exist
const REPORT_BROKEN = 'REPORT_BROKEN';
const userDataReducer = (state, action) => {
  if ((action.type = 'REPORT_BROKEN')) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.text
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const UserInput = props => {
  const isForWorking = props.isForWorking;
  const [userIsSure, setUserIsSure] = useState(false);
  const [formState, dispatchForm] = useReducer(userDataReducer, {
    inputValues: {
      meterMsg: '',
      working: false
    },
    inputValidities: {
      meterMsg: false,
      meterWorking: false // this can't change, modal should handles working & not working.
    },
    formIsValid: false
  });

  function handleFormChange(inputId, text) {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }

    dispatchForm({
      type: REPORT_BROKEN,
      text,
      isValid,
      input: inputId
    });
  }

  function handleSendReport() {
    if (!formState.inputValidities.meterMsg || !userIsSure) {
      Alert.alert('BAD form', 'bad form', [{ text: 'ok' }]);
      return;
    }
    props.report({
      meterMsg: formState.inputValues.meterMsg,
      meterWorking: false
    });
  }

  function handleSetUserSure(value) {
    setUserIsSure(value);
  }

  return (
    <Modal
      visible={props.visible}
      style={styles.screenWrap}
      animationType="slide"
    >
      {props.savedReportSuccess
        ? ToastAndroid.showWithGravity(
            'Thank you, your report has been saved',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          )
        : null}
      <View style={styles.form}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            maxLength={140}
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            value={formState.inputValues.meterMsg}
            onChangeText={handleFormChange.bind(this, 'meterMsg')}
          ></TextInput>

        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.formSection}>
          <Text style={styles.label}>
            You're sure this Parking Meter is currently
            {isForWorking ? ' working' : ' broken'}?
          </Text>
          <Text style={styles.confirmText}>{userIsSure ? 'Yes' : 'No'}</Text>
          <Switch value={userIsSure} onValueChange={handleSetUserSure} />
        </View>
      </View>

      <Button title="Close" color="pink" onPress={props.close} />
      {props.isSavingReport ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Submit"
          color={colors.purple1}
          onPress={handleSendReport}
        />
      )}
    </Modal>
  );
};

UserInput.navigationOptions = navData => {
  return {
    headerTitle: 'Edit Meter Data'
  };
};

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    padding: 10,

    alignContent: 'center',
    justifyContent: 'center'
  },
  form: {
    margin: 20,

    backgroundColor: colors.white
  },
  formSection: {
    width: '100%'
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  confirmText: {
    color: colors.purple5,
    fontSize: 36,
    fontWeight: 'bold'
  }
});

export default UserInput;
