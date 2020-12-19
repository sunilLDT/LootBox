import AsyncStorage from '@react-native-community/async-storage';
import { cartConstants } from '../actions/actionTypes';

const initialState = {
  packages: [],
  packagesList: [],
  packageData: {},
  coverImage: '',
  totalPrice: 0,
  loginError: false,
  loading: false,
  loadingCat: false,
  loadingSubCat: false,
  categories: [],
  subCategories: []

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

    case cartConstants.LABEL_REQUEST:
      return {
        ...state,
      };
    case cartConstants.LABEL_SUCCESS:
      return {
        ...state,
        packages: action.packages.items,
        totalPrice: action.packages.totalPrice
      };
    case cartConstants.CAT_REQUEST:
      console.log("Trueing cat request")
      return {
        ...state,
        loadingCat: true

      };
    case cartConstants.CAT_SUCCESS:
      return {
        ...state,
        categories: action.cat.items.map(obj => ({ ...obj, 'na': 'hello' })),
        loadingCat: false

      };
    case cartConstants.CAT_FAILED:
      return {
        ...state,
        loadingCat: false

      };
    case cartConstants.CAT_UPDATE:

      return {
        ...state,
        categories: getSubCat(state.categories)


      };
    case cartConstants.SUBCAT_REQUEST:
      return {
        ...state,
        loadingSubCat: true
      };
    case cartConstants.SUBCAT_SUCCESS:
      console.log('response.data ###########################');
      console.log(action.subcat.items);
      console.log(action.subcat.items)
      return {
        ...state,
        subCategories: action.subcat.items,
        loadingSubCat: false

      };

    default:
      return state;
  }
}


getSubCat = (data) => {
  console.log('chakenh')
  let a = data;
  a[0].name = "kaka";
  console.log(a)
  return a;

}