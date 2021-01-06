import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Btn from './btn';
import {getOrderDetails} from '../api/buildYourPc';
import ItemCard from '../assets/ic_card.png';
import IcDetailCard from '../assets/ic_details_card.png';
import { endOfDay } from 'date-fns';
import ExpandImage from '../assets/ic_expand1.png';
import CloseImage from '../assets/ic-3copy.png';
import IcCardImage from '../assets/ic3.png';


const {height, width} = Dimensions.get('window');

const OrderDetails = ({navigation,route}) => {

  const {orderId} = route.params;
  const [loading, setLoading] = useState(true);
  const [upwardImage, setUpwardImage] = useState(true);
  const [orderDetails, setorderDetails] = useState({});
  const [items, setitems] = useState([]);
  const [packageItems, setpackageItems] = useState([]);
  const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
  const [open, setOpen] = useState();
  const maxlimit = 22;
  var imgSource = upwardImage ? ExpandImage : CloseImage;

  useEffect(() => {
    setLoading(true);
    getOrderDetails(orderId).then((response) => {
      setorderDetails(response.data)
      setpackageItems(response.data.order_package_items)
      setitems(response.data.items)
      setLoading(false)
    }).catch((error) => {
      console.log("Order Details" + error);
      setLoading(false)
    });
  }, []);

  const openClose = (packageId) => {
    setOpen("");
    setOpen(packageId);
    setUpwardImage(!upwardImage)
    setShowCpuProcesserList(!showCpuPerocessersList)
  }

  const sum = (data) => {
    var total = 0
    for (var i = 0, _len = data.length; i < _len; i++) {
      total += parseFloat(data[i]['price']);
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

  var dateTime = Object.keys(orderDetails).length === 0?" ": orderDetails.created_at.substring(0, 10);

  
  return (
    <ImageBackground
      style={{
        height,
        width,
        overflowX: 'hidden',
      }}
      source={require('../assets/plainBg.png')}>
      {loading ? (
      <View style={{margin: height * 0.50,alignSelf:'center'}}>
          <ActivityIndicator color="#ECDBFA" size="small" />
      </View>):(
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height,
          
        }}>
        <View
          style={{
            padding: width * 0.1,
            paddingRight: 20,
          }}>
          <View
            style={{
              display: 'flex',
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('orders')}>
              <Image
                resizeMode="contain"
                style={{width: 48, height: 48}}
                source={require('../assets/back.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                color: '#fff',
                fontStyle: 'italic',
                marginLeft: 10,
                fontFamily: 'Montserrat-Regular',
              }}>
              Order ID {orderId}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 24,
                marginBottom: 20,
                fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                color: '#ECDBFA',
              }}>
              Confirmed
            </Text>
            <Text
              style={{
                color: '#DF2EDC',
                fontSize: 16,
                fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                lineHeight: 24,
              }}>
              On the Way
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                lineHeight: 14,
                color: '#ECDBFA',
                fontSize: 12,
                opacity: 0.5,
                marginTop: 5,
              }}>
              Will be delivered{' '}
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                }}>
                tomorrow, 06:00 PM
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                lineHeight: 14,
                color: '#ECDBFA',
                fontSize: 12,
                opacity: 0.24,
                marginTop: 20,
              }}>
              Delivered{' '}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                fontSize: 20,
                lineHeight: 28,
                color: '#ECDBFA',
              }}>
              Items
            </Text>
            <Text
              style={{
                fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                fontSize: 12,
                opacity: 0.5,
                lineHeight: 28,
                color: '#ECDBFA',
              }}>
              KD {orderDetails.sub_total}
            </Text>
          </View>
              {/* // start */}
              <View>
                {packageItems.map((packages, k) => {
                  console.log("nownownonwonw")
                  console.log(packages)
                  return (
                    <View
                      key={k}
                    >
                      <TouchableOpacity
                        onPress={() => openClose(packages.package_id)}>
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
                            source={{ uri: packages.image }}
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
                                  KD {sum(packages.items)}
                                </Text>
                            </View>
                          </View>

                          <View style={{ direction: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: "flex-end",
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
                      {showCpuPerocessersList && open == packages.package_id ? (
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                          </View>
                          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            {packages.items.map((packageItems, i) => {
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
                                        style={{ width: 48, height: 40, marginBottom: 10, alignSelf: 'center' }} />
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
              {/* // end */}
          

          {items.map((i, k) => (
            <View
              key={k}
              style={{
                width: '100%',
                height: height * 0.12,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <ImageBackground
                source={ItemCard}
                style={{
                  width: 351,
                  height: 75,
                  marginVertical: 10,
                  flexDirection: 'row',
                }}>
                {i.image !== ""?(
                  <Image
                    resizeMode="contain"
                    source={{uri:i.image}}
                    style={{
                      width:70,
                      height:50,
                      position: 'relative',
                      right: 30,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                ):(
                  <Image
                    resizeMode="contain"
                    source={require('../assets/thumbnail.png')}
                    style={{
                      //   width: 127,
                      position: 'relative',
                      right: 30,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                )}
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
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 14,
                      color: '#D2D7F9',
                      opacity: 0.87,
                      paddingLeft:5,
                    }}>
                    {((i.name).length > maxlimit)?(((i.name).substring(0,maxlimit-3)) + '...'):i.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#D2D7F9',
                      opacity: 0.5,
                      paddingLeft:5,
                    }}>
                    {((i.brand).length > maxlimit)?(((i.brand).substring(0,maxlimit-3)) + '...'):i.brand}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                    color: '#D2D7F9',
                    opacity: 0.5,
                  }}>
                  KD {i.price}
                </Text>
              </View>
              </ImageBackground>
            </View>
          ))}

          <View
            style={{
              width: '100%',
              height: height * 0.12,
              // marginVertical: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={ItemCard}
              style={{
                width: 351,
                height: 75,
                flexDirection: 'row',
              }}>
            <View style={{}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#D2D7F9',
                  opacity: 0.5,
                  paddingLeft:20,
                  marginVertical:5
                }}>
                Deliver to
              </Text>
              {orderDetails.address !== null?(
              <Text
              numberOfLines={3}
                style={{
                  
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 10,
                  color: '#D2D7F9',
                  opacity: 0.87,
                  paddingLeft:20,
                }}>
                {orderDetails.address.city_name},
                {orderDetails.address.building},
                {orderDetails.address.street},
                {orderDetails.address.building},
                {orderDetails.address.apartment},
                {orderDetails.address.floor}
              </Text>
              ):<Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 14,
                    color: '#D2D7F9',
                    opacity: 0.87,
                    paddingLeft:20,
                  }}
                >
                Delivery Address not added 
                </Text>}
            </View>
            </ImageBackground>
          </View>
          
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
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  opacity: 0.8,
                }}>
                Package Details ({orderDetails.items_qty} {orderDetails.items_qty > 1? "items":"item"})
              </Text>
            </View>

            <View
              style={{
                padding: 20,
                borderBottomColor: 'rgba(255,255,255,0.3)',
                borderBottomWidth: 0.3,
              }}>
              {packageItems.map((j,k)=>{
                return(
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}
                  key={k}>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: 14,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    
                    {((j.name).length > maxlimit)?(((j.name).substring(0,maxlimit-3)) + '...'):j.name}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    KD {sum(j.items)}
                  </Text>
                </View>
                );
              })}
              {items.map((i, k) => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}
                  key={k}>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: 14,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    
                    {((i.name).length > maxlimit)?(((i.name).substring(0,maxlimit-3)) + '...'):i.name}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    KD {i.price}
                  </Text>
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
                    KD {orderDetails.delivery_charge}
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
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  KD {orderDetails.grand_total}
                </Text>
              </View>
            </View>
          </ImageBackground>
          
          <ImageBackground
            source={IcDetailCard}
            style={{
              width: 345,
              borderRadius: 10,
              marginVertical: 10,
              padding: 20,
              overflow: 'hidden',
            }}>
            <View style={{marginVertical: 7}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#ECDBFA',
                  opacity: 0.5,
                }}>
                Name
              </Text>
              {orderDetails.address !== null?(
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                  color: '#ECDBFA',
                }}>
                {orderDetails.address.name}
              </Text>
              ):(
                <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                  color: '#ECDBFA',
                }}>
                Jhone
              </Text>
              )}
            </View>
            <View style={{marginVertical: 7}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#ECDBFA',
                  opacity: 0.5,
                }}>
                Shipping Address
              </Text>
              {orderDetails.address !== null?(
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 14,
                  color: '#D2D7F9',
                  opacity: 0.87,
                  // paddingLeft:20,
                }}>
                {orderDetails.address.city_name},
                {orderDetails.address.building},
                {orderDetails.address.street},
                {orderDetails.address.building},
                {orderDetails.address.apartment},
                {orderDetails.address.floor}
              </Text>
              ):<Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 14,
                    color: '#D2D7F9',
                    opacity: 0.87,
                  }}
                >
                Delivery Address not added 
                </Text>}
            </View>

            <View style={{marginVertical: 7}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#ECDBFA',
                  opacity: 0.5,
                }}>
                Payment Method
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                  color: '#ECDBFA',
                }}>
                By {orderDetails.payment_type_text}
              </Text>
            </View>

            <View style={{marginVertical: 7}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#ECDBFA',
                  opacity: 0.5,
                }}>
                Invoice sent to
              </Text>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {orderDetails.address !== null?(
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 14,
                    color: '#ECDBFA',
                  }}>
                  {orderDetails.address.email}
                </Text>
                ):(
                  <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 14,
                    color: '#ECDBFA',
                  }}>
                  Jhone@noemail.com
                </Text>
                )}
                
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 12,
                    color: '#DF2EDC',
                  }}>
                  Download
                </Text>
              </View>
            </View>

            <View style={{marginVertical: 7}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#ECDBFA',
                  opacity: 0.5,
                }}>
                Payment ID
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                  color: '#ECDBFA',
                }}>
                {orderDetails.payment_id}
              </Text>
            </View>

            <View style={{marginVertical: 7}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#ECDBFA',
                  opacity: 0.5,
                }}>
                Date & Time
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                  color: '#ECDBFA',
                }}>
                {dateTime}
              </Text>
            </View>
          </ImageBackground>

          <TouchableOpacity onPress={() => navigation.navigate('contact')}>
            <Btn text="Need any help?" x="15" pay="" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      )}
    </ImageBackground>
  );
};

export default OrderDetails;
