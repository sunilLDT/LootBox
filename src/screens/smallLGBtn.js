import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Dimensions,View} from 'react-native';

const {width, height} = Dimensions.get('window');

const SmallLGBtn = ({text,selected}) => {
  return (
    <>
      {selected ? (
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#C01C8A', '#865CF4']}
          style={{
            height: 36,
            borderRadius: 10,
            display: 'flex',        
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 100,
            padding:10
          }}>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 16,
              color: '#fff',
              fontWeight:'bold',
              letterSpacing:1,
            }}>
            {text}
          </Text>
        </LinearGradient>
      ) : (
        <View
          style={{
            height: 36,
            borderRadius: 10,
            borderColor: '#DF2EDC',
            opacity:0.5,
            borderWidth: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // elevation: 100
            padding:10
          }}>
          <Text
            style={{
             
              fontSize: 12,
              lineHeight: 16,
              color: '#DF2EDC',
              letterSpacing:1,
              opacity: 0.87,
            }}>
            {text}
          </Text>
        </View>
      )}
    </>
  );
};

export default SmallLGBtn;
