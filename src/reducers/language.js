import AsyncStorage from '@react-native-community/async-storage';
import { cartConstants } from '../actions/actionTypes';

const initialState = {
  labels: [],
  loginError: false,
  loading: false,
  lang:'en',

};

export default function (state = initialState, action) {
  switch (action.type) {
    case cartConstants.LABEL_SUCCESS:
      return {
        ...state,
        loading: true,
      };
  
    case cartConstants.LABEL_SUCCESS:
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
      case cartConstants.GET_LANGUAGE:
        return {
          ...state,
          lang:action.language,
        };
    default:
      return state;
  }
}

