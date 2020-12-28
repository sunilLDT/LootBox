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

const ContactUs = ({navigation}) => {
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
            CONTACT US
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
          Need Our Help?
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
          Contact us through
        </Text>

        <View style={{marginVertical: 15}}>
          <TouchableOpacity 
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
          </TouchableOpacity>
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
                Email
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
                Whatsapp
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ContactUs;
