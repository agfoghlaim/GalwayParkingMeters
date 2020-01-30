import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import LocateUser from '../components/LocateUser';
import Pill from '../components/Pill';
import { useSelector, useDispatch } from 'react-redux';
import * as metersActions from '../store/actions/meters';
import p from '../assets/p.png';

const defaultMapRegion = {
  latitude: 53.2772829874787,
  longitude: -9.0467342173963061,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04
};

const NEARBY = 'nearby';
const SHOWALL = 'showAll';
const FAVOURITES = 'favourites';

const MapScreen = props => {
  const [selectedMapScreen, setSelectedMapScreen] = useState('');
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState({
    lat: undefined,
    lng: undefined
  });
  const [showAllMeters, setShowAllMeters] = useState(true);
  const [haveGeoNears, setHaveGeoNears] = useState(false);
  const [mapRegion, setMapRegion] = useState(defaultMapRegion);
  const [isGeoNearing, setIsGeoNearing] = useState(false);
  const [isGettingMeters, setIsGettingMeters] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const meters = useSelector(state => state.meters.meters);
  const geoNearMeters = useSelector(state => state.meters.geoNearMeters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMapScreen === '') {
      setSelectedMapScreen(SHOWALL);
    }
  }, []);

  useEffect(() => {
    setSelectedMarkers(meters);
  }, [meters]);

  useEffect(() => {
    if (selectedMapScreen === NEARBY && userCoordinates.lat) {
      setMapRegion({
        latitude: userCoordinates.lat,
        longitude: userCoordinates.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });
    } else {
      setMapRegion(defaultMapRegion);
    }
  }, [showAllMeters, selectedMapScreen, defaultMapRegion]);

  useEffect(() => {
    setIsGettingMeters(true);
    dispatch(metersActions.getMeters()).then(() => setIsGettingMeters(false));
  }, [dispatch]);

  useEffect(() => {
    if (userCoordinates.lat && userCoordinates.lng) {
      setIsGettingMeters(true);
      dispatch(
        metersActions.getGeoNearMeters(userCoordinates.lat, userCoordinates.lng)
      ).then(() => {
        setIsGettingMeters(false);
      });
    }
  }, [dispatch, userCoordinates]);

  const handleGeoNear = (lat, lng) => {
    setIsGeoNearing(true);
    setUserCoordinates({ lat, lng });
    dispatch(metersActions.getGeoNearMeters(lat, lng)).then(() => {
      setIsGeoNearing(false);
      setHaveGeoNears(true);
      setShowAllMeters(false);
    });
  }

  const handleUserMarker = () => {
    if (userCoordinates.lat !== undefined) {
      return (
        <Marker
          title="You are here."
          pinColor="blue"
          coordinate={{
            latitude: userCoordinates.lat,
            longitude: userCoordinates.lng
          }}
        ></Marker>
      );
    }
    return null;
  }

  const handlePressCallout = (data) => {
    props.navigation.navigate({
      routeName: 'MapMeterDataScreen',
      params: {
        meterData: data
      }
    });
  }

  const handleSetSelectedMapScreen = (screen) => {
    setSelectedMapScreen(screen);
    if (screen === SHOWALL) {
      setSelectedMarkers(meters);
    } else if (screen === NEARBY) {
      setSelectedMarkers(geoNearMeters);
    }
  }

  const mapMeterMarkers = () => {
    return selectedMarkers.map(meter => {
      return (
        <Marker
          title={`${meter.locationName} (${meter.meterId})`}
          key={meter.meterId}
          coordinate={{
            latitude: meter.coordinates[1],
            longitude: meter.coordinates[0]
          }}
          image={p}
          onPress={() => console.log('MapScreen.js: marker pressed')}
        >
          <Callout
            tooltip
            styles={styles.callback}
            onPress={() => handlePressCallout(meter)}
          >
            <View style={styles.calloutView}>
              <View>
                <Text>Meter Info</Text>
              </View>

              <View style={styles.callOutButtonView}>
                <Text>
                  {meter.locationName} - {meter.meterId}
                </Text>
              </View>

              <View>
                <Text>
                  {meter.userData.length
                    ? 'there is userdata, handle this (MapScreen.js)'
                    : 'status unknown (no user data yet)'}
                </Text>
              </View>
            </View>
          </Callout>
        </Marker>
      );
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.pillWrap}>
        <Pill
          active={selectedMapScreen === SHOWALL}
          onPress={() => handleSetSelectedMapScreen(SHOWALL)}
          showActivity={isGettingMeters}
        >
          Show All
        </Pill>
        <Pill
          active={selectedMapScreen === NEARBY}
          onPress={() => handleSetSelectedMapScreen(NEARBY)}
          showActivity={isGeoNearing || isLocating}
        >
          Nearby
        </Pill>
        <Pill
          active={selectedMapScreen === FAVOURITES}
          onPress={() => handleSetSelectedMapScreen(FAVOURITES)}
        >
          Favourites
        </Pill>
      </View>

      {selectedMapScreen === NEARBY ? (
        <LocateUser
          handleGeoNear={handleGeoNear}
          isGeoNearing={isGeoNearing}
          haveGeoNears={haveGeoNears}
          selectedMapScreen={selectedMapScreen}
          isLocating={isLocating}
          setIsLocating={setIsLocating}
        />
      ) : null}

      <MapView region={mapRegion} style={styles.map}>
        {handleUserMarker()}
        {mapMeterMarkers()}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  callback: {
    backgroundColor: 'red',
    flex: 1
  },
  calloutView: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderColor: 'orange',
    borderWidth: 1,
    elevation: 3
  },
  pillWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10
  },
  activityContainer: {
    height: 20,
    backgroundColor: 'yellow',
    width: '100%'
  }
});

export default MapScreen;
