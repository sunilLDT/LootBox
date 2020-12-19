import AsyncStorage from '@react-native-community/async-storage';
import { cartConstants } from '../actions/actionTypes';

const initialState = {
  labels: [],
  loginError: false,
  loading: false,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case cartConstants.LABEL_SUCCESS:
      return {
        ...state,
        loading: true,
      };
  
    case cartConstants.LABEL_SUCCESS:
      console.log(state.cart)
      console.log(action.id)
      return {
        ...state,
        cart: action.label
      };


    case cartConstants.LABEL_FAILED:
      return {
        ...state,
        loginError: 'select Language .',
        loading: false,
      };
    default:
      return state;
  }
}

