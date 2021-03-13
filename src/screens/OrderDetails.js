import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import { getOrderDetails } from '../api/buildYourPc';
import ItemCard from '../assets/ic_card.png';
import IcDetailCard from '../assets/ic_details_card.png';
import ExpandImage from '../assets/ic_expand1.png';
import CloseImage from '../assets/ic-3copy.png';
import IcCardImage from '../assets/ic3.png';
import Bar1 from '../components/bar1';
import Bar2 from '../components/bar2';
import Bar3 from '../components/bar3';
import { connect } from 'react-redux';
import { languagename } from '../components/LanguageName';
import PrimaryBtn from '../components/PrimaryBtn';

const { height, width } = Dimensions.get('window');

const OrderDetails = (props) => {
  const { labels } = props;
  const kd = labels.kD;
  
  const steps = [
    { order_status: 0, primary: labels.pending, secondary: '' },
    { order_status: 1, primary: labels.confirmed, secondary: '' },
    { order_status: 2, primary: labels.onTheWay, secondary: '' },
    { order_status: 3, primary: labels.completed, secondary: '' }
  ]

  const { orderId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [upwardImage, setUpwardImage] = useState(true);
  const [orderDetails, setorderDetails] = useState({});
  const [items, setitems] = useState([]);
  const [packageItems, setpackageItems] = useState([]);
  const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
  const [open, setOpen] = useState();
  const [download, setDownload] = useState(false);
  const [arOren, setarOren] = useState('en');
  const maxlimit = 22;
  languagename().then(res => setarOren(res))
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
 
  handleClick = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  var dateTime = Object.keys(orderDetails).length === 0 ? " " : orderDetails.created_at.substring(0, 10);

  if (Object.keys(orderDetails).length !== 0) {
    var is_advace = items.map((k) => {
      return k.is_advance_builder === 1 ? true : false;
    })
  }

  return (
    <ImageBackground
      style={{
        height,
        width,
        overflowX: 'hidden',
      }}
      source={require('../assets/plainBg.png')}>
      {loading ? (
        <View style={{ margin: height * 0.50, alignSelf: 'center' }}>
          <ActivityIndicator color="#ECDBFA" size="small" />
        </View>) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height,

            }}>
            <View
              style={{
                padding: Platform.OS == "ios" ? width * 0.08 : width * 0.1,
                paddingRight: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  marginBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('orders')}>
                  <Image
                    resizeMode="contain"
                    style={{ width: 48, height: 48 }}
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
                  {labels.orderId}{orderId}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View >
                  {orderDetails.order_status == 4 ? <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 24,
                      fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                      color: '#DF2EDC'
                    }}>Cancelled</Text> : (
                      steps.map((step, index) => (
                        <View style={{ position: 'relative' }}>
                          <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            marginVertical: 10
                          }}>
                            <View style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignSelf: 'center',
                              width: '13%',
                            }}>
                              {orderDetails.order_status == step.order_status ? <Bar1 /> : (
                                orderDetails.order_status >= step.order_status ? <Bar1 /> : <Bar3 />
                              )}
                            </View>

                            <View style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              marginLeft: 10,
                              position: 'relative',
                            }}>

                              <Text
                                style={{
                                  fontSize: orderDetails.order_status == step.order_status ? 18 : 12,
                                  lineHeight: 24,
                                  fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                                  color: orderDetails.order_status == step.order_status ? '#DF2EDC' : '#ECDBFA',
                                }}>{step.primary}</Text>
                              {/* {step.order_status == 2 && (
                                <Text
                                  style={{
                                    fontFamily: 'Montserrat-Regular',
                                    lineHeight: 14,
                                    color: orderDetails.order_status == 2 ? '#DF2EDC' : '#ECDBFA',
                                    fontSize: 12,
                                    opacity: orderDetails.order_status == 2 ? 1 : 0.24,
                                    marginTop: 5,
                                  }}>
                                  Will be delivered{' '}
                                  <Text
                                    style={{
                                      fontFamily: 'Montserrat-Bold',
                                    }}>tomorrow, 06:00 PM</Text>
                                </Text>
                              )} */}
                            </View>
                          </View>
                          {index != 0 && (
                            <View style={{
                               position: 'absolute',
                               bottom: '50%',
                               left: '6%',
                               width: 1,
                               height: '100%',
                               opacity:0.5,
                               backgroundColor: orderDetails.order_status == step.order_status || orderDetails.order_status >= step.order_status?"#DF2EDC":"#ECDBFA" }} />
                          )}
                        </View>
                      ))
                    )}
                </View>
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
                    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                    fontSize: 20,
                    lineHeight: 28,
                    color: '#ECDBFA',
                  }}>
                  {labels.items}
            </Text>
                <Text
                  style={{
                    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                    fontSize: 12,
                    opacity: 0.5,
                    lineHeight: 28,
                    color: '#ECDBFA',
                  }}>
                  {kd} {orderDetails.sub_total}
                </Text>
              </View>
              {/* // start */}
              <View>
                {packageItems.map((packages, k) => {
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
                              }}>
                              <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={{
                                  fontSize: 12,
                                  color: '#D2D7F9',
                                  opacity: 0.5,
                                  alignSelf: 'center',
                                  fontFamily: 'Montserrat-Medium',
                                }}>
                                {((packages.name).length > maxlimit) ? (((packages.name).substring(0, maxlimit - 3)) + '...') : packages.name}
                                {packages.quantity > 1 ? <Text style={{ color: '#fff' }}> ({packages.quantity})</Text> : null}
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
                                {kd} {sum(packages.items)}
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
                                        style={{ width: 48, height: 40, marginBottom: 10, alignSelf: 'center', borderRadius:15 }} />
                                      <Text
                                        adjustsFontSizeToFit={true}
                                        numberOfLines={2}
                                        style={{
                                          fontSize: 11,
                                          fontWeight: '700',
                                          color: '#FFFFFF',
                                          marginBottom: 10,
                                          alignSelf: 'center',
                                         
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
                                        +{kd} {packageItems.price}
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


              {items.map((i, k) => {
                if (i.is_advance_builder === 0) {
                  return (
                    <View
                      key={k}
                      style={{
                        width: '100%',
                        height: height * 0.12,
                        display: 'flex',
                        flexDirection: 'row',
                        marginVertical: Platform.OS === 'ios' ? 7 : 0,
                      }}>
                      <ImageBackground
                        source={ItemCard}
                        style={{
                          width: 351,
                          height: 75,
                          marginVertical: 10,
                          flexDirection: 'row',
                        }}>
                        {i.image !== "" ? (
                          <Image
                            resizeMode="contain"
                            source={{ uri: i.image }}
                            style={{
                              width: 70,
                              height: 50,
                              position: 'relative',
                              right: 30,
                              alignSelf: 'center',
                              justifyContent: 'center',
                              borderRadius:15,
                            }}
                          />
                        ) : (
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
                                paddingLeft: 5,
                                paddingRight: arOren == "ar"?5:0
                              }}>
                              {((i.brand).length > maxlimit) ? (((i.brand).substring(0, maxlimit - 3)) + '...') : i.brand}
                            </Text>
                            <Text
                              numberOfLines={2}
                              ellipsizeMode='tail'
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 12,
                                color: '#D2D7F9',
                                opacity: 0.5,
                                paddingLeft: 5,
                                paddingRight: arOren == "ar"?5:0
                              }}>
                              {((i.name).length > maxlimit) ? (((i.name).substring(0, maxlimit - 3)) + '...') : i.name}
                              {i.quantity > 1 ? <Text style={{ color: '#fff' }}> ({i.quantity})</Text> : null}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: 'Montserrat-Regular',
                              fontSize: 12,
                              color: '#D2D7F9',
                              opacity: 0.5,
                            }}>
                            {kd} {i.sub_total}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  )
                }
              })}

              {is_advace.includes(true) ? (
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
                      display: 'flex',
                      flexDirection: 'row',
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
                  </View>
                  <View
                    style={{
                      padding: 20,
                    }}>
                    {items.map((i, k) => {
                      if (i.is_advance_builder === 1) {
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
                                fontFamily: 'Montserrat-Regular',
                              }}>
                              {((i.name).length > maxlimit) ? (((i.name).substring(0, maxlimit - 3)) + '...') : i.name}
                              {i.quantity > 1 ? <Text style={{ color: '#fff' }}> ({i.quantity})</Text> : null}
                              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{"   " + i.brand}</Text>
                            </Text>
                            {i.quantity > 1 ? (<Text
                              style={{
                                color: 'rgba(255,255,255,0.3)',
                                fontSize: 12,                               
                              }}>
                              {kd} {i.sub_total}
                            </Text>) :
                              <Text
                                style={{
                                  color: 'rgba(255,255,255,0.3)',
                                  fontSize: 12,
                                  fontFamily: 'Montserrat-Regular',
                                }}>
                                {kd} {i.price}
                              </Text>
                            }
                          </View>
                        );
                      }
                    })}
                  </View>
                </ImageBackground>
              ) : null}

              <View
                style={{
                  width: '100%',
                  height: height * 0.12,
                  marginTop: Platform.OS == "ios" ? 10 : 0,
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
                        paddingLeft: 20,
                        marginVertical: 5
                      }}>
                     {labels.deliverTo}
              </Text>
                    {orderDetails.address !== null ? (
                      <Text
                        numberOfLines={3}
                        style={{

                          fontFamily: 'Montserrat-Bold',
                          fontSize: 10,
                          color: '#D2D7F9',
                          opacity: 0.87,
                          paddingLeft: 20,
                        }}>
                        {orderDetails.address.city_name +" "}
                        { orderDetails.address.building +" "}
                        { orderDetails.address.street +" "}
                        { orderDetails.address.building +" "}
                        { orderDetails.address.apartment +" "}
                        { orderDetails.address.floor +" "}
                      </Text>
                    ) : <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 14,
                        color: '#D2D7F9',
                        opacity: 0.87,
                        paddingLeft: 20,
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
                    {labels.summary} ({orderDetails.items_count} {orderDetails.items_count > 1 ? labels.items : labels.item})
              </Text>
                </View>

                <View
                  style={{
                    padding: 20,
                    borderBottomColor: 'rgba(255,255,255,0.3)',
                    borderBottomWidth: 0.3,
                  }}>
                  {/* {packageItems.map((j, k) => {
                    return (
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

                          {((j.name).length > maxlimit) ? (((j.name).substring(0, maxlimit - 3)) + '...') : j.name}

                        </Text>
                        <Text
                          style={{
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: 12,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {kd} {sum(j.items)}
                        </Text>
                      </View>
                    );
                  })} */}
                  {/* {items.map((i, k) => (
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

                        {((i.name).length > maxlimit) ? (((i.name).substring(0, maxlimit - 3)) + '...') : i.name}
                        {i.quantity > 1 ? <Text style={{ color: '#fff' }}> ({i.quantity})</Text> : null}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.3)',
                          fontSize: 12,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {kd} {i.sub_total}
                      </Text>
                    </View>
                  ))} */}
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
                    >{labels.total}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      {kd} {orderDetails.sub_total}
                    </Text>
                  </View>

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
                    >Delivery Fees
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      {kd} {orderDetails.delivery_charge}
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
                      {labels.subTotal}
                </Text>
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: 14,
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      {kd} {orderDetails.grand_total}
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
                <View style={{
                    marginVertical: 7,
                  }}>
                  <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 12,
                        color: '#ECDBFA',
                        opacity: 0.5,
                      }}>
                      {labels.name}
                    </Text>
                  </View>
                  {orderDetails.address !== null ? (
                    <View style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-SemiBold',
                          fontSize: 14,
                          color: '#ECDBFA',
                        }}>
                        {orderDetails.address.name}
                      </Text>
                    </View>
                  ) : (
                    <View style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-SemiBold',
                          fontSize: 14,
                          color: '#ECDBFA',
                        }}>
                        Jhone
                      </Text>
                    </View>
                    )}
                </View>
                <View style={{ marginVertical: 7 }}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 12,
                        color: '#ECDBFA',
                        opacity: 0.5,
                      }}>
                      {labels.shippingAddress}
                    </Text>
                  </View>
                  {orderDetails.address !== null ? (
                    <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          fontSize: 14,
                          color: '#D2D7F9',
                          opacity: 0.87,
                        }}>
                        {orderDetails.address.city_name},
                        {orderDetails.address.area_name},
                        {orderDetails.address.building},
                        {orderDetails.address.street},
                        {orderDetails.address.building},
                        {orderDetails.address.apartment},
                        {orderDetails.address.floor}
                      </Text>
                    </View>
                  ) : <Text
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

                <View style={{ marginVertical: 7 }}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#ECDBFA',
                      opacity: 0.5,
                    }}>
                    {labels.paymentMethod}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 14,
                      color: '#ECDBFA',
                    }}>
                    {labels.by} {orderDetails.payment_type_text}
                  </Text>
                </View>
                </View>

                <View style={{ marginVertical: 7 }}>
                <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#ECDBFA',
                      opacity: 0.5,
                    }}>
                    {labels.InvoiceSentTo}
                  </Text>
                </View>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {orderDetails.address !== null ? (
                      <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 14,
                            color: '#ECDBFA',
                          }}>
                          {orderDetails.address.email}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                          <Text
                            style={{
                              fontFamily: 'Montserrat-SemiBold',
                              fontSize: 14,
                              color: '#ECDBFA',
                            }}>
                            Jhone@noemail.com
                          </Text>
                        </View>
                      )}



                    <TouchableOpacity onPress={() => handleClick(orderDetails.invoice_pdf_url)}
                    >
                      {/* <WebView
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        // allowUniversalAccessFromFileURLs={true}
                        // javaScriptEnabled={true}
                        // mixedContentMode={'always'}
                        source={{ uri: download == true ? orderDetails.invoice_pdf_url : "" }}
                        // onNavigationStateChange={(result) => console.log(result.url)}
                      >
                      </WebView> */}

                      <Text style={{ color: "#DF2EDC", fontFamily: Platform.OS == 'android' ? 'Montserrat-SemiBold' : 'Montserrat', }} >{labels.download}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ marginVertical: 7 }}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#ECDBFA',
                      opacity: 0.5,
                    }}>
                    {labels.paymentID}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 14,
                      color: '#ECDBFA',
                    }}>
                    {orderDetails.payment_id}
                  </Text>
                  </View>
                </View>

                <View style={{ marginVertical: 7 }}>
                <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#ECDBFA',
                      opacity: 0.5,
                    }}>
                    {labels.dateTime}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 14,
                        color: '#ECDBFA',
                      }}>
                      {dateTime}
                    </Text>
                </View>
                </View>
              </ImageBackground>

              <TouchableOpacity onPress={() => props.navigation.navigate('contact')}>
                <PrimaryBtn text={labels.needHelp}  />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
    </ImageBackground>
  );
};

const mapStateToProps = (state) => ({
  labels: state.languageReducer.labels,
})

export default connect(mapStateToProps)(OrderDetails);
