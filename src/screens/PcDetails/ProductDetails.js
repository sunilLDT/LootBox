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
import { packageDetailsById,addToCart } from '../../api/buildYourPc';
import ListDetails from '../PcDetails/List';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';


const { width, height } = Dimensions.get('window');

const ProductDetails = (props) => {

  const { PackageId } = props.route.params;

  const [packageDetailsData, setPackageDetailsData] = useState({});

  const [packageDetails, setPackageDetails] = useState([]);

  const [coverImage,setCoverImage] = useState([]);

  const [addItems,setAddItems] = useState();

  const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false,);

  const [open, setOpen] = useState();

  const [upwardImage,setUpwardImage] = useState(true);

  const [loading, setLoading] = useState(true);

  var imgSource = upwardImage?ExpandImage:CloseImage;

  useEffect(() => {
    setLoading(true)
    packageDetailsById(PackageId).then((response) => {
      setPackageDetails(response.data.items);
      setPackageDetailsData(response.data);
      setCoverImage(response.data.cover_image);
    setLoading(false)
    }).catch((error) => {
      console.log("PackageDetails" + error);
      setLoading(false)
    });
  }, [PackageId]);

  
  const addIntoCart = () => {
    addToCart(PackageId,props.cart).then((response) => {
      setAddItems(response.data);
      props.navigation.navigate('cart');
    }).catch((error) => {
      console.log("addToCart" + error);
    });
  }

  const openClose = (item_id) => {
    setUpwardImage(!upwardImage)
    setOpen("");
    setOpen(item_id);
    setShowCpuProcesserList(!showCpuPerocessersList)
  }

  const TotalPrice = packageDetails.reduce((Price, packageDetails) => Price + parseInt(packageDetails.price), 0);

  return (
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
          <>
          {loading?(
          <View style={{marginTop: height * 0.4}}>
              <ActivityIndicator color="#ECDBFA" size="small" />
          </View>):(
            <View>
              <View >
                <Image
                  source={{ uri: packageDetailsData.image }}
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
                  <View style={{ alignSelf: 'center',paddingLeft:'2%' }}>
                    <Text style={styles.brandTitle}>{packageDetailsData.name}</Text>
                    <Text style={styles.price}>KD {TotalPrice.toFixed(3)}</Text>
                  </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {coverImage.map((cImages,index) => {
                      return(
                        <Image
                          key={index}
                          source={{uri:cImages.image_path}}
                          style={styles.coverImage}
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
              {packageDetails.map((item, index) => {
                return (
                <View key={index}>
                  <ImageBackground
                    source={ItemCard}
                    style={{
                      width: width * 0.9,
                      height: 51,
                      borderTopLeftRadius:20,
                      borderBottomLeftRadius:15,
                      marginBottom: 20,
                      alignContent: 'center',
                      padding: 15,
                      overflow: 'hidden'
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: '#D2D7F9',
                          fontSize: 14,
                          fontStyle: 'italic',
                          fontWeight:"bold",
                          // borderRightWidth:1,
                          // borderRightColor:'#D2D7F9',
                        }}>
                        {item.sub_category_name}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: '#D2D7F9',
                          fontSize: 14,
                          fontStyle: 'italic',
                          opacity: 0.5,
                          fontFamily:'Michroma-Regular',
                          // borderRightWidth:1,
                          // borderRightColor:'#D2D7F9',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: '#D2D7F9',
                          fontSize: 14,
                          fontStyle: 'italic',
                          opacity: 0.5,
                        }}>
                        KD {item.price}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => openClose(item.item_id)}>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                          bottom: -6,
                          right: -6,
                        }}>
                        <Image
                          source={imgSource}
                          width={100}
                          height={100}
                          style={{ width: 29, height: 11 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                    {showCpuPerocessersList && open == item.item_id ? (
                        <ListDetails
                          key={Math.floor((Math.random() * 100) + 1)}
                          data={item} 
                          navigation={props.navigation}
                        ></ListDetails>
                    ) : null}
                  
                </View>
                );
              })}
          <View style={styles.bottom}>
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() =>addIntoCart()}>
              <Btn  text="BUILD YOUR PC" pay=""/>
            </TouchableOpacity>
          </View>
          </View>
          )}
        </>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height,
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
    fontSize: 20,
    color: '#ECDBFA',
    textAlign: 'left',
    width: 139,
    fontFamily:'Michroma-Regular',
  },
  price: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 5,
    fontFamily:'Michroma-Regular',
  },
  scrollViewContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  coverImage:{
    width:80,
    height:100,
    margin:3,
    borderRadius:10,
    marginHorizontal:5
  },
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
  }
});
const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,

})

const actionCreators = {
  add: cartActions.addCartAction,

};

export default connect(mapStateToProps, actionCreators)(ProductDetails)
