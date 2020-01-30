export const GET_METERS = 'GET_METERS';
export const GET_METERS_BY_LOCATION = 'GET_METERS_BY_LOCATION';
export const GET_GEO_NEAR_METERS = 'GET_GEO_NEAR_METERS';
export const GET_METERS_AND_NEWEST_USERDATA = 'GET_METERS_AND_NEWEST_USERDATA';

export const getMetersByLocation = location => {
  return async dispatch => {
    const response = await fetch(
      `http://192.168.0.157:5000/api/v1/meters//filterByLocation/${location}`
    );

    const json = await response.json();

    let ans = json.data.map(meter => {
      return {
        dbId: meter._id,
        meterId: meter.meterId,
        locationName: meter.location.locationName,
        coordinates: meter.location.coordinates,
        userData: meter.userData
      };
    });

    dispatch({
      type: GET_METERS_BY_LOCATION,
      metersByLocation: ans
    });
  };
};

export const getMeters = () => {
  return async dispatch => {
    const response = await fetch(
      'http://192.168.0.157:5000/api/v1/meters/meterdata'
    );

    const json = await response.json();

    // fix this on server /db!
    const removeDuplicates = arr => {
      const uniqueMeterIds = Array.from(new Set(arr.map(a => a.meterId)));
      const unique = [];
      uniqueMeterIds.forEach(meter => {
        let thisOne = arr.find(a => a.meterId === meter);

        unique.push(thisOne);
      });

      return unique;
    };

    let ans = removeDuplicates(json.data);
    ans = ans.map(meter => {
      return {
        dbId: meter._id,
        meterId: meter.meterId,
        locationName: meter.location.locationName,
        coordinates: meter.location.coordinates,
        userData: meter.userData
      };
    });

    dispatch({
      type: GET_METERS,
      meters: ans
    });
  };
};

export const getGeoNearMeters = (lat, lng) => {
  //console.log("meters.js(actions): lat, lng:", lat, lng)
  return async dispatch => {
    const response = await fetch(
      'http://192.168.0.157:5000/api/v1/meters/geolocate',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lat: lat,
          lng: lng
        })
      }
    );

    const json = await response.json();

    const ans = json.data.map(meter => {
      return {
        dbId: meter._id,
        meterId: meter.meterId,
        locationName: meter.location.locationName,
        coordinates: meter.location.coordinates,
        userData: meter.userData
      };
    });
    //console.log("meters.js(actions), setting meters to : ", ans.length)
    dispatch({
      type: GET_GEO_NEAR_METERS,
      geoNearMeters: ans
    });
  };
};

export const getAllMetersWithNewestUserData = (locationName) => {

  return async dispatch => {

    const metersWorkingOrNot = await fetch(
      `http://192.168.0.157:5000/api/v1/meters/metersandtheirstatusbylocation/${locationName}`
    );
  
    const json = await metersWorkingOrNot.json();
    const ans = json.data;

    dispatch({
      type: GET_METERS_AND_NEWEST_USERDATA,
      metersAndStatusByLocation: ans
    });
  }

}