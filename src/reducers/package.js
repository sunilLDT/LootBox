import AsyncStorage from '@react-native-community/async-storage';
import { cartConstants } from '../actions/actionTypes';

const initialState = {
  packages: [],
  packagesList:[],
  packageData:{},
  coverImage:'',
  totalPrice:0,
  loginError: false,
  loading: false,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case cartConstants.PACKGE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
   
    case cartConstants.PACKGE_DETAILS_SUCCESS:
      return {
        ...state,
        packages: action.packages.items,
        packageData: action.packages.packageData,
        coverImage: action.packages.coverImage,
        totalPrice: action.packages.totalPrice
      };

      case cartConstants.PACKGE_UPDATE_SUCCESS:
        return {
          ...state,
          packages: action.packages.items,
          totalPrice: action.packages.totalPrice
        };
        case cartConstants.PACKGE_LIST_SUCCESS:
        return {
          ...state,
          packagesList: action.packages.items,
      
        };

    case cartConstants.PACKGE_DETAILS_FAILED:
      return {
        ...state,
        loginError: 'Please enter correct username password',
        loading: false,
      };
    default:
      return state;
  }
}
