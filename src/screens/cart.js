import React, { useState, useEffect, useCallback,useFocusEffect,useRef } from 'react';
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";
import ItemCard from '../assets/ic_card.png';
import outofstock from '../assets/outofstock.jpeg';
import IcDetailCard from '../assets/ic_details_card.png';
import {
  showCartData,
  orderPlace,
  addressListApi,
  defaultAddressApi,
  deliveryAddressApi,
  removeItemAPI,
  removePackageApi,
  addToCart,
  addPackage,
  addToCartAdvance
} from '../api/buildYourPc';
import { connect } from 'react-redux';
import { cartActions } from '../actions/user';
import { addressActions } from '../actions/address';
import Dialog, {
  DialogContent,
  SlideAnimation,
} from 'react-native-popup-dialog';
import SaveBtn from '../components/SaveBtn';
import ExpandImage from '../assets/ic_expand1.png';
import CloseImage from '../assets/ic-3copy.png';
import IcCardImage from '../assets/ic3.png';
import thumbnail from '../assets/thumbnail.png';
import PayBtn from '../components/PayBtn';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import {languagename} from '../components/LanguageName';
import { useIsFocused } from "@react-navigation/native";
import PopUp from '../components/popup';

const { width, height } = Dimensions.get('window');

const Cart = (props) => {

  const {labels} = props  
  const isFocused = useIsFocused();
  const [cartItems, setcartItems] = useState([]);
  const [upwardImage, setUpwardImage] = useState(true);
  const [cartPackage, setCartPackage] = useState([]);
  const [cartData, setCartData] = useState({});
  const [addressModal, setaddressModal] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState();
  const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
  const [PackageLoader,setPackageLoader] = useState(false);
  const [LoaderPackageID,setLoaderPackageID] = useState();
  const [itemLoader,setItemLoader] = useState(false);
  const [LoaderItemID,setLoaderItemID] = useState();
  const [DecreasePackageLoader,setDecreasePackageLoader] = useState(false);
  const [decreaseLoaderPackageID,setDecreaseLoaderPackageID] = useState();
  const [decreaseLoaderItem,setDecreaseLoaderItem] = useState(false);
  const [decreaseLoaderId,setDecreaseLoaderId] = useState();
  const [removeLoader,setremoveLoader] = useState(false);
  const [removeLoaderID,setremoveLoaderID] = useState();
  const [trashPackageLoader,settrashPackageLoader] = useState(false);
  const [trashPackageLoaderID,settrashPackageLoaderID] = useState();
  const [removeAdvanceLoader,setRemoveAdvanceLoader] = useState(false);
  const [arOren,setarOren] = useState('en');
  const [advanceItems,setAdvanceIems] = useState([])
  const [checkCOD,setCheckCOD] = useState(false);
  const [popModal, setPopModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const [forDel,setForDel] = useState(0);
  languagename().then(res => setarOren(res))


  const maxlimit = 20;
  var imgSource = upwardImage ? ExpandImage : CloseImage;

  function advanceBuilderIds(arr) {
    let itemsId = [];
    for(let sub of arr){
      if(sub.is_advance_builder === 1){
        itemsId.push(sub.cart_item_id)
      }
    }
    setAdvanceIems(itemsId)
  }

  useEffect(() => {
    const getD = () => {
      setLoading(true)
      showCartData().then((response) => {
        setcartItems(response.data.items)
        setCartPackage(response.data.package)
        setCartData(response.data)
        advanceBuilderIds(response.data.items)
        setLoading(false)
      }).catch((error) => {
        console.log("showCartData" + error);
        setLoading(false)
      });
    }
    getD();
   
  }, checkCOD?[]:[isFocused]);

  var y = allAddress.map((i) => {
    return i.is_default === 1 ? true : false;
  });

  if(Object.keys(cartData).length !== 0){
    var is_advace = cartItems.map((k) => {
      return k.is_advance_builder === 1 ? true : false;
    })
  }

  const popUpHandler=()=>{
    setPopModal(!popModal);
  }

  const checkout = async () => {
    const userType = await AsyncStorage.getItem('user_type');
    
    if (JSON.parse(userType) == 2) {
      props.navigation.navigate('auth', {
        screen: 'signup',
      })
    } else if (props.address.length === 0)
      {
        setPopModal(true);
        setContentModal("Please add address for the Delivery")
        setLoading(false)
    }
    // else if (!y.includes(true)) {
    //   alert("Please select the Delivery address")
    //   setLoading(false)
    // }
     else {
      setLoading(false);
      refRBSheet.current.open();
    }
  };
  
  const paymentOption = (paymentType) => {
    if(paymentType === 3){
      setCheckCOD(true)
    }
    orderPlace(paymentType).then((response) => {
      if(paymentType === 3){
        if(response.code == 200){
          setLoading(false)
          props.emptyCart();
          props.add();
            props.navigation.navigate('alertMessage', { msgUrl: "success" })
          }else{
            setPopModal(true);
            setContentModal(response.message)
 
          }
      }
       setLoading(false)
       props.navigation.navigate('checkout', { paymentUrl: response.data.data.paymenturl,labels: labels})
     }).catch((error) => {
       console.log("orderPlace" + error);
   });
   refRBSheet.current.close();
  }

  useEffect(() => {
    props.showAddress();
    addressListApi().then((response) => {
      setAllAddress(response.data)
      response.data.map((address, i) => {
        if (address.is_default === 1) {
          const deliveryAddress = address.address_id;
          deliveryAddressApi(deliveryAddress).then((response) => {
          }).catch((error) => {
            console.log("deliveryAddressApi in useEffect" + error)
          })
        }
      })

    }).catch((error) => {
      console.log("allAddressList" + error);
    })
  }, []);

  const reloadData = () => {
    showCartData().then((response) => {
      setcartItems(response.data.items)
      setCartPackage(response.data.package)
      setCartData(response.data)
      props.add();
    }).catch((error) => {
      console.log("showCartData reload" + error);
    });
  }

  const changeAddressPop = () => {
    props.showAddress()
    setaddressModal(!addressModal)
    addressListApi().then((response) => {
      setAllAddress(response.data)

    }).catch((error) => {
      console.log("allAddressList" + error);
    })
  }
  const onDialougeShut = () => {
    props.showAddress()
    addressListApi().then((response) => {
      setAllAddress(response.data)
    }).catch((error) => {
      console.log("allAddressList" + error);
    })
  }

  const gotoAddress = () => {
    setaddressModal(!addressModal)
    props.navigation.navigate('address', { addressId: "" })
  };

  const defaultAddressfun = (id) => {
    defaultAddressApi(id).then((response) => {
      if (response.message) {
        setaddressModal(!addressModal)
      }
    }).catch((error) => {
      console.log("defaultAddressCartPAGE" + error)
    })

    deliveryAddressApi(id).then((response) => {
    }).catch((error) => {
      console.log("deliveryAddressApi" + error)
    })
  };

  const sum = (data) => {
    var total = 0
    for (var i = 0, _len = data.length; i < _len; i++) {
      total += parseFloat(data[i]['sub_total']);
    }
    return total.toFixed(3);
  }

  Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += this[i][prop]
    }
    return total
  }

  const quantity = (data) => {
    var total = 0
    for (var i = 0, _len = data.length; i < _len; i++) {
      total = parseFloat(data[i]['quantity']);
    }
    return total;
  }

  Array.prototype.quantity = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
      total = this[i][prop]
    }
    return total
  }

  const handlePress = () => {
    setaddressModal(!addressModal)
    return true;
  }

  const openClose = (packageId) => {
    setOpen("");
    setOpen(packageId);
    setUpwardImage(!upwardImage)
    setShowCpuProcesserList(!showCpuPerocessersList)
  }

  const removeItem = (id) => {
    setremoveLoaderID(id);
    setremoveLoader(true);
    advanceBuilderIds(cartItems)
    removeItemAPI([id]).then((response) => {
      reloadData();
      setremoveLoader(false)
    })
    
  };

  const addItem = (id) => {
    setLoaderItemID(id.cart_item_id)
    setItemLoader(true)
    let remainingQuantity = id.quantity + 1;
    let data = [];
    data.push({ item_id: id.item_id,quantity:remainingQuantity})
    addToCartAdvance(data).then((response) => {
      reloadData();
      setItemLoader(false)
    })
  };

  const decreaseItem = (itemData) => {
    setDecreaseLoaderItem(true)
    if(itemData.quantity==1){
      removeItem(itemData.cart_item_id)
    }else{
    //setDecreaseLoaderItem(true)
    setDecreaseLoaderId(itemData.cart_item_id)
    let remainingQuantity = itemData.quantity - 1;
    let data = [];
    data.push({ item_id: itemData.item_id, quantity: remainingQuantity })
    addToCartAdvance(data).then((response) => {
      reloadData();
      setDecreaseLoaderItem(false)
    }).catch((error) => {
      console.log("decreaseItem" + error)
      setDecreaseLoaderItem(false)
    })
  }
  }

  const removePackage = (id) => {
    settrashPackageLoader(true);
    settrashPackageLoaderID(id);
    removePackageApi(id).then((response) => {
      reloadData();
    })
  }

  const addPackages = (id,quantity) => {
    setLoaderPackageID(id)
    setPackageLoader(true)
    let remaningPackage = quantity + 1;
    addPackage(id, remaningPackage).then((response) => {
      reloadData();
      setPackageLoader(false)
    })
  }

  const decreasePackage = (id,quantity) => {
    setDecreasePackageLoader(true)
    if(quantity==1){
      removePackage(id);
    }else
    {
      setDecreaseLoaderPackageID(id)
      setDecreasePackageLoader(true)
      let remaningPackage = quantity - 1;
      addPackage(id, remaningPackage).then((response) => {
        reloadData();
        setDecreasePackageLoader(false)
      })
    }
  }

  const removeAdvanceBuilder = async advanceItems => {
    try{
      setRemoveAdvanceLoader(true)
      advanceBuilderIds(cartItems)
      const removeConst = await removeItemAPI(advanceItems);
      if(removeConst.code == 200){
        setForDel(1)
        props.add()
      }
      console.log(removeConst)
      reloadData();
      setRemoveAdvanceLoader(false)
    }
    catch(e){
      console.log("remove advance builder " + e)
      setRemoveAdvanceLoader(false)
    }
    
  }

  const editAdvanceBuilder = async () => {
    props.navigation.navigate('AdvanceBuilder',{fromCart:1})
  }
  const refRBSheet = useRef();
  return (
    
    <ImageBackground
      source={require('../assets/plainBg.png')}
      style={{
        width,
        height,
        overflowX: 'hidden',
        
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ marginTop: height * 0.47 }}>
            <ActivityIndicator color="#ECDBFA" size="small" />
          </View>)
          :
          <>
            <View
              style={{
                paddingVertical: width * 0.05,
                // paddingHorizontal:arOren == "it"?width * 0.07:width * 0.08
                // paddingLeft:Platform.OS == 'android' ?width * 0.09:width *0.07
                paddingLeft:Platform.OS == 'android' ?width * 0.09:width *0.09,

              }}>
                 <PopUp visible={popModal} title={'Loot'} closeText={labels.ok} callBack={popUpHandler} content={contentModal}/>
              <Dialog
                visible={addressModal}
                containerStyle={{ zIndex: 10, elevation: 10, }}
                dialogStyle={{ backgroundColor: '#272732', width: "80%" }}
                dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })}
                onHardwareBackPress={() => handlePress()}
                onTouchOutside={() => { setaddressModal(!addressModal) }}
                onDismiss={() => onDialougeShut()}
              >
                
                <DialogContent>
                  <View style={styles.addressDialouge}>
                    <Text style={styles.address}>{labels.address}</Text>
                    <TouchableOpacity onPress={gotoAddress}>
                      <Text style={styles.addAddress}>{labels.addAddress}</Text>
                    </TouchableOpacity>
                  </View>
                  {props.address ? props.address.map((addValues, index) => {
                    return (
                      <TouchableOpacity key={index} onPress={() => defaultAddressfun(addValues.address_id)}>
                        <View style={styles.addressDialouge} >
                          <View style={styles.addressContainer}>
                            {addValues.is_default == 1 ? <Text style={styles.addressType}>{addValues.address_type}</Text> :
                              <Text style={{
                                backgroundColor: '#353240',
                                color: '#fff',
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                paddingTop: 7,
                              }}>
                                {addValues.address_type}
                              </Text>
                            }
                            <Text style={styles.addressList}>{addValues.area_name},{addValues.block},{addValues.street}</Text>
                          </View>
                          {addValues.is_default == 1 ? <Icon name="check-circle" size={25} color="#fff" style={styles.icon} /> : null}
                        </View>
                      </TouchableOpacity>
                    );
                  }) : null}
                </DialogContent>
              </Dialog>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity onPress={() => {
                    props.navigation ? props.navigation.navigate({name: 'home'}): props.navigation.navigate({name: 'home'})
                  }
                    }>
                    <Image
                      resizeMode="contain"
                      style={{ width: 48 }}
                      source={require('../assets/back.png')}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      fontSize: 12,
                      color: '#ECDBFA',
                      marginLeft: 10,
                    }}>
                    {labels.yourCart}
                  </Text>
                  <Text> </Text>
                  <Text
                    style={{
                      color: '#fff',
                      opacity: 0.4,
                      fontStyle: 'italic',
                    }}
                  >
                    ({Object.keys(cartData).length === 0 ? "0" : cartData.total_items} {cartData.total_items > 1 ? labels.items : " item"})
              </Text>
                </View>
              </View>
              {Object.keys(cartData).length === 0 ? null : (
                <View>
                  {cartPackage.map((packages, k) => {
                    return (
                      <View
                        key={k}
                      >
                        <TouchableOpacity
                          onPress={() => openClose(packages.cart_package_id)}>
                          <ImageBackground
                            source={ItemCard}
                            style={{
                              width: 351,
                              height: 75,
                              marginVertical: 10,
                              flexDirection: 'row',
                              paddingRight:"3%"
                            }}>
                            <Image
                              resizeMode="contain"
                              source={{ uri: packages.image }}
                              style={{
                                width: 63,
                                height:69,
                                position: 'relative',
                                right: 30,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                borderRadius:15
                              }}
                            />
                            <View
                              style={{
                                alignSelf: 'center',
                                right: 30,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '72%',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  paddingLeft: 10,
                                  marginBottom:10
                                }}>

                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#D2D7F9',
                                    opacity: 0.5,
                                    alignSelf: 'center',
                                    fontFamily: 'Montserrat-Medium',
                                  }}>
                                  {((packages.name).length > maxlimit) ? (((packages.name).substring(0, maxlimit - 3)) + '...') : packages.name}
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  paddingLeft: 10,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#D2D7F9',
                                    opacity: 0.5,
                                    alignSelf: 'center',
                                    fontFamily: 'Montserrat-Medium',
                                  }}>
                                  KD {sum(packages.cart_package_items)}
                                </Text>
                                <View
                                  style={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    position: "absolute",
                                    marginLeft: 5,
                                    marginTop: 22,
                                    width: 100,
                                    borderColor: '#ffffff',
                                    borderWidth: 0,
                                  }}>
                                    {DecreasePackageLoader && decreaseLoaderPackageID == packages.cart_package_id ?(
                                      <View style={{  }}>
                                        <ActivityIndicator color="#ECDBFA" size="small" />
                                      </View>
                                    ):(
                                  <TouchableOpacity
                                    onPress={() => {
                                      decreasePackage(packages.cart_package_id,quantity(packages.cart_package_items))
                                    }}>
                                    <Image
                                      source={require('../assets/ic_sub.png')}
                                      resizeMode="contain"
                                      style={{
                                        width: 38,
                                        height: 24,
                                      }}
                                    />
                                  </TouchableOpacity>
                                    )}
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                                      color: '#ECDBFA',
                                      marginHorizontal: 10,
                                    }}>
                                     {quantity(packages.cart_package_items)} 
                                  </Text>
                                  {PackageLoader && LoaderPackageID == packages.cart_package_id?(
                                    <View style={{  }}>
                                      <ActivityIndicator color="#ECDBFA" size="small" />
                                    </View>
                                  ):(
                                  <TouchableOpacity
                                    onPress={() => {
                                      props.add()
                                      addPackages(packages.cart_package_id,quantity(packages.cart_package_items))
                                    }}>
                                    <Image
                                      source={require('../assets/ic_add.png')}
                                      resizeMode="contain"
                                      style={{
                                        width: 38,
                                        height: 24,
                                      }}
                                    />
                                  </TouchableOpacity>
                                  )}
                                </View>

                              </View>
                            </View>

                            <View style={{ direction: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: "space-between",
                                  
                                }}>
                                  <TouchableOpacity onPress={() => 
                                  {
                                    props.navigation.navigate('ProductDetails',{PackageId:packages.package_id,cart_package_id:packages.cart_package_id})
                                  }
                                    }> 
                                  {/* {
                                  trashPackageLoader && trashPackageLoaderID=== packages.cart_package_id
                                  ?(<View style={{alignSelf:'center', paddingTop:8}}><ActivityIndicator color="#ECDBFA" size="small"  /></View>
                                  ):( */}
                                  <Icons name="pencil" color={"white"} size={15} style={{alignSelf:'center'}} />
                                  {/* } */}
                                  </TouchableOpacity>

                                <TouchableOpacity onPress={() => removePackage(packages.cart_package_id) }> 
                                  {trashPackageLoader && trashPackageLoaderID=== packages.cart_package_id
                                ?(<View style={{alignSelf:'center', paddingTop:8}}><ActivityIndicator color="#ECDBFA" size="small"  /></View>
                                ):(
                                <Icons name="trash" color={"white"} size={15} style={{alignSelf:'center', paddingTop: 8}} />)}
                                  </TouchableOpacity>
                                <Image
                                  source={imgSource}
                                  width={100}
                                  height={100}
                                  style={{ width: 29, height: 11 }}
                                />
                              </View>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                        {/* ===========================
                //start of details  package
                =========================== */}
                        {showCpuPerocessersList && open == packages.cart_package_id ? (
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                              {packages.cart_package_items.map((packageItems, i) => {
                                return (
                                  <TouchableOpacity
                                    key={i}
                                    style={{ padding: 20 }}
                                  >
                                    <ImageBackground
                                      source={IcCardImage}
                                      style={{ width: 139, height: 151 }}
                                    >
                                      <View
                                        style={{
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                          alignContent: 'center',
                                          marginTop: 30,
                                        }}>
                                        <Image
                                          source={{ uri: packageItems.image }}
                                          style={{ width: 48, height: 40, marginBottom: 10, alignSelf: 'center',borderRadius:10}} />
                                        <Text
                                          adjustsFontSizeToFit={true}
                                          numberOfLines={2}
                                          style={{
                                            fontSize: 11,
                                            fontWeight: '700',
                                            color: '#FFFFFF',
                                            marginBottom: 10,
                                            alignSelf: 'center'
                                          }}
                                        >
                                          {((packageItems.name).length > maxlimit) ? (((packageItems.name).substring(0, maxlimit - 3)) + '...') : packageItems.name}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 10,
                                            fontWeight: '700',
                                            color: '#FFFFFF',
                                            marginBottom: 10,
                                            opacity: 0.5,
                                            fontStyle: 'italic',
                                            textAlign: 'center',
                                          }}>
                                          {packageItems.brand}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            fontWeight: '400',
                                            color: '#FFFFFF',
                                            fontStyle: 'italic',
                                            textAlign: 'center',
                                            marginBottom: 40,
                                          }}>
                                          +KD {packageItems.price}
                                        </Text>
                                      </View>
                                    </ImageBackground>
                                  </TouchableOpacity>
                                );
                              })}
                            </ScrollView>
                          </View>
                        ) : null}

                        {/* ===========================
                //end of details  package
                =========================== */}
                      </View>
                    );
                  })}
                </View>
              )}
              {Object.keys(cartData).length === 0 ? null : <View>
                {cartItems.map((items, k) => {
                  if(items.is_advance_builder === 0){
                  return (
                  <View
                    key={k}
                  >
                    <ImageBackground
                      source={items.status === 1 ? ItemCard :outofstock }
                      style={{
                        width: 351,
                        height: 75,
                        marginVertical: 10,
                        flexDirection: 'row',
                        paddingRight:"3%"
                      }}>
                      <Image
                        resizeMode="contain"
                        source={{ uri: items.image }}
                        style={{
                          width: 63,
                          height: 60,
                          position: 'relative',
                          right: 30,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          borderRadius:10
                        }}
                      />
                      <View
                        style={{
                          alignSelf: 'center',
                          right: 30,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '72%',
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingLeft: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#D2D7F9',
                              opacity: 0.87,
                              fontFamily: 'Montserrat-Bold',
                            }}>
                            {items.brand}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#D2D7F9',
                              opacity: 0.5,
                              alignSelf: 'center',
                              fontFamily: 'Montserrat-Medium',
                            }}>
                            {((items.name).length > maxlimit) ? (((items.name).substring(0, maxlimit - 3)) + '...') : items.name}
                            {items.quantity > 1 ? <Text style={{ color: '#fff' }}> ({items.quantity})</Text> : null}
                          </Text>
                        </View>
                        {items.quantity > 1 ? (<Text
                          style={{
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: 12,
                          }}>
                          KD {items.sub_total}
                        </Text>) :
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.3)',
                              fontSize: 12,
                            }}>
                            KD {items.price}
                          </Text>
                        }
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          position: 'relative',
                          marginLeft: -96,
                          marginTop: 30
                        }}>
                        {decreaseLoaderItem && decreaseLoaderId == items.cart_item_id?(
                        <View style={{  }}>
                          <ActivityIndicator color="#ECDBFA" size="small" />
                        </View>
                        ):(
                        <TouchableOpacity
                          onPress={() => {
                            props.add()
                            decreaseItem(items)
                          }}>
                          <Image
                            source={require('../assets/ic_sub.png')}
                            resizeMode="contain"
                            style={{
                              width: 38,
                              height: 24,
                            }}
                          />
                        </TouchableOpacity>
                        )}
                        {items.quantity > 1 ? (
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                              color: '#ECDBFA',
                              marginHorizontal: 10,
                            }}>
                            {items.quantity}
                          </Text>
                        ) : (
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                                color: '#ECDBFA',
                                marginHorizontal: 10,
                              }}>
                              1
                            </Text>
                          )}
                        {itemLoader && LoaderItemID == items.cart_item_id?(
                          <View style={{  }}>
                            <ActivityIndicator color="#ECDBFA" size="small" />
                          </View>
                        ):(
                        <TouchableOpacity
                          onPress={() => {
                            props.add()
                            addItem(items)
                          }}>
                          <Image
                            source={require('../assets/ic_add.png')}
                            resizeMode="contain"
                            style={{
                              width: 38,
                              height: 24,
                            }}
                          />
                        </TouchableOpacity>
                        )}
                      </View>
                      <View style={{
                        position:'absolute',
                        right:5
                      }}>
                      </View>
                      <View style={{ direction: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: "space-between",
                              }}>
                                <TouchableOpacity onPress={() => removeItem(items.cart_item_id) }> 
                                {
                                removeLoader && removeLoaderID=== items.cart_item_id 
                                ?(<View style={{alignSelf:'center', paddingTop:8}}><ActivityIndicator color="#ECDBFA" size="small"  /></View>
                                ):(
                                <Icons name="trash" color={"white"} size={15} style={{alignSelf:'center', paddingTop: 8}} />)}
                                
                                </TouchableOpacity></View>
                           </View>
                    </ImageBackground>
                  </View>
                );
              }
                })}
              </View>
              }
              {Object.keys(cartData).length === 0 ?null:
              !is_advace.includes(true) || Object.keys(cartData).length === 0 ?null :
              <ImageBackground
                  source={IcDetailCard}
                  style={{
                    width: 345,
                    borderRadius: 10,
                    marginVertical: 10,
                    overflow: 'hidden',
                  }}>
                <View
                  style={{
                    padding: 20,
                    borderBottomColor: 'rgba(255,255,255,0.3)',
                    borderBottomWidth: 0.3,
                    display:'flex',
                    flexDirection:'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      opacity: 0.8,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    {labels.advanceBuilderItems}
                  </Text>
                  <View style={{
                    display:'flex',
                    flexDirection:'row',
                    
                  }}>
                    <TouchableOpacity onPress={() => editAdvanceBuilder()} style={{
                      paddingRight:15
                    }}>
                      <Icons name="pencil" color={"white"} size={15} style={{alignSelf:'center'}} />
                    </TouchableOpacity>
                    {removeAdvanceLoader?(
                      <View >
                        <ActivityIndicator color="#ECDBFA" size="small"  />
                      </View>
                    ):(
                      <TouchableOpacity  onPress={() => removeAdvanceBuilder(advanceItems)}>
                        <Icons name="trash" color={"#D2D7F9"} size={15}/>
                      </TouchableOpacity>
                    )}
                  </View>
                  
                </View>
                <View
                  style={{
                    padding: 20,
                  }}>
                  {Object.keys(cartData).length === 0 ? null : cartItems.map((items, k) => {
                    if(items.is_advance_builder === 1){
                      return(
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems:'center',
                            marginVertical: 8,
                            justifyContent:'space-between'
                          }}
                          key={k}
                        >
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.8)',
                              fontSize: 15,
                              fontFamily: 'Montserrat-Regular',
                              textDecorationLine: items.status === 0 ? 'line-through' : "none",
                            }}>
                            {((items.name).length > maxlimit) ? (((items.name).substring(0, maxlimit - 3)) + '...') : items.name}
                            {items.quantity > 1 ? <Text style={{ color: '#fff' }}> ({items.quantity})</Text> : null}
                            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{"   " + items.brand}</Text>
                          </Text>
                          <View style={{
                            flexDirection:'row',
                            display:'flex',
                            marginHorizontal:10,
                            
                            
                          }}>
                            {items.quantity > 1 ? (<Text
                              style={{
                                color: 'rgba(255,255,255,0.3)',
                                fontSize: 12,
                                textDecorationLine: items.status === 0 ? 'line-through' : "none",
                              }}>
                              KD {items.sub_total}
                            </Text>) :
                              <Text
                                style={{
                                  color: 'rgba(255,255,255,0.3)',
                                  fontSize: 12,
                                  fontFamily: 'Montserrat-Regular',
                                  textDecorationLine: items.status === 0 ? 'line-through' : "none",
                                }}>
                                KD {items.price}
                              </Text>
                            }
                            {items.is_optional == 1?(
                              <TouchableOpacity style={{marginLeft:5}} onPress={() => removeItem(items.cart_item_id)}>
                                { removeLoader && removeLoaderID=== items.cart_item_id 
                                  ?(
                                  <View >
                                    <ActivityIndicator color="#ECDBFA" size="small"  />
                                  </View>
                                  ):(
                                  <Icons name="trash" color={"#D2D7F9"} size={15}  />
                                )}
                              </TouchableOpacity>
                            ):(
                              null
                            )}
                          </View>
                        </View>
                      );
                  }
                    })}
                </View>
              </ImageBackground>
              }

              {Object.keys(cartData).length === 0 ? (
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: "55%",
                }}>
                  <Text style={{
                    color: "#fff",
                    fontSize: 20,
                    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma'
                  }}
                  >Your Cart is empty
            </Text>
                </View>
              ) : cartPackage.length === 0 && cartItems.length === 0 ? <View style={{
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: "55%",
              }}>
                <Text style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma'
                }}
                >Your Cart is empty
          </Text>
        </View>:
        <ImageBackground
        source={ItemCard}
        style={{
          width: 351,
          height: 75,
          marginVertical: 10,
          paddingTop:10,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width:"100%",
            paddingHorizontal:width*0.1,
          }}>
            <View style={{
              width:"70%",
              flexDirection: 'column',
            }}>
              <Text
              style={{
                fontSize: 12,
                color: '#D2D7F9',
                opacity: 0.5,
              }}
              >
               {labels.deliveryTo}
              </Text>
              {props.address?props.address.length === 1?(
              <View 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: 10,
                    width:200,
                    color: '#D2D7F9',
                    opacity: 0.87,
                    fontFamily:'Montserrat-Bold',
                    flexShrink: 1,
                }}>
                  {props.address[0].city_name},
                  {props.address[0].area_name},
                  {props.address[0].block},
                  {props.address[0].street},
                  {props.address[0].building},
                  {props.address[0].apartment},
                  {props.address[0].floor}
                </Text>
              </View>
              ):props.address?props.address.map((addValues,index) => {
                return(
                  <View key={index} >
                    {addValues.is_default == 1?
                    <Text
                      numberOfLines={3}
                      style={{
                        fontSize: 10,
                        width:200,
                        color: '#D2D7F9',
                        opacity: 0.87,
                        fontFamily:'Montserrat-Bold',
                        flexShrink: 1,
                      }}>
                        {addValues.city_name},
                        {addValues.area_name},
                        {addValues.block},
                        {addValues.street},
                        {addValues.building},
                        {addValues.apartment},
                        {addValues.floor}
                    </Text>: null}
                  </View>
                );
              }):null:null}
            </View>
                <View style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}> 
                  <TouchableOpacity
                    onPress={() => changeAddressPop()}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#DF2EDC',
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      {props.address?props.address.length === 0 ? "Add Address" : "Change":null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
              }
              {Object.keys(cartData).length === 0 ? null : cartPackage.length === 0 && cartItems.length === 0 || Object.keys(cartData).length === 0 ? null :
                <ImageBackground
                  source={IcDetailCard}
                  style={{
                    width: 345,
                    borderRadius: 10,
                    marginVertical: 10,
                    overflow: 'hidden',
                    // paddingHorizontal:5,
                  }}>
                  <View
                    style={{
                      padding: 20,
                      borderBottomColor: 'rgba(255,255,255,0.3)',
                      borderBottomWidth: 0.3,
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 12,
                        opacity: 0.8,
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      {labels.packageDetails}({Object.keys(cartData).length === 0 ? "0" : cartData.total_items}
                      {cartData.total_items === 1 ? " item" : labels.items})
                    </Text>
                  </View>

                  <View
                    style={{
                      padding: 20,
                      borderBottomColor: 'rgba(255,255,255,0.3)',
                      borderBottomWidth: 0.3,
                    }}>
                    {cartPackage.map((packages, k) => {
                      return (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 8,
                          }}
                          key={k}
                        >
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.8)',
                              fontSize: 15,
                              fontFamily: 'Montserrat-Regular'
                            }}>
                            {((packages.name).length > maxlimit) ? (((packages.name).substring(0, maxlimit - 3)) + '...') : packages.name}
                            {packages.package_qty > 1 ? <Text style={{ color: '#fff' }}> ({packages.package_qty})</Text> : null}
                          </Text>
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.3)',
                              fontSize: 12,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            KD {sum(packages.cart_package_items)}
                          </Text>
                        </View>
                      );
                    })}
                    {/* // ===============
              // item details start
              // =============== */}
                    {Object.keys(cartData).length === 0 ? null : cartItems.map((items, k) => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 8,
                        }}
                        key={k}
                      >
                        <Text
                          style={{
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: 15,
                            fontFamily: 'Montserrat-Regular',textDecorationLine: items.status === 0 ? 'line-through' : "none",
                          }}>
                          {((items.name).length > maxlimit) ? (((items.name).substring(0, maxlimit - 3)) + '...') : items.name}
                          {items.quantity > 1 ? <Text style={{ color: '#fff' }}> ({items.quantity})</Text> : null}
                          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{"   " + items.brand}</Text>
                        </Text>
                        {items.quantity > 1 ? (<Text
                          style={{
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: 12,
                            textDecorationLine: items.status === 0 ? 'line-through' : "none",
                          }}>
                          KD {items.sub_total}
                        </Text>) :
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.3)',
                              fontSize: 12,
                              fontFamily: 'Montserrat-Regular',
                              textDecorationLine: items.status === 0 ? 'line-through' : "none",
                            }}>
                            KD {items.price}
                          </Text>
                        }
                      </View>
                    ))}
                    {/* // ===============
              // item details end
              // =============== */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 8,
                      }}>
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: 15,
                          fontFamily: 'Montserrat-Regular',
                        }}
                      >{labels.deliveryFees}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.3)',
                          fontSize: 12,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        KD {cartData.delivery_charge}
                      </Text>
                    </View>
                  </View>

                  <View style={{ paddingHorizontal: 20 }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: 14,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {labels.total}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: 14,
                        }}>
                        KD {cartData.grand_total}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              }
              {Object.keys(cartData).length === 0 ? null : cartPackage.length === 0 && cartItems.length === 0 ? null :
                <TouchableOpacity onPress={() => checkout()}>
                  <View style={{ width: "105%" }}>
                    {!loading ? (
                      <PayBtn text={labels.pay} price={cartData.grand_total} />
                    ) : (
                        <>
                          <PayBtn text={' '} x="54" price="" />
                          <ActivityIndicator
                            color="#ECDBFA"
                            size="small"
                            style={{ bottom: 63 }}
                          />
                        </>
                      )}
                  </View>
                </TouchableOpacity>
              }
            </View>
            <View style={styles.bottom}>
              {/* <Text style={styles.forgotText}>
                {strings.forgotToAdd}
              </Text> */}
              <View>
                <TouchableOpacity style={{ marginTop: 10, marginLeft: 40 }} onPress={() => props.navigation.navigate('home')}>
                  <View style={{ width: "87%", }}>
                    <SaveBtn text={labels.continueShopping} x="100" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* bottom tab */}
            <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: "#292633"
          },
          container:{
              backgroundColor: "#292633", 
              borderTopLeftRadius:30,
              borderTopRightRadius:30,
          }
        }}
        // customStyles={{
        //   wrapper: {
        //     backgroundColor: "transparent"
        //   },
        //   draggableIcon: {
        //     backgroundColor: "#000"
        //   }
        // }}
      >
        {/* bottom tab component */}
      <View >
            <Text style={styles.bottomTabTitle} >Select Payment Method</Text>
      <View style={styles.bottomListContainer}>
      <FlatList
        data={[
          { paymentType:1, icon:<Icons name="credit-card" color={"#D2D7F9"} size={25} />, key: 'KNET'},
          { paymentType:2,icon:<Icons name="credit-card" color={"#D2D7F9"}  size={25} />, key: 'VISA'},
          { paymentType:3,icon:<Icons name="briefcase"  color={"#D2D7F9"} size={25}/>, key: 'Cash On Delivery'}, 
        ]}
        renderItem={({item}) => <TouchableOpacity onPress={() => paymentOption(item.paymentType)} ><View style={styles.itemContainer} >{item.icon}<Text style={styles.item}>{item.key}</Text></View></TouchableOpacity>}
      />
      </View>
        </View>
      </RBSheet>
    </View>
          </>
        }
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  addressDialouge: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  address: {
    color: '#fff',
  },
  addAddress: {
    color: 'rgba(255,255,255,0.3)',
    fontWeight: 'bold',
  },
  addressList: {
    color: 'rgba(255,255,255,0.8)',
    padding: 8,
  },
  addressType: {
    backgroundColor: '#353240',
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingTop: 12,
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: width * 0.4,
  },
  icon: {
    padding: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  forgotText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    opacity: 0.5,
    fontFamily: 'Montserrat-Medium',
  },
  bottomTabTitle: {
    color: '#fff',
    alignSelf:'center',
    fontSize:18,
    fontFamily:Platform.OS=='android'?'Michroma-Regular':'Michroma',
  },
  bottomTabContainer: {
    color: '#fff',
    backgroundColor:'blue',
    
   },
  bottomListContainer: {
    paddingTop: 20,
    paddingLeft:10 
  },
   itemContainer:{
    flex:1,
    flexDirection:'row',
    padding:5
   },
   item: {
    fontFamily:'Montserrat-Regular',
    color:'white',
    marginLeft:15,
    fontSize: 14,
    height: 44,
  },
});

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  address: state.addressReducer.address,
  labels:state.languageReducer.labels,
})

const actionCreators = {
  add: cartActions.addCartAction,
  emptyCart: cartActions.emptyCartAction,
  showAddress: addressActions.showAddress,
};


export default connect(mapStateToProps, actionCreators)(Cart)