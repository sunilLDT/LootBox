import React, { useState, useEffect } from 'react';
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
  KeyboardAvoidingView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Input from '../components/input';
import LinearGradient from 'react-native-linear-gradient';
import { cityApi, addAddressApi, getSpecificAddress } from '../api/buildYourPc';
import SaveBtn from '../components/SaveBtn';
import { connect } from 'react-redux';
import { addressActions } from '../actions/address';
import { addressListApi, deliveryAddressApi, defaultAddressApi } from '../api/buildYourPc';
import RNPickerSelect from 'react-native-picker-select';
import { GoogleMap } from './googeMaps';
import { he } from 'date-fns/locale';
import PopUp from '../components/popup';
import {languagename} from '../components/LanguageName';
const { width, height } = Dimensions.get('window');

const Address = (props) => {
    const { addressId } = props.route.params;
    const {labels} = props
    const [specficAddress, setSpecficAddress] = useState({});
    const [loading, setLoading] = useState(false);
    const [allAddress, setAllAddress] = useState([]);
    const [move,setMove] = useState(0);
    const [arOren,setarOren] = useState('en');
    languagename().then(res => setarOren(res))
    if (addressId && addressId !== "") {
        useEffect(() => {
            setLoading(true)
            getSpecificAddress(addressId).then((response) => {
                setSpecficAddress(response.data);
                setAddressType(response.data.address_type);
                setName(response.data.name);
                // setEmail(response.data.email);
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

    const [city, setCity] = useState([]);
    const [areas, setAreas] = useState([]);
    const [addressType, setAddressType] = useState();
    const [selectedArea, setSelectedArea] = useState();
    const [selectedCity, setselectedCity] = useState();
    const [name, setName] = useState();
    const [block, setBlock] = useState();
    const [street, setStreet] = useState();
    const [building, setBuilding] = useState();
    const [floor, setFloor] = useState();
    const [apartment, setapartment] = useState();
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [addressModal, setaddressModal] = useState(false);
    const [contentModal, setContentModal] = useState('');
    let cityaArea = [];
    city.map((i, k) => {
        cityaArea.push({
            label: i.name,
            value: i.city_id,
        });
    });


    let areasArray = [];
    {
        areas.map((areasValues, index) => {
            areasArray.push({
                label: areasValues.name,
                value: areasValues.area_id,
            })
        })
    }

    useEffect(() => {
        cityApi().then((response) => {
            setCity(response.data);
        }).catch((error) => {
            console.log("cityWithArea" + error)
        });
    }, []);

    const popUpHandler=(isOne)=>{
        setaddressModal(!addressModal);
        if(move == isOne){
            props.navigation.goBack();
        }
    }

    const sendCityId = (itemValue) => {
        setselectedCity(itemValue)
        city.map((cityValues) => {
            { cityValues.areas[0].city_id == itemValue ? setAreas(cityValues.areas) : null }
        })
    }

    const addAddress = (address_id) => {
        if (city == ""  || name == "" || block == "" || street == "" || building == "") {
            setaddressModal(true);
            setContentModal(labels.fillAllFields)
        }
        // else if (email &&
        //     !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        //     alert("Invalid Email Address");
        // }
        else if (typeof addressType == "undefined") {
            setaddressModal(true);
            setContentModal(labels.fillAllFields)
        }
        else if (selectedCity == "") {
            setaddressModal(true);
            setContentModal(labels.pleaseSelectCity)
        }
        else if (selectedArea == "") {
            setaddressModal(true);
            setContentModal(labels.pleaseSelectArea)
        }
        else {
            setLoadingBtn(true)
            addAddressApi(selectedCity, selectedArea, addressType, name, block, street, building, floor, apartment, address_id).then((response) => {
                props.showAddress();
                setLoadingBtn(false)
                console.log(response)
                if (response.message) {
                    setaddressModal(true);
                    setContentModal(response.message)
                    setMove(1)
               
                    addressListApi().then((response) => {
                        response.data.map((address, i) => {
                            if (response.data.length === 1) {
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
                }
            }).catch((error) => {
               
                setaddressModal(true);
                setContentModal(labels.somethingWentWrong)
                console.log("AddAddress" + error)
                setLoadingBtn(false)
            })
        }
    }

    const handleGoogleAddress = (address) => {
        // console.log(JSON.stringify(address))
        setselectedCity(address.locality)
        setStreet(address.streetName);
        // setAreas(address.adminArea);
        setBlock(address.streetNumber)
    }
    return (<>
            {/* <View style={{ height: addressId ? height: height-290, marginTop: addressId ? 0 : 290 }}> */}
            {/* <View style={{ backgroundColor: '#292633', width: '100%', height: height, position: 'relative' }}> 
            {!addressId && <View style={{ position: 'absolute', height: '35%', width: '100%' }}>
            <GoogleMap handleAddress={handleGoogleAddress}/> 
            </View>} */}
                <ScrollView
                    style={{
                        width: '100%', height: height, overflow: 'visible'
                    }}>
                    <ImageBackground
                        source={require('../assets/dottedBackground.png')}
                        style={{
                            width,
                            minHeight: height,
                        }}>
                        {loading ? (
                            <View style={{ margin: height * 0.45, alignSelf: 'center' }}>
                                <ActivityIndicator color="#ECDBFA" size="small" />
                            </View>) : (
                                <>
                                    <View
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            paddingHorizontal: '7%',
                                        }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.navigation.pop()
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
                                            {addressId && addressId !== "" ? labels.updateAddress : labels.addAddress}
                                        </Text>
                                    </View>
                                        <View style={{ marginVertical: 15, paddingHorizontal: '7%', }}>
                                            <TouchableOpacity >
                                                <Input placeholder={labels.addressName} value={name} onChangeText={(Name) => setName(Name)} />
                                            </TouchableOpacity>
                                        </View>
                                        <PopUp visible={addressModal} title={'Loot'} closeText={labels.ok} callBack={() => {popUpHandler(1)}} content={contentModal}/>
                                        {/* <View style={{ marginVertical: 15, paddingHorizontal: '7%', }}>
                                            <Input placeholder="Email" email value={email} onChangeText={(email) => setEmail(email)} />
                                        </View> */}
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                height: height * 0.1,
                                                width: width * 0.85,
                                                marginVertical: 15,
                                                marginHorizontal: "7%",
                                            }}>
                                            {Platform.OS == "android" ? (
                                                <Picker
                                                    dropdownIconColor="#ECDBFA"
                                                    iosHeader={labels.pleaseSelectCity}
                                                    mode="dropdown"
                                                    placeholder={labels.pleaseSelectCity}
                                                    selectedValue={selectedCity}
                                                    style={{
                                                        height: Platform.OS == 'android' ? 65 : 250,
                                                        width: "85%",
                                                        marginTop: Platform.OS == 'android' ? 0 : 33,
                                                        color: '#ECDBFA',
                                                        marginLeft: '2%',
                                                    }}
                                                    itemStyle={{color:'#fff'}}
                                                    onValueChange={(itemValue) =>
                                                        sendCityId(itemValue)
                                                    }
                                                >
                                                    <Picker.Item label={labels.selectCity} value='' color="#fff"/>
                                                    {city.map((cityWithArea, index) => {
                                                        return (
                                                            <Picker.Item
                                                                key={index}
                                                                label={cityWithArea.name}
                                                                value={cityWithArea.city_id}
                                                                color="#ECDBFA"
                                                            />
                                                        );
                                                    })}
                                                </Picker>
                                            ) : (

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
                                                                label: labels.pleaseSelectCity,
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
                                                )}
                                        </LinearGradient>
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                height: height * 0.1,
                                                width: width * 0.85,
                                                marginVertical: 15,
                                                marginHorizontal: "7%",
                                            }}>
                                            {Platform.OS == "android" ? (
                                                <Picker
                                                    dropdownIconColor="#ECDBFA"
                                                    iosHeader={labels.pleaseSelectArea}
                                                    mode="dropdown"
                                                    placeholder={labels.pleaseSelectArea}
                                                    selectedValue={selectedArea}
                                                    style={{
                                                        height: Platform.OS == 'android' ? 65 : 250,
                                                        width: "85%",
                                                        marginTop: Platform.OS == 'android' ? 0 : 30,
                                                        color: '#ECDBFA',
                                                        marginLeft: '2%',
                                                    }}
                                                    itemStyle={{ color: '#ffffff' }}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        setSelectedArea(itemValue)
                                                    }
                                                >
                                                    <Picker.Item label={labels.selectArea} value=''color="#ECDBFA" />
                                                    {areas.map((areasValues, index) => {
                                                        return (
                                                            <Picker.Item
                                                                key={index}
                                                                label={areasValues.name}
                                                                value={areasValues.area_id}
                                                                color="#ECDBFA"
                                                            />
                                                        );
                                                    })}
                                                </Picker>
                                            ) : (
                                                    <View >
                                                        <RNPickerSelect
                                                            onValueChange={(itemValue) =>
                                                                setSelectedArea(itemValue)
                                                            }
                                                            placeholder={{
                                                                label: labels.pleaseSelectArea,
                                                                value: null,
                                                            }}
                                                            style={
                                                                Platform.OS === 'ios'
                                                                    ? styles.inputIOS
                                                                    : styles.inputAndroid
                                                            }
                                                            value={selectedArea}
                                                            items={areasArray}
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
                                        <View style={styles.blockStreet}>
                                            <View style={styles.inputView}>
                                                <Input placeholder={labels.block} style={styles.inputBlock} value={block} onChangeText={(Block) => setBlock(Block)} />
                                            </View>
                                            <View style={styles.inputView}>
                                                <Input placeholder={labels.street} style={styles.input} value={street} onChangeText={(Street) => setStreet(Street)} />
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 15, paddingHorizontal: '7%', }}>
                                            <Input placeholder={labels.house} value={building} onChangeText={(Building) => setBuilding(Building)} />
                                        </View>
                                        <View style={styles.blockStreet}>
                                            <View style={styles.inputView}>
                                                <Input placeholder={`${labels.floor} ${labels.optional}`} style={styles.input} value={floor} onChangeText={(Floor) => setFloor(Floor)} />
                                            </View>
                                            <View style={styles.inputView}>
                                                <Input placeholder={`${labels.apartment} ${labels.optional}`} style={styles.input} value={apartment} onChangeText={(aprt) => setapartment(aprt)} />
                                            </View>
                                        </View>
                                        {/* <View style={{marginVertical: 15,paddingHorizontal:'7%',}}>
                                            <Input placeholder="MultiLine Address"  value={multiLineAddress} onChangeText={(multi) => setMultiLineAddress(multi)} />
                                        </View> */}
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003)']}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                height: height * 0.1,
                                                width: width * 0.85,
                                                marginVertical: 15,
                                                marginHorizontal: "7%",
                                            }}>
                                            {Platform.OS == "android" ? (
                                                <Picker
                                                    dropdownIconColor="#ECDBFA"
                                                    mode="dropdown"
                                                    selectedValue={addressType}
                                                    style={{
                                                        height: Platform.OS == 'android' ? 65 : 250,
                                                        width: "85%",
                                                        marginTop: Platform.OS == 'android' ? 0 : 30,
                                                        color: '#ECDBFA',
                                                        marginLeft: '2%',
                                                    }}
                                                    itemStyle={{ color: '#fff' }}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        setAddressType(itemValue)
                                                    }
                                                >
                                                    <Picker.Item label={labels.addressType} value='' color="#ECDBFA"/>
                                                    <Picker.Item label={labels.home} value="Home" color="#ECDBFA"/>
                                                    <Picker.Item label={labels.office} value="Office"color="#ECDBFA" />
                                                    <Picker.Item label={labels.other} value="Other"color="#ECDBFA" />
                                                </Picker>
                                            ) : (
                                                    <View >
                                                        <RNPickerSelect
                                                            onValueChange={(itemValue, itemIndex) =>
                                                                setAddressType(itemValue)
                                                            }
                                                            placeholder={{
                                                                label: labels.pleaseSelectAddressType,
                                                                value: null,
                                                            }}
                                                            value={addressType}
                                                            items={[
                                                                { "label": labels.home, "value": "Home" },
                                                                { "label": labels.office, "value": "Office" },
                                                                { "label": labels.other, "value": "Other" },
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
                                        <View style={styles.btnView}>
                                            <TouchableOpacity
                                                onPress={() => addAddress(specficAddress.address_id)}>
                                                <View>
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
                                                            <SaveBtn text={addressId && addressId !== "" ? labels.update : labels.save} x={arOren == "ar"? 0:0}/>
                                                        )}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                </>
                            )}
                    </ImageBackground>
                </ScrollView>
           
        {/* </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    blockStreet: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: "-9%",
        alignSelf: 'center',
    },
    inputView: {
        marginVertical: 15,
        width: "35%",
    },
    input: {
        width: "100%",
        paddingLeft: "115%",
        zIndex: 1000,
    },
    inputBlock: {
        width: "100%",
        paddingLeft: "115%",
    },
    btnView: {
        paddingHorizontal: '10%',
        justifyContent: 'flex-end',
        position: 'relative',
        marginVertical: 15,
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: '#ffffff',
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
    address: state.addressReducer.address,
    labels:state.languageReducer.labels,
})
const actionCreators = {
    showAddress: addressActions.showAddress,
};

export default connect(mapStateToProps, actionCreators)(Address);

