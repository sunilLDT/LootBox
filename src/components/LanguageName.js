import AsyncStorage from '@react-native-community/async-storage';

export async function languagename(){
  const response = await AsyncStorage.getItem('language')
  return response;
}