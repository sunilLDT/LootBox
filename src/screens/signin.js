import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  BackHandler,
  Alert,
  ImageBackground
} from 'react-native';
import Logo from '../assets/launch_screen.png';
import Input from '../components/input';
import { Context as AuthContext } from '../api/contexts/authContext';
import Modal from '../components/modal';
import Btn from './btn';
import ContinueBtn from '../components/ContinueGmailBtn';
import bgImage from '../assets/signup.png';
import Icons  from 'react-native-vector-icons/FontAwesome';
import {languagename} from '../components/LanguageName';
import { connect } from 'react-redux';
import PopUp from '../components/popup';
import { navigate } from '../api/contexts/navigationRef';
const { height, width } = Dimensions.get('window');

const Signin = ({ navigation ,labels}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setPasswordVisibility] = useState(false);
  const [arOren,setarOren] = useState('en');
  const [popModal, setPopModal] = useState(false);
  const [contentModal, setContentModal] = useState('');

  languagename().then(res => setarOren(res))
  const { signin, guestUserReSignIn, state, googleSignIn, setValidationError,hidePops } = useContext(
    AuthContext,
  );

  useEffect(() => {
    guestUserReSignIn('logout');
  }, []);

  const popUpHandler=()=>{
    hidePops();
    // navigate({ name: 'otp' });
  }
  const popUpHandler1=()=>{
    setPopModal(!popModal)
  }

  const checkLoginFun = () => {
    if (isNaN(email)) {
      if (!email) {
        setPopModal(true);
        setContentModal(labels.invaildEmail);
        
      }
      else if (password && (password.length < 8)) {
        setPopModal(true);
        setContentModal(labels.validPhoneNumber);
       
      }
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setPopModal(true);
        setContentModal(labels.invaildEmail);
       
      }
      else if (!password) {
        setPopModal(true);
        setContentModal(labels.allFieldsAreRequired);
     
      }
      else {
        signin({ email, password });
      }
    } else {
      if (email && !(email.length == 8)) {
        setPopModal(true);
        setContentModal(labels.validPhoneNumber);
       
      }
      else if (!password) {
        setPopModal(true);
        setContentModal(labels.allFieldsAreRequired);
   
      }
      else if (!email) {
        setPopModal(true);
        setContentModal(labels.emailPhoneInvalid);
       
      }
      else if (password && (password.length < 8)) {
        setPopModal(true);
        setContentModal(labels.passwordEightCharacters);
      
      }
      else {
        signin({ email, password });
      }
    }

  }

  return (
    <View style={{ backgroundColor: '#292633', width: '100%', height: '100%' }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>

        <ImageBackground source={bgImage} style={{
          width: width,
          minHeight: height,
          overflowX: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
        >
           <PopUp visible={popModal} title={labels.lootBox} closeText={labels.ok} callBack={popUpHandler1} content={contentModal}/>
      
          <ScrollView>
            {/* {state.msg ? (
              <Modal msg={state.msg} hideBtn />
            ) : validationError ? (
              <Modal msg={state.msg} />
            ) : null} */}
            {state.msg ? (
              <PopUp visible={state.showPopup} title={labels.lootBox} closeText={labels.ok} callBack={popUpHandler} content={state.msg}/>
            ):null}
  
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={50}
              style={styles.screen}>
              <View
                style={{
                  width: width * 0.8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Logo}
                  resizeMode="contain"
                  style={{
                    width: 150,
                    // height: height*0.2,
                    // marginVertical:height*0.05,
                  }}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  marginBottom: 27,
                  marginLeft: 3,
                }}>
                <TouchableOpacity
                // onPress={() => {
                //   navigation.replace('signin');
                // }}
                >
                  <Text
                    style={{
                      color: '#ECDBFA',
                      fontSize: 20,
                      paddingLeft:arOren == 'ar'?20:0,
                      paddingRight:arOren == 'ar'?0:20,
                      fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',

                    }}>
                    {labels.login}
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: '#373843', fontSize: 30 }}>|</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('signup');
                  }}>
                  <Text
                    style={{
                      color: '#ECDBFA',
                      fontSize: 20,
                      paddingLeft:arOren == 'ar'?0:20,
                      paddingRight:arOren == 'ar'?20:0,
                      opacity: 0.24,
                      fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',

                    }}>
                    {labels.singnUp}
                  </Text>
                </TouchableOpacity>
              </View>

              <Input
                value={email}
                onChangeText={setEmail}
                placeholder={labels.phoneNumberOrEmail}
              />

              <View style={{ marginTop: 20, position: 'relative' }}>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  placeholder={labels.password}
                  password={showPassword}

                />
                <TouchableOpacity style={styles.icon} onPress={() => setPasswordVisibility(!showPassword)}>
                  <Icons name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                alignSelf: 'flex-end',
              }}
              onPress={() => {
                navigation.navigate('forgotPassword');
              }}>
              <Text
                style={{
                  marginTop: 15,
                  color: '#897E95',
                  fontSize: 12,
                  fontWeight: 'bold',

                }}>
                {labels.forgotPassword}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => checkLoginFun()}
              style={{
                width: '100%',
                height: height * 0.1,
              }}>
              {!state.loading ? (
                <Btn text={labels.login.toUpperCase()} pay="" x={arOren == "ar"?40:54} />
              ) : (
                  <>
                    <Btn text={' '} x="54" pay="" />
                    <ActivityIndicator
                      color="#ECDBFA"
                      size="small"
                      style={{ bottom: 63 }}
                    />
                  </>
                )}
            </TouchableOpacity>
            <TouchableWithoutFeedback
              onPress={() => {
                googleSignIn();
              }}
            >
              <View style={{ marginVertical: 10 }}>
                <ContinueBtn text={labels.continueWithGmail}/>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </ImageBackground>

      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    right: 10,
    height: 25,
    width: 35,
    padding: 2,
    bottom: 25,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'flex-end'
  }
});


const mapStateToProps = (state) => ({
  labels:state.languageReducer.labels,
})
const actionCreators = {

};

export default connect(mapStateToProps,actionCreators)(Signin);