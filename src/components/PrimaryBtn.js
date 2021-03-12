import React from 'react';
import {Text,ImageBackground,Platform} from 'react-native';
import BuildYourPcImg from '../assets/lootbuttons/iOS/maincta.png';
const PrimaryBtn = ({text}) => {
    return (
        <ImageBackground
        source={BuildYourPcImg}
        style={{
            width:315,
            height:48,
            justifyContent:'center',
            alignItems:'center',
            marginVertical:20
        }}
        >
        <Text style={{
            color:'#fff',
            fontSize:14,
            fontFamily:Platform.OS == 'android'? 'Montserrat-Bold':'Montserrat',
        }}>
            {text}
        </Text>
        </ImageBackground>
    )
}

export default PrimaryBtn;