import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BackgroundImage from '../../assets/buildYourPc/triangleBg.png';
import Btn from '../btn';
import { ScrollView } from 'react-native-gesture-handler';
import ItemCard from '../../assets/ic_card.png';
import { addToCart, removePackageApi } from '../../api/buildYourPc';
import ListDetails from '../PcDetails/List';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';
import { packageActions } from '../../actions/package';
import { languagename } from '../../components/LanguageName';
import BuildYourPcImg from '../../assets/lootbuttons/iOS/maincta.png';
import PrimaryBtn from '../../components/PrimaryBtn';
const { width, height } = Dimensions.get('window');

const ProductDetails = (props) => {
  const { PackageId } = props.route.params;
  const { cart_package_id } = props.route.params;
  const [packageDetailsData, setPackageDetailsData] = useState({});
  const [coverImage, setCoverImage] = useState([]);
  const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
  const [open, setOpen] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [upwardImage, setUpwardImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const maxlimit = 12;
  const kd = props.labels.kD;
  const [arOren, setarOren] = useState('en');
  languagename().then(res => setarOren(res))

  useEffect(() => {
    props.getPackages(PackageId);
  }, [PackageId]);

  const addIntoCart = async () => {
    setLoading(true);
    try {
      if (cart_package_id) {
        const response = await removePackageApi(cart_package_id);
        console.log(response);
      }
      let result = props.packages.map(({ item_id }) => ({ item_id, quantity: 1 }));
        const deleteResponse = await addToCart(PackageId, result, true)
        props.add()
        console.log(deleteResponse)
        setLoading(false);
        props.navigation.navigate('cart');
    } catch (e) {
      console.log(e)
    }
  }

  const changeData = (item) => {
  }
  return (
    <View style={{ backgroundColor: '#292633', width: '100%', height: '100%' }}>
      <ImageBackground source={BackgroundImage} style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <View style={styles.backButtonContentConatiner}>
            <Image
              source={require('../../assets/back.png')}
              resizeMode="contain"
              style={{width: 48,
              }}
            />
          </View>
        </TouchableOpacity>
        {props.loading ? (
          <View style={{ marginTop: height * 0.4 }}>
            <ActivityIndicator color="#ECDBFA" size="small" />
          </View>
        ) : (
            <ScrollView
              style={styles.scrollViewContainer}
              showsHorizontalScrollIndicator={false}>
              <View>
                <View >
                  <Image
                    source={{ uri: props.packageData.image }}
                    width={100}
                    height={100}
                    style={{
                      width: 312,
                      height: 200,
                      alignSelf: 'center',
                      borderRadius: 12
                    }}
                  />
                  <View
                    style={{
                      marginVertical: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View style={{ alignSelf: 'center', paddingLeft: '2%' }}>
                      <Text style={styles.brandTitle}>{props.packageData.name}</Text>
                      <Text style={styles.brandPrice}>{kd}{props.totalPrice}</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                      {props.coverImage ? props.coverImage.map((cImages, index) => {
                        return (
                          <Image
                            key={index}
                            source={{ uri: cImages.image_path }}
                            style={styles.coverImage}
                          />
                        );
                      }) : null}
                    </ScrollView>
                  </View>
                </View>
                {props.packages.map((item, index) => {
                 
                  let i = {
                    "item_id": item.item_id,
                    "quantity": 1,
                    "price": item.price
                  };
                  return (
                    <View key={index}>
                      <ListDetails
                        key={Math.floor((Math.random() * 100) + 1)}
                        data={item}
                        navigation={props.navigation}
                        parentIndex={index}
                        parentMethod={changeData}
                        imData={packageDetailsData.image}
                        packName={packageDetailsData.name}
                        coverImage={coverImage}
                        price={totalPrice}
                      ></ListDetails>
                    </View>
                  );
                })}
              </View>
              {props.packages.length === 0 ? (
                <View style={{ marginTop: height * 0 }}>
                  <ActivityIndicator color="#ECDBFA" size="large" />
                </View>) : (
                  <View style={styles.bottom}>
                    <TouchableOpacity
                      activeOpacity={0.1}
                      onPress={() => addIntoCart()}>
                      {!loading ? (
                        <ImageBackground
                          source={BuildYourPcImg}
                          style={{
                            width:315,
                            height:48,
                            justifyContent:'center',
                            alignItems:'center',
                            marginBottom:height * 0.05,
                          }} 
                        >
                          <Text
                            style={{
                              color:'#fff',
                              fontSize:14,
                              fontFamily:Platform.OS == 'android'? 'Montserrat-Bold':'Montserrat',
                            }}
                          >
                            {props.labels.BuildYourPc}
                          </Text>
                        </ImageBackground>
                      ) : (
                          <>
                            <ImageBackground
                              source={BuildYourPcImg}
                              style={{
                                width:315,
                                height:48,
                                justifyContent:'center',
                                alignItems:'center',
                                marginBottom:height * 0.05,
                              }} 
                            >
                              <Text
                                style={{
                                  color:'#fff',
                                  fontSize:14,
                                  fontFamily:Platform.OS == 'android'? 'Montserrat-Bold':'Montserrat',
                                }}
                              >
                                {}
                              </Text>
                            </ImageBackground>
                            <ActivityIndicator
                              color="#ECDBFA"
                              size="small"
                              style={{ bottom: 75,right:30 }}
                            />
                          </>
                        )}

                    </TouchableOpacity>
                  </View>
                )}

            </ScrollView>
          )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    minHeight: height,
    overflow: 'hidden',
    backgroundColor: '#2A2D39',
  },
  backButtonContentConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: width * 0.09,
  },
  backImage: {
    width: 48,
  },
  backTitle: {
    paddingHorizontal: 20,
    fontSize: 12,
    opacity: 0.5,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  brandTitle: {
    fontSize: 18,
    color: '#ECDBFA',
    textAlign: 'left',
    width: 139,
    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
  },
  brandPrice: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 5,
    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
  },
  price: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 5,
    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
  },
  scrollViewContainer: {
    width: '100%',
    marginBottom: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  coverImage: {
    width: 80,
    height: 100,
    margin: 3,
    borderRadius: 10,
    marginHorizontal: 5
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});
const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  packages: state.packageReducer.packages,
  packageData: state.packageReducer.packageData,
  coverImage: state.packageReducer.coverImage,
  totalPrice: state.packageReducer.totalPrice,
  loading: state.packageReducer.loading,
  labels: state.languageReducer.labels,
})

const actionCreators = {
  add: cartActions.addCartAction,
  getPackages: packageActions.getPackages,
};

export default connect(mapStateToProps, actionCreators)(ProductDetails)