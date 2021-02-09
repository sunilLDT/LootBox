import React, {useEffect, useContext, useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Btn from './btn';
import {Context as AuthContext} from '../api/contexts/authContext';
import {showCartData,addToCartForStore} from '../api/buildYourPc';
import ViewMoreText from 'react-native-view-more-text';
import { connect } from 'react-redux';
import { cartActions } from '../actions/user';

const {width, height} = Dimensions.get('window');

const performanceDetails = [
  {
    text: '# of Cores',
    desc: '8',
  },
  {
    text: '# of Threads',
    desc: '8',
  },
  {
    text: 'Processor Base Frequency',
    desc: '3.6 GHz',
  },
  {
    text: 'Max Turbo Frequency',
    desc: '4.9 GHz',
  },
  {
    text: 'Cache',
    desc: '12 MB Intel® Smart Cache',
  },
];

const processorDetails = [
  {
    text: 'Processor Graphics',
    desc: 'Intel® UHD Graphics 630',
  },
  {
    text: 'Graphics Base Frequency',
    desc: '350 MHz',
  },
  {
    text: 'Processor Base Frequency',
    desc: '3.6 GHz',
  },
  {
    text: 'Graphics Max Dynamic Frequency',
    desc: '64 GB',
  },
];

const data = [performanceDetails, processorDetails];


const ItemDesc = (props) => {
  const {fetchItemsInfo} = useContext(AuthContext);
  const [itemData, setData] = useState([]);
  const [qty, setQty] = useState(1);
  const [AddItems,setAddItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderViewMore = (onPress) => {
    return(
      <Text style={{color:'#fff',fontWeight:'bold',}} onPress={onPress}>more</Text>
    )
  };
const renderViewLess = (onPress) => {
    return(
      <Text style={{color:'#fff',fontWeight:'bold',}} onPress={onPress}>less</Text>
    )
  };

  const fetchData = async () => {
    setLoading(true)
    const data1 = await fetchItemsInfo(props.route.params.id);
    if (data1 && data1.length > 0) {
      setData(data1);
      setLoading(false)
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isUpdate = false;
  const item = [
          {
              "item_id":props.route.params.id,
              "quantity":qty,
          }, 
        ];   
  const proceedToCheckout = () => {
    addToCartForStore(isUpdate,item).then((response) => {
      setAddItems(response.data)
      props.navigation.navigate('cart');
      props.add();
    }).catch((error) => {
      console.log("addToCartForStore" + error);
    });
  }

  const addIntoCart = () => {
    addToCartForStore(isUpdate,item).then((response) => {
      console.log(response)
      console.log("@@@@@@@@")
      setAddItems(response.data)
      props.add();
      alert("Item added to the cart Sucessfully")
    }).catch((error) => {
      console.log("addToCartForStore" + error);
    });
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width,
        height,
        overflowX: 'hidden',
        backgroundColor: '#261D2A',
      }}>
      <ImageBackground
        source={require('../assets/plainBg.png')}
        style={{
          width,
          padding: width * 0.1,
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              resizeMode="contain"
              source={require('../assets/back.png')}
              style={{
                height: 48,
                width: 48,
              }}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('cart')}>
              <Image
                resizeMode="contain"
                source={require('../assets/ic_cart2.png')}
                style={{width: 40}}
              />
            </TouchableOpacity>

            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#C01C8A', '#865CF4']}
              style={{
                width: 16,
                height: 16,
                position: 'absolute',
                right: -4,
                top: -1,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: 12,
                }}>
                {props.itemCount == undefined?"0":props.itemCount}
              </Text>
            </LinearGradient>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: height * 0.05,
          }}>
          {props.route.params.image ? (
            <Image
              source={{
                uri: props.route.params.image,
              }}
              style={{
                height: 126,
                width: 126,
                marginRight: width * 0.05,
              }}
            />
          ) : (
            <Image
              // source={{
              //   uri:
              //     'https://cdn.pixabay.com/photo/2015/03/21/06/27/technology-683243_960_720.png',
              // }}
              source={
                props.route.params.image
                  ? props.route.params.image
                  : require('../assets/thumbnail1.png')
              }
              style={{
                height: 126,
                width: 126,
                marginRight: width * 0.05,
              }}
            />
          )}

          <View style={{marginRight:"36%"}}>
            <Text
              numberOfLines={3}
              style={{
                  color: '#ECDBFA',
                  fontSize: 18,
                  fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',        
                  }}
            >
              {props.route.params.name}
            </Text>
            <Text
              style={{
                color: '#ECDBFA',
                fontSize: 14,
                opacity: 0.5,
                fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',       
                     }}>
              {props.route.params.brand}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',   
                     color: '#ECDBFA',
              opacity: 0.5,
            }}>
            Price
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',           
                color: '#ECDBFA',
            }}>
            KD {props.route.params.price}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',     
                     color: '#ECDBFA',
              opacity: 0.5,
            }}>
            Qty
          </Text>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                qty > 1 && setQty(qty - 1);
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
              {qty}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setQty(qty + 1);
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
        </View>
        <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',    
                      color: '#ECDBFA',
              opacity: 0.5,
              marginTop: 20,
            }}>
            Description
          </Text>
        </View>
        <View style={{marginTop:10}}>
            <ViewMoreText
                numberOfLines={3}
                renderViewMore={renderViewMore}
                renderViewLess={renderViewLess}
                textStyle={{textAlign:'left',color:'rgba(255,255,255,0.3)'}}
            >
            <Text
             style={{
             fontSize: 12,
             color: 'rgba(236,219,250,0.5)',
            }}>
              {props.route.params.description}
            </Text>
          </ViewMoreText>
        </View>
        {data.map(
          (i, k) =>
            k === 0 && (
              <LinearGradient
                key={k}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
                style={[
                  {
                    borderRadius: 10,
                    marginTop: 27,
                    width: width * 0.8,
                  },
                ]}>
                <View
                  style={{
                    width: '100%',
                    height: height * 0.07,
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottomColor: 'rgba(151,151,151,0.12)',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                  }}>
                    <Text
                      style={{
                        marginLeft: '7%',
                      
                        color: '#ECDBFA',
                        fontSize: 14,
                      }}>
                      {k === 0 ? 'Performance' : 'Processor Graphics'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    padding: '7%',
                    width: '100%',
                    minHeight: height * 0.27,
                  }}>
                  {loading?(
                  <View style={{width: '100%', marginTop: height * 0.1}}>
                    <ActivityIndicator color="#ECDBFA" size="small" />
                  </View>):itemData.length === 0 ?(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{color:'#ECDBFA',fontSize:20}}>No Records</Text>
                    </View>
                  ):
                  itemData.map((a, b) => (
                    <View
                      key={b}
                      style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginVertical: 10,
                        display: 'flex',
                      }}>
                      <Text
                        style={{
                          width: '50%',
                          color: '#ECDBFA',
                          fontSize: 12,
                          opacity: 0.5,
                        }}>
                        {a.name}
                      </Text>
                      <Text
                        style={{
                          width: '50%',
                          color: '#ECDBFA',
                          fontSize: 12,
                          
                          opacity: 0.5,
                          textAlign: 'right',
                          paddingLeft: 20,
                        }}>
                        {a.value ? a.value : 0}
                      </Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            ),
        )}
        <TouchableOpacity onPress={() => addIntoCart()}>
          <Btn text="ADD TO CART" pay= ""/>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop:-28}} onPress={() => proceedToCheckout()}>
          <Btn text="PROCEED TO CHECKOUT" pay= "" x= "-15"/>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  itemCount:state.cartReducer.totalItems,
})
const actionCreators = {
  add: cartActions.addCartAction,
};

export default connect(mapStateToProps,actionCreators)(ItemDesc);
