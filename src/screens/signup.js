import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform
} from 'react-native';
import Logo from '../assets/launch_screen.png';
import Input from '../components/input';
import {Context as AuthContext} from '../api/contexts/authContext';
import Btn from './btn';
import ContinueBtn from '../components/ContinueGmailBtn';
import bgImage from '../assets/signup.png';

const {height, width} = Dimensions.get('window');

const Signup = ({navigation, route}) => {
  const [selected, setSelected] = useState(false);
  const {signup, setValidationError, googleSignIn, state} = useContext(
    AuthContext,
  );

  const {validationError} = state;

  const [first_name, setFirstName] = useState(
    route.params ? route.params.firstName : null,
  );
  const [last_name, setLastName] = useState(
    route.params ? route.params.lastName : null,
  );
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(route.params ? route.params.email : null);
  const [password, setPassword] = useState(null);
  const [user_type, setUserType] = useState(1);
  const [is_google, setIsGoogle] = useState(0);

  const data = {
    first_name,
    last_name,
    phone,
    email,
    password,
    user_type,
    is_google,
  };

  return (
    <View style={{backgroundColor:'#292633', width:'100%', height:'100%'}}>
    <ImageBackground
    source={bgImage}
    style={{
      width: width,
      minHeight: height,
      overflowX: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={20}
        style={styles.screen}>
        <ScrollView
          style={{width, height: height}}
          showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{display: 'flex', alignItems: 'center'}}>
            <View style={{width, alignItems: 'center'}}>
              <Image
                source={Logo}
                resizeMode="contain"
                style={{
                  width: 150,
                  // margin: 'auto',
                  marginTop: width * 0.01,
                  alignItems: 'center',
                }}
              />
            </View>

            <View style={{width,alignItems:'center'}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  marginBottom: 27,
                  marginLeft: width * 0.13,
                }}>
                <TouchableOpacity>
                  <Text
                    onPress={() => {
                      navigation.navigate('signin');
                    }}
                    style={{
                      color: '#ECDBFA',
                      fontSize: 20,
                      paddingRight:20,
                      opacity: 0.24,
                      fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
                <Text style={{color:'#373843', fontSize:30}}>|</Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#ECDBFA',
                      fontSize: 20,
                      paddingLeft:20,
                      fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                    }}>
                    Signup
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginLeft:75}}>
              <Input
                  placeholder="First Name"
                  defaultValue={first_name}
                  onChangeText={setFirstName}
                  style={{width:width * 0.95,paddingRight:'15%'}}
                />
                <View style={{marginTop: 20}}>
                  <Input
                    placeholder="Last Name"
                    defaultValue={last_name}
                    onChangeText={setLastName}
                    style={{width:width * 0.95,paddingRight:'15%'}}
                  />
                </View>

                <View style={{marginTop: 20}}>
                  <Input
                    placeholder="Phone Number"
                    tel
                    onChangeText={setPhone}
                    style={{width:width * 0.95,paddingRight:'15%'}}
                    // defaultValue={phone}
                  />
                </View>

                <View style={{marginTop: 20}}>
                  <Input
                    placeholder="Email"
                    email
                    onChangeText={setEmail}
                    defaultValue={email}
                    style={{width:width * 0.95,paddingRight:'15%'}}
                  />
                </View>

                <View style={{marginTop: 20}}>
                  <Input
                    placeholder="Password"
                    onChangeText={setPassword}
                    password
                    // defaultValue={password}
                    style={{width:width * 0.95,paddingRight:'15%'}}
                  />
                </View>
            </View>

            <View
              style={{
                marginLeft: width * 0.1,
                marginVertical: 10,
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelected(!selected);
                }}>
                {selected ? (
                  <ImageBackground
                    source={require('../assets/ic_check.png')}
                    style={{
                      height: height * 0.04,
                      width: width * 0.12,
                      marginRight: 10,
                      marginTop: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}></ImageBackground>
                ) : (
                  <ImageBackground
                    source={require('../assets/ic_check_outline.png')}
                    style={{
                      height: height * 0.04,
                      width: width * 0.12,
                      marginRight: 10,
                      marginTop: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}></ImageBackground>
                )}
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 10,
                  color: '#dacae8',
                  fontSize: 12,
                  // height: height * 0.04,
                  display: 'flex',
                  width: width * 0.7,
                  flexWrap: 'wrap',
                  position: 'relative',
                  fontStyle:'italic',
                  zIndex: 333,
                }}>
                By clicking signup you agree to our{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    marginLeft: 5,
                    fontStyle:'normal',
                    opacity:1,
                  }}>
                  Terms & Conditions{' '}
                </Text>
                <Text>and </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontStyle:'normal'
                  }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
               
                if (
                  selected &&
                  first_name &&
                  last_name &&
                  email &&
                  phone &&
                  password &&
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
                  password.length >= 8 &&
                  phone.length == 8
                ) {
                  signup(data);
                } else {
                  
                  if (password && password.length < 8) {
                    alert(
                      'Password must be at least 8 characters',
                    );
                  }
                  else if (
                    email &&
                    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                  ) {
                    alert('Invalid Email Address');
                  }
                  else if (phone && !(phone.length == 8)) {
                    alert('Enter a valid phone number');
                  }
                  else if (!first_name) {
                    alert('All fields are required');
                    // setValidationError('First Name Is Required');
                  }
                  else if (!last_name) {
                    alert('All fields are required');
                    // setValidationError('Last Name Is Required');
                  }
                  else if (!phone) {
                    alert('All fields are required');
                    // setValidationError('Phone Number Is Required');
                  }
                  else if (!email) {
                    alert('All fields are required');
                    // setValidationError('Email Address Is Required');
                  }
                  else if (!password) {
                    alert('All fields are required');
                    // setValidationError('Password Is Required');
                  }
                  else if (!selected) {
                    alert('Agree to our terms and conditions');
                  }
                  else {
                    console.log("error");
                  }
                }
                // navigation.navigate('otp');
              }}
              style={{
                width: '80%',
              }}>
              {!state.loading ? (
                <Btn text="SIGNUP" x="54" pay=""/>
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
              >
              <View style={{width:"80%",bottom:20,}}>
                  <ContinueBtn text="Continue With Gmail"/>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
});

export default Signup;
