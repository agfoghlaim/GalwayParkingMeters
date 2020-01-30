export const GET_LOCATIONS = 'GET_LOCATIONS';

export const getLocations = () => {
  return async dispatch => {
    const response = await fetch(
      'http://192.168.0.157:5000/api/v1/meters/locations'
    );

    const json = await response.json();
    // console.log('locations.js(actions): ', json.data[0]);
    const ans = json.data.map((d, i) => {
      return {
        id: i,
        name: d._id,
        count: d.count,
        color: '#000000'.replace(/0/g, function() {
          return (~~(Math.random() * 16)).toString(16);
        })
      };
    });

    dispatch({
      type: GET_LOCATIONS,
      locations: ans
    });
  };
};
