import { cartConstants } from './actionTypes';
import {getLabelsApi} from '../api/buildYourPc';

export const languageActions = {
    getLabelAction
};

function getLabelAction(lang) {
  return (dispatch) => {
    dispatch(request(lang));
    getLabelsApi().then((response) => {
      dispatch(success(response.data));
      console.log("****** labels api response *******")
      console.log(response.data)
    }).catch((error) => {
      console.log("label api in redux" + error);
        dispatch(failure(response.message))
    });   
  };

  function request() {
    return { type: cartConstants.LABEL_REQUEST };
  }
  function success(labelData) {
    return { type: cartConstants.LABEL_SUCCESS,labelData};
  }

  function failure(error) {
    return { type: cartConstants.LABEL_FAILED, error };
  }
}

