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
import IcCardImage from '../../assets/ic3.png';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';
import selectedIcCardImage from '../../assets/Rectangle.png';
import searchIcon from '../../assets/ic_search.png';
import filterIcon from '../../assets/ic_filter.png';
import filter from 'lodash.filter';
import { SearchBar } from 'react-native-elements';
import { packageActions } from '../../actions/package';
import thumbnail from '../../assets/thumbnail.png';
import ItemDetails from './ItemDetails';

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}
const { width, height } = Dimensions.get('window');

const ItemListing = (props) => {
  // const [selectedItems, setSelectedItems] = useState({
  //   "item_id": 1,
  //   "quantity": 1
  // });
  const { items } = props.route.params;
  const { pIndex } = props.route.params;
  // console.log(pIndex);

  const { sub_category_name } = props.route.params;
  const [data, setData] = useState(items);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const forceUpdate = useForceUpdate();
  const selectHandler = (id, name, price) => {
    
    let ar = [];
    ar = props.packages;
    ar[pIndex].item_id = id;
    ar[pIndex].name = name;
    ar[pIndex].price = price;
    ar[pIndex].quantity = 1;
    //setSelectedItems(item);
    //setName(name);
    //setPrice(price);

    props.updatePackages(ar);
    //props.navigation.goBack();
    forceUpdate();

  }

  const idExists = (id) => {
    return props.packages.some(function (el) {
      return el.item_id === id;
    });
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
  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(items, item => {
      return contains(item, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };
  const contains = ({ name }, query) => {
    if (name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };
  const renderHeader = () => {
    return (
      <>
        {open ? (
          <SearchBar
            placeholder="Type here..."
            lightTheme round editable={true}
            value={query}
            onChangeText={queryText => handleSearch(queryText)}
            containerStyle={{ borderRadius: 22, height: 50, marginBottom: 20, marginHorizontal: 20 }}
            inputContainerStyle={{ height: 30 }}
          />
        ) : null}
      </>
    );
  };
  const openClose = () => {
    setOpen(!open)
  }
  return (
    <ImageBackground
      source={require('../../assets/plainBg.png')}
      style={styles.container}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: "-5%"
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
            justifyContent: 'space-between',
            marginLeft: "13%"
          }}>
          <TouchableOpacity onPress={() => openClose()}>
            <Image
              style={styles.icons}
              source={searchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
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
        ListHeaderComponent={renderHeader()}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }, index) => {
          
          const maxlimit = 18;
          return (
            <TouchableOpacity
              key={index}
              style={styles.cardConatiner}
              onPress={() => { selectHandler(item.item_id, item.name, item.price) }}
            >
              <ImageBackground
                source={idExists(item.item_id) ? selectedIcCardImage : IcCardImage}
                // style={styles.cardConatiner}
                style={{ width: 139, height: 151 }}
                key={index}>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  {item.image !== "" && item.image?(
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 65, height: 45, marginBottom: 30, alignSelf: 'center', marginTop: '-10%' }}
                  />
                  ):(
                    <Image
                    source={thumbnail}
                    style={{ width: 65, height: 45, marginBottom: 30, alignSelf: 'center', marginTop: '-15%' }}
                  />
                  )}
                  <Text
                  numberOfLines={5}
                  adjustsFontSizeToFit={true}
                    style={{
                      fontSize: 14,
                      color: '#D2D7F9',
                      marginBottom: 5,
                      alignSelf: 'center',
                      fontFamily:Platform.OS=='android'?'Montserrat Bold':'Montserrat',
                    }}>
                    {item.name ? (((item.name).substring(0, maxlimit - 3)) + '...') : (((item.name).substring(0, maxlimit - 3)) + '...')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      marginBottom: 10,
                      opacity: 0.5,
                      textAlign: 'center',
                      fontWeight: '300',
                      fontFamily:Platform.OS=='android'?'Montserrat Regular':'Montserrat',
                    }}>
                    {item.brand}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: '#D2D7F9',
                      marginBottom: 20,
                      textAlign: 'center',
                      fontFamily:Platform.OS=='android'?'Montserrat Regular':'Montserrat',
                    }}>
                    KD {item.price}
                  </Text>
                </View>
              </ImageBackground>
              <ItemDetails
                  itemid={item.item_id}
                  sub_category_name={sub_category_name}
              />
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
    width: 139, //width*0.38,
    height: 151, //height*0.20,
    marginHorizontal:"8%",
    marginVertical:"10%",
    borderRadius: 20,
  },
  pageName: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#ECDBFA',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  icons: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
});

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  packages: state.packageReducer.packages,

})

const actionCreators = {
  add: cartActions.addCartAction,
  updatePackages: packageActions.updatePackages,

};

export default connect(mapStateToProps, actionCreators)(React.memo(ItemListing))

