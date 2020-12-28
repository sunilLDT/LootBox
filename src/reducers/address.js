import { AddressConstant } from '../actions/actionTypes';

const initialState = {
    address: [],
    Error: false,
    loading: false,
  
  };

  export default function (state = initialState, action) {
    switch (action.type) {
        case AddressConstant.ADD_ADDRESS:
        return {
            ...state,
            loading: true,
        };
    }
  }