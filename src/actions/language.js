import { cartConstants } from './actionTypes';


export const languageActions = {
    getLabelAction
};

function getLabelAction(lang) {
  return (dispatch) => {
    dispatch(request(lang));
    if(lang='ar'){
        dispatch(success(ar));
    }  else{
        dispatch(success(en));
    }   
  };

  function request(label) {
    return { type: cartConstants.LABEL_REQUEST, label };
  }
  function success(id) {
    return { type: cartConstants.LABEL_SUCCESS,label};
  }

  function failure(error) {
    return { type: cartConstants.LABEL_FAILED, error };
  }
}


const ar = {
    'Arabic':'arabic'
}

const en = {
    'English':'enhlish'
}