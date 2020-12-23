import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import IcCardImage from '../../assets/ic3.png';
import selectedIcCardImage from '../../assets/Rectangle.png'
import backImage from '../../assets/back.png';
import searchImage from '../../assets/ic_search.png';
import filterImage from '../../assets/ic_filter.png';
import { pcPartSubcategoryApi, advancedBuilderItems } from '../../api/buildYourPc';
import LinearGradient from 'react-native-linear-gradient';
import cardImage from '../../assets/ic_card_a0.png';
import thumbnail from '../../assets/thumbnail.png';
import NextBtn from '../../components/NextBtn';
import SubCatBg from '../../assets/buildYourPc/Rectangle.png';
import SelectedImage from '../../assets/Rectangle.png';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { packageActions } from '../../actions/package';
import TickImage from '../../assets/tick.png';

const { width, height } = Dimensions.get('window');

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

const AdvanceBuilder = (props) => {
  const [loading, setLoading] = useState(true);
  const [subCategoryId, setSubCategoryid] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [itemList, setItemList] = useState([]);
  const forceUpdate = useForceUpdate();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [tick,setTick] = useState([]);

  const maxlimit = 20;
  useEffect(() => {
    setLoading(true);
    props.categories.map((subCat,i) =>{
      if(i == 0){
        setSubCategoryid(subCat.sub_category_id)
        advancedBuilderItems(subCat.sub_category_id).then((response) => {
          let d = {
            "name": response.data[0].name,
            "price": response.data[0].price,
            "sub_category_id": response.data[0].sub_category_id
          }
          setItems(response.data)
          setFilteredDataSource(response.data)
        })
      }
    });
    props.categoryList();
    setLoading(false)
  }, []);


  const subCategoryFun = (subCatId, index) => {
    setSubCategoryid(subCatId)
    advancedBuilderItems(subCatId).then((response) => {
      let d = {
        "name": response.data[0].name,
        "price": response.data[0].price,
        "sub_category_id": response.data[0].sub_category_id
      }
     // setSelectedItem(d);
     // setItemList([d]);
      setItems(response.data)
      setFilteredDataSource(response.data)
    })
  }

  const openClose = () => {
    setOpen(!open)
  }

  const submitNow = () => {
    if(Object.keys(selectedItem).length !== 0){
      props.navigation.navigate('addToCart', { data: itemList });
    }
  }


  const selectItem = (i) => {
    setTick([...tick,i.sub_category_id]);
    let d = {
      "name": i.name,
      "price": i.price,
      "sub_category_id": i.sub_category_id
    }
    setSelectedItem(d);
    let a = itemList;
    var data = [];

    if (a.length == 0) {
      a.push(i);
      setItemList([i])
     // setClickedIndex([i.sub_category_id])

    } else {
      for (j = 0; j < a.length; j++) {
        if (a[j].sub_category_id === i.sub_category_id) {
          a.splice(j);
        } else {
          data.push(a[j]);
        }

      }
      data.push(i);
      setItemList(data);
    }
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = items.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setItems(newData);
      setSearch(text);
    } else {
      setItems(items);
      setSearch(text);
    }
  };

  const handleLodeMore = () => {
    if (page !== lastPage) {
      setPage(page + 1);
      fetchData1();
    }
  };

  const getName = (id) => {
    let a = itemList;
    for (j = 0; j < a.length; j++) {  
      if (a[j].sub_category_id === id) {
        return a[j].name.lenght> maxlimit?(((a[j].name).substring(0,maxlimit-3)) + '...') :a[j].name;
        break;
      }
    }
    return ''
  };

  const getPrice = (id) => {
    let a = itemList;
    for (j = 0; j < a.length; j++) {  
      if (a[j].sub_category_id === id) {
        return 'KD ' +a[j].price;
        break;
      }
    }
    return ''
  };

  const idExists=(id)=> {
    return itemList.some(function(el) {
      return el.item_id === id;
    }); 
  }

  return (
    <View
    style={{
      backgroundColor: '#261D2A',
    }}>
    <ImageBackground
      source={require('../../assets/dottedBackground.png')}
      style={styles.background}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width, height, overflowX: 'hidden' }}
      >
        <View style={styles.topContainer}>
          <View>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
              <Image
                resizeMode="contain"
                source={backImage}
                style={{
                  width: 48,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchFilter}>
          <TouchableOpacity  onPress={() => openClose()}>
              <Image
                resizeMode="contain"
                source={searchImage}
                style={{
                  width: 48,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                source={filterImage}
                style={{
                  width: 48,
                }}
              />
            </TouchableOpacity>
          </View>

        </View>
        {open ? 
        <SearchBar
              placeholder="Type here..."
              lightTheme round editable={true}
              value={search}
              onChangeText={(text) => searchFilterFunction(text)}
              containerStyle={{ borderRadius: 22, height: 50, marginBottom: 20, marginHorizontal: width * 0.1 }}
              inputContainerStyle={{ height: 30, }}
            />:null}
        {loading ? (
          <View style={{ marginTop: height * 0.37 }}>
            <ActivityIndicator color="#ECDBFA" size="small" />
          </View>
        ) : (
            <>
              <View>
                <Text style={styles.advanceBuilderText}>Advance Builder</Text>
                <Text style={styles.lineText}>Select the configuration you like the most.</Text>
              </View>

              <View style={styles.mainContainer}>
                <View style={styles.subCategoriesView}>
                  <ImageBackground source={SubCatBg} style={{}}>
                    {!props.loadingCat ? props.categories.map((part, index) => {
                      return (
                        <TouchableOpacity key={index} onPress={() => subCategoryFun(part.sub_category_id, index)}>
                          <View style={styles.box}>
                            {subCategoryId === part.sub_category_id ? (
                              <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#C01C8A', '#865CF4']}
                                style={{
                                  width: 8,
                                  height: 8,
                                  position: 'absolute',
                                  right: 22,
                                  top: 22,
                                  zIndex: 100,
                                  borderRadius: 50,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                              </LinearGradient>
                             ) : tick === part.sub_category_id?(
                               <Image 
                                source={TickImage}
                                style={styles.tick}
                               />
                             ):null}
                            <Image style={styles.subImage}
                              resizeMode="contain"
                              source={filterImage}
                            />
                            <Text
                              style={styles.subName}
                              numberOfLines={2}
                            >
                              {part.name}
                            </Text>
                            <View style={styles.selectedDetails}>
                              <View style={styles.sideBrand}>
                                <Text style={styles.sideDetails}>
                                  {part.subName}
                                </Text>
                                <Text style={styles.sideDetails}>
                                  { getName(part.sub_category_id) }
                                </Text>
                              </View>
                              <Text>
                                  <Text style={styles.price}>{ getPrice(part.sub_category_id) }</Text>
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }) : null}
                  </ImageBackground>
                </View>
                {items ?
                  <View style={styles.flatlistContainer}>
                    <FlatList
                      keyExtractor={(item) => item.item_id}
                      data={items}
                      renderItem={({ item }, index) => {
                        const maxlimit = 22;
                        return (
                          <TouchableOpacity onPress={() => selectItem(item)}>
                            <ImageBackground
                              onPress={() => {}}
                              source={idExists(item.item_id) ? selectedIcCardImage : IcCardImage}
                              style={styles.cardConatiner}
                              key={index}
                            >
                              <View
                                style={{
                                  justifyContent: 'flex-start',
                                  alignContent: 'flex-start',
                                  paddingHorizontal: 10,
                                }}>
                                {item.image && item.image !== "" ? (
                                  <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                  />
                                ) : (
                                    <Image
                                      source={thumbnail}
                                      style={styles.itemImage}
                                    />
                                  )}
                                <Text
                                  style={styles.brand}>
                                  {item.brand}
                                </Text>
                                <Text
                                  style={styles.name}>
                                  {((item.name).length > maxlimit) ? (((item.name).substring(0, maxlimit - 3)) + '...') : item.name}
                                </Text>
                                <Text
                                  style={styles.price}>
                                  KD {item.price}
                                </Text>
                              </View>
                            </ImageBackground>
                          </TouchableOpacity>
                        );
                      }}
                      numColumns={2}
                    />
                    <TouchableOpacity onPress={() => { submitNow()}}>
                      <View style={styles.nextBtn}>
                        <NextBtn />
                      </View>
                    </TouchableOpacity>
                  </View> :<ActivityIndicator color="#ECDBFA" size="large" />}
              </View>
            </>
          )}
      </ScrollView>
    </ImageBackground>
    </View>
  );

};

const styles = StyleSheet.create({
  background: {
    height: height,
    width: width,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.1,
  },
  searchFilter: {
    display: 'flex',
    flexDirection: 'row',
  },
  advanceBuilderText: {
    fontSize: 20,
    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
    color: '#fff',
    paddingHorizontal: width * 0.1,
  },
  lineText: {
    fontSize: 12,
    color: '#D2D7F9',
    marginVertical: 10,
    fontFamily: 'Montserrat-LightItalic',
    paddingHorizontal: width * 0.1,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: "5%",
    width: "100%",
  },
  subCategoriesView: {
    width: width * 0.29,
  },
  flatlistContainer: {
    width: width * 0.71,
  },
  box: {
    width: width * 0.26,
    height: height * 0.12,
    // borderBottomWidth: 0.3,
    // borderBottomColor: "#3D3E48",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:40,
  },
  subImage: {
    width: 35,
    height: 35,
  },
  subName: {
    color: '#fff',
    fontSize: 11,
    paddingHorizontal: 12
  },
  cardConatiner: {
    width: width * 0.32,
    height: height * 0.17,
    marginTop: 40,
    marginLeft: 10
  },
  itemImage: {
    width: 65,
    height: 45,
    alignSelf: 'center',
    position: 'relative',
    bottom: 20

  },
  brand: {
    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
    color: '#D2D7F9',
    opacity: 0.5,
    fontSize: 12,
  },
  name: {
    fontSize: 14,
    color: '#ECDBFA',
    fontFamily: Platform.OS == 'android' ? 'Montserrat-Bold' : 'Montserrat',
    marginTop: 2,
    marginRight: "2%"
  },
  price: {
    color: '#DF2EDC',
    fontSize: 9,
    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
    paddingVertical: 10,
  },
  selectedDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sideBrand: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideDetails: {
    color: '#fff',
    paddingLeft: 2.5,
  },
  tick:{
    position: 'absolute',
    right: 10,
    top: 12,
    zIndex: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }

});
const mapStateToProps = (state) => ({
  categories: state.packageReducer.categories,
  subCategories: state.packageReducer.subCategories,
  loadingCat: state.packageReducer.loadingCat
})

const actionCreators = {
  categoryList: packageActions.getAdvanceCatList,
  categorySubCatgoryList: packageActions.getAdvanceSubCatList,
  updateCat: packageActions.updateCat,

};

export default connect(mapStateToProps, actionCreators)(AdvanceBuilder);
