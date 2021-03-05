import { cartConstants } from './actionTypes';
import {getProfilApi} from '../api/buildYourPc';

export const profileActions = {
  showProfile,
  logoutFun
};

function showProfile() {
    return (dispatch) => {
      dispatch(request());
      getProfilApi().then((response) => {
          dispatch(success(response.data));
      }).catch((error) => {
        console.log("profile" + error);
          dispatch(failure(response.message))
      });
  };

  function request() {
    return { type: cartConstants.PROFILE_REQUEST };
  }
  function success(profileData) {
    return { type: cartConstants.PROFILE_SUCCESS,profileData};
  }
  function failure(error) {
    return { type: cartConstants.PROFILE_FAILURE,error};
  }

}

function logoutFun(){
  return (dispatch) => {
    dispatch(request());
  }
  function request() {
    return { type: cartConstants.LOGOUT };
  }
}