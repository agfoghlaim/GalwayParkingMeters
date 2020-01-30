import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import  MetersNavigator  from './navigation/MetersNavigator';
import locationsReducer from './store/reducers/locations';
import metersReducer from './store/reducers/meters';
import userDataReducer from './store/reducers/userData';

const rootReducer = combineReducers({
  locations: locationsReducer,
  meters: metersReducer,
  userData: userDataReducer
});

const store = createStore(rootReducer, applyMiddleware( ReduxThunk) );

export default function App() {
  return (
    <Provider store={store}>
    
        <MetersNavigator />
    
    </Provider>
  );
}

