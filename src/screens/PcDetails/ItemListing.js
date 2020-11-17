import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import IcCardImage from '../../assets/ic-3.png';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';
import selectedIcCardImage from '../../assets/Rectangle.png';
import searchIcon from '../../assets/ic_search.png';
import filterIcon from '../../assets/ic_filter.png';


const { width, height } = Dimensions.get('window');

const ItemListing = (props) => {
  const [selectedItems, setSelectedItems] = useState([0]);
  const { items } = props.route.params;
  const { sub_category_name } = props.route.params;

  const selectHandler = (id) => {
    let item = {
      "item_id": id,
      "quantity": 1
    };
    setSelectedItems([...selectedItems, id]);
    props.add(item);
  }

  const selectDisplay = (id) => {
    let a = [...selectedItems]
    if (!a.includes(id)) {
      return true;
    }
    if (a.includes(id)) {
      return false;
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/plainBg.png')}
      style={styles.container}>
        <View style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-around'
        }}>
          <View
              style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft:'-5%'
              }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
                <Image
                  source={require('../../assets/back.png')}
                  resizeMode="contain"
                  style={styles.backImage}
                />
            </TouchableOpacity>
            <Text style={styles.pageName}>
              {sub_category_name}
              </Text>
          </View>
          <View 
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent:'space-between'
            }}>
              <TouchableOpacity onPress={() => {

              }}>
                  <Image
                   style={styles.icons}  
                   source={searchIcon}
                   resizeMode="contain"
                   />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {

              }}>
                  <Image 
                  style={styles.icons}  
                  source={filterIcon}
                  resizeMode="contain"
                  />
              </TouchableOpacity>
            </View>
        </View>
      <FlatList
        keyExtractor={(item) => item.name}
        data={items || []}
        renderItem={({ item }, index) => {
          return (
          <TouchableOpacity
            key={index}
            onPress={() => { selectHandler(item.item_id) }}
          >
            <ImageBackground
            onPress={() => { selectHandler(item.item_id) }}
            source={!selectDisplay(item.item_id) ? selectedIcCardImage : IcCardImage}
              style={styles.cardConatiner}
              key={index}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 65, height: 45, marginBottom: 30, alignSelf: 'center',marginTop:'-10%' }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: 5,
                    alignSelf:'center',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: 10,
                    opacity: 0.5,
                    textAlign: 'center',
                    fontWeight:'300',
                  }}>
                  {item.brand}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#FFFFFF',
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                  KD {item.price}
                </Text>
              </View>
            </ImageBackground>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#2A2D39',
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.04,
  },
  backButtonContentConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  cardConatiner: {
    width: 140,
    height: 150,
     marginHorizontal:25,
     marginVertical:25,
  },
  pageName:{
    fontStyle: 'italic',
    fontSize: 12,
    color: '#ECDBFA',
    marginLeft:10,
    textTransform:'uppercase',
  },
  icons:{
    width:40,
    height:40,
    marginLeft:10
  },
});

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,

})

const actionCreators = {
  add: cartActions.addCartAction,

};

export default connect(mapStateToProps, actionCreators)(ItemListing);