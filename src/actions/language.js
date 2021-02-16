import { cartConstants } from './actionTypes';
import {getLabelsApi} from '../api/buildYourPc';

export const languageActions = {
    getLabelAction
};

function getLabelAction(lang) {
  console.log('=================')
  console.log(lang);
  console.log('=================')
  return (dispatch) => {
    dispatch(request(lang));
 
    getLabelsApi(lang).then((response) => {
      dispatch(success(response.data));
      console.log("****** labels api response *******")
      console.log(response.data)
    }).catch((error) => {
      console.log("label api in redux" + error);
        dispatch(failure('error'))
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

