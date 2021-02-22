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
import Btn from '../components/PayBtn';
import ItemCard from '../assets/ic_card.png';
import IcDetailCard from '../assets/ic_details_card.png';
import {showCartData,orderPlace,addressListApi,defaultAddressApi} from '../api/buildYourPc';
import { connect } from 'react-redux';
import { cartActions } from '../actions/user';
import Dialog, {
  DialogContent, 
  SlideAnimation,
} from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/Feather';
import SaveBtn from '../components/SaveBtn';
import ExpandImage from '../assets/ic_expand1.png';
import CloseImage from '../assets/ic-3copy.png';
import IcCardImage from '../assets/ic3.png';
import thumbnail from '../assets/thumbnail.png';
import PayBtn from '../components/PayBtn';
import { startClock } from 'react-native-reanimated';
import PopUp from '../components/popup';
const {width, height} = Dimensions.get('window');

const CartList = (props) => {
  const [cartItems,setcartItems] = useState([]);
  const [upwardImage, setUpwardImage] = useState(true);
  const [cartPackage,setCartPackage] = useState([]);
  const [cartData,setCartData] = useState({});
  const [addressModal, setaddressModal] = useState(false);
  const [allAddress,setAllAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState();
  const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
  const [packagePrice, setPackagePrice] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  // console.log(Number(packagePrice));
  const maxlimit = 22;
  var imgSource = upwardImage ? ExpandImage : CloseImage;

  useEffect(() => {
    setLoading(true)
    showCartData().then((response) => {
      setcartItems(response.data.items) 
      setCartPackage(response.data.package)
      {response.data.package.map((packagePri,i) => {
        packagePri.cart_package_items.map((Pprice,k) => {
          setPackagePrice([...packagePrice,Pprice]);
        });
      })}
      setCartData(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log("showCartData" + error);
      setLoading(false)
    });
  }, []);

  const popUpHandler=()=>{
    setPopModal(!popModal);
}

  const checkout = () => {
    setLoading(true)
    if(allAddress.length === 0){
      setPopModal(true);
      setContentModal("Please add address for the Delivery");
      setLoading(false)
    }else{
      orderPlace().then((response) => {
        console.log(response)
        setLoading(false)
        props.navigation.navigate('checkout',{paymentUrl:response.data.data.paymenturl})
      }).catch((error) => {
        console.log("orderPlace" + error);
      });
    }
  };

  useEffect(() => {
    addressListApi().then((response) => {
      setAllAddress(response.data)
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
  };

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

  return (
    <ImageBackground
      source={require('../assets/plainBg.png')}
      style={{
        width,
        height,
        overflowX: 'hidden',
      }}>
            <PopUp visible={popModal} title={'Loot'} closeText={labels.ok} callBack={popUpHandler} content={contentModal}/>
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
                      <Text style={styles.address}>Address</Text>
                      <TouchableOpacity onPress={gotoAddress}>
                        <Text style={styles.addAddress}>Add Address</Text>
                      </TouchableOpacity>
                  </View>
                  {allAddress.map((addValues,index) => {
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
                  })}
                  
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
                YOUR CART
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
                        {packages.name}
                        <Text style={{color:'#fff'}}> {packages.quantity}</Text>
                      </Text>

                      
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => openClose(packages.cart_package_id)}>
                    <View
                        style={{
                            flex:1,
                            justifyContent:"flex-end"
                        }}>
                        <Image
                            source={imgSource}
                            width={100}
                            height={100}
                            style={{ width: 29, height: 11 }}
                        />
                    </View>
                </TouchableOpacity>
                </ImageBackground>
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
                      console.log(packageItems.price);
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
                      {items.name}
                      {items.quantity > 1?<Text style={{color:'#fff'}}> ({items.quantity})</Text>:null}
                    </Text>
                  </View>
                  {items.quantity > 1?(<Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                    }}>
                   KD {items.price*items.quantity+".000"}
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
              </ImageBackground>
            </View>
          ))}
          </View>
          }
          {Object.keys(cartData).length === 0?<View style={{
            flex:1,
            flexDirection:'row',
            alignSelf:'center',
            marginTop:"55%",
            }}>
          <Text style={{color:"#fff",fontSize:20,fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma'}}>Your Cart is empty</Text>
        </View>:
          <ImageBackground
            source={ItemCard}
            style={{
              width: 351,
              height: 75,
              marginVertical: 10,
              flexDirection: 'row',
              padding: 30,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#D2D7F9',
                  opacity: 0.5,
                }}>
                Deliver to
              </Text>
              {allAddress.map((addValues,index) => {
                return(
                <View key={index}>
                  {addValues.is_default == 1?<Text
                    style={{
                      fontSize: 14,
                      color: '#D2D7F9',
                      opacity: 0.87,
                      fontFamily:'Montserrat-Bold',
                    }}>{addValues.area_name},{addValues.block},{addValues.street}</Text>:null}
                </View>
                );
               })} 
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
              }}
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
          </ImageBackground>
        }
        {Object.keys(cartData).length === 0?null:
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
                Package Details ({Object.keys(cartData).length === 0?"0":cartData.total_items }
                 {cartData.total_items === 1?" item":" items"})
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
                      KD {packages.price}
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
                   KD {items.price*items.quantity+".000"}
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
                  >Delivery Fees
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
                  Total
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
        {Object.keys(cartData).length === 0?null:
          <TouchableOpacity onPress={() => checkout()}>
            <View style={{width:"105%"}}>
              {!loading ? (
                  <PayBtn text="PAY" price={cartData.grand_total}/>
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
          Forgot to add something?
        </Text>
        <View>
          <TouchableOpacity style={{marginTop:10,marginLeft:40}} onPress={() => props.navigation.navigate('home')}>
            <View style={{width:"87%",}}>
              <SaveBtn text="Continue Shopping" x="100" />
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
const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,

})

const actionCreators = {
  add: cartActions.addCartAction,

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
});

export default connect(mapStateToProps, actionCreators)(CartList)
