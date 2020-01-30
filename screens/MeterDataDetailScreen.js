import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import colors from '../constants/colors';
import Headline from '../components/Headline';
import UserDataTile from '../components/UserDataTile';

const MeterDataDetailScreen = props => {
  const userData = props.navigation.getParam('userData');
  const locationName = props.navigation.getParam('locationName');
  const meterId = props.navigation.getParam('meterId');

  useEffect(() => {
    props.navigation.setParams({ locationName: locationName });
    props.navigation.setParams({ meterId: meterId });
  }, [locationName, meterId]);

  function handleDisplayUserData() {
    if (userData.length) {
      return (
        <FlatList
          data={userData}
          renderItem={renderUserData}
          keyExtractor={(item, index) => `${item.meterId}-${index}`}
        />
      );
    } else {
      return <Text>Nothing to see here</Text>;
    }
  }

  const renderUserData = itemData => {
    return (
      <UserDataTile data={itemData.item} onPress={() => console.log('wher')} />
    );
  };

  return <View style={styles.screenWrap}>{handleDisplayUserData()}</View>;
};

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignContent: 'center'
  },
  buttonWrap: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 50,
    flex: 1
  },
  topWrap: {
    justifyContent: 'center',
    alignItems: 'center',

    padding: 50,
    flex: 1
  },
  normalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 50
  }
});

MeterDataDetailScreen.navigationOptions = navData => {
  const locationName = navData.navigation.getParam('locationName');
  const meterId = navData.navigation.getParam('meterId');
  return {
    headerTitle: `${locationName}-${meterId}`
  };
};

export default MeterDataDetailScreen;
