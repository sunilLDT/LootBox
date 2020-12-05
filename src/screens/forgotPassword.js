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
  ImageBackground,
  Alert 
} from 'react-native';
import Logo from '../assets/launch_screen.png';
import Input from '../components/input';
import {Context as AuthContext} from '../api/contexts/authContext';
import Modal from '../components/modal';
import Btn from '../screens/btn';
import bgImage from '../assets/signup.png';

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
        source={bgImage}>
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
                  Alert.alert(
                    "Required",
                    "Email Address is Required",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
                }
                else if (
                  email &&
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                ) {
                  Alert.alert(
                    "Invalid",
                    "Invalid Email Address",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
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
