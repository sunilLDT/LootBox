import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';



const { height, width } = Dimensions.get('window');

const LoadingHome = (props) => {
  useEffect(() => {
    
  }, []);
  return (
    <LinearGradient
      colors={['#2A2D39', '#261D2A']}
      style={{
        width: width,
        minHeight: height,
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
             <ActivityIndicator color="#ECDBFA" size="small" />
     </View>
    </LinearGradient>
  );
};

export default (LoadingHome);
