import createDataContext from './createDataContext';
import Api from '../index';
import {navigate} from './navigationRef';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin,statusCodes } from '@react-native-community/google-signin';

const reducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        ...state,
        msg: null,
        token: action.payload.token,
      };

    case 'add_msg':
      return {
        ...state,
        msg: action.payload,
      };
    case 'signout':
      return {
        token: null,
        msg: null,
      };
    case 'remove_error':
      return {
        ...state,
        msg: null,
      };
    case 'verify':
      return {
        ...state,
      };
    case 'toggle_loading':
      return {
        ...state,
        loading: !state.loading,
      };
    case 'validation_error':
      return {
        ...state,
        validationError: action.payload,
      };
    case 'language':
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

const checkUser = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');
  if (token && token.length > 0) {
    dispatch({
      type: 'signin',
      payload: {token},
    });
  }
console.log(language)
console.log(token)
  if (language) {
    if (token && token.length > 0) {
      navigate({name: 'home'});
    } else {
      // navigate({name: 'orderDetails'});
      // navigate({name: 'auth'});
    }
  } else {
    if (token && token.length > 0) {
      navigate({name: 'home'});
    } else{
    navigate({name: 'language'});
    }
  }
};

const googleSignIn = (dispatch) => async () => {
  try {
    await GoogleSignin.configure({
      webClientId: '201119561571-i15v7unj24qm39dt32bsvqtcbsqntkg0.apps.googleusercontent.com',
      iosClientId:'201119561571-56nv0io5rjjsoq1et7qb734ok04s4ore.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const email = userInfo.user.email;
    const firstName = userInfo.user.givenName;
    const lastName = userInfo.user.familyName;
    const {
      data: {data},
    } = await Api.post('app/user/check-google-user', {
      email,
      is_google: 1,
    })
    if (data.is_available_user !== undefined) {
      navigate({
        name: 'signup',
        params: {
          email,
          firstName,
          lastName,
        },
      });
    } else if (data.token) {
      console.log(data)
      dispatch({
        type: 'signin',
        payload: {
          token: data.token,
        },
      });
      await AsyncStorage.setItem('token', data.token);
      navigate({name: 'home'});
    } else if (data.is_otp_verified === false) {
      await AsyncStorage.setItem('userId', data.user_id.toString());
      await navigate({name: 'otp'});
      dispatch({
        type: 'add_msg',
        payload:
          'OTP not verified yet.We sent you an otp.Please verify it first !',
      });
    } else {
      dispatch({
        type: 'add_msg',
        payload: 'Something went wrong ',
      });
    }
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.log(error)
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("user cancelled the login flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("sign in progress");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      dispatch({
        type: 'add_msg',
        payload: 'play services not available or outdated',
      });
    }
    else{
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    
  }
};

const signin = (dispatch) => async ({email, password}) => {
  try {
    dispatch({
      type: 'toggle_loading',
    });
    const res = await Api.post('app/user/login', {
      email,
      password,
    });
    if (res.data.data.token) {
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log(res.data)
      dispatch({
        type: 'signin',
        payload: {token: res.data.data.token},
      });
      await AsyncStorage.setItem('token', res.data.data.token);
      navigate({name: 'home'});
    } else if (res.data.data.is_otp_verified === false) {
      await AsyncStorage.setItem('userId', res.data.data.user_id.toString());
      await navigate({name: 'otp'});
      dispatch({
        type: 'add_msg',
        payload:
          'OTP not verified yet.We sent you an otp.Please verify it first !',
      });
    }
    dispatch({
      type: 'toggle_loading',
    });
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: 'These credentials do not match our records.',
    });
    dispatch({
      type: 'toggle_loading',
    });
  }
};

const verifyOtp = (dispatch) => async ({otp}) => {
  try {
    // console.log(otp);
    if(!otp && otp !== ""){
      dispatch({
        type: 'add_msg',
        payload: 'Please fill the OTP',
      });
    }
    else {
      const user_id = await AsyncStorage.getItem('userId');
      const res = await Api.post('app/user/verify-otp', {
        user_id: parseInt(user_id),
        otp,

      });
      // console.log(user_id, res.data.success, otp);
      if (res.data.success) {
        await AsyncStorage.setItem('userId', '');
        await AsyncStorage.setItem('token', res.data.data.token);
        navigate({name: 'slider'});
      } else {
        dispatch({
          type: 'add_msg',
          payload: 'Invalid OTP',
        });
      }
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: 'add_msg',
      payload: 'Invalid OTP',
    });
  }
};

