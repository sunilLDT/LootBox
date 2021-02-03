import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { languagename } from '../components/LanguageName';
const {height, width} = Dimensions.get('window');

const InputCard = ({placeholder,style,inpStyle}) => {
    const [arOren, setarOren] = useState('en');
    languagename().then(res => setarOren(res))
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
                height: height * 0.09,
                width: width * 0.85,
            },
            style,
        ]}>
            <Text style={[{
                fontSize: 13,
                width: width * 0.7,
                color: '#ECDBFA',
                textAlign: arOren == "it"? 'right':'left'
            }, inpStyle]}>
                {placeholder}
            </Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    
  });

  export default InputCard;