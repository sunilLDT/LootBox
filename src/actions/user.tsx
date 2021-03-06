import { cartConstants } from './actionTypes';
import {showCartData} from '../api/buildYourPc';

export const cartActions = {
  initCartAction,
  addCartAction,
  emptyCartAction,
};

function addCartAction(id) {
    return (dispatch) => {
      dispatch(request(id));
      showCartData().then((response) => {
          dispatch(success(response.data.total_items));
      }).catch((error) => {
        console.log("showCartDataOnHome" + error);
      });
      return () => {
        console.log('componentWillUnmount');
    };
    
  };

  function request(id) {
    return { type: cartConstants.CART_ADD_REQUEST, id };
  }
  function success(id) {
    return { type: cartConstants.CART_ADD_SUCCESS,id};
  }

  function failure(error) {
    return { type: cartConstants.CART_ADD_FAILURE, error };
  }
}

function initCartAction(id) {
  return (dispatch) => {
    dispatch(success(id));
  };

  function success(id) {
    return { type: cartConstants.CART_ADD_INIT,id};
  }

  function failure(error) {
    return { type: cartConstants.CART_ADD_FAILURE, error };
  }
}

function emptyCartAction() {
  return (dispatch) => {
    //dispatch(request(id));
    dispatch(empty());
  };

  function empty() {
    return { type: cartConstants.CART_EMPTY_SUCCESS };
  }
  
}


function amountAddAction(item) {
  return (dispatch) => {
    dispatch(success(item));
  };

  function success(item) {
    return { type: cartConstants.AMOUNT_ADD_SUCCESS, item };
  }

  function failure(error) {
    return { type: cartConstants.AMOUNT_ADD_FAILURE, error };
  }
}
