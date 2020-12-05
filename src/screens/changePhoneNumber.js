import React, {useState} from 'react';
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
} from 'react-native';
import Input from '../components/input';
import LinearGradient from 'react-native-linear-gradient';
import {changeNumberApi} from '../api/buildYourPc';
import SaveBtn from '../components/SaveBtn'

const {width, height} = Dimensions.get('window');

const ChangePhoneNumber = ({navigation}) => {

    const [phoneNumber,setPhoneNumber] = useState("");
    
    const numberChange = () => {
        if(phoneNumber == ""){
            alert("Please fill the Phone Number");
        }
        else if(phoneNumber.length < 8){
            alert("Phone number must be greater then 8 digits");
        }
        else{
            changeNumberApi(phoneNumber).then((response) => {
                console.log(response.data);
                alert(response.message)
            }).catch((error) => {
                console.log("PhoneNumberChange" + error);
            })
        }
    }
    return(
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
                    
                <View
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding:'4%',
                    }}>
                    <TouchableOpacity
                    onPress={() => {
                        navigation.pop()
                    }}>
                    <Image
                        style={{width: 48}}
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
                    CHANGE PHONE NUMBER
                    </Text>
                </View>

                <View style={styles.phoneContainer}>
                    <Input placeholder="Phone Number" tel value={phoneNumber} onChangeText={(number) => setPhoneNumber(number)}/>
                </View>
                <View style={styles.btnView}>
                    <TouchableWithoutFeedback
                        onPress={() => numberChange()}>
                        <View>
                            <SaveBtn text="Save Changes" x="115.848624"/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    phoneContainer:{
        marginVertical:15,
        paddingHorizontal:'10%',
    },
    btnView:{
        paddingHorizontal:'10%',
        flex:1,
        justifyContent:'flex-end',
        position:'relative',
        bottom:"5%",

    }
});

export default ChangePhoneNumber;