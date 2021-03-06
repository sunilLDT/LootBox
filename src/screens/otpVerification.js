import React, {useContext, useState, useEffect} from 'react';

import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Context as AuthContext} from '../api/contexts/authContext';
import OtpInput from '../components/otp';
import Btn from '../screens/btn';
import bgImage from '../assets/signup.png';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import PopUp from '../components/popup';
import { navigate } from '../api/contexts/navigationRef';

const {height, width} = Dimensions.get('window');

const Otp = (props) => {
  console.log("type ======")
  const value = props.route.params;
  //console.log(props)
  

  const [otp, setOtp] = useState();
  const {verifyOtp, state, resendOtp, hidePops } = useContext(AuthContext);
  const [count, setCount] = useState(0);

  const backAction = () => {
   props.navigation.navigate("auth");
    return true;
  };
  
  const popUpHandler=()=>{
    hidePops();
  }

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
       <PopUp visible={state.showPopup} title={'Loot'} closeText={props.labels.ok} callBack={popUpHandler} content={state.msg}/>
      
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
            onPress={async () => {
              const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
              if(JSON.parse(isLoggedIn)) {
                props.navigation.goBack();
              } else backAction()
              }}>
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
            fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
          }}>
          {props.labels.verificationOtp}
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
               {props.labels.resendOtp}
            </Text>
          </TouchableOpacity>
          :null}
        </View>
       
        <View  style={styles.btnContainer}>
        <TouchableOpacity
        
          onPress={async () => {
            // if (count !== 0 && count !== 60) {
              console.log('%%%%%%%%%%%%')
              console.log(value)
              await verifyOtp(otp,value);
            // }
          }}
         >
          <Btn text={props.labels.verify.toUpperCase()} x={"54"} pay=""/>
        </TouchableOpacity>
        </View>
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

const mapStateToProps = (state) => ({
  labels:state.languageReducer.labels,
})
const actionCreators = {

};

export default connect(mapStateToProps,actionCreators)(Otp);