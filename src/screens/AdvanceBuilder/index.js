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
import { packageActions } from '../../actions/package';
const { width, height } = Dimensions.get('window');

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

const AdvanceBuilder = (props) => {
  const [loading, setLoading] = useState(true);
  const [subCategoryId, setSubCategoryid] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [allSubCategoriesId, SetAllSubCategoriesId] = useState([]);
  const [itemList, setItemList] = useState([])
  const [clickedIndex, setClickedIndex] = useState(0)
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    setLoading(true);
    props.categoryList();
    setLoading(false)

  }, []);


  const subCategoryFun = (subCatId, index) => {
    
    advancedBuilderItems(subCatId).then((response) => {
      let d = {
        "name": response.data[0].name,
        "price": response.data[0].price,
        "sub_category_id":response.data[0].sub_category_id
      }
      setSelectedItem(d)
      
      setItems(response.data)
  })
}

  const selectItem = (name, price, sub_category_id) => {
    let d = {
      "name": name,
      "price": price,
      "sub_category_id":sub_category_id
    }
    setSelectedItem(d);
    setItemList()
  
  }

  return (
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
            <TouchableOpacity>
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
                          <View style={styles.box} >
                            {subCategoryId === part.sub_category_id ? (
                              <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#C01C8A', '#865CF4']}
                                style={{
                                  width: 8,
                                  height: 8,
                                  position: 'absolute',
                                  right: 24,
                                  top: 31,
                                  zIndex: 100,
                                  borderRadius: 50,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                              </LinearGradient>
                            ) : null}
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
                                {part.sub_category_id == selectedItem.sub_category_id?selectedItem.name:null}

                                </Text>
                              </View>
                              <Text>
                            {part.sub_category_id == selectedItem.sub_category_id?
                              <Text> KD {selectedItem.price}</Text>
                            
                            
                            :null}

                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                      // }
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
                          <TouchableOpacity onPress={() => selectItem(item.name, item.price, item.sub_category_id)}>
                            <ImageBackground
                              onPress={() => { }}
                              source={cardImage}
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
                    <TouchableOpacity onPress={() => { }}>
                      <View style={styles.nextBtn}>
                        <NextBtn />
                      </View>
                    </TouchableOpacity>
                  </View> : null}
              </View>
            </>
          )}
      </ScrollView>
    </ImageBackground>
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
    height: height * 0.15,
    borderBottomWidth: 0.3,
    borderBottomColor: "#3D3E48",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: width * 0.30,
    height: height * 0.18,
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
