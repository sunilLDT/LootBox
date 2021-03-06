import React from 'react';
import createDataContext from './createDataContext';
import Api from '../index';
import { navigate } from './navigationRef';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { Platform } from 'react-native';

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
        showPopup:true,
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
        guestUser: action.payload,
      };
    case 'guestUser':
      return {
        ...state,
        language: action.payload,
      };
      case 'hidePopup':
        return {
          ...state,
          showPopup: !state.showPopup,
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
      payload: { token },
    });
  }
  if (language) {
    if (token && token.length > 0) {
      navigate({ name: 'home' });
    } else {
      navigate({ name: 'slider' });
    }
  } else {
    if (token && token.length > 0) {

      navigate({ name: 'home' });
    } else {

      navigate({ name: 'language' });
    }
  }
};

const setNavigation = (dispatch) => async (name) => {
  await AsyncStorage.setItem('Navigation', name);
  dispatch({
    type: 'setNavigation',
    payload: name
  });
};

const googleSignIn = (dispatch) => async () => {
  try {
    await GoogleSignin.configure({
      webClientId: '85981177828-vimmqnf1kr23gvlct0mvkonp8nqre1n5.apps.googleusercontent.com',
      iosClientId: '85981177828-vimmqnf1kr23gvlct0mvkonp8nqre1n5.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const email = userInfo.user.email;
    const firstName = userInfo.user.givenName;
    const lastName = userInfo.user.familyName;
    const {
      data: { data },
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
      dispatch({
        type: 'signin',
        payload: {
          token: data.token,
        },
      });
      await AsyncStorage.setItem('user_type', JSON.stringify(1));
      await AsyncStorage.setItem('token', data.token);
      navigate({ name: 'home' });
    } else if (data.is_otp_verified === false) {
      await AsyncStorage.setItem('userId', data.user_id.toString());
      await navigate({ name: 'otp' });
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
    dispatch({
      type: 'add_msg',
      payload: error.response.data.message,
    });
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
    else {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }

  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    dispatch({
      type: 'toggle_loading',
    });
    const user_id = await AsyncStorage.getItem('user_id');
   
    const data = {
      email:email,
      password:password,
      guest_user_id:user_id - 1,
    }
    console.log("sigin in functionn ====== for guest user ")
    console.log(data)

    const res = await Api.post('app/user/login', data);
    if (res.data.data.token) {
      dispatch({
        type: 'signin',
        payload: { token: res.data.data.token },
      });
      await AsyncStorage.setItem('token', res.data.data.token);
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      await AsyncStorage.setItem('user_type', JSON.stringify(1));
      await AsyncStorage.setItem('userId', JSON.stringify(res.data.data.user_id));
      await AsyncStorage.setItem('is_OTP_Verified', JSON.stringify(true))

      const deviceToken = await AsyncStorage.getItem('deviceToken');
      const language = await AsyncStorage.getItem('language');
      const store = await Api.post('app/user/device-token',{
       token: deviceToken,
       language:language,
       device_type:Platform.OS=='android' ? 1 : 2,
       action_type:1
     });
      navigate({ name: 'home' });
    } else if (res.data.data.is_otp_verified === false) {
      await AsyncStorage.setItem('userId', res.data.data.user_id.toString());
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      await navigate({ name: 'otp' });
      dispatch({
        type: 'add_msg',
        payload:e.response.data.message,
      });
    }
    dispatch({
      type: 'toggle_loading',
    });
  } catch (e) {
    dispatch({
      type: 'toggle_loading',
    });
    dispatch({
      type: 'add_msg',
      payload: e.response.data.message,
    });
  }

};

const guestUserSignIn = (dispatch) => async (type) => {
  try {
    dispatch({
      type: 'add_guest_user',
    });
    const res = await Api.post('app/user/register', {
      first_name: "0",
      user_type: 2,
      is_google: 0
    });
    if (res.data.data.token) {
      await AsyncStorage.setItem('token', res.data.data.token);
      await AsyncStorage.setItem('user_id', JSON.stringify(res.data.data.user_id));
      await AsyncStorage.setItem('user_type', JSON.stringify(res.data.data.user_type));
      if(type=='login'){
        navigate({ name: 'auth' });
      }else{
        navigate({ name: 'home' });
      }
     
    }
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: 'Something went wrong',
    });
    dispatch({
      type: 'toggle_loading',
    });
  }
};


const guestUserReSignIn = (dispatch) => async (type) => {
  try {
    const res = await Api.post('app/user/register', {
      first_name: "0",
      user_type: 2,
      is_google: 0
    });
    if (res.data.data.token) {
      await AsyncStorage.setItem('token', res.data.data.token);
      await AsyncStorage.setItem('user_id', JSON.stringify(res.data.data.user_id));
      await AsyncStorage.setItem('user_type', JSON.stringify(res.data.data.user_type));
           
    }
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: 'Something went wrong',
    });
    dispatch({
      type: 'toggle_loading',
    });
  }
};

