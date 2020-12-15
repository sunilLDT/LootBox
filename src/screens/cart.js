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
import Btn from './btn';
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

const {width, height} = Dimensions.get('window');

const Cart = ({navigation}) => {

  const [cartItems,setcartItems] = useState([]);
  const [cartPackage,setCartPackage] = useState({});
  const [cartData,setCartData] = useState({});
  const [addressModal, setaddressModal] = useState(false);
  const [allAddress,setAllAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxlimit = 22;

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
  const checkout = () => {
    setLoading(true)
    if(allAddress.length === 0){
      alert("Please add address for the Delivery")
    }else{
      orderPlace().then((response) => {
        setLoading(false)
        navigation.navigate('checkout',{paymentUrl:response.data.data.paymenturl})
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
    navigation.navigate('address',{addressId:""})
  };

  const defaultAddressfun = (id) => {
    defaultAddressApi(id).then((response) => {
      console.log(response.message)
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
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
        {Object.keys(cartData).length === 0?null:
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {cartPackage == null?null:
            <Image
              resizeMode="contain"
              source={{uri:cartPackage.image}}
              style={{
                width: 139,
                height: 86,
              }}
            />
            } 
            <View
              style={{
                alignSelf: 'center',
                right: 20,
                width:"40%",
              }}>
              {cartPackage == null?null:
              <Text
                style={{
                  color: '#ECDBFA',
                  fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                }}>
                {cartPackage.name}
              </Text>
              }
              {cartPackage == null?null:
              <Text
                style={{
                  color: '#ECDBFA',
                  opacity: 0.5,
                  fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                  fontSize:12,
                }}>
                KD {cartData.grand_total}
              </Text>
              } 
            </View>
          </View>
         } 
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
                Package Details ({Object.keys(cartData).length === 0?"0":cartItems.length }
                 {Object.keys(cartData).length === 1?" item":" items"})
              </Text>
            </View>

            <View
              style={{
                padding: 20,
                borderBottomColor: 'rgba(255,255,255,0.3)',
                borderBottomWidth: 0.3,
              }}>
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
                     <Btn  text={cartData.grand_total} pay="PAY                " />
                  ) : (
                      <>
                        <Btn text={' '} x="54" pay="" />
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
          <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate('home')}>
            <SaveBtn text="Continue Shopping" x="100" />
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

export default connect(mapStateToProps, actionCreators)(Cart)
