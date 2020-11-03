import { cartConstants } from './actionTypes';


export const cartActions = {
  addCartAction,
};

function addCartAction(id) {
  return (dispatch) => {
    dispatch(request(id));
    dispatch(success(id));
  };

  function request(id) {
    return { type: cartConstants.CART_ADD_REQUEST, id };
  }
  function success(id) {
    return { type: cartConstants.CART_ADD_SUCCESS, id };
  }

  function failure(error) {
    return { type: cartConstants.CART_ADD_FAILURE, error };
  }
}

