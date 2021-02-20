import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Input from '../components/input';
import InputCard from '../components/InputCard';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { profileUpdateApi, changePasswordApi } from '../api/buildYourPc';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Dialog, {
  DialogContent,
  SlideAnimation,
} from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { profileActions } from '../actions/profileAction';
import ImagePicker from "react-native-image-picker";
import { uploadImageApi } from '../api/buildYourPc';
import { Context as AuthContext } from '../api/contexts/authContext';
import AddressList from '../components/AddressList';
import SaveBtn from '../components/SaveBtn';
import bgImage from '../assets/signup.png';
import strings, { changeLaguage } from '../languages/index';
import RNPickerSelect from 'react-native-picker-select';
import { S3, util } from 'aws-sdk';
import fs from 'react-native-fs';
import {languagename} from '../components/LanguageName';
const { width, height } = Dimensions.get('window');

const Profile = (props) => {
  const {labels} = props

  const [DOB, setDOB] = useState(new Date());
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(1);
  const [passwordModal, setpasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [photo, setPhoto] = useState();
  const {signout } = useContext(AuthContext);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading,setloading] = useState(false);
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [imageLoader,setImageLoader] = useState(false);
  const [arOren,setarOren] = useState('en');
  languagename().then(res => setarOren(res))

  var formattedDOB = format(DOB, "d-MM-yyyy");

  useEffect(() => {
    props.sendaction();
    waitForProp();
    return () => {
      console.log("willUnMount")
    }
  }, []);

  const waitForProp = async () => {
    setEmail(props.profileData.email)
      setFirstName(props.profileData.first_name)
      setLastName(props.profileData.last_name)
      setPhoto(props.profileData.profile_image.replace('user/profile/',''))
      props.profileData.date_of_birth !== null ? setDOB(new Date(props.profileData.date_of_birth)) : setDOB(new Date())
      setGender(props.profileData.gender ? props.profileData.gender : 1);
  }

  const ProfileUpdate = () => {
    if (!email) {
      alert("Please Fill the email")
    }
    else if (email == "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Invalid Email Address")
    }
    else if (gender == "") {
      alert("Please choose the Gender");
    }
    else {
      setLoadingBtn(true)
      profileUpdateApi(email, formattedDOB, gender, first_name, last_name).then((response) => {
        setLoadingBtn(false)
        alert(response.message);
      }).catch((error) => {
        console.log("profileUpdate" + error);
        setLoadingBtn(false)
      });
    }
  };

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      alert(labels.passwordNotMatch);
    }
    else if (newPassword == "" && confirmPassword == "" && oldPassword == "") {
      alert(labels.fillAllField);
    }
    else if (newPassword.length < 8 && confirmPassword.length < 8) {
      alert(labels.notMoreThan8);
    }
    else {
      changePasswordApi(oldPassword, newPassword, confirmPassword).then((response) => {
        setpasswordModal(!passwordModal)
        alert(response.message)
        if (response.success == true) {
          signout()
        }
      }).catch((error) => {
        console.log("ChangePassword" + error);
        alert(labels.passNotMatch)
      })
    }
  };

  const handlePress = () => {
    setpasswordModal(!passwordModal)
    return true;
  }
  const navigatehome = () => {
    props.navigation.navigate({name: 'home'})
    props.sendaction()
  }

  const uploadImageOnS3 = async (file) => {
    try{
    const s3bucket = new S3({
      accessKeyId: 'AKIA3JWMPNMIYUFSR54M',
      secretAccessKey: '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',
      Bucket: 'lootbox-s3',
      signatureVersion: 'v4',
    });

      let contentType = 'image/jpeg';
      let contentDeposition = 'inline;filename="' + file.name + '"';
      const base64 = await fs.readFile(file.uri, 'base64');
      const arrayBuffer = util.base64.decode(base64);

      s3bucket.createBucket(() => {
        const params = {
          Bucket: 'lootbox-s3',
          // keyPrefix:'user/profile',
          Key: file.name,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType,
          LocationConstraint: "us-east-2",
      };
      
      s3bucket.upload(params, (err, data) => {
        if (err) {
          console.log('error in callback');
        }
        else{
          console.log('success')
          console.log("Respomse URL : "+ data.Location);
          uploadImageApi(data.Location).then((response) => {
            setImageLoader(false)
            alert(response.message);
          }).catch((error) => {
            console.log("ImageUploadProfile" + error);
            setImageLoader(false)
          });
        }
      });
    });
  }catch(error){
    console.log(error)
  }
  }
  const handleChoosePhoto = async () => {
    setImageLoader(true)
    let options = {
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
        setImageLoader(false)
      }
      else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
      setImageLoader(false)
      }
      else{
        setPhoto(response.uri)
        const file = {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
       };
       uploadImageOnS3(file);
      }
    })
  }
  return (
    <View style={{ backgroundColor: '#292633', width: '100%', height: '100%' }}>
      <ScrollView
        style={{
          width,
          height,
          overflow: 'hidden',
        }}>
        <Dialog
          visible={passwordModal}
          containerStyle={{ zIndex: 10, elevation: 10 }}
          onHardwareBackPress={() => handlePress()}
          dialogStyle={{ backgroundColor: '#272732' }}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => { setpasswordModal(!passwordModal) }}
        >
          <DialogContent>
            <View>
              <View style={{ marginTop: 15 }}>
                <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center', fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma' }}>Change Password</Text>
              </View>
              <View style={{ marginVertical: 15 }}>
                <Input placeholder={labels.currentPassword} password onChangeText={(oldPassword) => setOldPassword(oldPassword)} />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Input placeholder={labels.newPassword} password onChangeText={(newPassword) => setnewPassword(newPassword)} />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Input placeholder={labels.confirmPassword} password onChangeText={(confPassword) => setconfirmPassword(confPassword)} />
              </View>
              <TouchableWithoutFeedback
                onPress={() => changePassword()}>
                <View style={{ marginVertical: 5 }}>
                  <SaveBtn text={labels.save} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </DialogContent>
        </Dialog>
        <View
          style={{
            backgroundColor: '#261D2A',
          }}>
          <ImageBackground
            source={bgImage}
            style={{
              paddingLeft: width * 0.1,
            }}>
            {props.profileLoader ? (
              <View style={{ margin: height * 0.45, alignSelf: 'center' }}>
                <ActivityIndicator color="#ECDBFA" size="small" />
              </View>) : (
                <>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => navigatehome()}>
                      <Image
                        style={{ width: 48 }}
                        resizeMode="contain"
                        source={require('../assets/back.png')}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-LightItalic',
                        fontSize: 13,
                        lineHeight: 16,
                        opacity: 0.4,
                        color: '#ECDBFA',
                        marginLeft: 10,

                      }}>
                      {strings.editProfile}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{
                      width: "60%"
                    }}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode='middle'
                        style={{
                          fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                          fontSize: 20,
                          lineHeight: 28,
                          color: '#ECDBFA',
                          marginBottom: 10,
                        }}>
                        {props.profileData.full_name}
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode='middle'
                        style={{
                          fontSize: 16,
                          lineHeight: 16,
                          color: '#ECDBFA',
                          opacity: 0.5,
                          marginBottom: 20,
                        }}>
                        {props.profileData.email}
                      </Text>
                    </View>
                    {!imageLoader?(
                    <TouchableOpacity
                      style={{ width: "40%" }}
                      onPress={() => handleChoosePhoto()}>
                      {props.profileData.profile_image == "" ? (
                        <Image
                          // resizeMode="contain"
                          source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR861VGFylgAJKnC4o90ssB-_ZIcLQi6075ig&usqp=CAU" ,
                          }}
                          style={{
                            height: height * 0.14,
                            width: width * 0.4,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                          }}
                        />
                      ) : (
                          <Image
                            // resizeMode="contain"
                            source={{ uri: photo }}
                            style={{
                              height: height * 0.14,
                              width: width * 0.4,
                              borderTopLeftRadius: 10,
                              borderBottomLeftRadius: 10,
                            }}
                          />
                        )}
                    </TouchableOpacity>
                    ):(
                      <View style={{ alignSelf: 'center',marginRight:"15%" }}>
                        <ActivityIndicator color="#ECDBFA" size="small" />
                      </View>
                    )} 
                  </View>
                  <View style={{ marginBottom: 10, marginTop: 20 }}>
                    <Input placeholder={labels.firstName} value={first_name} onChangeText={(first_name) => setFirstName(first_name)} />
                  </View>
                  <View style={{ marginBottom: 10, marginTop: 20 }}>
                    <Input placeholder={labels.lastName} value={last_name} onChangeText={(last_name) => setLastName(last_name)} />
                  </View>
                  <View style={{ marginBottom: 10, marginTop: 20 }}>
                    <Input placeholder={labels.email} email value={email} onChangeText={(email) => setEmail(email)} />
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => { setpasswordModal(!passwordModal) }}>
                      <InputCard
                        placeholder="***********" />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => { setShow(true) }}>
                      <InputCard
                        placeholder={`Date of Birth : ${DOB &&
                          DOB
                            .toLocaleDateString('en', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                            .replace(/ /g, '-')
                          }`}
                      />
                    </TouchableOpacity>
                    {show && (
                      <DateTimePicker
                        testID="datetimepicker"
                        value={DOB}
                        style={{ color: '#ffffff' }}
                        textColor="white"
                        mode="date"
                        display="spinner"
                        format="DD-MM-YYYY"
                        onChange={(e, x) => {
                          setShow(false);
                          if (x) setDOB(x);
                          console.log(x);
                        }}
                      />
                    )}
                  </View>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      height: height * 0.09,
                      width: width * 0.85,
                      marginVertical: 10,
                    }}>
                    {Platform.OS == "android" ? (
                      <Picker
                        dropdownIconColor="#ECDBFA"
                        mode="dropdown"
                        selectedValue={gender}
                        style={{
                          height: Platform.OS == 'android' ? 65 : 250,
                          width: "85%",
                          marginTop: Platform.OS == 'android' ? 0 : 30,
                          color: '#ECDBFA',
                          marginLeft: '2%',

                        }}
                        itemStyle={{ color: '#ffffff' }}
                        onValueChange={(itemValue, itemIndex) =>
                          setGender(itemValue)
                        }
                      >
                        <Picker.Item label="Male" value="1" />
                        <Picker.Item label="Female" value="2" />
                      </Picker>
                    ) : (
                        <View>
                          <RNPickerSelect
                            onValueChange={(value) =>
                              setGender(value)
                            }
                            value={gender}
                            placeholder={{
                              label: 'Please Select Gender',
                              value: null,
                            }}
                            style={
                              Platform.OS === 'ios'
                                ? styles.inputIOS
                                : styles.inputAndroid
                            }
                            items={[
                              { "label": "Male", "value": 1 },
                              { "label": "Female", "value": 2 }
                            ]}
                            inputIOS={{
                              color: 'white',
                              marginLeft: 100,
                              borderRadius: 5,
                            }}
                            inputAndroid={{
                              color: 'white',
                              paddingHorizontal: 10,
                              borderRadius: 5,
                            }}
                          />
                        </View>
                      )}
                  </LinearGradient>
                  <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('changePasswordNumber')}>
                      <InputCard placeholder={props.profileData.phone} />
                    </TouchableOpacity>
                  </View>

                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
                    style={{
                      width: width * 0.82,
                      marginVertical: 15,
                      justifyContent: 'space-around',
                      paddingLeft: 20,
                      paddingVertical: 10,
                      borderRadius: 10,
                      paddingBottom: 30
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#ECDBFA',
                          opacity: 0.5,
                        }}>
                        {strings.address}
                      </Text>
                      <TouchableOpacity onPress={() => props.navigation.navigate('address', { addressId: "" })} activeOpacity={0.4}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#DF2EDC',
                            fontStyle: 'italic',
                            marginRight:arOren == "ar"?"13%":"0%",
                          }}>
                          + {strings.address}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <AddressList navigation={props.navigation} />
                  </LinearGradient>
                  <TouchableWithoutFeedback
                    onPress={() => ProfileUpdate()}
                  >
                    <View style={{ marginVertical: 15, width: "90%" }}>
                      {loadingBtn ? (
                        <>
                          <SaveBtn text={' '} />
                          <ActivityIndicator
                            color="#ECDBFA"
                            size="small"
                            style={{ bottom: 38 }}
                          />
                        </>
                      ) : (
                          <SaveBtn text={labels.save} />
                        )}
                    </View>
                  </TouchableWithoutFeedback>
                </>
              )}
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})

const pickerStyle = {
  inputIOS: {
      color: '#ffffff',
  },
  placeholder: {
      color: '#ffffff',
  },
  inputAndroid: {
      color: '#ffffff',

  },
};
const mapStateToProps = (state) => ({
  profileData: state.profileReducer.profile,
  profileLoader:state.profileReducer.loading,
  labels:state.languageReducer.labels,
});

const actionCreators = {
  sendaction: profileActions.showProfile,
};

export default connect(mapStateToProps,actionCreators)(Profile)
