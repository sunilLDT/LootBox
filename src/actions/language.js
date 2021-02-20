import { cartConstants } from './actionTypes';
import {getLabelsApi} from '../api/buildYourPc';

export const languageActions = {
    getLabelAction
};

function getLabelAction(lang) {
  return (dispatch) => {
    console.log("****** labels api 1 response *******")
    //dispatch(request());
    getLabelsApi().then((response) => {
      console.log("****** labels api response *******")
      console.log(response.data)
      dispatch(success(response.data));
    }).catch((error) => {
      console.log("label api in redux" + error);
        //dispatch(failure(response.message))
    });   
  };

  function request() {
    return { type: cartConstants.LABELS_REQUEST };
  }
  function success(labelData) {
    return { type: cartConstants.LABELS_SUCCESS,labelData};
  }

  function failure(error) {
    return { type: cartConstants.LABELS_FAILED, error };
  }
}

