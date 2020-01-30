import { ADD_USER_DATA, GET_USER_DATA} from "../actions/userData";

const initialState = {
  userData: [],
  latestReport: {
    meterWorking: '',
    createdAt: ''
  },
  success: undefined
};

export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_USER_DATA:
      return {
        userData: [...initialState.userData, 
          initialState.userData.concat(action.newUserData)
        ],
        latestReport: action.newUserData[0] // check sorted!
         
      };
    case GET_USER_DATA:
      return{

          userData: action.userData,
          latestReport: action.userData[0]
      }
    

    default:
      return state;
  }
};
