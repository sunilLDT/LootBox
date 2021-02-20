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
import PhoneNumberInput from '../components/PhoneNumberInput';
import {Context as AuthContext} from '../api/contexts/authContext';
import Btn from './btn';
import ContinueBtn from '../components/ContinueGmailBtn';
import bgImage from '../assets/signup.png';
import Icons  from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {languagename} from '../components/LanguageName';
import { connect } from 'react-redux';


const {height, width} = Dimensions.get('window');

const Signup = ({navigation, route, labels}) => {
  const [selected, setSelected] = useState(false);
  const {signup, registerGuestUser, setNavigation, setValidationError, googleSignIn, state} = useContext(
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
  const [showPassword, setPasswordVisibility] = useState(false);
  const [arOren,setarOren] = useState('en');
  languagename().then(res => setarOren(res))

  const data = {
    first_name,
    last_name,
    phone,
    email,
    password,
    user_type,
    is_google,
  };

  const submit = async () => {
    await AsyncStorage.setItem('email',email)
    const userType = await AsyncStorage.getItem('user_type')
    const user_id = await AsyncStorage.getItem('user_id')
    if(JSON.parse(userType) == 2) {
      registerGuestUser({...data, guest_user_id: user_id})
      setNavigation('cart')
    } else {
      signup(data);
      setNavigation('home')
    }
  }

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
                      // paddingRight:20,
                      paddingLeft:arOren == 'it'?20:0,
                      paddingRight:arOren == 'it'?0:20,
                      opacity: 0.24,
                      fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                    }}>
                    {labels.login}
                  </Text>
                </TouchableOpacity>
                <Text style={{color:'#373843', fontSize:30}}>|</Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#ECDBFA',
                      fontSize: 20,
                      paddingLeft:arOren == 'it'?0:20,
                      paddingRight:arOren == 'it'?20:0,
                      fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                    }}>
                    {labels.singnUp}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginLeft:75}}>
              <Input
                  placeholder={labels.firstName}
                  defaultValue={first_name}
                  onChangeText={setFirstName}
                  style={{width:width * 0.95,paddingRight:'15%'}}
                />
                <View style={{marginTop: 20}}>
                  <Input
                    placeholder={labels.lastName}
                    defaultValue={last_name}
                    onChangeText={setLastName}
                    style={{width:width * 0.95,paddingRight:'15%'}}
                  />
                </View>

                <View style={{marginTop: 20}}>
                  <PhoneNumberInput
                    placeholder={labels.phoneNumber}
                    tel
                    onChangeText={setPhone}
                    style={{width:width * 0.95,paddingRight:'15%'}}
                    // defaultValue={phone}
                  />
                </View>

                <View style={{marginTop: 20}}>
                  <Input
                    placeholder={labels.email}
                    email
                    onChangeText={setEmail}
                    defaultValue={email}
                    style={{width:width * 0.95,paddingRight:'15%'}}
                  />
                </View>

                <View style={{marginTop: 20}}>
                  <Input
                    placeholder={labels.password}
                    onChangeText={setPassword}
                    password={!showPassword}
                    style={{width:width * 0.95,paddingRight:'15%'}}
                  />
                  <TouchableOpacity style={styles.icon} onPress={() => setPasswordVisibility(!showPassword)}>
                    <Icons name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#fff" />
                  </TouchableOpacity>
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
                  fontFamily:Platform.OS=='android'?'Montserrat SemiBold':'Montserrat',
                  zIndex: 333,
                }}>
                {labels.agreeToOur}{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    marginLeft: 5,
                    fontStyle:'normal',
                    fontFamily:Platform.OS=='android'?'Montserrat SemiBold':'Montserrat',
                    opacity:1,
                  }}>
                  {labels.termsAndCondition}{' '}
                </Text>
                <Text>{labels.and} </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontStyle:'normal'
                  }}>
                  {labels.privacyPolicy}
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
                  submit()
                } else {
                  
                  if (password && password.length < 8) {
                    alert(
                      label.passwordEightCharacters,
                    );
                  }
                  else if (
                    email &&
                    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                  ) {
                    alert(labels.invaildEmail);
                  }
                  else if (phone && !(phone.length == 8)) {
                    alert(labels.validPhoneNumber);
                  }
                  else if (!first_name) {
                    alert(labels.allFieldsAreRequired);
                  }
                  else if (!last_name) {
                    alert(labels.allFieldsAreRequired);
                  }
                  else if (!phone) {
                    alert(labels.allFieldsAreRequired);
                  }
                  else if (!email) {
                    alert(labels.allFieldsAreRequired);
                  }
                  else if (!password) {
                    alert(labels.allFieldsAreRequired);
                  }
                  else if (!selected) {
                    alert(labels.agreeAlert);
                  }
                  else {
                    console.log("error");
                  }
                }

              }}
              style={{
                width: '80%',
              }}>
              {!state.loading ? (
                <Btn text={labels.singnUp.toUpperCase()} x="54" pay=""/>
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
                  <ContinueBtn text={labels.continueWithGmail}/>
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
  icon: {
    position: 'absolute',
    right: 25,
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

export default connect(mapStateToProps,actionCreators)(Signup);