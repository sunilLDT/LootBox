import React,{useState,useEffect} from 'react';
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import Btn from './btn';
import ItemCard from '../assets/ic_card.png';
import IcDetailCard from '../assets/ic_details_card.png';
import {showCartData,orderPlace} from '../api/buildYourPc';

const {width, height} = Dimensions.get('window');

const Cart = ({navigation}) => {

  const [cartItems,setcartItems] = useState([]);

  const [cartPackage,setCartPackage] = useState({});

  const [cartData,setCartData] = useState({});

  useEffect(() => {
    showCartData().then((response) => {
      setcartItems(response.data.items) 
      setCartPackage(response.data.package)
      setCartData(response.data)
    }).catch((error) => {
      console.log("showCartData" + error);
    });
  }, []);

  const checkout = () => {
    orderPlace().then((response) => {
      navigation.navigate('checkout',{paymentUrl:response.data.data.paymenturl})
    }).catch((error) => {
      console.log("orderPlace" + error);
    });
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
        <View
          style={{
            width,
            paddingVertical: width * 0.05,
            paddingHorizontal: width * 0.1,
          }}>
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              resizeMode="contain"
              source={{uri:cartPackage.image}}
              style={{
                width: 139,
                height: 86,
              }}
            />
            <View
              style={{
                alignSelf: 'center',
                right: 20,
              }}>
              <Text
                style={{
                  color: '#ECDBFA',
                }}>
                {cartPackage.name}
              </Text>
              <Text
                style={{
                  color: '#ECDBFA',
                  opacity: 0.5,
                }}>
                KD 4,500
              </Text>
            </View>
          </View>

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
                      }}>
                      {items.brand}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#D2D7F9',
                        opacity: 0.5,
                        alignSelf: 'center',
                      }}>
                      {items.sub_category_name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#D2D7F9',
                      opacity: 0.5,
                    }}>
                    {items.price}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          ))}

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
              <Text
                style={{
                  fontSize: 14,
                  color: '#D2D7F9',
                  opacity: 0.87,
                }}>
                1295 Mateo Summit{' '}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
              }}
              onPress={() => {}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#DF2EDC',
                }}>
                Change
              </Text>
            </TouchableOpacity>
          </ImageBackground>

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
                }}>
                Package Details (1 Item)
              </Text>
            </View>

            <View
              style={{
                padding: 20,
                borderBottomColor: 'rgba(255,255,255,0.3)',
                borderBottomWidth: 0.3,
              }}>
              {/* {[...Array(4).keys()].map((i, k) => ( */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}
                  // key={k}
                  >
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: 14,
                    }}>
                    {cartPackage.name}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                    }}>
                    {cartData.sub_total}
                  </Text>
                </View>
              {/* ))} */}
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
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 14,
                  }}>
                  {cartData.grand_total}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <TouchableOpacity onPress={() => checkout()}>
            <Btn  text={cartData.grand_total} pay="PAY                " />
          </TouchableOpacity>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',

              fontSize: 12,
              color: '#fff',
              opacity: 0.5,
            }}>
            Forgot to add something?
          </Text>

          <TouchableOpacity onPress={() => {}}>
            <Btn text="Continue Shopping" x="0"  />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Cart;
