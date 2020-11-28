import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView, 
  KeyboardAvoidingView,
  ActivityIndicator,
  BackHandler,
  Alert
} from 'react-native';
import Logo from '../assets/launch_screen.png';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/input';
import {Context as AuthContext} from '../api/contexts/authContext';
import Modal from '../components/modal';
import Btn from './btn';

const {height, width} = Dimensions.get('window');

const Signin = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {signin, state, googleSignIn, setValidationError} = useContext(
    AuthContext,
  );

  const {validationError} = state;

  const checkLoginFun = () => {

    if(isNaN(email)){
      if(!email){
        setValidationError('Please fill the Email or Phone Number');
      }
      else if(password && (password.length < 8)){
        setValidationError('Password must be at least 8 characters',);
      }
      else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          setValidationError('Invalid Email Address ')
      }
      else if(!password){ 
        setValidationError('All fields are required')
      }
      else{
        signin({email, password});
      }
    }else {
      if(email && !(email.length == 8)){
        setValidationError('Invalid  Phone number')
      }
      else if(!password){ 
        setValidationError('All fields are required')
      }
      else if(!email){
        setValidationError('Please fill the Email or Phone Number');
      }
      else if(password && (password.length < 8)){
        setValidationError('Password must be at least 8 characters',);
      }
      else{
        signin({email, password});
      }
    }
    
  }

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want exit from App?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <LinearGradient
        colors={['#2A2D39', '#261D2A']}
        style={{
          width: width,
          minHeight: height,
          overflowX: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}>
        <ScrollView>
          <SafeAreaView style={{display: 'flex', alignItems: 'center'}}>
          {state.msg ? (
            <Modal msg={state.msg} hideBtn />
          ) : validationError ? (
            <Modal msg={validationError} />
          ) : null}
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
                      paddingRight:20,
                      borderRightColor: '#373843',
                      borderRightWidth: 1,
                      fontFamily:'Michroma-Regular',
                    
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('signup');
                  }}>
                  <Text
                    style={{
                      color: '#ECDBFA',
                      fontSize: 20,
                      paddingLeft:20,
                      opacity: 0.24,
                      fontFamily:'Michroma-Regular',
                    
                    }}>
                    Signup
                  </Text>
                </TouchableOpacity>
              </View>

              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Phone Number Or Email"
              />

              <View style={{marginTop: 20}}>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  password
                  
                />
                {/* <TouchableOpacity onPress={() => setPasswordVisibility()}>
                  <Icon name="eye-off" size={20} color="#fff" style={styles.icon}/>
                </TouchableOpacity> */}
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
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => checkLoginFun()}
              style={{
                width: '100%',
                height: height * 0.1,
              }}>
              {!state.loading ? (
                <Btn text="LOGIN" pay="" x="54" />
              ) : (
                <>
                  <Btn text={' '} x="54" pay="" />
                  <ActivityIndicator
                    color="#ECDBFA"
                    size="small"
                    style={{bottom: 63}}
                  />
                </>
              )}
            </TouchableOpacity>

            <TouchableWithoutFeedback
              onPress={() => {
                googleSignIn();
              }}
              style={{
                width: '100%',
                height: height * 0.09,
                display: 'flex',
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['rgba(184,37,154,0.16)', 'rgba(184,37,154,0.16)']}
                style={{
                  height: height * 0.07,
                  borderRadius: 10,
                  borderColor: '#C01C8A',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1.5,
                  // position: 'absolute',
                  // top: height * 0.7,
                  // bottom: state.loading? 30:0,
                  marginTop: 20,
                  elevation: 100,
                  width: width * 0.80,
                }}>
                <Image
                  source={require('../assets/ic_google.png')}
                  style={{
                    marginRight: 10,
                    width:20,
                    height:25
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    letterSpacing: 0.5,
                   
                  }}>
                  Continue With Gmail
                </Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  // icon:{
  //   position: 'absolute',
  //   right: 10,
  //   height:25,
  //   width: 35,
  //   padding: 2,
  //   bottom:17,
  //   zIndex:1,
  // }
});

export default Signin;
