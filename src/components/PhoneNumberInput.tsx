import React,{useState} from 'react';
import {TextInput,
    StyleSheet,
    Dimensions,View,
    Text,
    PixelRatio,
    Switch,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker,{ DARK_THEME } from 'react-native-country-picker-modal';
import { CountryCode, Country } from './types';
const {height, width} = Dimensions.get('window');

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
    const [countryCode,setCountryCode] = useState<CountryCode>('IN');
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
    
    const onSelect = (country: Country) => {
        console.log(country)
        setCountryCode(country.cca2)
        setCountry(country)
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
                maxLength={otp && 1 || tel && 10}
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
                style={[styles.inp, inpStyle]}
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

export default Input;
