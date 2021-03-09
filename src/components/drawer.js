import React, { useContext, useState, useEffect, useReducer } from 'react';
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
import { useIsDrawerOpen } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { Context as AuthContext } from '../api/contexts/authContext';
import EditBtn from '../components/EditBtn';
import englishImage from '../assets/english.png';
import arabicImage from '../assets/arabic.png';
import RNRestart from 'react-native-restart';
import { I18nManager } from "react-native"
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Api from '../api/index';
import { profileActions } from '../actions/profileAction';
import { useIsFocused } from "@react-navigation/native";
import {getProfilApi} from '../api/buildYourPc';

const { width, height } = Dimensions.get('window');

const Drawer = (props) => {
  const { signout, state } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const isDrawerOpen = useIsDrawerOpen()
  const [profileDetails, setProfileDetails] = useState({});
  const [disableEdit, setDisable] = useState(false)
  const [languageImage, setLanguageImage] = useState();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0); 
  const [arOren,setarOren] = useState('en');
  const [photo, setPhoto] = useState();
  
  const languageChange = async () => {
    let languagename = await AsyncStorage.getItem('language');
    setarOren(languagename)
  };

  useEffect(() => {
    waitForProp();
    gettingLangName()
    checkUserType()
    languageChange()
    props.sendaction();
    getProfilApi().then((response) => {
      setProfileDetails(response.data)
    }).catch((error) => {
      console.log("profile in drawer" + error);
    });
    
    return () => {
      console.log("willUnMount")
    }
  }, [isFocused,languageImage]);

  const waitForProp = async () => {
    setProfileDetails(props.profileData);
    setPhoto(props.profileData.profile_image.replace('user/profile/',''))
  }


  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     waitForProp();
  //   });
  //   return unsubscribe;
  // }, []);

  let options = [
    {
      name: props.labels.cart,
      path: 'cart',
    },
    {
      name: props.labels.myOrders,
      path: 'orders',
    },
    // {
    //   name:strings.faq,
    //   path: 'Faq',
    // },
    {
      name: props.labels.contactUs,
      path: 'contact',
    }, {
      name: props.labels.logout,
      path: '',
    }
  ];

  const gettingLangName = async () => {
    try {
      const value = await AsyncStorage.getItem('language');
      console.log("*****lang 1************")
      console.log(value)
      console.log("*****************")
      if (value !== null) {
        console.log("*****lang 2************")
        console.log(value)
        console.log("*****************")
        setLanguageImage(value)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const checkUserType = async () => {
    const userType = await AsyncStorage.getItem('user_type')
    if (JSON.parse(userType) == 2) {
      setDisable(true)
    }
  }

  const checkProfileNmae = () => {
    if(profileDetails.full_name == 0){
      if(arOren == "ar"){
        return "حساب زائر";
      }
      else{
        return "Guest User"
      }
    }
    else{
      return profileDetails.full_name;
    }
  }

  const arabicLang = async () => {
    try{
      await AsyncStorage.setItem('language', 'ar');
     
      const value = await AsyncStorage.getItem('deviceToken');
      const language = await AsyncStorage.getItem('language');
      const data = {
        token: value,
        language:language,
        device_type:Platform.OS=='android' ? 1 : 2,
        action_type:1
      }
      const checking =   await Api.post('app/user/device-token',data);
      console.log("*****arabic************")
      console.log(language)
      console.log("*****************")
      I18nManager.forceRTL(true)
      RNRestart.Restart();
    }catch(e){
      console.log("checking ar+++++++++++++" + e)
    }
  }

  const signoutReq = () => {
    props.logoutaction();
    signout()
  }

  const englishLang = async () => {
    try{  
      await AsyncStorage.setItem('language', 'en');
  
      const value = await AsyncStorage.getItem('deviceToken');
      const language = await AsyncStorage.getItem('language');
      const data = {
        token: value,
        language:language,
        device_type:Platform.OS=='android' ? 1 : 2,
        action_type:1
      }

      const making =  await Api.post('app/user/device-token',data);
      console.log("*****en************")
      console.log(language)
      console.log("*****************")
      I18nManager.forceRTL(false)
      RNRestart.Restart();
    }catch(e){
      console.log('en language change +++++++++++++'+ e)
    }
  };

  const getLanguafeButton=()=>{
    let d;
    //AsyncStorage.getItem("language").then((value) => {
      
      if(languageImage=='en'){
        
       return( <TouchableOpacity onPress={() => arabicLang()}>
          <Image
            source={englishImage}
          />
        </TouchableOpacity>)
        }else{
 
         return( <TouchableOpacity onPress={() => englishLang()}>
                        <Image
                          source={arabicImage}
                        />
                      </TouchableOpacity>)
               }

  

  }

  return (
    <Animatable.View
      animation={isDrawerOpen ? 'fadeIn' : 'fadeOut'}
      delay={900}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
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
            {
              !disableEdit &&
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('profile', { dob: profileDetails.date_of_birth })
                }}
                disabled={disableEdit}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '35%'
                }}>
                <View style={{
                  width: width * 0.5,
                  height: 25,
                }}>
                  <EditBtn text={props.labels.editProfile} x={arOren == "ar"? 9:0}/>
                </View>
              </TouchableOpacity>
            }
            <View
              style={{
                borderColor:'#272732',
                borderWidth:2,
                borderRadius: 11,
                height: 70,
                width: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: height * 0.1,
                marginBottom: height * 0.02,
              }}>
              {profileDetails.profile_image == "" ? (
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
              ) : (
                  <Image
                    // resizeMode="contain"
                    source={{ uri:photo}}
                    style={{
                      height: 65,
                      width: 70,
                      borderRadius:11
                    }}
                  />
                )}
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>       
              <Text
                style={{
                  fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                  fontSize: 16,
                  lineHeight: 27.2,
                  color: '#ECDBFA',
                  paddingHorizontal:4
                }}>
                {checkProfileNmae()}
              </Text>
            </View>  
            <View
              style={{
                display: 'flex',
                // alignItems: 'center',
                flexDirection: 'row',
              }}>  
            <Text
              style={{
                fontFamily: Platform.OS == 'android' ? 'Futura-Medium' : 'Futura',
                fontSize: 14,
                lineHeight: 16,
                color: '#ECDBFA',
                opacity: 0.6,
                marginBottom: height * 0.1,
                // width: arOren == "ar"?width * 0.4:width * 0.6,
                marginTop: 8,
                // paddingHorizontal:5
              }}>
              {profileDetails.email}
            </Text>
            </View>
            <Text>{props.labels.changeLanguage}</Text>

            {options.map((i, k) => (
              disableEdit ?
                <TouchableOpacity key={k} onPress={() => {
                  props.navigation.navigate(i.path)
                }}>
                  {
                    k !== options.length - 1 &&
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
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
                    </View>
                  }
                </TouchableOpacity>
                :
                <TouchableOpacity key={k} disabled={k === options.length - 1 && disableEdit} onPress={() => {
                  k === options.length - 1 ? signoutReq() : props.navigation.navigate(i.path)
                }}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
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
                </View>
                </TouchableOpacity>
            ))}
            <View style={{ marginVertical: 20, marginLeft: -10 }}>
            {getLanguafeButton()}
              {/* {languageImage == "en" ? (
                <TouchableOpacity onPress={() => arabicLang()}>
                  <Image
                    source={englishImage}
                  />
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity onPress={() => englishLang()}>
                    <Image
                      source={arabicImage}
                    />
                  </TouchableOpacity>
                )} */}
            </View>
          </View>
        ) : (
            <>
              <ActivityIndicator
                color="#ECDBFA"
                size="small"
                style={{ bottom: 63 }}
              />
            </>
          )}

        <TouchableOpacity
          style={{
            // width: arOren == "ar"?width * 0.35:width * 0.6,
            height: height * 0.9,
            position: 'absolute',
            top: height * 0.03,
            right:0,
            // alignSelf: 'flex-end'
          }}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}>
          <ImageBackground
            source={require('../assets/menuImage.png')}
            style={{
              width: width * 0.4,
              height: height * 0.9,
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
  },
});
const mapStateToProps = (state) => ({
  labels:state.languageReducer.labels,
  profileData: state.profileReducer.profile,
  profileLoader:state.profileReducer.loading,
})
const actionCreators = {
  sendaction: profileActions.showProfile,
  logoutaction:profileActions.logoutFun
};
export default connect(mapStateToProps,actionCreators)(Drawer);
