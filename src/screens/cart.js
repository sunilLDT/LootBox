import React from 'react';
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
import Machine from '../assets/machine.png';
import GPUImage from '../assets/buildYourPc/gpu.png';
import IcDetailCard from '../assets/ic_details_card.png';

const {width, height} = Dimensions.get('window');

const Cart = ({navigation,route}) => {
  const { packageId } = route.params;
  const { itemsIds } = route.params;
  
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
              // backgroundColor: '#000',
              // width: '100%',
              // height: height * 0.15,
              // borderRadius: 20,
              // marginBottom: 15,
              // display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              resizeMode="contain"
              source={Machine}
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
                Alpha Fury
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

          {[...Array(3).keys()].map((i, k) => (
            <View
              key={k}
              style={
                {
                  // backgroundColor: '#000',
                  // width: '100%',
                  // height: height * 0.12,
                  // borderRadius: 20,
                  // marginVertical: 10,
                  // display: 'flex',
                  // flexDirection: 'row',
                }
              }>
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
                  source={GPUImage}
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
                      Alpha Fury
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#D2D7F9',
                        opacity: 0.5,
                        alignSelf: 'center',
                      }}>
                      KD 4,500
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#D2D7F9',
                      opacity: 0.5,
                    }}>
                    KD 2,520
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
              // backgroundColor: '#000',
              width: 345,
              // height: 225,
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
                Package Details (4 Items)
              </Text>
            </View>

            <View
              style={{
                padding: 20,
                borderBottomColor: 'rgba(255,255,255,0.3)',
                borderBottomWidth: 0.3,
              }}>
              {[...Array(4).keys()].map((i, k) => (
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
                    }}>
                    Alpha Fury
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                    }}>
                    KD 2,500
                  </Text>
                </View>
              ))}
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
                  KD 10,000
                </Text>
              </View>
            </View>
          </ImageBackground>

          <TouchableOpacity onPress={() => {}}>
            <Btn text="PAY     KD 10,000" />
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
            <Btn text="Continue Shopping" x="0" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Cart;
