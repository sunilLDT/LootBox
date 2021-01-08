import React, {useState,useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Input from '../components/input';
import LinearGradient from 'react-native-linear-gradient';
import {cityApi,addAddressApi,getSpecificAddress} from '../api/buildYourPc';
import SaveBtn from '../components/SaveBtn';
import { connect } from 'react-redux';
import { addressActions } from '../actions/address';
import {addressListApi,deliveryAddressApi,defaultAddressApi} from '../api/buildYourPc';
import RNPickerSelect from 'react-native-picker-select';

const {width, height} = Dimensions.get('window');

const Address = (props) => {
    const { addressId } = props.route.params;
    const [specficAddress,setSpecficAddress] = useState({});
    const [loading, setLoading] = useState(false);
    const [allAddress,setAllAddress] = useState([]); 
    if(addressId && addressId !== ""){
        useEffect(() => {
            setLoading(true)
            getSpecificAddress(addressId).then((response) => {
                setSpecficAddress(response.data);
                setAddressType(response.data.address_type);
                setName(response.data.name);
                setEmail(response.data.email);
                setselectedCity(response.data.city_id);
                setBlock(response.data.block);
                setStreet(response.data.street);
                setBuilding(response.data.building);
                setFloor(response.data.floor);
                setapartment(response.data.apartment); 
                setSelectedArea(response.data.area_id);
                setLoading(false)
            }).catch((error) => {
                console.log("specficAddress" + error)
                setLoading(false)
            });
            return () => {
                console.log("willUnMount")
              }
        }, []);
    }

    const [city,setCity] = useState([]);
    const [areas,setAreas] = useState([]);
    const [addressType,setAddressType] = useState();
    const [selectedArea,setSelectedArea] = useState();
    const [selectedCity,setselectedCity] = useState();
    const [email,setEmail] = useState();
    const [name,setName] = useState();
    const [block,setBlock] = useState();
    const [street,setStreet] = useState();
    const [building,setBuilding] = useState();
    const [floor,setFloor] = useState();
    const [apartment,setapartment] = useState();
    const [loadingBtn,setLoadingBtn] = useState(false);

    let cityaArea = [];
    city.map((i,k) => {
        cityaArea.push({
            label: i.areas[0].name,
            value: i.areas[0].city_id,
          });
    });

    let areasArray = [];
    {areas.map((areasValues,index) => {
        areasArray.push({
                label:areasValues.name,
                value:areasValues.area_id,
            })
    })}

    useEffect(() => {
        cityApi().then((response) => {
            setCity(response.data);
        }).catch((error) => {
            console.log("cityWithArea" + error)
        });
      }, []);

      

    const sendCityId = (itemValue) => {
        setselectedCity(itemValue)
        city.map((cityValues) => {
            {cityValues.areas[0].city_id == itemValue?setAreas(cityValues.areas):null}
        })
    }

    const addAddress = (address_id) => {
        if(city == "" || email == "" || name == "" ||block == "" || street == "" || building ==""){
            alert("Please fill all fields");
          }
          else if(email &&
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                alert("Invalid Email Address");
          }
          else if(typeof addressType == "undefined"){
              alert("Please fill all fields");
          }
          else if(selectedCity == ""){
            alert("Please select City");
        }
        else if(selectedArea == ""){
            alert("Please select area");
        }
          else{
            setLoadingBtn(true)
            addAddressApi(selectedCity,selectedArea,addressType,email,name,block,street,building,floor,apartment,address_id).then((response) => {
                props.showAddress();
                setLoadingBtn(false)
                if(response.message){
                    alert(response.message);
                    addressListApi().then((response) =>{
                        response.data.map((address,i) => {
                            if(response.data.length === 1){
                                deliveryAddressApi(address.address_id).then((response) => {
                                props.showAddress();
                                }).catch((error) => {
                                  console.log("deliveryAddressApi at address" + error)
                                })
                                defaultAddressApi(address.address_id).then((response) => {
                                  }).catch((error) => {
                                    console.log("defaultAddressCartPAGE" + error)
                                  })
                            }
                        })
                    })
                    props.navigation.goBack();
                }
            }).catch((error) => {
                alert("something went wrong");
                console.log("AddAddress" + error)
                setLoadingBtn(false)
            })
        }
    }
    return (
        <View style={{backgroundColor:'#292633', width:'100%', height:'100%'}}>
        <ScrollView
            style={{
                width,
                height,
            }}>
            <ImageBackground
                source={require('../assets/dottedBackground.png')}
                style={{
                    width,
                    minHeight: height,
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
                    paddingHorizontal:'7%',
                    }}>
                    <TouchableOpacity
                    onPress={() => {
                        props.navigation.pop()
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
                    {addressId && addressId !== ""?"UPDATE ADDRESS":"ADD ADDRESS"}
                    </Text>
                </View>
                    <View style={{marginVertical: 15,paddingHorizontal:'7%',}}>
                        <TouchableOpacity >
                        <Input placeholder="Name" value={name} onChangeText={(Name) => setName(Name)} />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginVertical: 15,paddingHorizontal:'7%',}}>
                        <Input placeholder="Email" email value={email} onChangeText={(email) => setEmail(email)} />
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
                        height: height * 0.1,
                        width: width * 0.85,
                        marginVertical: 15,
                        marginHorizontal:"7%",
                    }}>
                    {/* <Picker
                        dropdownIconColor="#ECDBFA"
                        iosHeader="Please select City"
                        mode="dropdown"
                        placeholder="Please select City"
                        selectedValue={selectedCity}    
                        style={{
                            height: Platform.OS=='android'?65:250,
                            width: "85%",
                            marginTop: Platform.OS=='android'?0:33,
                            color:'#ECDBFA',
                            marginLeft:'2%',
                        }}
                        itemStyle={{color:'#ffffff'}}
                        onValueChange={(itemValue, itemIndex) =>
                            sendCityId(itemValue)
                        }
                        >
                        <Picker.Item label='Select City' value='' />
                        {city.map((cityWithArea,index) => {
                            return(
                                <Picker.Item 
                                    key={index} 
                                    label={cityWithArea.name} 
                                    value={cityWithArea.city_id}
                                />
                            );
                        })}
                    </Picker> */}
                    <View >
                        <RNPickerSelect
                            onValueChange={(itemValue) =>
                                sendCityId(itemValue)
                            }
                            onUpArrow={() => {
                                this.inputRefs.firstTextInput.focus();
                              }}
                              onDownArrow={() => {
                                this.inputRefs.favSport1.togglePicker();
                              }}
                            placeholder={{
                                label: 'Please Select City',
                                value: null,
                            }}
                            value={selectedCity}
                            items={cityaArea}
                            style={
                                Platform.OS === 'ios'
                                  ? styles.inputIOS
                                  : styles.inputAndroid
                              }
                        />
                    </View>
                    </LinearGradient>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
                        style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        height: height * 0.1,
                        width: width * 0.85,
                        marginVertical: 15,
                        marginHorizontal:"7%",
                    }}>
                    {/* <Picker
                        dropdownIconColor="#ECDBFA"
                        iosHeader="Please select area"
                        mode="dropdown"
                        placeholder="Please select area"
                        selectedValue={selectedArea}
                        style={{
                            height: Platform.OS=='android'?65:250,
                            width: "85%",
                            marginTop: Platform.OS=='android'?0:30,
                            color:'#ECDBFA',
                            marginLeft:'2%',
                        }}
                        itemStyle={{color:'#ffffff'}}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedArea(itemValue)
                        }
                        >
                        <Picker.Item label='Select area' value='' />
                        {areas.map((areasValues,index) => {
                            return(
                                <Picker.Item 
                                    key={index} 
                                    label={areasValues.name} 
                                    value={areasValues.area_id}
                                />
                            );
                        })}
                    </Picker> */}
                    <View >
                        <RNPickerSelect
                            onValueChange={(itemValue) =>
                                setSelectedArea(itemValue)
                            }
                            placeholder={{
                                label: 'Please Select Area',
                                value: null,
                            }}
                            style={
                                Platform.OS === 'ios'
                                  ? styles.inputIOS
                                  : styles.inputAndroid
                              }
                            value={selectedArea}
                            items={areasArray}
                            inputIOS = {{
                                color: 'white',
                                marginLeft:100,
                                borderRadius: 5,
                            }}
                            inputAndroid = {{
                                color: 'white',
                                paddingHorizontal: 10,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    </LinearGradient>
                    <View style={styles.blockStreet}>
                        <View style={styles.inputView}>
                            <Input placeholder="Block"  style={styles.inputBlock} value={block} onChangeText={(Block) => setBlock(Block)}/>
                        </View>
                        <View style={styles.inputView}>
                            <Input placeholder="Street"  style={styles.input} value={street} onChangeText={(Street) => setStreet(Street)} />
                        </View>
                    </View>
                    <View style={{marginVertical: 15,paddingHorizontal:'7%',}}>
                        <Input placeholder="Building"  value={building} onChangeText={(Building) => setBuilding(Building)} />
                    </View>
                    <View style={styles.blockStreet}>
                        <View style={styles.inputView}>
                            <Input placeholder="Floor"  style={styles.input} value={floor} onChangeText={(Floor) => setFloor(Floor)} />
                        </View>
                        <View style={styles.inputView}>
                            <Input placeholder="Apartment "  style={styles.input} value={apartment} onChangeText={(aprt) => setapartment(aprt)} />
                        </View>
                    </View>
                    {/* <View style={{marginVertical: 15,paddingHorizontal:'7%',}}>
                        <Input placeholder="MultiLine Address"  value={multiLineAddress} onChangeText={(multi) => setMultiLineAddress(multi)} />
                    </View> */}
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003)']}
                        style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        height: height * 0.1,
                        width: width * 0.85,
                        marginVertical: 15,
                        marginHorizontal:"7%",
                        }}>
                        {/* <Picker
                        dropdownIconColor="#ECDBFA"
                        mode="dropdown"
                        selectedValue={addressType}
                        style={{
                            height: Platform.OS=='android'?65:250,
                            width: "85%",
                            marginTop: Platform.OS=='android'?0:30,
                            color:'#ECDBFA',
                            marginLeft:'2%',
                        }}
                        itemStyle={{color:'#ffffff'}}
                        onValueChange={(itemValue, itemIndex) =>
                            setAddressType(itemValue)
                        }
                        >
                            <Picker.Item label='Address Type' value='' />
                            <Picker.Item label="Home" value="Home" />
                            <Picker.Item label="Office" value="Office" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker> */}
                        <View >
                            <RNPickerSelect
                                onValueChange={(itemValue, itemIndex) =>
                                    setAddressType(itemValue)
                                }
                                placeholder={{
                                    label: 'Please Select Address Type',
                                    value: null,
                                }}
                                value={addressType}
                                items={[
                                    {"label": "Home", "value": "Home"},
                                    {"label": "Office", "value": "Office"},
                                    {"label": "Other", "value": "Other"},
                                  ]}
                                inputIOS = {{
                                    color: 'white',
                                    marginLeft:100,
                                    borderRadius: 5,
                                }}
                                inputAndroid = {{
                                    color: 'white',
                                    paddingHorizontal: 10,
                                    borderRadius: 5,
                                }}
                            />
                        </View>

                    </LinearGradient>
                <View style={styles.btnView}>
                    <TouchableOpacity
                    onPress={() => addAddress(specficAddress.address_id)}>
                        <View>
                        {loadingBtn?(
                            <>
                                <SaveBtn text={' '}  />
                                <ActivityIndicator
                                    color="#ECDBFA"
                                    size="small"
                                    style={{ bottom: 38 }}
                                />
                            </>
                            ):(
                                <SaveBtn text={addressId && addressId !== ""?"UPDATE":"SAVE"}/>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
                </>
                )}
          </ImageBackground>
      </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    blockStreet:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft:"-9%",
        alignSelf:'center',
    },
    inputView:{
        marginVertical: 15,
        width:"35%",
    },
    input:{
        width:"100%",
        paddingLeft:"115%",
        zIndex:1000,
    },
    inputBlock:{
        width:"100%",
        paddingLeft:"115%",
    },
    btnView:{
        paddingHorizontal:'10%',
        justifyContent:'flex-end',
        position:'relative',
        marginVertical: 15,
    },
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
});
  
const mapStateToProps = (state) => ({
    address: state.addressReducer.address,
  })
  const actionCreators = {
    showAddress: addressActions.showAddress,
  };
  
export default connect(mapStateToProps,actionCreators)(Address);

