import { cartConstants } from '../actions/actionTypes';

const initialState = {
    address: [],
    addAddressError: false,
  };

  export default function (state = initialState, action) {
    switch (action.type) {
        case cartConstants.SHOW_ADDRESS_REQUEST:
        return {
            ...state,
            address:action.addresses,
        };
        case cartConstants.SHOW_ADDRESS_FAILURE:
        return {
            ...state,
            addAddressError:true,
        };
        case cartConstants.SHOW_ADDRESS_SUCCESS:
        return {
            ...state,
            address:action.addresses,
        };
        default:
            return state;
        }
  }