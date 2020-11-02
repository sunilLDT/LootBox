import React from 'react';
import {
  View,
  Text,
  StyleSheetl,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BackgroundImage from '../assets/buildYourPc/triangleBg.png';

const {width, height} = Dimensions.get('window');

const OrderDetails = ({navigation}) => {
  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={styles.backButtonContentConatiner}>
          <Image
            source={require('../assets/back.png')}
            resizeMode="contain"
            style={styles.backImage}
          />
          <Text style={styles.backTitle}>Your Cart</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#2A2D39',
    paddingHorizontal: width * 0.09,
    paddingVertical: width * 0.09,
  },
  backButtonContentConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: width * 0.09,
  },
  backImage: {
    width: 48,
  },
  backTitle: {
    paddingHorizontal: 20,
    fontSize: 12,
    opacity: 0.5,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  brandTitle: {
    fontSize: 20,
    color: '#ECDBFA',
    textAlign: 'left',
    width: 139,
  },
});

export default OrderDetails;
