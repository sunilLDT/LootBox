import { cartConstants } from './actionTypes';
import {addressListApi} from '../api/buildYourPc';
import { Constant } from '../../Constant/Constants.js';

export const addressActions = {
  showAddress,
};

function showAddress(addresses) {
    return (dispatch) => {
      dispatch(request(addresses));
      addressListApi().then((response) => {
          dispatch(success(response.data));
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

