import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import LocationTile from '../components/LocationTile';
import * as locationsActions from '../store/actions/locations';

const LocationsScreen = props => {
  const locations = useSelector(state => state.locations.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(locationsActions.getLocations());
  }, [dispatch]);

  const handleOnPress = itemData => {
    props.navigation.navigate({
      routeName: 'MetersScreen',
      params: {
        locationName: itemData.item.name,
        currentColor: itemData.item.color
      }
    });
  };
  const renderTile = itemData => {
    return (
      <LocationTile
        data={itemData.item}
        onPress={() => handleOnPress(itemData)}
      />
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={locations}
      key={'d'}
      keyExtractor={item => item.id}
      renderItem={renderTile}
    />
  );
};

LocationsScreen.navigationOptions = {
  headerTitle: 'Meter Locations'
};

export default LocationsScreen;
