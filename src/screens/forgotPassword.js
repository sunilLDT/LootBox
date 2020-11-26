import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import Logo from '../assets/launch_screen.png';
import Input from '../components/input';
import {Fonts} from '../utils/Fonts';
import {Context as AuthContext} from '../api/contexts/authContext';
import Modal from '../components/modal';
import Btn from '../screens/btn';

const {height, width} = Dimensions.get('window');

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const {state, forgotPassword, setValidationError} = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ImageBackground
        style={{
          height: height,
          width: width,
          overflowX: 'hidden',
          paddingHorizontal: width * 0.09,
        }}
        source={require('../assets/dottedBackground.png')}>
          <View
            style={{display: 'flex',alignItems:'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
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
              FORGOT PASSWORD
            </Text>
          </View>
        <ScrollView>
          <SafeAreaView style={{display: 'flex', alignItems: 'flex-start'}}>
            <Image
              source={Logo}
              resizeMode="contain"
              style={{
                width: 150,
                alignSelf:'center',
              }}
            />

            {state.msg ? (
              <Modal msg={state.msg} hideBtn />
            ) : state.validationError ? (
              <Modal msg={state.validationError} />
            ) : null}
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={50}
              style={styles.screen}>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                email
              />
            </KeyboardAvoidingView>

            <TouchableOpacity
              onPress={() => {
                if (!email) {
                  setValidationError('Email Address is Required');
                }
                else if (
                  email &&
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                ) {
                  setValidationError(' Invalid Email Address');
                }
                else {
                  forgotPassword(email);
                }
              }}
              style={{
                width: '100%',
              }}>
                {!state.loading ? (
                <Btn text="SUBMIT" x={"38"} pay=""/>
                ) : (
                  <>
                  <Btn text={' '} x="38" pay="" />
                  <ActivityIndicator
                    color="#ECDBFA"
                    size="small"
                    style={{bottom: 63}}
                  />
                </>
                )}
            </TouchableOpacity>
            <Text
              style={{
                // alignSelf: 'flex-end',
                marginTop: height * 0.05,
                marginBottom: height * 0.05,
                color: 'rgba(236,219,250,0.5)',
                fontSize: 12,
                alignSelf:'center',
               
              }}>
              If you do have a password{' '}
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate('auth');
                }}>
                <Text
                  style={{
                    color: '#ECDBFA',
                    fontSize: 12,
                    top: 3,
                   
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </Text>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ForgotPassword;
