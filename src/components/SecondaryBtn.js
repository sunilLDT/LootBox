import React from 'react';
import {Text,ImageBackground,Image} from 'react-native';
import continueShoppingImg from '../assets/continueshopping.png';
const SecondaryBtn = ({text}) => {
    return (
        <ImageBackground
        source={continueShoppingImg}
        style={{
            width:315,
            height:48,
            justifyContent:'center',
            alignItems:'center',
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

export default SecondaryBtn;