import AsyncStorage from '@react-native-community/async-storage';
import { cartConstants } from '../actions/actionTypes';

const initialState = {
  labels: {},
  error: false,
  loading: false,
  lang:'en',

};

export default function (state = initialState, action) {
  switch (action.type) {
    case cartConstants.LABELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
  
    case cartConstants.LABELS_SUCCESS:
      return {
        ...state,
        labels: action.labelData,
        loading: false,
      };


    case cartConstants.LABELS_FAILED:
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

