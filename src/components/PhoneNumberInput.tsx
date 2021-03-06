import React,{useState} from 'react';
import {TextInput,
    StyleSheet,
    Dimensions,View,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker,{ DARK_THEME } from 'react-native-country-picker-modal';
import { CountryCode, Country } from './types';
import {languagename} from '../components/LanguageName';
import AsyncStorage from '@react-native-community/async-storage';
import { isGetAccessorDeclaration } from 'typescript';
const {height, width} = Dimensions.get('window');

const PhoneNumberInput = ({
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
    const [countryCode,setCountryCode] = useState<CountryCode>('KW');
    const [country, setCountry] = useState<Country>(null);
    const [withFlag, setWithFlag] = useState(true);
    const [withEmoji, setWithEmoji] = useState(true);
    const [withFilter, setWithFilter] = useState(true);
    const [withAlphaFilter, setWithAlphaFilter] = useState(false);
    const [withCallingCode, setWithCallingCode] = useState(true);
    const [visible,setVisible] = useState(false);
    const switchVisible = () => {
        setVisible(!visible)
    }
    const [arOren,setarOren] = useState('en');
    languagename().then(res => setarOren(res))
    const onSelect = async (country: Country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        await AsyncStorage.setItem('callingCode',("+"+country.callingCode[0]));
    }
    if(countryCode == "KW"){
      AsyncStorage.setItem('callingCode',"+965")
    }
    return (
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
            <View style={{
                flex:1,
                flexDirection:'row',
                alignContent:'center',
                marginLeft:"7%"
            }}>
                <TouchableOpacity style={{flex:1,justifyContent:'center'}} onPress={() => switchVisible()}>
                <View >
                <CountryPicker
                  theme={DARK_THEME}
                    {...{
                    countryCode: countryCode,
                    withFilter,
                    onSelect,
                    withEmoji:false,
                    modalProps: {
                        visible,
                      },
                      onClose: () => setVisible(false),
                      onOpen: () => setVisible(true),
                    }}
                />
                </View>
                </TouchableOpacity>
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
                  width: width * 0.65,
                  color: '#ECDBFA',
                  textAlign: arOren == "ar"? 'right':'left'
                }, inpStyle]}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
  inp: {
    fontSize: 13,
    width: width * 0.65,
    color: '#ECDBFA',
  },
});

export default PhoneNumberInput;
