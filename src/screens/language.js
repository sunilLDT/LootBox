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
import { languageRestart } from '../components/languageRestart';


const { height, width } = Dimensions.get('window');

const Language = ({ navigation }) => {

  const { state, checkUser, setLanguage } = useContext(AuthContext);
  const [LocalLanguage, setLocalLanguage] = useState('');


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



  return (
    <LinearGradient
      colors={['#2A2D39', '#261D2A']}
      style={{
        width: width,
        minHeight: height,
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        // paddingLeft: width * 0.08,
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
            Choose your language
            </Text>

          {data.map((i, k) => (
            <TouchableOpacity
              key={k}
              style={{
                marginTop: 30,
              }}
              onPress={() => {
                languageChange(LocalLanguage == 'en' ? false : true)

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
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

export default Language;
