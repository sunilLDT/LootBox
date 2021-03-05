import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../languages/index';
import { connect } from 'react-redux';
import { cartActions } from '../actions/user';
import { packageActions } from '../actions/package';
import { profileActions } from '../actions/profileAction';
import BuildingPc from '../components/BuildingPc';
import LootStoreBtn from '../components/lootStoreBtn';
const {height, width} = Dimensions.get('window');

const Home = (props) => {
  useEffect(() => {
    props.add()
    props.categories
    props.categoryList();
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height,
        width,
        backgroundColor: '#272732',
       
        
      }}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('buildYourPc');
        }}>
        <ImageBackground
          source={require('../assets/img_4.png')}
          style={{
            height,
            width: width * 0.496,
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            paddingLeft: width * 0.08,
            paddingVertical: height * 0.02,
          
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer();
            }}>
            <Image
              resizeMode="contain"
              source={require('../assets/menuWhiteTilt.png')}
              style={{width: 48}}
            />
          </TouchableOpacity>
          <View style={{marginBottom: height * 0.1,}}>
            {/* <Text
              style={{
                color: '#ECDBFA',
                lineHeight: 32,
                // width: '80%',
                fontSize: 28,
                textAlign: 'left',
                fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                borderWidth:2,
                      
                }}>
              {props.labels.buildYourPc}
            </Text> */}
            <BuildingPc />
            <Image
              resizeMode="contain"
              source={require('../assets/ic_arrow0.png')}
              style={{
                width: 20,
                alignSelf: 'flex-start',
                marginTop: 10,
              }}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('lootStore');
        }}>
        <ImageBackground
          source={require('../assets/img_5.png')}
          style={{
            height,
            width: width * 0.496,
            display: 'flex',
            flex: 1,
            // alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingRight: width * 0.08,
            paddingVertical: height * 0.02,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginTop: height * 0.038,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.push('notifications');
              }}>
              <Image
                resizeMode="contain"
                source={require('../assets/ic_noti.png')}
                style={{width: 40, position: 'relative', zIndex: 10}}
              />
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => props.navigation.navigate('cart')}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/ic_cart1.png')}
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
                  right: -2,
                  top: -7,
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
                  {props.itemCount == undefined ?"0":props.itemCount}
                </Text>
              </LinearGradient>
            </View>
          </View>
          <View style={{marginBottom: height * 0.1, }}>
            {/* <Text
              style={{
                color: '#ECDBFA',
                // width:'90%',
                fontSize: 28,
                textAlign: 'right',
                fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                       
                    }}>
             {props.labels.lootStore}
            </Text> */}
            <LootStoreBtn/>
            
            <Image
              resizeMode="contain"
              source={require('../assets/ic_arrow0.png')}
              style={{
                width: 30,
                marginTop: 10,
                alignSelf: 'flex-end',
              }}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  itemCount:state.cartReducer.totalItems,
  labels:state.languageReducer.labels,
  categories: state.packageReducer.categories,
})
const actionCreators = {
  add: cartActions.addCartAction,
  categoryList: packageActions.getAdvanceCatList,
  sendaction: profileActions.showProfile,
};

export default connect(mapStateToProps,actionCreators)(Home);
