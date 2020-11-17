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

  useEffect(() => {
    packageDetailsById(PackageId).then((response) => {
      setPackageDetails(response.data.items);
      setPackageDetailsData(response.data);
      setCoverImage(response.data.cover_image);
      
    }).catch((error) => {
      console.log("PackageDetails" + error);
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
                      width: 357,
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
                        {item.price}
                        
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => openClose(item.item_id)}>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                          bottom: -6,
                          right: -8,
                        }}>
                        <Image
                          source={ExpandImage}
                          width={100}
                          height={100}
                          style={{ width: 29, height: 11 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                    {showCpuPerocessersList && open == item.item_id ? (
                        <ListDetails
                          data={item} 
                          navigation={props.navigation}
                        ></ListDetails>
                    ) : null}
                  
                </View>
                );
              })}
            </View>
        {packageDetails.length === 0?(
        <View style={{marginTop: height * 0}}>
            <ActivityIndicator color="#ECDBFA" size="large" />
        </View>):(
          <View style={styles.bottom}>
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() =>addIntoCart()}>
              <Btn  text="BUILD YOUR PC" pay=""/>
            </TouchableOpacity>
          </View>
        )}
        
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
    width:100,
    height:100,
    margin:3
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
