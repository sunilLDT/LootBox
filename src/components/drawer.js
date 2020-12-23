import React,{useContext,useState,useEffect,useReducer} from 'react';
import {
  View,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import {Context as AuthContext} from '../api/contexts/authContext';
import EditBtn from '../components/EditBtn';
import { getProfilApi } from '../api/buildYourPc';
import englishImage from '../assets/english.png';
import arabicImage from '../assets/arabic.png';
import strings,{ changeLaguage } from '../languages/index';
import RNRestart from 'react-native-restart';
import { connect } from '@language';

const {width, height} = Dimensions.get('window');
const options = [
  {
    name: strings.myCart,
    path: 'home',
  },
  {
    name: strings.myOrder,
    path: 'orders',
  },
  {
    name: "FAQ's",
    path: 'Faq',
  },
  {
    name: 'Contact Us',
    path: 'contact',
  },
  {
    name: 'Log Out',
    path: '',
  },
];


function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}


const Drawer = (props) => {

  const {signout,state} = useContext(AuthContext)
  const isDrawerOpen=useIsDrawerOpen()
  const [profileDetails,setProfileDetails] = useState({});
  const [lang,setLang] = useState('en');
  const [languageImage,setLanguageImage] = useState(true);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  let { strings, language } = props;
  const options = [
    {
      name: strings.cart,
      path: 'home',
    },
    {
      name: strings.order,
      path: 'orders',
    },
    {
      name:strings.faq,
      path: 'Faq',
    },
    {
      name: strings.contactUs,
      path: 'contact',
    },
    {
      name: strings.logout,
      path: '',
    },
  ];

  useEffect(() => {
    getProfilApi().then((response) => {
      setProfileDetails(response.data);
    }).catch((error) => {
      console.log("profileDetailsDrawer" +error);
    });
    return () => {
      console.log("willUnMount")
    }
  }, []); 

  const arabicLang = () => {
    language.setLanguage('it')
    setLanguageImage(!languageImage);
    changeLaguage('it');
    setLang('it')
    
    //RNRestart.Restart();
    
  }
  const englishLang = () => {
    language.setLanguage('en')
    setLanguageImage(!languageImage);
    changeLaguage('en');
    //RNRestart.Restart();
  };

  return (
    <Animatable.View
      animation={isDrawerOpen ? 'fadeIn':'fadeOut'}
      delay={900}
      >
        
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#2A2D39', '#261D2A']}
        style={styles.gradient}>
        {!state.loading ? (
        <View
          style={{
            display: 'flex',
            width: width * 0.5,
            height,
            paddingLeft: width * 0.1,
            paddingVertical: width * 0.1,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('profile',{dob:profileDetails.date_of_birth})
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight:'35%'
            }}>
              <View style={{
                 width: width * 0.5,
                 height: 25,
              }}>
                <EditBtn />
              </View>
          </TouchableOpacity>

          <View
            style={{
              borderColor: '#DF2EDC',
              backgroundColor: '#DF2EDC',
              borderRadius: 11,
              borderWidth: 2,
              height: 70,
              width: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: height * 0.1,
              marginBottom: height * 0.02,
            }}>
            {profileDetails.profile_image == ""?(
            <Image
              resizeMode="contain"
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR861VGFylgAJKnC4o90ssB-_ZIcLQi6075ig&usqp=CAU',
              }}
              style={{
                borderRadius: 11,
                height: 64,
                width: 64,
              }}
            />
            ):(
              <Image
              resizeMode="contain"
              source={{uri:profileDetails.profile_image}}
              style={{
                borderRadius: 11,
                height: 64,
                width: 64,
              }}
            />
            )}
          </View>

          <Text
            style={{
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
              fontSize: 16,
              lineHeight: 27.2,
              color: '#ECDBFA',
            }}>
            {profileDetails.full_name}
          </Text>

          <Text
            style={{
              fontFamily: Platform.OS=='android'?'Futura-Medium':'Futura',
              fontSize: 14,
              lineHeight: 16,
              color: '#ECDBFA',
              opacity: 0.6,
              marginBottom: height * 0.1,
            }}>
            {profileDetails.email}
          </Text>
          <Text>{strings.changeLanguage}</Text>

          {options.map((i, k) => (
            <TouchableOpacity key={k} onPress={() => {
              k===options.length-1 ? signout():props.navigation.navigate(i.path)
            }}>
              <Text
                style={{
                  color: '#ECDBFA',
                  fontSize: 14,
                  lineHeight: 16,
                  marginVertical: height * 0.02,
                }}>
                {i.name}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={{marginVertical:20,marginLeft:-10}}>
            {languageImage?(
              <TouchableOpacity onPress={() => arabicLang()}>
                <Image
                  source={englishImage}
                />
              </TouchableOpacity>
            ):(
              <TouchableOpacity onPress={() => englishLang()}>
                <Image
                  source={arabicImage}
                />
              </TouchableOpacity>
            )}
            
          </View>
        </View>
        ) : (
          <>
          <ActivityIndicator
            color="#ECDBFA"
            size="small"
            style={{bottom: 63}}
          />
        </>
        )}

        <TouchableOpacity
          style={{
            width: width * 0.5,
            height: height * 0.9,
            position: 'absolute',
            right: 0,
            top: height * 0.05,
            // alignSelf: 'flex-end'
          }}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}>
          <ImageBackground
            source={require('../assets/menuImage.png')}
            style={{
              width: width * 0.5,
              height: height * 0.9,

              // alignSelf: 'flex-end'
            }}
          />
        </TouchableOpacity>
      </LinearGradient>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height,
    width,
    overflow: 'hidden',
    display: 'flex',
    // flexDirection: 'row',
  },
});

export default connect(Drawer);
