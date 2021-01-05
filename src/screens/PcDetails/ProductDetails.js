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
import ExpandImage from '../../assets/ic_expand1.png';
import CloseImage from '../../assets/ic-3copy.png';
import { ScrollView } from 'react-native-gesture-handler';
import ItemCard from '../../assets/ic_card.png';
import { packageDetailsById, addToCart } from '../../api/buildYourPc';
import ListDetails from '../PcDetails/List';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';
import { packageActions } from '../../actions/package';
import strings from '../../languages/index';
const { width, height } = Dimensions.get('window');

const ProductDetails = (props) => {

  const { PackageId } = props.route.params;
  const [packageDetailsData, setPackageDetailsData] = useState({});
  const [packageDetails, setPackageDetails] = useState([]);
  const [packageDetailsTemp, setPackageDetailsTemp] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const [addItems, setAddItems] = useState();
  const [finalData, setFinalData] = useState([]);
  const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
  const [open, setOpen] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [upwardImage, setUpwardImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const maxlimit = 12;
  const kd = "KD ";
  var imgSource = upwardImage ? ExpandImage : CloseImage;

  useEffect(() => {
    props.getPackages(PackageId);
  }, [PackageId]);

  const addIntoCart = () => {
    setLoading(true);
    let result = props.packages.map(({ item_id, quantity }) => ({ item_id, quantity: 1 }));
    addToCart(PackageId, result, true).then((response) => {
      setLoading(false);
      props.navigation.navigate('cart');
    }).catch((error) => {
      console.log("addToCart" + error);
    });
  }

  const changeData = (item) => {
    //setFinalData([finalData,...item]);
    //setFinalData([...finalData, item]);
    //setTotalPrice(finalData.reduce( function(cnt,o){ return cnt + parseInt(o.price); }, 0))
  }

  const openClose = (item_id) => {
    setUpwardImage(!upwardImage)
    setOpen("");
    setOpen(item_id);
    setShowCpuProcesserList(!showCpuPerocessersList)
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
              style={styles.backImage}
            />
          </View>
        </TouchableOpacity>
        <ScrollView
          style={styles.scrollViewContainer}
          showsHorizontalScrollIndicator={false}>
            {props.loading?(
              <View style={{ marginTop: height * 0.4 }}>
                <ActivityIndicator color="#ECDBFA" size="large" />
              </View>
            ):(
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
              // console.log("Calling prop add")
              //props.add(i);
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
          )}
          {props.packages.length === 0 ? (
            <View style={{ marginTop: height * 0 }}>
              <ActivityIndicator color="#ECDBFA" size="large" />
            </View>) : (
              <View style={styles.bottom}>
                <TouchableOpacity
                  activeOpacity={0.1}
                  onPress={() => addIntoCart()}>
                  {!loading ? (
                    <Btn text={strings.BuildYourPc} pay="" />
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

                </TouchableOpacity>
              </View>
            )}

        </ScrollView>
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
  brandPrice:{
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
  loading:state.packageReducer.loading
})

const actionCreators = {
  add: cartActions.addCartAction,
  getPackages: packageActions.getPackages,
};

export default connect(mapStateToProps, actionCreators)(ProductDetails)
