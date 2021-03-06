import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import Circle from '../components/gradientCircle';
import { getOrderList } from '../api/buildYourPc';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import orderImage from '../assets/orderback.png';

const Orders = ({ navigation, labels }) => {
  const [selected, setSelected] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const kd = labels.kD;

  useEffect(() => {
    setLoading(true);
    getOrderList(1).then((response) => {
      setOrderList(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log("Order List" + error);
      setLoading(false)
    });
  }, []);


  const getOrderListApi = (type) => {
    setLoading(true)
    getOrderList(type).then((response) => {
      setOrderList(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log("Order List" + error);
      setLoading(false)
    });

  }
  const pastfun = () => {
    getOrderListApi(2);
    setSelected(1)
  }

  const activefun = () => {
    getOrderListApi(1);
    setSelected(0)
  }

  return (
    <View style={{ backgroundColor: '#292633', width: '100%', height: '100%' }}>
      <ImageBackground
        source={require('../assets/dottedBackground.png')}
        style={{
          width,
          height,
          overflowX: 'hidden',
        }}>
        <ScrollView
          style={{
            width,
            minHeight: height,
            paddingLeft: width * 0.1,
            //   paddingVertical: height * 0.1,
          }}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => { navigation.navigate('home') }}>
            <Image
              resizeMode="contain"
              style={{
                width: 48,
              }}
              source={require('../assets/back.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
              fontSize: 20,
              lineHeight: 28,
              color: '#ECDBFA',
            }}>
            {labels.myOrders}
        </Text>

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 20,
            }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => activefun()}>
              {selected === 0 && (
                <View style={{ position: 'absolute', top: 0 }}>
                  <Circle />
                </View>
              )}

              <Text
                style={{
                  fontSize: 14,
                  color: '#ECDBFA',
                  opacity: selected === 0 ? 1 : 0.4,
                  marginLeft: 10,
                }}>
                {labels.active}
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pastfun()}>
              {selected === 1 && (
                <View style={{ position: 'absolute', top: 0 }}>
                  <Circle />
                </View>
              )}
              <Text
                style={{
                  fontSize: 14,
                  color: '#ECDBFA',
                  opacity: selected === 1 ? 1 : 0.4,
                  marginLeft: 10,
                }}>
                {labels.past}
            </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={{ margin: height * 0.24, alignSelf: 'center' }}>
              <ActivityIndicator color="#ECDBFA" size="small" />
            </View>) : orderList.length === 0 ? (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
                <Text style={{
                  fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                  fontSize: 20,
                  lineHeight: 28,
                  color: '#ECDBFA',
                  marginTop: "50%",
                  marginRight:"10%"
                }}>
                  {labels.noOrder}
              </Text>
              </View>
            ) : (
                <View>
                  {orderList.map((i, k) => (
                    <TouchableOpacity
                      key={k}
                      onPress={() => navigation.navigate('OrderDetails', { orderId: i.order_id })}
                    > 
                        <ImageBackground 
                         source={orderImage}
                        style={{
                          width: 341,
                          height: 131,
                          marginVertical: 10,
                          padding: 20,
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#ECDBFA',
                                fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                                fontSize: 16,
                                lineHeight: 20,
                              }}>
                              {i.order_number}
                            </Text>
                            <Text
                              style={{
                                color: '#ECDBFA',
                                fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                                fontSize: 16,
                                lineHeight: 20,
                              }}>
                              {kd} {parseFloat(i.grand_total).toFixed(2)}
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#ECDBFA',

                                fontSize: 12,
                                opacity: 0.5,
                                lineHeight: 20,
                              }}>
                             {labels.orderId}
                    </Text>
                            <Text
                              style={{
                                color: '#ECDBFA',

                                fontSize: 12,
                                opacity: 0.5,
                                lineHeight: 20,
                              }}>
                              {i.items_count} {i.items_count < 2 ?labels.item:labels.items}
                    </Text>
                          </View>
                        </View>
                        {/* <Text
                          style={{
                            color: '#ECDBFA',

                            fontSize: 12,
                            opacity: 0.5,
                            lineHeight: 20,
                          }}>
                          Will be delivered in 3-4 days
                </Text> */}
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state) => ({
  labels: state.languageReducer.labels,
})
export default connect(mapStateToProps)(Orders);

