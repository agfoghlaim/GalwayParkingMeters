import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const LocateUser = props => {
  //const [userLocation, setUserLocation] = useState();

  const verifyPermission = useCallback(async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert('Permission not granted', 'hi', [{ text: 'ok' }]);
      return false;
    }
    return true;
  });

  const getUserCoordinates = useCallback(async () => {
    let userCoordinates = false;

    try {
      props.setIsLocating(true);
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 5000
      });
      userCoordinates = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
    } catch (e) {
      Alert.alert('Location not found', 'Location not found', [{ text: 'ok' }]);
    }
    props.setIsLocating(false);
    return userCoordinates;
  });

  useEffect(() => {
    (async () => {
      await verifyPermission();
      props.setIsLocating(true);
      const userCoordinates = await getUserCoordinates();
      props.setIsLocating(false);
      // setUserLocation(userCoordinates); // used?

      props.handleGeoNear(userCoordinates.lat, userCoordinates.lng);
    })();
  }, []);

  return null;
};

export default LocateUser;
