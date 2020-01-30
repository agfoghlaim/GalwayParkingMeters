import { GET_LOCATIONS } from '../actions/locations';

const initialState = {
  locations: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        locations: action.locations
      };
    default:
      return state;
  }
};
