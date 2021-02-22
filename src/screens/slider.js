import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  Image,
  ImageBackground
} from 'react-native';
import { getBannerApi } from './../api/buildYourPc';
import plainImage from '../assets/plainBg.png';
import { Context as AuthContext } from '../api/contexts/authContext';
import Onboarding from 'react-native-onboarding-swiper';
const { width, height } = Dimensions.get('window');
import FastImage from 'react-native-fast-image'



const Slideshow = (props) => {
  const [loading, setLoading] = useState([true]);
  const [bannerData, setBannerData] = useState([])
  const { guestUserSignIn, state } = useContext(
    AuthContext,
  );

  useEffect(() => {
    setLoading(true)
    getBannerApi().then((response) => {
      if (response.data) {
        const imageUrls = response.data.map(res => {
          return {
            image: res.image,
            title: res.title
          }
        })
        setBannerData(imageUrls)
      }
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
        <ImageBackground style={{ width, height, backgroundColor: '#272732' }} source={plainImage}>
          <View style={{
            margin: height * 0.47,
            alignSelf: 'center',
          }}>
            <ActivityIndicator color="#ECDBFA" size="small" />
          </View>
        </ImageBackground>) :
        <Onboarding
          onSkip={() => { guestUserSignIn() }}
          onDone={() => { guestUserSignIn() }}
          imageContainerStyles={{ height }}
          titleStyles={{
            // position: 'relative', flex: Platform.OS == 'android' ? 0 : 1,
            // flexWrap: Platform.OS == 'android' ? 'nowrap' : 'wrap',
            color: '#ECDBFA',
            fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
            fontSize: 20,
            lineHeight: 38,
            bottom: Platform.OS == 'ios' ? 200 : 100,
          }}
          pages={
            bannerData.map((bd, i) => {
              return {
                backgroundColor: '#272732',
                image: <FastImage
                  style={{ width, height }}
                  source={{
                    uri: bd.image,
                    priority: FastImage.priority.high,
                  }}
                // onLoadStart={e => setLoading(true)}
                // onLoadEnd={e => setLoading(false)}
                // onProgress={e => console.log(e.nativeEvent.loaded / e.nativeEvent.total)}
                //onProgress={e => {set}}
                // resizeMode={FastImage.resizeMode.contain}
                />,
                title: bd.title,

                subtitle: ''
              }
            })
            //   [
            // {
            //   backgroundColor: '#272732',
            //   image: <FastImage
            //     style={{ width, height }}
            //     source={{
            //       uri: bannerData[0].image,
            //       priority: FastImage.priority.high,
            //     }}
            //     resizeMode={FastImage.resizeMode.contain}
            //   />,
            //   title: bannerData[0].title,
            //   subtitle: ''
            // },
            // ]
          }
        />}
    </>
  );
}

export default Slideshow;