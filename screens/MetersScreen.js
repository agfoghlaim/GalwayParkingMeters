import React, { useEffect, useCallback } from 'react';

import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as metersActions from '../store/actions/meters';

import MeterTile from '../components/MeterTile';

const MetersScreen = props => {
  const location = props.navigation.getParam('locationName');
  const currentColor = props.navigation.getParam('currentColor');
  const dispatch = useDispatch();
  //const meters = useSelector(state => state.meters.metersByLocation);
  const meters = useSelector(state => state.meters.metersAndStatusByLocation);

  useEffect(() => {
    dispatch(metersActions.getAllMetersWithNewestUserData(location));
  }, [dispatch, location]);

  useEffect(() => {
    dispatch(metersActions.getMetersByLocation(location));
  }, [dispatch]);

  const handleOnPress = itemData => {
    props.navigation.navigate({
      routeName: 'MeterDataScreen',
      params: {
        meterData: itemData.item
      }
    });
  };

  const renderTile = itemData => {
    let workingOrNot = '?';
    if (itemData.item.userData.length) {
      workingOrNot = `${itemData.item.userData[0].meterWorking}`;
    }
    return (
      <MeterTile
        currentColor={currentColor}
        meterId={itemData.item.meterId}
        workingOrNot={workingOrNot}
        onPress={() => handleOnPress(itemData)}
      />
    );
  };

  return (
    <FlatList
      numColumns={1}
      data={meters}
      keyExtractor={item => item.meterId}
      renderItem={renderTile}
    />
  );
};

MetersScreen.navigationOptions = navData => {
  const location = navData.navigation.getParam('locationName');
  return {
    headerTitle: location
  };
};

export default MetersScreen;
