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
  TouchableWithoutFeedback
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Input from '../components/input';
import LinearGradient from 'react-native-linear-gradient';
import {cityApi,addAddressApi,getSpecificAddress} from '../api/buildYourPc';


const {width, height} = Dimensions.get('window');

const Address = ({navigation,route}) => {

    const { addressId } = route.params;
    const [specficAddress,setSpecficAddress] = useState({});
    if(addressId && addressId !== ""){
        useEffect(() => {
            getSpecificAddress(addressId).then((response) => {
                setSpecficAddress(response.data);
            }).catch((error) => {
                console.log("specficAddress" + error)
            });
        }, []);
    }

    const getDetails = (type)=>{
        if(addressId && addressId !== ""){
            switch(type){
                case "name":
                    return specficAddress.name;
                case "email":
                    return specficAddress.email;
                case "block":
                    return specficAddress.block;
                case "street":
                    return specficAddress.street;
                case "building":
                    return specficAddress.building;
                case "floor":
                    return specficAddress.floor;
                case "apartment":
                    return specficAddress.apartment;
                case "addressType":
                    return specficAddress.address_type;
                case "area":
                    return specficAddress.area_id;
                case "city":
                    return specficAddress.city_id;
                default:
                    return "nothing";
            }
        }
        return "";
    }

    const [city,setCity] = useState([]);
    const [areas,setAreas] = useState([]);
    const [addressType,setAddressType] = useState(getDetails("addressType"));
    const [selectedArea,setSelectedArea] = useState(getDetails('area'));
    const [selectedCity,setselectedCity] = useState(getDetails('city'));
    const [email,setEmail] = useState(getDetails("email"));
    const [name,setName] = useState(getDetails("name"));
    const [block,setBlock] = useState(getDetails("block"));
    const [street,setStreet] = useState(getDetails("street"));
    const [building,setBuilding] = useState(getDetails("building"));
    const [floor,setFloor] = useState(getDetails("floor"));
    const [apartment,setapartment] = useState(getDetails("apartment"));

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
        if(city == "" || email == "" || name == "" ||block == "" || street == "" || building =="" || floor=="" || apartment==""){
            alert("Please fill all fields");
          }
          else if(email &&
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                alert("Invalid Email Address");
          }
          else{
            addAddressApi(selectedCity,selectedArea,addressType,email,name,block,street,building,floor,apartment,address_id).then((response) => {
                console.log(response.message);
                alert(response.message);
                if(response.message){
                    navigation.navigate('profile');
                }
            }).catch((error) => {
                alert("something went wrong");
                console.log("AddAddress" + error)
            })
        }
    }
    return (
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
                
                <View
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal:'7%',
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
                    ADD ADDRESS
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
                        width: width * 0.75,
                        marginVertical: 15,
                        marginHorizontal:"7%",
                    }}>
                    <Picker
                        dropdownIconColor="#ECDBFA"
                        iosHeader="Please select City"
                        mode="dropdown"
                        placeholder="Please select City"
                        selectedValue={selectedCity}    
                        style={{
                            height: 65,
                            width: "85%",
                            color:'#ECDBFA',
                            marginLeft:'2%',
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                            sendCityId(itemValue)
                        }
                        >
                        {city.map((cityWithArea,index) => {
                            return(
                                <Picker.Item 
                                    key={index} 
                                    label={cityWithArea.name} 
                                    value={cityWithArea.city_id}
                                />
                            );
                        })}
                    </Picker>
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
                        width: width * 0.75,
                        marginVertical: 15,
                        marginHorizontal:"7%",
                    }}>
                    <Picker
                        dropdownIconColor="#ECDBFA"
                        iosHeader="Please select area"
                        mode="dropdown"
                        placeholder="Please select area"
                        selectedValue={selectedArea}
                        style={{
                            height: 65,
                            width: "85%",
                            color:'#ECDBFA',
                            marginLeft:'2%',
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedArea(itemValue)
                        }
                        >
                        {areas.map((areasValues,index) => {
                            return(
                                <Picker.Item 
                                    key={index} 
                                    label={areasValues.name} 
                                    value={areasValues.area_id}
                                />
                            );
                        })}
                    </Picker>
                    </LinearGradient>
                    <View style={styles.blockStreet}>
                        <View style={styles.inputView}>
                            <Input placeholder="Block"  style={styles.input} value={block} onChangeText={(Block) => setBlock(Block)}/>
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
                        width: width * 0.75,
                        marginVertical: 15,
                        marginHorizontal:"7%",
                        }}>
                        <Picker
                        dropdownIconColor="#ECDBFA"
                        mode="dropdown"
                        selectedValue={addressType}
                        style={{
                            height: 65,
                            width: "85%",
                            color:'#ECDBFA',
                            marginLeft:'2%',
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                            setAddressType(itemValue)
                        }
                        >   
                            <Picker.Item label="Home" value="Home" />
                            <Picker.Item label="Office" value="Office" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </LinearGradient>
                <View style={styles.btnView}>
                    {/* {Object.keys(specficAddress).length == 0?( */}
                        <TouchableWithoutFeedback
                        onPress={() => addAddress(specficAddress.address_id)}
                        style={{
                        width: '100%',
                        height: height * 0.09,
                        display: 'flex',
                        }}>
                        <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['rgba(184,37,154,0.16)', 'rgba(184,37,154,0.16)']}
                        style={{
                            height: height * 0.09,
                            borderRadius: 10,
                            borderColor: '#C01C8A',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1.5,
                            marginTop: 18,
                            width: width * 0.8,
                        }}>
                        <Text
                            style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            letterSpacing: 0.5,
                            fontStyle: 'italic',
                            fontSize:18
                            }}>
                            Save
                        </Text>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                    {/* ):( */}
                        {/* <TouchableWithoutFeedback
                        onPress={() => updateAddress()}
                        style={{
                        width: '100%',
                        height: height * 0.09,
                        display: 'flex',
                        }}>
                        <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['rgba(184,37,154,0.16)', 'rgba(184,37,154,0.16)']}
                        style={{
                            height: height * 0.09,
                            borderRadius: 10,
                            borderColor: '#C01C8A',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1.5,
                            marginTop: 18,
                            width: width * 0.8,
                        }}>
                        <Text
                            style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            letterSpacing: 0.5,
                            fontStyle: 'italic',
                            fontSize:18
                            }}>
                            Save Changes
                        </Text>
                        </LinearGradient>
                    </TouchableWithoutFeedback> */}
                    {/* )} */}
                    
                </View>
          </ImageBackground>
      </ScrollView>
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
        paddingLeft:"95%"
    },
    btnView:{
        paddingHorizontal:'10%',
        justifyContent:'flex-end',
        position:'relative',
        marginVertical: 15,
    }
});

export default Address;