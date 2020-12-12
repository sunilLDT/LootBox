import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import cartReducer from './cart';
import packageReducer from './package';

import * as types from '../actions/actionTypes';


const AppReducer = combineReducers({
    cartReducer: cartReducer,
    packageReducer:packageReducer

});

// Clean state when user logs out
export const rootReducer = (state: any = {}, action) => {
  AsyncStorage.removeItem('persist:root');
  if (action.type === types.LOGOUT_REQUEST) {
    state = undefined;
  }

  return AppReducer(state, action);
};
export default AppReducer;
