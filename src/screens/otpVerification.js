import React, {useContext, useState, useEffect} from 'react';

import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Context as AuthContext} from '../api/contexts/authContext';
import OtpInput from '../components/otp';
import Modal from '../components/modal';
import Btn from '../screens/btn';
import bgImage from '../assets/signup.png';

const {height, width} = Dimensions.get('window');

const Otp = ({navigation}) => {
  const [otp, setOtp] = useState();
  const {verifyOtp, state, resendOtp} = useContext(AuthContext);
  const [count, setCount] = useState(0);

  const backAction = () => {
   navigation.navigate("auth");
    return true;
  };
  
  useEffect(() => {
    let timer;
    if (count < 60 && count >= 0) {
      timer = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    } else if (count <= 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [count]);
  

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <LinearGradient
      colors={['#2A2D39', '#261D2A']}
      style={{
        width: width,
        minHeight: height,
        overflowX: 'hidden',
      }}>
      {state.msg ? <Modal msg={state.msg} hideBtn /> : null}
      <ImageBackground
        style={{
          height: height,
          width: width,
          overflowX: 'hidden',
          paddingHorizontal: width * 0.09,
        }}
        source={bgImage}>
        <View
          style={{display: 'flex',alignItems:'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate({name: 'auth'})}>
            <Image
              style={{width: 48}}
              resizeMode="contain"
              source={require('../assets/back.png')}
            />
          </TouchableOpacity> 
           <Text
            style={{
              fontStyle: 'italic',
              fontSize: 12,
              color: '#676773',
              marginLeft: 10,
            }}>
            VERIFY OTP
          </Text>
        </View>
        <Text
          style={{
            fontSize: 24,
            color: '#ECDBFA',
            lineHeight: 28,
            marginTop:20,
            fontFamily:'Michroma-Regular',
          }}>
          Verification OTP sent to your mobile number
        </Text>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <OtpInput otp={otp} setOtp={setOtp} />
        </View>
        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'flex-start'
        }}>
          <Text
            style={{
              marginTop: 20,
              color: '#ECDBFA',
              fontSize: 12,
            }}>
            {count === 60
              ? '01:00'
              : count <= 50
              ? `0:${60 - count}`
              : `0:0${60 - count}`}
          </Text>
          {count === 60?
          <TouchableOpacity onPress={async () => {
            if (count === 60) {
              const res = await resendOtp();
              if (res) {
                setCount(0);
              } else {
                setCount(60);
              }
            }
          }}>
            <Text style={{ 
              marginTop: 20,
              color: '#ECDBFA',
              fontSize: 12,
              marginLeft:10
              }}>
                RESEND OTP
            </Text>
          </TouchableOpacity>
          :null}
        </View>
        <TouchableOpacity
          onPress={async () => {
            // if (count !== 0 && count !== 60) {
              await verifyOtp({otp});
            // }
          }}
          style={styles.btnContainer}>
          <Btn text={'VERIFY'} x={"54"} pay=""/>
        </TouchableOpacity>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  btnContainer:{
    flex:1,
    justifyContent:'flex-end',

  }
})

export default Otp;
