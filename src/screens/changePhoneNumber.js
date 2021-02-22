import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Input from '../components/input';
import { changeNumberApi } from '../api/buildYourPc';
import SaveBtn from '../components/SaveBtn'
import { Context as AuthContext } from '../api/contexts/authContext';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux'
import PopUp from '../components/popup';

const { width, height } = Dimensions.get('window');

const ChangePhoneNumber = ({ navigation , labels}) => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const { setNavigation } = useContext(AuthContext);
    const [popModal, setPopModal] = useState(false);
    const [contentModal, setContentModal] = useState('');

    const numberChange = async () => {
        const otpVerified = await AsyncStorage.getItem('is_OTP_Verified');
        if (!JSON.parse(otpVerified)) {
            setPopModal(true);
            setContentModal(labels.VerifyOtpFirst);

        } else {
            if (phoneNumber == "") {
                setPopModal(true);
                setContentModal(labels.fillPhone);
  
            }
            else if (phoneNumber.length < 8) {
                setPopModal(true);
                setContentModal(labels.notGreaterThan8);
        
            }
            else {
                setLoadingBtn(true)
                changeNumberApi(phoneNumber).then((response) => {

                    navigation.navigate('otp', {
                        screen: 'OtpVerification',
                    })
                    setLoadingBtn(false);
                    setNavigation('profile')
                    AsyncStorage.setItem('is_OTP_Verified', JSON.stringify(response.data.is_otp_verified));
                    setPopModal(true);
                    setContentModal(response.message);
                    //alert(response.message)
                }).catch((error) => {
                    console.log("PhoneNumberChange" + error);
                    setLoadingBtn(false)
                })
            }
        }
    }

    const popUpHandler=()=>{
        setPopModal(!popModal);
    }
    return (
        <ScrollView
            style={{
                width,
                height,
                overflow: 'hidden',
            }}>
            <ImageBackground
                source={require('../assets/dottedBackground.png')}
                style={{
                    width,
                    minHeight: height,
                }}>
                <PopUp visible={popModal} title={'Loot'} closeText={labels.ok} callBack={popUpHandler} content={contentModal}/>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: width * 0.1,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.pop()
                        }}>
                        <Image
                            style={{ width: 48 }}
                            resizeMode="contain"
                            source={require('../assets/back.png')}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontStyle: 'italic',
                            fontSize: 16,
                            lineHeight: 16,
                            opacity: 0.4,
                            color: '#ECDBFA',
                            marginLeft: 10,
                        }}>
                        {labels.changePhoneNumber}
                    </Text>
                </View>

                <View style={styles.phoneContainer}>
                    <Input placeholder={labels.phoneNumber} tel value={phoneNumber} onChangeText={(number) => setPhoneNumber(number)} />
                </View>
                <View style={styles.btnView}>
                    <TouchableWithoutFeedback
                        onPress={() => numberChange()}>
                        <View>
                            {loadingBtn ? (
                                <View style={{ bottom: -24 }}>
                                    <SaveBtn text={' '} />
                                    <ActivityIndicator
                                        color="#ECDBFA"
                                        size="small"
                                        style={{ bottom: 38 }}
                                    />
                                </View>
                            ) : (
                                    <SaveBtn text={labels.saveChanges} x="115.848624" />
                                )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    phoneContainer: {
        marginVertical: 15,
        paddingHorizontal: '10%',
    },
    btnView: {
        paddingHorizontal: '10%',
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative',
        bottom: "5%",

    }
});

const mapStateToProps = (state) => ({
    labels:state.languageReducer.labels,
  })

export default connect(mapStateToProps)(ChangePhoneNumber);

