import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'https://api.loot.com.kw/api/',
});
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    const lang = await AsyncStorage.getItem('language');
    config.headers.Accept = 'application/json';
    config.headers['X-Localization'] = lang;
    config.headers['Content-Type'] = 'application/json';
    if (token && token.length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    
  },
  (err) => {
    return Promise.reject(err);
  },
);
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response.data.code == 401){
      alert(error.response)
      AsyncStorage.removeItem('deviceToken');
      navigate({name: 'auth'})
    }
    return Promise.reject(error)
  }
)

export default instance;


// Url: https://ltdb.vercel.app/

// email: admin@lootbox.com
// password: 123456