import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  Image,
  ImageBackground
} from 'react-native';
import Btn from '../screens/btn';
import { getBannerApi } from './../api/buildYourPc';
import plainImage from '../assets/plainBg.png';
import { Context as AuthContext } from '../api/contexts/authContext';
import Onboarding from 'react-native-onboarding-swiper';
const { width, height } = Dimensions.get('window');


const Slideshow = (props) => {
  const [loading, setLoading] = useState([true]);
  const [bannerData,setBannerData] = useState([])
  const { guestUserSignIn, state } = useContext(
    AuthContext,
  );

  useEffect(() => {
    setLoading(true)
    getBannerApi().then((response) => {
      setBannerData(response.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log("banner" + error);
      setLoading(false)
    })
  }, []);

  const { navigation } = props;
  return (
    <>
    {loading ? (
      <ImageBackground style={{width,height,backgroundColor:'#272732'}} source={plainImage}>
        <View style={{ 
          margin: height * 0.47,
          alignSelf: 'center',
          }}>
          <ActivityIndicator color="#ECDBFA" size="small" />
        </View>
      </ImageBackground>):
    <Onboarding
      onSkip={() => { guestUserSignIn() }}
      onDone={() => { guestUserSignIn() }}
      imageContainerStyles={{ height}}
      titleStyles={{
        // position: 'relative', flex: Platform.OS == 'android' ? 0 : 1,
        // flexWrap: Platform.OS == 'android' ? 'nowrap' : 'wrap',
        color: '#ECDBFA',
        fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
        fontSize: 20,
        lineHeight: 38,
        bottom: Platform.OS == 'ios' ? 100 : 100,
      }}
      pages={[
        {
          backgroundColor: '#272732',
          image: <Image style={{width,height}} source={{uri:bannerData[0].image}} />,
          title: bannerData[0].title,
          subtitle: ''
        },
        {
          backgroundColor: '#272732',
          image: <Image style={{width,height}} source={{uri:bannerData[1].image}} />,
          title: bannerData[1].title,
          subtitle: '',
        },
        {
          backgroundColor: '#272732',
          image: <Image style={{width,height}} source={{uri:bannerData[2].image}} />,
          title: bannerData[2].title,
          subtitle: '',
        }
      ]}
    />}
  </>
  );
}

export default Slideshow;