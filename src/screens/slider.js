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
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';


const Slideshow = (props) => {
  const [loading, setLoading] = useState([true]);
  const [bannerData, setBannerData] = useState([{title: "",image: ""}])
  const { guestUserSignIn, state } = useContext(
    AuthContext,
  );

  useEffect(() => {
    setLoading(true)
    getBannerApi().then((response) => {
      if (response.code == 200) {
        const imageUrls = response.data.map(res => {
          return {
            image: res.image,
            title: res.title
          }
        })
        setBannerData(imageUrls)
        setLoading(false)
      }
      else{
        setLoading(false)
        alert(response.message)
      }
      
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
          nextLabel = {props.labels.Next}
          skipLabel = {props.labels.Skip}
          onSkip={() => { guestUserSignIn() }}
          onDone={() => { guestUserSignIn() }}
          imageContainerStyles={{width,height}}
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
                  style={{ width, height, }}
                  source={{
                    uri: bd.image,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />,
                title: bd.title,
                subtitle: ''
              }
            })
          }
        />}
    </>
  );
}
const mapStateToProps = (state) => ({
  labels: state.languageReducer.labels,
})

export default connect(mapStateToProps)(Slideshow);