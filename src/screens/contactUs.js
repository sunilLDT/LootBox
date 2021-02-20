import React from 'react';
import {
  Text,
  Linking,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux'

const ContactUs = ({navigation, labels}) => {
  return (
    <View
      style={{
        backgroundColor: '#261D2A',
      }}>
      <ImageBackground
        source={require('../assets/signup.png')}
        style={{
          width,
          height,
          overflow: 'hidden',
          paddingHorizontal: width * 0.1,
        }}>
        <View
          style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              style={{width: 48}}
              resizeMode="contain"
              source={require('../assets/back.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 16,
              opacity: 0.4,
              letterSpacing:0,
              color: '#ECDBFA',
              marginLeft: 10,
              fontFamily: Platform.OS=='android'?'Montserrat Italic':'Montserrat',
              fontStyle:'italic'
            }}>
            {labels.contactUs}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
            fontSize: 20,
            lineHeight: 28,
            color: '#ECDBFA',
            marginBottom: 10,
          }}>
          {labels.needHelp}
        </Text>

        <Text
          style={{
            fontFamily: Platform.OS=='android'?'Montserrat Regular':'Montserrat',
            fontSize: 14,
            lineHeight: 16,
            color: '#ECDBFA',
            opacity: 0.5,
            marginBottom: 20,
          }}>
          {labels.contactUsThrough}
        </Text>

        <View style={{marginVertical: 15}}>
          {/* <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Faq');
          }}
          style={{zIndex: 1}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 10,
                height: height * 0.15,
                width: width * 0.75,
                padding: '10%',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily:  Platform.OS=='android'?'Montserrat-Regular':'Montserrat',
                  color: '#ECDBFA',
                }}>
                FAQ's
              </Text>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
        <View style={{marginVertical: 15}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('email');
            }}
            style={{zIndex: 1}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 10,
                height: height * 0.15,
                width: width * 0.75,
                padding: '10%',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Platform.OS=='android'?'Montserrat-Regular':'Montserrat',
                  color: '#ECDBFA',
                }}>
                {labels.email}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 15}}>
          <TouchableOpacity
           onPress={() => {
            Linking.openURL('whatsapp://send?text=hello&phone=9877361109')
          }}
          
          style={{zIndex: 1}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 10,
                height: height * 0.15,
                width: width * 0.75,
                padding: '10%',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                  color: '#ECDBFA',
                }}>
                {labels.whatsapp}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  labels:state.languageReducer.labels,
})


export default connect(mapStateToProps)(ContactUs);

