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

const { height, width } = Dimensions.get('window');

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setPasswordVisibility] = useState(false)

  const { signin, state, googleSignIn, setValidationError } = useContext(
    AuthContext,
  );

  const { validationError } = state;

  const checkLoginFun = () => {

    if (isNaN(email)) {
      if (!email) {
        alert('Please fill the Email or Phone Number');
      }
      else if (password && (password.length < 8)) {
        alert('Password must be at least 8 characters',);
      }
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        alert('Invalid Email Address ')
      }
      else if (!password) {
        alert('All fields are required')
      }
      else {
        signin({ email, password });
      }
    } else {
      if (email && !(email.length == 8)) {
        alert('Invalid  Phone number')
      }
      else if (!password) {
        alert('All fields are required')
      }
      else if (!email) {
        alert('Please fill the Email or Phone Number');
      }
      else if (password && (password.length < 8)) {
        alert('Password must be at least 8 characters',);
      }
      else {
        signin({ email, password });
      }
    }

  }

  const backAction = () => {
    Alert.alert("LootBox", "Are you sure you want exit from App?", [
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
          <ScrollView>
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
                      paddingRight: 20,
                      fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',

                    }}>
                    Login
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
                      paddingLeft: 20,
                      opacity: 0.24,
                      fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',

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

              <View style={{ marginTop: 20, position: 'relative' }}>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
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
                <ContinueBtn text="Continue With Gmail" />
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

export default Signin;
