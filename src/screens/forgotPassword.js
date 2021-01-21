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
  const {state, forgotPassword, setNavigation, setValidationError} = useContext(AuthContext);

  return (
    <View style={{backgroundColor:'#292633', width:'100%', height:'100%'}}>
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

           
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={50}
              style={styles.screen}>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Email or Phone"
              />
            </KeyboardAvoidingView>

            <TouchableOpacity
              onPress={() => {
                let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (!email) {
                  Alert.alert(
                    "Lootbox",
                    "Email Address is Required",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
                }
                else if (
                  email &&
                  (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && !/\d{8}/.test(email))
                ) {
                  Alert.alert(
                    "Lootbox",
                    "Invalid Email Address or Phone",
                    [
                      { text: "OK", onPress: () => {console.log("clicked")} }
                    ],
                    { cancelable: false }
                  );
                }
                else {
                  forgotPassword(email, isEmail);
                  setNavigation('newPassword')
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ForgotPassword;
