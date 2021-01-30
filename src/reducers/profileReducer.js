import { cartConstants } from '../actions/actionTypes';

const initialState = {
    profile: [],
    error: false,
    loading:false
  };

  export default function (state = initialState, action) {
    switch (action.type) {
        case cartConstants.PROFILE_REQUEST:
        return {
            ...state,
            loading:true
        };
        case cartConstants.PROFILE_FAILURE:
        return {
            ...state,
            error:true,
            loading:false
        };
        case cartConstants.PROFILE_SUCCESS:
        return {
            ...state,
            profile:action.profileData,
            loading:false
        };
        default:
            return state;
        }
  }