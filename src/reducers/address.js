import { cartConstants } from '../actions/actionTypes';

const initialState = {
    address: [],
    addAddressError: false,
    specificAdddressArray:{},
    loading:false,
    load:false,
  };

  export default function (state = initialState, action) {
    switch (action.type) {
        case cartConstants.SHOW_ADDRESS_REQUEST:
        return {
            ...state,
            address:action.addresses,
            load:true,
        };
        case cartConstants.SHOW_ADDRESS_FAILURE:
        return {
            ...state,
            addAddressError:true,
            load:false,
        };
        case cartConstants.SHOW_ADDRESS_SUCCESS:
        return {
            ...state,
            address:action.addresses,
            load:false,
        };
        case cartConstants.SHOW_SPECIFIC_ADDRESS:
        return {
            ...state,
            loading:true,
            specificAdddressArray:{},
        };
        case cartConstants.SUCCESS_SPECIFIC_ADDRESS:
        return {
            ...state,
            specificAdddressArray:action.result,
            loading:false,
        };
        case cartConstants.FALIURE_SPECIFIC_ADDRESS:
        return {
            ...state,
            loading:false
        };
        default:
            return state;
        }
  }