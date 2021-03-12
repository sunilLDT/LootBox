import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { cartActions } from '../actions/user';
import { packageActions } from '../actions/package';
import { profileActions } from '../actions/profileAction';
import BuildingPc from '../components/BuildingPc';
import { languagename } from '../components/LanguageName';

const {height, width} = Dimensions.get('window');

const Home = (props) => {
  const [arOren, setarOren] = useState('en');
  const [loading,setloading] = useState(false);
  languagename().then(res => setarOren(res))
  useEffect(() => {
    setloading(true)
    props.add()
    props.categories
    props.categoryList();
    setloading(false)
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
        {props.loading?(
            <View style={{ justifyContent:'center',marginHorizontal:"50%" }}>
              <ActivityIndicator color="#ECDBFA" size="small" />
            </View>
          ):(
            <>
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
                  // paddingLeft: width * 0.08,
                  paddingVertical: height * 0.02,
                
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../assets/menuWhiteTilt.png')}
                    style={{width: 48,marginLeft: width * 0.08,}}
                  />
                </TouchableOpacity>
                <View style={{marginBottom: height * 0.1,}}>
                  <ImageBackground
                    source={require('../assets/btn.png')}
                    style={{
                      width:170,
                      height:48,
                      justifyContent:'center',
                      alignItems:'center',
                      marginLeft:10
                    }}
                  >
                    <Text style={{
                      color:"#fff",
                      fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                      fontSize: 15,
                    }}>
                      {props.labels.buildYourPc}
                    </Text>
                  </ImageBackground>
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
                  // paddingRight: width * 0.08,
                  paddingVertical: height * 0.02,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    marginTop: height * 0.038,
                    marginRight:width * 0.08,
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
                  <ImageBackground
                    source={require('../assets/btn.png')}
                    style={{
                      width:170,
                      height:48,
                      justifyContent:'center',
                      alignItems:'center',
                      marginLeft:10
                    }}
                  >
                    <Text style={{
                      color:"#fff",
                      fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                      fontSize: 15,
                    }}>
                      {props.labels.lootStore}
                    </Text>
                  </ImageBackground>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </>
          )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  itemCount:state.cartReducer.totalItems,
  labels:state.languageReducer.labels,
  categories: state.packageReducer.categories,
  loading: state.profileReducer.loading,
})
const actionCreators = {
  add: cartActions.addCartAction,
  categoryList: packageActions.getAdvanceCatList,
  sendaction: profileActions.showProfile,
  
};

export default connect(mapStateToProps,actionCreators)(Home);
