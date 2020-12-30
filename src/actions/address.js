import { cartConstants } from './actionTypes';
import {addressListApi} from '../api/buildYourPc';

export const addressActions = {
  showAddress,
};

function showAddress(addresses) {
    return (dispatch) => {
      dispatch(request(addresses));
      addressListApi().then((response) => {
          dispatch(success(response.data));
          console.log(response.data);
          console.log("***********")
      }).catch((error) => {
        console.log("address" + error);
      });
  };

  function request(addresses) {
    return { type: cartConstants.SHOW_ADDRESS_REQUEST, addresses };
  }
  function success(addresses) {
    return { type: cartConstants.SHOW_ADDRESS_SUCCESS,addresses};
  }
  function failure(error) {
    return { type: cartConstants.SHOW_ADDRESS_FAILURE,error};
  }

}

