import AsyncStorage from '@react-native-community/async-storage';
import { cartConstants } from '../actions/actionTypes';

const initialState = {
  selectedItems: [],
  loginError: false,
  loading: false,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case cartConstants.AMOUNT_ADD_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    case cartConstants.AMOUNT_ADD_FAILURE:
      return {
        loginError: 'Please enter correct username password',
        loading: false,
      };
 
    default:
      return state;
  }
}