const  hidePops = (dispatch) => async () =>{
  dispatch({
    type: 'hidePopup',
    payload: '',
  });

}


const verifyOtp = (dispatch) => async ( otp,from ) => {
  try {
    if (!otp && otp !== "") {
      dispatch({
        type: 'add_msg',
        payload: 'Please fill the OTP',
      });
    }
    else {
      const user_id = await AsyncStorage.getItem('userId');
      const resetPassword = await AsyncStorage.getItem('is_reset_password');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const navigationName = await AsyncStorage.getItem('Navigation');
      const res = await Api.post('app/user/verify-otp', {
        user_id: parseInt(user_id),
        otp,
        is_reset_password: JSON.parse(resetPassword)
      });
      if (res.data.success) {
        if (resetPassword && !JSON.parse(isLoggedIn)) {
          await AsyncStorage.setItem('userId', res.data.data.user_id);
        } else {
          if(from== "undefined"){
            console.log("===== 1 *****")
            await AsyncStorage.setItem('token', res.data.data.token);
          }else{
            console.log("===== 2 *****")
          }
          // await AsyncStorage.setItem('userId', JSON.stringify(res.data.data.user_id));
          await AsyncStorage.setItem('user_type', JSON.stringify(1));
          // await AsyncStorage.setItem('is_OTP_Verified', JSON.stringify(true))
          const deviceToken = await AsyncStorage.getItem('deviceToken');
          const language = await AsyncStorage.getItem('language');
          const store = await Api.post('app/user/device-token',{
            token: deviceToken,
            language:language,
            device_type:Platform.OS=='android' ? 1 : 2,
            action_type:1
          });
        }
        navigate({ name: navigationName || 'home' });
      } else {
        dispatch({
          type: 'add_msg',
          payload: 'Invalid OTP',
        });
      }
    }
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: e.response.data.message,
    });
  }
};

const resetPassword = (dispatch) => async (password) => {
  try {
    const user_id = await AsyncStorage.getItem('userId');
    
    await AsyncStorage.removeItem('is_reset_password');
    const res = await Api.post('app/user/reset-password', {
      user_id: user_id,
      password,
    });
    console.log(res);
    if (res.data.success) {
      dispatch({
        type: 'add_msg',
        payload: res.data.message,
      });
      navigate({ name: 'auth' });
    } else {
      dispatch({
        type: 'add_msg',
        payload: e.response.data.message,
      });
    }
  } catch (e) {
    console.log(e.response);
    dispatch({
      type: 'add_msg',
      payload: e.response.data.message,
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
      payload: e.response.data.message,
    });
    return false;
  }
};


const registerGuestUser = (dispatch) => async (data) => {
  
  try {
    dispatch({
      type: 'toggle_loading',
    });
    const res = await Api.post('app/user/register', data);
    if (res.data.data.is_otp_verified) {
      await AsyncStorage.setItem('token', res.data.data.token);
      await AsyncStorage.setItem('user_type', JSON.stringify(1));
      await AsyncStorage.removeItem('callingCode');
      await AsyncStorage.setItem('user_id', JSON.stringify(res.data.data.user_id));
      navigate({ name: 'home' });
    } else {
      await AsyncStorage.setItem('user_type', JSON.stringify(1));
      await AsyncStorage.setItem('userId', res.data.data.user_id.toString());
      await AsyncStorage.removeItem('callingCode');
      await AsyncStorage.setItem('user_id', JSON.stringify(res.data.data.user_id));
      navigate({ name: 'otp' });
    }
    dispatch({
      type: 'toggle_loading',
    });
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: e.response.data.message,
    });
    dispatch({
      type: 'toggle_loading',
    });
  }
};

