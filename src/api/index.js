import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../api/contexts/navigationRef';

const instance = axios.create({
  baseURL: 'https://test-api.loot-box.co/api/',
});
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    config.headers.Accept = 'application/json';
    config.headers['X-Localization'] = 'en';
    config.headers['Content-Type'] = 'application/json';

    if (token && token.length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // console.log("interceptors==================************")
    // console.log(err)
    // if(err.config.status === 422){
    //   AsyncStorage.clear();
    //   navigate({name: 'signin'});
    // }
    return Promise.reject(err);
  },
);
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.response.data.message)
    // AsyncStorage.clear()
    // navigate({name: 'auth'})
    return Promise.reject(error)
  }
)

export default instance;


// Url: https://ltdb.vercel.app/

// email: admin@lootbox.com
// password: 123456