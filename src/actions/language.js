import { cartConstants } from './actionTypes';
import {getLabelsApi} from '../api/buildYourPc';

export const languageActions = {
    getLabelAction
};

function getLabelAction(lang) {
  return (dispatch) => {
    //dispatch(request());
    getLabelsApi().then((response) => {
     
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

