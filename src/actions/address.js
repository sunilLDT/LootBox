import { cartConstants } from './actionTypes';
import {addressListApi,getSpecificAddress} from '../api/buildYourPc';

export const addressActions = {
  showAddress,
  specificAdddress,
};

function showAddress(addresses) {
    return (dispatch) => {
      dispatch(request(addresses));
      addressListApi().then((response) => {
          dispatch(success(response.data));
      }).catch((error) => {
        console.log("address" + error);
          dispatch(failure(response.data))
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

function specificAdddress(addId){
  return (dispatch) => {
    dispatch(request(addId));
    getSpecificAddress(addId).then((response) => {
      dispatch(success(response.data));
    }).catch((error) => {
      console.log("specificaddress" + error);
        dispatch(failure(response.data))
    });
  }
  function request(addId) {
    return { type: cartConstants.SHOW_SPECIFIC_ADDRESS, addId };
  }
  function success(result) {
    return { type: cartConstants.SUCCESS_SPECIFIC_ADDRESS, result };
  }
  function failure(error) {
    return { type: cartConstants.FALIURE_SPECIFIC_ADDRESS,error};
  }
}