const signup = (dispatch) => async (data) => {
  try {
    dispatch({
      type: 'toggle_loading',
    });
    const res = await Api.post('app/user/register', data);
    if (res.data.data.is_otp_verified) {
      await AsyncStorage.setItem('token', res.data.data.token);
      await AsyncStorage.removeItem('callingCode');
      navigate({ name: 'slider' });

    } else {
      await AsyncStorage.setItem('userId', res.data.data.user_id.toString());
      await AsyncStorage.removeItem('callingCode');
      const deviceToken = await AsyncStorage.getItem('deviceToken');
      navigate({ name: 'otp',params:0});
    }
    dispatch({
      type: 'toggle_loading',
    });
  } catch (e) {
    dispatch({
      type: 'add_msg',
      payload: e.response.data.message,
    });
    dispatch({
      type: 'toggle_loading',
    });
  }
};

const forgotPassword = (dispatch) => async (email, isEmail) => {
  try {
    dispatch({
      type: 'toggle_loading',
    });
    const res = await Api.post('app/user/forgot-password', { email });
    
    if (res.data.success) {
      dispatch({
        type: 'add_msg',
        payload: res.data.message,
      });
      dispatch({
        type: 'toggle_loading',
      });
      if (isEmail) {
        navigate({ name: 'auth' });
      } else {
        navigate({ name: 'otp'},{params:0});
        await AsyncStorage.setItem('userId', res.data.data.user_id.toString());
        await AsyncStorage.setItem('is_reset_password', JSON.stringify(true));
      }
    } else {
      dispatch({
        type: 'add_msg',
        payload: e.response.data.message,
      });
      dispatch({
        type: 'toggle_loading',
      });
    }
  } catch (e) {
    console.log(e)
    dispatch({
      type: 'add_msg',
      payload: e.response.data.message,
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
    const value = await AsyncStorage.getItem('deviceToken');
    const language = await AsyncStorage.getItem('language');
    const store = await Api.post('app/user/device-token',{
    token: value,
    language:language,
    device_type:Platform.OS=='android' ? 1 : 2,
    action_type:2
    });

    //await AsyncStorage.removeItem('deviceToken');
    await AsyncStorage.removeItem('callingCode');
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate({ name: 'auth' });
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
  dispatch({ type: 'add_msg', payload: msg });

const setValidationError = (dispatch) => (msg) => {
  dispatch({ type: 'validation_error', payload: msg });
};

const setLanguage = (dispatch) => async (language) => {
  await AsyncStorage.setItem('language', language);
  dispatch({ type: 'language', payload: language });
};

const removeError = (dispatch) => () => dispatch({ type: 'remove_error' });

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

const fetchItems = (dispatch) => async (category_id, sub_category_id, page, filterId, filterValues, minPrice, maxPrice , all ,text) => {
  
  try {
    if (sub_category_id) {
      if (filterId) {
        const allVariables = {
          category_id:category_id,
          sub_category_id:  [parseInt(sub_category_id)],
          filter_custome_field_id:filterId == ""?null: all ? filterId : filterId,
          filter_custome_values:filterValues == ""?null:filterValues,
          min_price:parseInt(minPrice),
          max_price:parseInt(maxPrice),
          limit:6,
          search:text == undefined?"":text
        }
       
       let response = await Api.post('app/items/list',allVariables);
        return response.data;
      } else {
        const response = await Api.post('app/items/list',{
          category_id: category_id,
          sub_category_id: [parseInt(sub_category_id)] ,
        });
        return response.data;
      }
    } else {
      if (filterId) {
        const response = await Api.post('app/items/list',{
         category_id,
         page,
         filter_custome_field_id: [filterId],
         filter_custome_values: [filterValues],
         min_price:minPrice,
         max_price:maxPrice,
         search:text

        });
        return response.data;
      } else {
        const response = await Api.post('app/items/list',{
          category_id,
          page,
          limit:6,
          search:text
        });
        return response.data;
      }

    }
  } catch (e) {
    console.log(e);
  }
};

const fetchItemsInfo = (dispatch) => async (id) => {
  try {
    const {
      data: { data },
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
    if (title, description) {
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
      } else {
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
    dispatch({
      type: 'toggle_loading',
    });
  }
};

export const { Context, Provider } = createDataContext(
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
    guestUserSignIn,
    registerGuestUser,
    resetPassword,
    setNavigation,
    hidePops,
    guestUserReSignIn
  },
  {
    token: null,
    msg: '',
    loading: false,
    validationError: null,
    language: null,
    navigation: null,
    showPopup:false
  },
);
