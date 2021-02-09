import AsyncStorage from '@react-native-community/async-storage';
import { cartConstants } from '../actions/actionTypes';

const initialState = {
  labels: [],
  error: false,
  loading: false,
  lang:'en',

};

export default function (state = initialState, action) {
  switch (action.type) {
    case cartConstants.LABEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
  
    case cartConstants.LABEL_SUCCESS:
      return {
        ...state,
        labels: action.labelData
      };


    case cartConstants.LABEL_FAILED:
      return {
        ...state,
        error: 'select Language .',
        loading: false,
        labels:[]
      };
      
    default:
      return state;
  }
}

