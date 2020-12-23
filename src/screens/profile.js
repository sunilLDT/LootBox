import React, {useState,useContext,useEffect} from 'react';
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
  PermissionsAndroid
} from 'react-native';
import Input from '../components/input';
import InputCard from '../components/InputCard';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import {profileUpdateApi,changePasswordApi} from '../api/buildYourPc';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import Dialog, {
  DialogContent, 
  SlideAnimation,
} from 'react-native-popup-dialog';
import ImagePicker from "react-native-image-picker";
import {uploadImageApi}  from '../api/buildYourPc';
import {Context as AuthContext} from '../api/contexts/authContext';
import AddressList from '../components/AddressList';
import SaveBtn from '../components/SaveBtn';
import bgImage from '../assets/signup.png';
import { getProfilApi } from '../api/buildYourPc';

const {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const [profileDetails,setProfileDetails] = useState({});
  const [DOB, setDOB] = useState(new Date());
  const [show, setShow] = useState(false);
  const [email,setEmail] = useState("");
  const [gender,setGender] = useState(1);
  const [passwordModal, setpasswordModal] = useState(false);
  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setnewPassword] = useState("");
  const [confirmPassword,setconfirmPassword] = useState("");
  const [photo,setPhoto] = useState({});
  const [loading, setLoading] = useState(true);
  const {signout} = useContext(AuthContext);

  var formattedDOB = format(DOB, "d-MM-yyyy");

  useEffect(() => {
    setLoading(true)
    getProfilApi().then((response) => {
      setProfileDetails(response.data)
      setEmail(response.data.email)
      response.data.date_of_birth !== null?setDOB(new Date(response.data.date_of_birth)):setDOB(new Date())
      setGender(response.data.gender?response.data.gender:1)
      setLoading(false)
    }).catch((error) => {
      console.log("profileDetails" +error);
      setLoading(false)
    });
    return () => {
      console.log("willUnMount")
    }
  }, []);

  const ProfileUpdate = () => {
    if(!email){
      alert("Please Fill the email")
    }
    else if(email == "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      alert("Invalid Email Address")
    }
    else if(gender == ""){
      alert("Please choose the Gender");
    }
    else{
      profileUpdateApi(email,formattedDOB,gender).then((response) => {
        alert(response.message);
      }).catch((error) => {
        console.log("profileUpdate" + error);
      });
    }
  };

  const changePassword = () => {
    if(newPassword !== confirmPassword){
      alert("confirm password doesn't match");
    }
    else if(newPassword == "" && confirmPassword == "" && oldPassword == ""){
      alert("please fill all input fields");
    }
    else if(newPassword.length < 8 && confirmPassword.length < 8){
      alert("new password must be greater then 8 digits");
    }
    else{
      changePasswordApi(oldPassword,newPassword,confirmPassword).then((response) => {
        setpasswordModal(!passwordModal)
        alert(response.message);
        signout()
      }).catch((error) => {
        console.log("ChangePassword" + error);
      })
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      title:'Select Image',
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const requestExternalWritePermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs write permission',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          alert('Write permission err', err);
        }
        return false;
      } else return true;
    };

    let isStoragePermitted =  requestExternalWritePermission();
    if(isStoragePermitted){
      ImagePicker.launchImageLibrary(options,(response) => {
        if(response.uri){
          setPhoto(response.uri)
          uploadImageApi(photo).then((response) => {
            alert(response.message);
          }).catch((error) => {
            console.log("ImageUploadProfile" + error);
          });
        }
        else if(response.errorCode){
          console.log(errorCode);
        }
        else{
          console.log(response);
        }
      })
    }
  }
  return (
    <View style={{backgroundColor:'#292633', width:'100%', height:'100%'}}>
    <ScrollView
      style={{
        width,
        height,
        overflow: 'hidden',
      }}>
         <Dialog
          visible={passwordModal}
          containerStyle={{zIndex: 10, elevation: 10}}
          dialogStyle={{backgroundColor:'#272732'}}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {setpasswordModal(!passwordModal)}}
         >
          <DialogContent>
            <View>
              <View style={{marginTop:15}}>
                <Text style={{color:'#fff',fontSize:20,alignSelf:'center',fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma'}}>Change Password</Text>
              </View>
              <View style={{marginVertical: 15}}>
                <Input placeholder="Current Password" password onChangeText={(oldPassword) => setOldPassword(oldPassword)}/>
              </View>
              <View style={{marginVertical: 15}}>
                <Input placeholder="New Password" password onChangeText={(newPassword) => setnewPassword(newPassword)}/>
              </View>
              <View style={{marginVertical: 15}}>
                <Input placeholder="Confirm Password" password onChangeText={(confPassword) => setconfirmPassword(confPassword)}/>
              </View>
              <TouchableWithoutFeedback
              onPress={() => changePassword()}>
                  <View style={{marginVertical:5}}>
                    <SaveBtn text="Save"/>
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
          {loading ? (
          <View style={{margin: height * 0.45,alignSelf:'center'}}>
              <ActivityIndicator color="#ECDBFA" size="small" />
          </View>):(
          <>  
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
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
                fontFamily:'Montserrat-LightItalic',
                fontSize: 13,
                lineHeight: 16,
                opacity: 0.4,
                color: '#ECDBFA',
                marginLeft: 10,
               
              }}>
              EDIT PROFILE
            </Text>
          </View>
          
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                  fontSize: 20,
                  lineHeight: 28,
                  color: '#ECDBFA',
                  marginBottom: 10,
                }}>
                {profileDetails.full_name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 16,
                  color: '#ECDBFA',
                  opacity: 0.5,
                  marginBottom: 20,
                }}>
                {profileDetails.email}
              </Text>
            </View>
            <TouchableOpacity onPress={handleChoosePhoto}>
              {profileDetails.profile_image == ""?(
              <Image
              // resizeMode="contain"
                source={{
                  uri:Object.keys(photo).length === 0?"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR861VGFylgAJKnC4o90ssB-_ZIcLQi6075ig&usqp=CAU":photo,
                }}
                style={{
                  height: height * 0.14,
                  width: width * 0.4,
                  borderTopLeftRadius:10,
                  borderBottomLeftRadius:10,
                }}
              />
              ):(
                <Image
              // resizeMode="contain"
                source={{uri:profileDetails.profile_image}}
                style={{
                  height: height * 0.14,
                  width: width * 0.4,
                  borderTopLeftRadius:10,
                  borderBottomLeftRadius:10,
                }}
              />
              )}
            </TouchableOpacity>
          </View>
          <View style={{marginBottom:10,marginTop:20}}>
            <Input placeholder="Email" email value={email} onChangeText={(email) => setEmail(email)}/>
          </View>
          <View style={{marginVertical: 10}}>
            <TouchableOpacity  onPress={() => {setpasswordModal(!passwordModal)}}>
            <InputCard 
            placeholder="***********" />
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 10}}>
            <Input
              onFocus={() => {
                setShow(true);
              }}
              placeholder={`Date of Birth : ${
                DOB &&
                DOB
                  .toLocaleDateString('en', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  .replace(/ /g, '-')
              }`}
            />
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
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
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
              <Picker
              dropdownIconColor="#ECDBFA"
              mode="dropdown"
              selectedValue={gender}
              style={{
                height: Platform.OS=='android'?65:250,
                width: "85%",
                marginTop: Platform.OS=='android'?0:30,
                color:'#ECDBFA',
                marginLeft:'2%',
              
              }}
              itemStyle={{color:'#ffffff'}}
              onValueChange={(itemValue, itemIndex) =>
                setGender(itemValue)
              }
              >   
                  <Picker.Item label="Male" value="1" />
                  <Picker.Item label="Female" value="2" />
              </Picker>
          </LinearGradient>
          <View style={{marginVertical: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('changePasswordNumber')}>
              <InputCard placeholder={profileDetails.phone}/>
            </TouchableOpacity>
          </View>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
            style={{
              width: width * 0.82,
              marginVertical: 15,
              justifyContent: 'space-around',
              paddingLeft: 20,
              paddingVertical: 10,
              borderRadius: 10,
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
                Address
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('address',{addressId:""})} activeOpacity={0.4}>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#DF2EDC',
                    fontStyle: 'italic',
                  }}>
                  +Add More
                </Text>
              </TouchableOpacity>
            </View>
            <AddressList  navigation={navigation}/>
          </LinearGradient>
          <TouchableWithoutFeedback
            onPress={() => ProfileUpdate()}
          >
            <View style={{marginVertical:15,width:"90%"}}>
              <SaveBtn text="Save"/>
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

const styles = StyleSheet.create({});

export default Profile;
