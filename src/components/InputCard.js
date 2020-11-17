import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');

const InputCard = ({placeholder,style,inpStyle}) => {
    return(
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
            style={[
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                height: height * 0.1,
                width: width * 0.75,
            },
            style,
        ]}>
            <Text style={[styles.inp, inpStyle]}>
                {placeholder}
            </Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    inp: {
      paddingLeft: 20,
      fontSize: 13,
      width: width * 0.7,
      color: '#ECDBFA',
    },
  });

  export default InputCard;