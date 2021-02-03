import React, { useContext ,useState} from 'react';
import {
  Platform,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Context as AuthContext } from '../api/contexts/authContext';
import LanguageCard from '../svgs/cardLang';
import strings,{ changeLaguage } from '../languages/index';
import { connect } from '@language';
import AsyncStorage from '@react-native-community/async-storage';
import {I18nManager} from "react-native";
import RNRestart from 'react-native-restart';

const { height, width } = Dimensions.get('window');

const Language = (props) => {
  const { state, checkUser, setLanguage } = useContext(AuthContext);
  let { strings, language } = props;

  const data = [
    {
      title: 'Arabic',
      image: require('../assets/arabicFlag.png'),
    },
    {
      title: 'English',
      image: require('../assets/englishFlag.png'),
    },
  ];

  const languageChange = async isOn => {
    try{
      await AsyncStorage.setItem('language', isOn);
      let languagename = await AsyncStorage.getItem('language');
      if(languagename == "it"){
        changeLaguage('it');
        I18nManager.forceRTL(true)
        RNRestart.Restart();
      }
      else{
        changeLaguage('en');
        I18nManager.forceRTL(false)
        RNRestart.Restart();
      }
    }
    catch(error)
    {
      console.log(error)
    }
  };

  return (
    <LinearGradient
      colors={['#2A2D39', '#261D2A']}
      style={{
        width: width,
        minHeight: height,
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              lineHeight: 28,
              fontSize: 20,
              color: '#ECDBFA',
              fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
            }}>
           {strings.chooseLang}
            </Text>

          {data.map((i, k) => {
            return (
            <TouchableOpacity
              key={k}
              style={{
                marginTop: 30,
              }}
              onPress={() => {
                languageChange(k == 0?'it':'en')
              }}>
              <View
                style={{
                  position: 'absolute',
                  ...StyleSheet.absoluteFillObject,
                }}>
                <LanguageCard />
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  display: 'flex',
                  marginTop: 10,
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 72,
                  }}
                  source={i.image}
                />
                <Text
                  style={{
                    color: '#ECDBFA',
                    fontSize: 24,
                    lineHeight: 32,
                    marginLeft: 10,

                  }}>
                  {i.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
        )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default connect(Language);
