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
import Icons  from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'

const {height, width} = Dimensions.get('window');

const NewPassword = ({navigation, labels}) => {
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showNewPassword, setNewPasswordVisibility] = useState(false);
  const [showConfirmPassword, setConfirmPasswordVisibility] = useState(false);
  const {state, resetPassword, setValidationError} = useContext(AuthContext);

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
                navigation.navigate("auth");
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
             {labels.newPassword}
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
              <View style={{marginBottom: 10, position: 'relative'}}>
              <Input
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder={labels.newPassword}
                password={showNewPassword}
              />
              <TouchableOpacity style={styles.icon} onPress={() => setNewPasswordVisibility(!showNewPassword)}>
                  <Icons name={showNewPassword ? 'eye' : 'eye-slash'} size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10, position: 'relative' }}>
                <Input
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder={confirmPassword}
                  password={showConfirmPassword}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setConfirmPasswordVisibility(!showConfirmPassword)}>
                  <Icons name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              onPress={() => {
                if (newPassword !== confirmPassword) {
                  Alert.alert(
                    labels.lootBox,
                    labels.notMatch,
                    [
                      { text: labels.ok, onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
                }
                else {
                  resetPassword(newPassword);
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

export default connect(mapStateToProps)(NewPassword);

