export const ADD_USER_DATA = 'ADD_USER_DATA';
export const GET_USER_DATA = 'GET_USER_DATA';

export const addUserData = userData => {
  // console.log("userData.js(action) ", userData)
  try {
    return async dispatch => {
      const response = await fetch(
        'http://192.168.0.157:5000/api/v1/meters/meterData',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }
      );

      const res = await response.json();
      // console.log('userData.js (action) response ', res.length);

      dispatch({
        type: ADD_USER_DATA,
        newUserData: res.data
      });
    };
  } catch (e) {
    // TODO
    console.log('Error adding userData');
    console.error(e);
  }
};

export const getUserData = meterId => {
  try {
    return async dispatch => {
      const response = await fetch(
        `http://192.168.0.157:5000/api/v1/meters/userdata/${meterId}`
      );

      const res = await response.json();

      dispatch({
        type: GET_USER_DATA,
        userData: res.data
      });
    };
  } catch (e) {
    // TODO
    console.log('Error getting userData');
    console.error(e);
  }
};
