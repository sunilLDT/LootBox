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
} from 'react-native';
import Logo from '../assets/launch_screen.png';
import PlanBg from '../assets/plainBg.png'
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/input';
import Icon from 'react-native-vector-icons/AntDesign';
import {Context as AuthContext} from '../api/contexts/authContext';
import Btn from './btn';

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
  const [phone, setPhone] = useState('97523476');
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
    <ImageBackground
    source={PlanBg}
    style={{
      width: width,
      minHeight: height,
      overflowX: 'hidden',
      display: 'flex',
      alignItems: 'center',
      // justifyContent:'center'
    }}
    >
      <KeyboardAvoidingView
        behavior="position"
        // keyboardVerticalOffset={40}
        topOffset={20}
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
                      fontFamily:'Michroma-Regular',
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#ECDBFA',
                      fontSize: 20,
                      paddingLeft:20,
                      borderLeftColor: '#373843',
                      borderLeftWidth: 1,
                      fontFamily:'Michroma-Regular',
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
                  zIndex: 333,
                  fontStyle:'italic'
                  // color:'#383540'
                }}>
                By clicking signup you agree to our{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    marginLeft: 5,
                    fontStyle:'normal'
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
                    setValidationError(
                      'Password must be at least 8 characters',
                    );
                  }
                  if (
                    email &&
                    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                  ) {
                    setValidationError('Invalid Email Address');
                  }
                  if (phone && !(phone.length == 8)) {
                    setValidationError('Enter a valid phone number');
                  }
                  if (!selected) {
                    setValidationError('Agree to our terms and conditions');
                  }
                  if (!first_name) {
                    setValidationError('All fields are required');
                    // setValidationError('First Name Is Required');
                  }
                  if (!last_name) {
                    setValidationError('All fields are required');
                    // setValidationError('Last Name Is Required');
                  }
                  if (!phone) {
                    setValidationError('All fields are required');
                    // setValidationError('Phone Number Is Required');
                  }
                  if (!email) {
                    setValidationError('All fields are required');
                    // setValidationError('Email Address Is Required');
                  }
                  if (!password) {
                    setValidationError('All fields are required');
                    // setValidationError('Password Is Required');
                  }
                }
                // navigation.navigate('otp');
              }}
              style={{
                width: '80%',
                height: height * 0.1,
              }}>
              {/* <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#C01C8A', '#865CF4']}
                style={{
                  height: height * 0.09,
                  borderRadius: 10,
                  marginTop: 25,
                  elevation: 100,
                  width: width * 0.75,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {!state.loading ? (
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#fff',
                      letterSpacing: 0.5,
                      fontStyle: 'italic',
                    }}>
                    SUBMIT
                  </Text>
                ) : (
                  <ActivityIndicator color="#ECDBFA" size="small" />
                )}
              </LinearGradient> */}
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
              style={{
                width: '100%',
                height: height * 0.09,
                // marginTop:30,
                display: 'flex',
                marginBottom: height * 0.2,
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
                  marginBottom: height * 0.1,
                  borderWidth: 1.5,
                  marginTop: 18,
                  elevation: 100,
                  width: width * 0.77,
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
                    paddingVertical:10
                  }}>
                  Continue With Gmail
                </Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
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
