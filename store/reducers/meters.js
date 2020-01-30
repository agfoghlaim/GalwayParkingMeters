import {
  GET_METERS,
  GET_METERS_BY_LOCATION,
  GET_GEO_NEAR_METERS,
  GET_METERS_AND_NEWEST_USERDATA
} from '../actions/meters';

const initialState = {
  meters: [],
  metersByLocation: [],
  geoNearMeters: [],
  metersAndStatusByLocation: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_METERS:
      return {
        ...state,
        meters: action.meters
      };
    case GET_METERS_BY_LOCATION:
      return {
        ...state,
        metersByLocation: action.metersByLocation
      };
    case GET_GEO_NEAR_METERS:
      return {
        ...state,
        geoNearMeters: action.geoNearMeters
      };
    case GET_METERS_AND_NEWEST_USERDATA:
      return {
        ...state,
        metersAndStatusByLocation: action.metersAndStatusByLocation
      };
    default:
      return state;
  }
};
