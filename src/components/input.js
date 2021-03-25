import React, { useState } from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { languagename } from '../components/LanguageName';


const { height, width } = Dimensions.get('window');

const Input = ({
  placeholder,
  onChangeText,
  editable,
  multiline,
  onChange,
  value,
  password,
  email,
  tel,
  onSubmitEditing,
  onFocus,
  style,
  otp,
  inpStyle,
  defaultValue,
  returnKeyType,
  autoFocus,
}) => {
  const [arOren, setarOren] = useState('en');
  languagename().then(res => setarOren(res))
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
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
      <TextInput
        secureTextEntry={password}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        multiline={multiline}
        onTouchStart={onFocus}
        placeholderTextColor="#ECDBFA"
        autoCompleteType={'off'}
        maxLength={otp && 1 || tel && 15}
        autoCorrect={false}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        autoCapitalize="none"
        blurOnSubmit={true}
        onSubmitEditing={onSubmitEditing}
        editable={editable}
        defaultValue={defaultValue}
        keyboardType={email ? 'email-address' : tel ? 'phone-pad' : 'default'}
        style={[{
          fontSize: 13,
          width: width * 0.7,
          color: '#ECDBFA',
          textAlign: arOren == "ar"? 'right':'left'
          },
          inpStyle]}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  
});

export default Input;
