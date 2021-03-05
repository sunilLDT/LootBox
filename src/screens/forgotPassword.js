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
import Btn from '../screens/btn';
import bgImage from '../assets/signup.png';
import {connect} from 'react-redux'
import PopUp from '../components/popup';
import { navigate } from '../api/contexts/navigationRef';

const {height, width} = Dimensions.get('window');

const ForgotPassword = ({navigation, labels}) => {
  const [email, setEmail] = useState(null);
  const {state, forgotPassword, setNavigation, setValidationError} = useContext(AuthContext);
  const { validationError } = state;
  const [addressModal, setaddressModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const [move,setMove] = useState(false);

  const popUpHandler=()=>{
    setaddressModal(!addressModal);
  }
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
              {labels.forgetPassword}
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

            <PopUp visible={addressModal} title={'Loot'} closeText={labels.ok} callBack={popUpHandler} content={contentModal}/>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={50}
              style={styles.screen}>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder={labels.emailOrPhone}
              />
              
            </KeyboardAvoidingView>
           
            <TouchableOpacity
              onPress={() => {
                let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                
                if (!email) {
                  setaddressModal(true);
                  setContentModal("Email Address is Required")
                  }
                else if (
                  email &&
                  (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && !/\d{8}/.test(email))
                ) {
                  setaddressModal(true);
                  setContentModal(labels.invalidEmailPhone)
                  }
                else {
                  forgotPassword(email, isEmail);
                  setNavigation('newPassword')
                  setMove(true)
                }
              }}
              style={{
                width: '100%',
              }}>
                {!state.loading ? (
                <Btn text={labels.submit} x={"38"} pay=""/>
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

const mapStateToProps = (state) => ({
  labels:state.languageReducer.labels,
})

export default connect(mapStateToProps)(ForgotPassword);