const resendOtp = (dispatch) => async () => {
  try {
    const user_id = await AsyncStorage.getItem('userId');
    const res = await Api.post('app/user/resend-otp', {
      user_id: parseInt(user_id),
    });
    if (res.data.success) {
      dispatch({
        type: 'add_msg',
        payload: 'OTP send successfully',
      });
      return true;
    } else {
      dispatch({
        type: 'add_msg',
        payload: 'OTP not sent',
      });
      return false;
    }
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: 'Some error occurred',
    });
    return false;
  }
};

const signup = (dispatch) => async (data) => {
  try {
    dispatch({
      type: 'toggle_loading',
    });
    const res = await Api.post('app/user/register', data);
    //  console.log(res.data)
    if (res.data.data.is_otp_verified) {
      await AsyncStorage.setItem('token', res.data.data.token);
      navigate({name: 'slider'});
    } else {
      await AsyncStorage.setItem('userId', res.data.data.user_id.toString());
      navigate({name: 'otp'});
    }
    dispatch({
      type: 'toggle_loading',
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: 'add_msg',
      payload: 'User with that email or phone number already exists',
    });
    dispatch({
      type: 'toggle_loading',
    });
  }
};

const forgotPassword = (dispatch) => async (email) => {
  try {
    dispatch({
      type: 'toggle_loading',
    });
    const res = await Api.post('app/user/forgot-password', {email});
    if (res.data.success) {
      dispatch({
        type: 'add_msg',
        payload: res.data.message,
      });
      dispatch({
        type: 'toggle_loading',
      });
      navigate({name: 'auth'});
    } else {
      dispatch({
        type: 'add_msg',
        payload: 'The entered email is not registered',
      });
      dispatch({
        type: 'toggle_loading',
      });
    }
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: 'The entered email is not registered',
    });
    dispatch({
      type: 'toggle_loading',
    });
  }
};

const signout = (dispatch) => async () => {
  try {
    dispatch({
      type: 'toggle_loading',
    });
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate({name: 'auth'});
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: 'SomeThing went wrong',
    });
    dispatch({
      type: 'toggle_loading',
    });
  }
};

const addError = (dispatch) => (msg) =>
  dispatch({type: 'add_msg', payload: msg});

const setValidationError = (dispatch) => (msg) => {
  dispatch({type: 'validation_error', payload: msg});
};

const setLanguage = (dispatch) => async (language) => {
  await AsyncStorage.setItem('language', language);
  dispatch({type: 'language', payload: language});
};

const removeError = (dispatch) => () => dispatch({type: 'remove_error'});

const fetchCategories = (dispatch) => async () => {
  try {
    const response = await Api('app/category/subcategory-list');
    if (response.data.success) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchItems = (dispatch) => async (category_id, subcategory_id,page) => {
  try {
      console.log(page)
    if (subcategory_id) {
      console.log("1111111")
      const response = await Api.get(`app/items/list?category_id=${category_id}&&sub_category_id=${subcategory_id}`);
      return response.data;
    } else {
      console.log("222222")
      const response = await Api.get(`app/items/list?category_id=${category_id}&&page=${page}`);
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchItemsInfo = (dispatch) => async (id) => {
  try {
    const {
      data: {data},
    } = await Api(`app/items/item-details?item_id=${id}`);

    return data.custom_fields_values.map((i, k) => {
      return {
        name: i.name,
        value: i.value,
      };
    });
  } catch (e) {
    console.log(e);
  }
};
const sendEmail = (dispatch) => async (title, description) => {
  try {
    dispatch({
      type: 'toggle_loading',
    });
    if (title,description){
      const res = await Api.post('app/user/email-conatact-us', {
        title,
        description
      });
      if (res.data.success) {
        dispatch({
          type: 'add_msg',
          payload: res.data.message,
        });
        dispatch({
          type: 'toggle_loading',
        });
      }else{
        dispatch({
          type: 'add_msg',
          payload: "Something went wrong",
        });
        dispatch({
          type: 'toggle_loading',
        });
      }
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: 'toggle_loading',
    });
  }
};

export const {Context, Provider} = createDataContext(
  reducer,
  {
    signin,
    signup,
    removeError,
    signout,
    sendEmail,
    fetchItemsInfo,
    checkUser,
    fetchCategories,
    verifyOtp,
    resendOtp,
    addError,
    setLanguage,
    googleSignIn,
    setValidationError,
    forgotPassword,
    fetchItems,
  },
  {
    token: null,
    msg: '',
    loading: false,
    validationError: null,
    language: null,
  },
);
