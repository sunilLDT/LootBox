import AsyncStorage from '@react-native-community/async-storage';
import { cartConstants } from '../actions/actionTypes';

const initialState = {
  cart: [],
  loginError: false,
  loading: false,
  totalItems:0,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case cartConstants.CART_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case cartConstants.CART_ADD_INIT:
      return {
        ...state,
        cart: action.id
      };
    case cartConstants.CART_ADD_SUCCESS:
      return {
        ...state,
        cart: action.id,
        totalItems:action.id,
      };

    case cartConstants.CART_EMPTY_SUCCESS:
      return {
        ...state,
        cart: []
      };
    case cartConstants.CART_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: state.cart.filter((item, i) => i !== action.id.item_id),
      };

    case cartConstants.CART_ADD_FAILURE:
      return {
        ...state,
        loginError: 'Please enter correct username password',
        loading: false,
      };
    default:
      return state;
  }
}


function insertItem(array, action) {
  let newArray = array.slice()
  newArray.splice(0, 0, action.id)
  return newArray
}