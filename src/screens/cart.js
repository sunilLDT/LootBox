import React,{useState,useEffect,useFocusEffect} from 'react';
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
} from 'react-native';
import ItemCard from '../assets/ic_card.png';
import IcDetailCard from '../assets/ic_details_card.png';
import {showCartData,
  orderPlace,
  addressListApi,
  defaultAddressApi,
  deliveryAddressApi,
  removeItemAPI,
  removePackageApi,
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
import strings from '../languages/index';


const {width, height} = Dimensions.get('window');

const Cart = (props) => {
  const [cartItems,setcartItems] = useState([]);
  const [upwardImage, setUpwardImage] = useState(true);
  const [cartPackage,setCartPackage] = useState([]);
  const [cartData,setCartData] = useState({});
  const [addressModal, setaddressModal] = useState(false);
  const [allAddress,setAllAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState();
  const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
  const maxlimit = 20;
  var imgSource = upwardImage ? ExpandImage : CloseImage;

  useEffect(() => {
    setLoading(true)
    showCartData().then((response) => {
      setcartItems(response.data.items) 
      setCartPackage(response.data.package)
      setCartData(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log("showCartData" + error);
      setLoading(false)
    });
  }, []);

  var y = allAddress.map((i) => {
    return i.is_default === 1?true:false;
  });

  const checkout = () => {
    setLoading(true)
    if(props.address.length === 0){
      alert("Please add address for the Delivery")
      setLoading(false)
    }
    else if(!y.includes(true)){
      alert("Please select the Delivery address")
      setLoading(false)
    }
    else{
      orderPlace().then((response) => {
        setLoading(false)
        props.navigation.navigate('checkout',{paymentUrl:response.data.data.paymenturl})
      }).catch((error) => {
        console.log("orderPlace" + error);
      });
    }
  };

  useEffect(() => {
    props.showAddress();
    addressListApi().then((response) => {
      setAllAddress(props.address)
    }).catch((error) => {
      console.log("allAddressList" + error);
    })
  },[]);

  const changeAddressPop = () => {
    setaddressModal(!addressModal)
    addressListApi().then((response) => {
      setAllAddress(response.data)
    }).catch((error) => {
      console.log("allAddressList" + error);
    })
  }
  const onDialougeShut = () => {
    addressListApi().then((response) => {
      setAllAddress(response.data)
    }).catch((error) => {
      console.log("allAddressList" + error);
    })
  }

  const gotoAddress = () => {
    setaddressModal(!addressModal)
    props.navigation.navigate('address',{addressId:""})
  };

  const defaultAddressfun = (id) => {
    defaultAddressApi(id).then((response) => {
      if(response.message){
        setaddressModal(!addressModal)
      }
    }).catch((error) => {
      console.log("defaultAddressCartPAGE" + error)
    })

    deliveryAddressApi(id).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log("deliveryAddressApi" + error)
    })
  };

  const sum=(data)=> {
   // return data.reduce((a, b) => a + (b['price'] || 0), 0);
   var total = 0
  for ( var i = 0, _len = data.length; i < _len; i++ ) {
      total += parseFloat(data[i]['price']);
  }
  return total.toFixed(3);
}

Array.prototype.sum = function (prop) {
  var total = 0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
      total += this[i][prop]
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
  removeItemAPI(id).then((response) => {
    console.log(response.data)
  })
};

const removePackage = (id) => {
  removePackageApi(id).then((response) => {
    console.log(response.data)
  })
}

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
        <View style={{marginTop: height * 0.47}}>
            <ActivityIndicator color="#ECDBFA" size="small" />
        </View>)
        :
        <>
        <View
          style={{
            width,
            paddingVertical: width * 0.05,
            paddingHorizontal: width * 0.1,
          }}>
            <Dialog
              visible={addressModal}
              containerStyle={{zIndex: 10, elevation: 10,}}
              dialogStyle={{backgroundColor:'#272732',width:"80%"}}
              dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
              })}
              onHardwareBackPress={() => handlePress()}
              onTouchOutside={() => {setaddressModal(!addressModal)}}
              onDismiss={() => onDialougeShut()}
              >
              <DialogContent>
                  <View style={styles.addressDialouge}>
                      <Text style={styles.address}>{strings.address}</Text>
                      <TouchableOpacity onPress={gotoAddress}>
                        <Text style={styles.addAddress}>{strings.addAddress}</Text>
                      </TouchableOpacity>
                  </View>
                  {props.address?props.address.map((addValues,index) => {
                    return(
                      <TouchableOpacity key={index} onPress={() => defaultAddressfun(addValues.address_id)}>
                        <View style={styles.addressDialouge} >
                          <View style={styles.addressContainer}>
                          {addValues.is_default == 1?<Text style={styles.addressType}>{addValues.address_type}</Text>:
                            <Text style={{backgroundColor:'#353240',
                              color:'#fff',
                              paddingHorizontal:10,
                              borderRadius:10,
                              paddingTop:7,}}>
                              {addValues.address_type}
                            </Text>
                          }
                            <Text style={styles.addressList}>{addValues.area_name},{addValues.block},{addValues.street}</Text>
                          </View>
                          {addValues.is_default == 1?<Icon name="check-circle" size={25} color="#fff" style={styles.icon}/>:null}
                        </View>
                    </TouchableOpacity>
                    );
                  }):null}
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
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  resizeMode="contain"
                  style={{width: 48}}
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
                {strings.yourCart}
              </Text>
              <Text> </Text>
              <Text
                style={{
                  color:'#fff',
                  opacity:0.4,
                  fontStyle:'italic',
                }}
              >
                 ({Object.keys(cartData).length === 0?"0":cartData.total_items} {cartData.total_items > 1?strings.items:" item"})
              </Text>
            </View>
          </View>
          {Object.keys(cartData).length === 0?null:(
            <View>
              {cartPackage.map((packages,k) => {
                return(
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
                  }}>
                  <Image
                    resizeMode="contain"
                    source={{uri:packages.image}}
                    style={{
                      width: 63,
                      height: 60,
                      position: 'relative',
                      right: 30,
                      alignSelf: 'center',
                      justifyContent: 'center',
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
                          fontSize: 12,
                          color: '#D2D7F9',
                          opacity: 0.5,
                          alignSelf: 'center',
                          fontFamily:'Montserrat-Medium',
                        }}>
                        {((packages.name).length > maxlimit)?(((packages.name).substring(0,maxlimit-3)) + '...'):packages.name}
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
                          fontFamily:'Montserrat-Medium',
                        }}>
                         KD {sum(packages.cart_package_items)}
                      </Text>
                      
                    </View>
                  </View>
                  <View style={{direction:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft:"-300%",
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        // qty > 1 && setQty(qty - 1);
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
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma', 
                        color: '#ECDBFA',
                        marginHorizontal: 10,
                      }}>
                      {/* {qty} */}
                      2
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // setQty(qty + 1);
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
                  </View>
                      <View
                          style={{
                              flex:1,
                              justifyContent:"flex-end",
                          }}>
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
                {showCpuPerocessersList && open == packages.cart_package_id?(
                <View>
                    <View
                      style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                      }}>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {packages.cart_package_items.map((packageItems,i) => {
                      return(
                      <TouchableOpacity
                          key={i}
                          style={{ padding: 20 }}
                      >
                        <ImageBackground
                            source = {IcCardImage}
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
                              source={{uri:packageItems.image}}
                              style={{ width: 48, height: 40, marginBottom: 10, alignSelf: 'center' }}/>
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
                                {((packageItems.name).length > maxlimit)?(((packageItems.name).substring(0,maxlimit-3)) + '...'):packageItems.name}
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
                ):null}

                {/* ===========================
                //end of details  package
                =========================== */}
              </View>
              );
              })}
            </View>
           )} 
          {Object.keys(cartData).length === 0?null:<View>
          {cartItems.map((items, k) => (
            <View
              key={k}
              >
              <ImageBackground
                source={ItemCard}
                style={{
                  width: 351,
                  height: 75,
                  marginVertical: 10,
                  flexDirection: 'row',
                }}>
                <Image
                  resizeMode="contain"
                  source={{uri:items.image}}
                  style={{
                    width: 63,
                    height: 60,
                    position: 'relative',
                    right: 30,
                    alignSelf: 'center',
                    justifyContent: 'center',
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
                        fontFamily:'Montserrat-Bold',
                      }}>
                      {items.brand}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#D2D7F9',
                        opacity: 0.5,
                        alignSelf: 'center',
                        fontFamily:'Montserrat-Medium',
                      }}>
                      {((items.name).length > maxlimit)?(((items.name).substring(0,maxlimit-3)) + '...'):items.name}
                      {items.quantity > 1?<Text style={{color:'#fff'}}> ({items.quantity})</Text>:null}
                    </Text>
                  </View>
                  {items.quantity > 1?(<Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                    }}>
                   KD {items.sub_total}
                  </Text>):
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                    }}>
                   KD {items.price}
                  </Text>
                  }
                  
                </View>
                <TouchableOpacity onPress={() => removeItem(items.cart_item_id)}>
                  <Icon name="circle" size={25} color="#fff" style={styles.crossIcon}/>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ))}
          </View>
          }
          {Object.keys(cartData).length === 0?(
            <View style={{
              flex:1,
              flexDirection:'row',
              alignSelf:'center',
              marginTop:"55%",
              }}>
            <Text style={{
              color:"#fff",
              fontSize:20,
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma'
              }}
            >Your Cart is empty
            </Text>
          </View>
          ):cartPackage.length === 0  && cartItems.length === 0?<View style={{
            flex:1,
            flexDirection:'row',
            alignSelf:'center',
            marginTop:"55%",
            }}>
          <Text style={{
            color:"#fff",
            fontSize:20,
            fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma'
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
          padding: 20,
          paddingTop:10
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width:"100%",
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
               {strings.deliveryTo}
              </Text>
              {allAddress.map((addValues,index) => {
                return(
                <View key={index} >
                  {addValues.is_default == 1?<Text
                    style={{
                      fontSize: 14,
                      color: '#D2D7F9',
                      opacity: 0.87,
                      fontFamily:'Montserrat-Bold',
                      flexShrink: 1,
                    }}>
                      {addValues.area_name},
                      {addValues.block},
                      {addValues.street}
                      {addValues.building},
                      {addValues.apartment},
                      {addValues.floor}
                      </Text>:null}
                  </View>
                  );
                })}
            </View>
            <View>
            <TouchableOpacity
              onPress={() => changeAddressPop()}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#DF2EDC',
                  fontFamily:'Montserrat-Medium',
                }}>
                {allAddress.length === 0?"Add Address":"Change"}
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        }
        {Object.keys(cartData).length === 0?null:cartPackage.length === 0 && cartItems.length === 0 || Object.keys(cartData).length === 0?null:
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
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  opacity: 0.8,
                  fontFamily:'Montserrat-Medium',
                }}>
               {strings.packageDetails}({Object.keys(cartData).length === 0?"0":cartData.total_items }
                 {cartData.total_items === 1?" item":strings.items})
              </Text>
            </View>

            <View
              style={{
                padding: 20,
                borderBottomColor: 'rgba(255,255,255,0.3)',
                borderBottomWidth: 0.3,
              }}>
                {cartPackage.map((packages,k) => {
                return(
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
                        fontFamily:'Montserrat-Regular'
                      }}>
                      {((packages.name).length > maxlimit)?(((packages.name).substring(0,maxlimit-3)) + '...'):packages.name}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: 12,
                        fontFamily:'Montserrat-Regular',
                      }}>
                      KD {sum(packages.cart_package_items)}
                    </Text>
                  </View>
                );
                })}
              {/* // ===============
              // item details start
              // =============== */}
              {Object.keys(cartData).length === 0?null:cartItems.map((items, k) => (
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
                      fontFamily:'Montserrat-Regular'
                    }}>
                    {((items.name).length > maxlimit)?(((items.name).substring(0,maxlimit-3)) + '...'):items.name}
                    {items.quantity > 1?<Text style={{color:'#fff'}}> ({items.quantity})</Text>:null}
                    <Text style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>{"   "+items.brand}</Text>
                  </Text>
                  {items.quantity > 1?(<Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                    }}>
                   KD {items.sub_total}
                  </Text>):
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                      fontFamily:'Montserrat-Regular',
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
                  fontFamily:'Montserrat-Regular',
                  }}
                  >{strings.DeliveryFees}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                      fontFamily:'Montserrat-Regular',
                    }}>
                   KD {cartData.delivery_charge}
                  </Text> 
                </View>
            </View>

            <View style={{paddingHorizontal: 20}}>
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
                    fontFamily:'Montserrat-Regular',
                  }}>
                  {strings.total}
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
        {Object.keys(cartData).length === 0?null:cartPackage.length === 0 && cartItems.length === 0 ?null:
          <TouchableOpacity onPress={() => checkout()}>
            <View style={{width:"105%"}}>
              {!loading ? (
                  <PayBtn text={strings.pay} price={cartData.grand_total}/>
                  ) : (
                      <>
                        <PayBtn text={' '} x="54" price=""/>
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
        <Text style={styles.forgotText}>
          {strings.forgotToAdd}
        </Text>
        <View>
          <TouchableOpacity style={{marginTop:10,marginLeft:40}} onPress={() => props.navigation.navigate('home')}>
            <View style={{width:"87%",}}>
              <SaveBtn text={strings.continueShoping} x="100" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
        </>
      }
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  addressDialouge:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginVertical:15,
  },
  address:{
    color:'#fff',
  },
  addAddress:{
    color:'rgba(255,255,255,0.3)',
    fontWeight:'bold',
  },
  addressList:{
    color:'rgba(255,255,255,0.8)',
    padding:8,
  },
  addressType:{
    backgroundColor:'#353240',
    color:'#fff',
    paddingHorizontal:10,
    borderRadius:10,
    paddingTop:12,
  },
  addressContainer:{
    display: 'flex',
    flexDirection: 'row',
    width:width*0.4,
  },
  icon:{
    padding:10,
  },
  bottom:{
    flex:1,
    justifyContent:'flex-end',
    marginBottom:15,
  },
  forgotText:{
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    opacity: 0.5,
    fontFamily:'Montserrat-Medium',
  },
  crossIconForPackage:{
   display:'flex',
   alignSelf:'flex-end',
   position:'relative',
   top:-55,
   right:-5,
  }
});

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  address: state.addressReducer.address,
})

const actionCreators = {
  add: cartActions.addCartAction,
  emptyCart:cartActions.emptyCartAction,
  showAddress: addressActions.showAddress,
};


export default connect(mapStateToProps, actionCreators)(Cart)
