import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet
} from 'react-native';
import GradientCircle from '../components/gradientCircle';
import LinearGradient from 'react-native-linear-gradient';
import { Context as AuthContext } from '../api/contexts/authContext';
import SmallLGBtn from './smallLGBtn';
import { SearchBar } from 'react-native-elements';
import strings from '../languages/index';
import { connect } from 'react-redux';
import { cartActions } from '../actions/user';
import Filter from './filter';
import Dialog, {
  DialogContent,
  SlideAnimation,
} from 'react-native-popup-dialog';
import { flattenDeep,values,keys, map } from 'lodash';
import { languagename } from '../components/LanguageName';
const { width, height } = Dimensions.get('window');

const options = [
  require('../assets/back.png'),
  require('../assets/ic_cart2.png'),
  require('../assets/ic_search.png'),
  require('../assets/ic_filter.png'),
];
const THUMB_RADIUS = 12;
const LootStore = (props) => {
 
  const scrollRef = useRef();

  const { fetchCategories, fetchItems } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const maxlimit = 15;
  const subCategoryId = "";
  const [lastPage, setlastPage] = useState(0);
  const [totalPage, setToalPage] = useState(0);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);
  const [allfilter, setAllfilter] = useState(false);
  const [allfilterId, setAllfilterId] = useState({});
  const [all1,setAll1] = useState();


  const [arOren, setarOren] = useState('en');
  languagename().then(res => setarOren(res));
  const [filterValues, setFilterApplied] = useState({});
  

  // console.log("selected Sub category " )
  // console.log(selectedSubCategory)
  // console.log("*** sub cat id");
  // console.log(selectedSubCategory)

  const fetchData = useCallback(async () => {
    try{
    if (selectedSubCategory === 0) {
      await fetchData1();
    } else {
      if (selectedSubCategory !== 0) {
        await fetchData1(subCategories[current][selectedSubCategory - 1].id);
      }
    }
  }catch(errr ){
    console.log(errr)
  }
  }, [selectedSubCategory, current, filterValues]);

  const changeCategory = (id) => {
    setSelectedSubCategory(id);
    setPage(1);
    setlastPage(0)
    setFilterApplied({})

  }

  const changeSubCategory = (id) => {
    setPage(1)
    setlastPage(0)
    setFilterApplied({})
  }

  const allFilterFunction = async(r) => {
    setAll1(r.all)
    const cat =  categories.map((i,k) => {
      return i.id;
    });

    const itemData = await fetchItems(cat[current], keys(selectedSubCategory)[0], page, r.filter_custome_field_id, r.filter_custome_values, r.minPrice, r.maxPrice,r.all);
    setItems(itemData.data);
    setFilteredDataSource(itemData.data);``
  }

  const fetchData1 = async (b) => {
    setLoading(true);
    const categories = await fetchCategories();
    if (categories) {
      setData(categories);
      var x = categories.map((i, k) => {
        return { id: i.category_id, name: i.name_en, index: k };
      });
      setCategories(x);
      var itemData = null;
      
      if (b) {
        itemData = await fetchItems(x[current].id, b, undefined, filterValues.filter_custome_field_id, filterValues.filter_custome_values, filterValues.minPrice, filterValues.maxPrice);
      } else {
        itemData = await fetchItems(x[current].id, subCategoryId, page, filterValues.filter_custome_field_id, filterValues.filter_custome_values, filterValues.minPrice, filterValues.maxPrice);
        setlastPage(itemData.parameter.last_page);

      }

      if (itemData) {
        setItems(itemData.data);
        setFilteredDataSource(itemData.data);
      }1

      var y = categories.map((i) => {
        return i.sub_category.map((x, k) => {
          return {
            name: x.name,
            id: x.sub_category_id,
            category_id: x.category_id,
            index: k,
          };
        });
      });
      setSubCategories(y);
      setLoading(false);
      if (page !== lastPage) {
        setPage(page + 1);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLodeMore = () => {
    if (page <= lastPage) {
      setPage(page + 1);
      fetchData1();
    }
    //else {
    //   setPage(1);
    // }
    // setPage(1);

  };

  const openClose = () => {
    setOpen(!open)
  }

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
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
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(items);
      setSearch(text);
    }
  };

  const handlePress = () => {
    setFilter(!filter)
    return true;
  }

  const handleFilters = (filterValues) => {
    
    setFilterApplied(filterValues)
    setFilter(!filter)
  }

  const checkFilter = () => {
    selectedSubCategory==0
    ? setAllfilter(true)
    :setFilter(!filter)
  }
  const openNextModal = () => {
    setAllfilter(!allfilter)
    setFilter(!filter)
    handleFilters({filter_custome_field_id: keys(selectedSubCategory), filter_custome_values: flattenDeep(values(
      console.log(selectedSubCategory)
    ))}  )


  }

  return (
    <View style={{ backgroundColor: '#292633', width: '100%', height: '100%' }}>
      <ImageBackground
        source={require('../assets/dottedBackground.png')}
        style={{
          height: height,
        }}>

        <Dialog
          visible={filter}
          containerStyle={{ zIndex: 10, elevation: 10 }}
          onHardwareBackPress={() => handlePress()}
          dialogStyle={{ backgroundColor: '#272732', width: '100%', height: '50%' }}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => { setFilter(!filter) }}
        >
          <DialogContent>
            <View>
              <Filter initalValues={filterValues} filter1={(r) => {
                setFilterApplied(r);
                allFilterFunction(r)
                 setFilter(!filter)
                }} selectedSubCategory={selectedSubCategory} allCategories={subCategories[0]} />
            </View>
          </DialogContent>
        </Dialog>
        {/* filter for all */}
        <Dialog
          visible={allfilter}
          containerStyle={{ zIndex: 10, elevation: 10 }}
          onHardwareBackPress={() => handlePress()}
          dialogStyle={{ backgroundColor: '#272732', width: '100%', height: '50%' }}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => { setAllfilter(!allfilter) }}
        >
          <DialogContent>
            {/* <View>
            {subCategories[0].map((items) => {
            return <Text>{items.name}</Text> })}
            </View> */}
            <View style={{ height: '100%', width: '100%', marginTop: 15, paddingBottom: 15 }}>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <TouchableOpacity
                  onPress={() => setAllfilter(false)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
      
              <View>
                <TouchableOpacity
                  onPress={() => openNextModal() }
                  >
                  <Text style={styles.textStyle}>Choose</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={{
                height: '100%', width: '100%',
                overflow: 'hidden',
              }}>
                  <View style={styles.tab} >
                      { subCategories.length !==0 ? subCategories[current].map((filterData) => {
                    return <TouchableOpacity
                        style={{
                          marginRight: 10,
                          marginBottom: 10
                        }}
                        onPress={() => {
                          if (selectedSubCategory[filterData.id] && selectedSubCategory[filterData.id].includes(filterData.name)) {
                            const filterValues = flattenDeep(values(selectedSubCategory));
                            const filterReturn = filterValues.filter(item => item !== filterData.name)
                            setSelectedSubCategory({ ...selectedSubCategory, [filterData.id]: filterReturn })
                          } else if (selectedSubCategory[filterData.id]) {
                            setSelectedSubCategory({ ...selectedSubCategory, ...selectedSubCategory[filterData.id].push(filterData.name) });
                          } else {
                            setSelectedSubCategory({ ...selectedSubCategory, [filterData.id]: [filterData.name] });
                          }
                        }}>
                        
                        <SmallLGBtn
                          text={filterData.name}
                         selected={selectedSubCategory.length !== 0 && selectedSubCategory[filterData.id] && selectedSubCategory[filterData.id].includes(filterData.name)}
                        />
                      </TouchableOpacity>
                } ):<ActivityIndicator marginTop={height * 0.12} color="#ECDBFA" size="small" />}
                  </View>
                
            </ScrollView>
          </View>
          </DialogContent>
        </Dialog>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: width * 0.1,
          }}>
          {options.map(
            (i, k) =>
              k === 0 && (
                <TouchableOpacity
                  key={k}
                  onPress={() => { props.navigation.goBack() }}>
                  <Image
                    resizeMode="contain"
                    source={i}
                    style={{
                      width: 48,
                    }}
                  />
                </TouchableOpacity>
              ),
          )}
          <View
            style={{
              width: '44%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {options.map(
              (i, k) =>
                k !== 0 && (
                  <TouchableOpacity key={k} onPress={() => { k === 1 ? props.navigation.navigate('cart') : k === 2 ? openClose() : checkFilter() }}>
                    {k === 1 && (
                      <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#C01C8A', '#865CF4']}
                        style={{
                          width: 16,
                          height: 16,
                          position: 'absolute',
                          right: -2,
                          top: -3,
                          zIndex: 100,
                          borderRadius: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: 12,
                            fontFamily: 'Montserrat-Bold',
                          }}>
                          {props.itemCount == undefined ? "0" : props.itemCount}
                        </Text>
                      </LinearGradient>
                    )}
                    <Image
                      resizeMode="contain"
                      source={i}
                      style={{
                        width: 48,

                      }}
                    />
                  </TouchableOpacity>
                ),
            )}
          </View>
        </View>
        {open ? (
          <SearchBar
            placeholder="Type here..."
            lightTheme round editable={true}
            value={search}
            onChangeText={(text) => searchFilterFunction(text)}
            containerStyle={{
              backgroundColor: '#D2D7F9',
              marginBottom: 20,
              marginHorizontal: width * 0.1,
              borderRadius: 20,
            }}
            inputContainerStyle={{ height: 30, backgroundColor: '#D2D7F9' }}
          />) : null}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#ECDBFA',
              fontSize: 12,
              lineHeight: 16,
              fontFamily: Platform.OS == 'android' ? 'Montserrat-LightItalic' : 'Montserrat',
              paddingHorizontal: width * 0.1,
            }}>
          DISCOVER
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#ECDBFA',
              fontSize: 20,
              fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
              paddingHorizontal: width * 0.1,
            }}>
            {strings.lootStore}
          </Text>
        </View>

        {data ? (
          <View style={{ width: '100%' }}>
            <ScrollView
              style={{
                marginVertical: 20,
                // height: height * 0.1,
              }}
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: width * 0.1,
              }}
              showsVerticalScrollIndicator={false}
              horizontal>
              {categories.map((i, k) => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrent(i.index);
                    changeCategory(0);
                    setPage(1);
                    setOpen(false)
                    onPressTouch()
                  }}
                  key={i.index}>
                  {i.index === current && (
                    <GradientCircle
                      style={{
                        position: 'absolute',
                      }}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Montserrat-Bold',
                      lineHeight: 16,
                      color: '#ECDBFA',
                      opacity: i.index === current ? 1 : 0.4,
                      marginLeft: i.index === current ? 10 : 0,
                    }}>
                    {i.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={{ width: '100%' }}>
              <ScrollView
                alwaysBounceHorizontal={true}
                ref={scrollRef}
                contentContainerStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: width * 0.1,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                  }}
                  onPress={() => {
                    changeSubCategory(0);
                    setSelectedSubCategory(0);
                    setOpen(false)
                  }}>
                  <SmallLGBtn
                    text="All"
                    selected={selectedSubCategory === 0 }
                    
                  />
                </TouchableOpacity>

                {subCategories[current] &&
                  subCategories[current].map((i, k) => (
                    <TouchableOpacity
                      style={{
                        marginRight: 10,
                      }}
                      key={k}
                      onPress={() => {
                        setSelectedSubCategory(k + 1)
                        setOpen(false)
                        changeSubCategory(0);
                        setAll1("")
                      }}>
                      <SmallLGBtn
                        text={i.name}
                        selected={selectedSubCategory === k + 1}
                      />
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            {loading ? (
              <View style={{ marginTop: height * 0.27 }}>
                <ActivityIndicator color="#ECDBFA" size="small" />
              </View>
            ) : (
                <>
                  <View
                    style={{
                      display: 'flex',
                      marginVertical: 50,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      paddingHorizontal: width * 0.1,
                    }}>
                    {!items.length > 0 ? (
                      <View
                        style={{
                          width: '100%',
                          height: height * 0.3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          resizeMode="contain"
                          source={require('../assets/thumbnail1.png')}
                          style={{
                            width: 127,
                            height: 127,
                            alignSelf: 'center',
                            justifyContent: 'center',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Montserrat-Bold',
                            lineHeight: 16,
                            color: '#ECDBFA',
                            opacity: 0.4,
                          }}>
                          No Items Available !
                      </Text>
                      </View>
                    ) : (
                        <>
                          <View style={{ flex: 1 }}>
                            <FlatList
                              style={{ height: height * 0.60, marginTop: -15 }}
                              contentContainerStyle={{
                                marginBottom: 10
                              }}
                              showsVerticalScrollIndicator={false}
                              scrollEnabled={true}
                              data={filteredDataSource}
                              onEndThreshold={0.0}
                              // onMomentumScrollEnd={() => handleLodeMore()}
                              // onEndReached={() => setCallOnScrollEnd(true)}
                              // onMomentumScrollEnd={() => {
                              //   callOnScrollEnd && handleLodeMore()
                              //   setCallOnScrollEnd(false)
                              // }}

                              keyExtractor={(item) => item.item_id}
                              renderItem={({ item: i }, k) => {
                                return (
                                  <View style={{ flexGrow: 1 }} key={k}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        props.navigation.navigate('itemDesc', {
                                          price: i.price,
                                          description: i.description,
                                          brand: i.brand,
                                          name: i.name,
                                          value: i.value_en,
                                          id: i.item_id,
                                          image: i.image,
                                        });
                                      }}>
                                      <ImageBackground
                                        source={require('../assets/ic_card_a0.png')}
                                        resizeMode="contain"
                                        style={{
                                          height: 195,
                                          display: 'flex',
                                          paddingLeft: 20,
                                          marginHorizontal: 10,
                                          paddingTop: 20,
                                          width: width * 0.36,
                                          marginVertical: i.image ? 20 : 10,
                                         
                                        }}>
                                        {i.image ? (
                                          <Image
                                            resizeMode="contain"
                                            source={{
                                              uri: i.image,
                                            }}
                                            style={{
                                              width: 108,
                                              height: 81,
                                              position: 'absolute',
                                              top: -24,
                                              left: '14%',
                                              // borderRadius:50,
                                              // resizeMode:'center'
                                            }}
                                          />
                                        ) : (
                                            <Image
                                              resizeMode="contain"
                                              source={require('../assets/thumbnail1.png')}
                                              style={{
                                                width: 108,
                                                height: 81,
                                                position: 'absolute',
                                                top: -24,
                                                left: '14%',
                                              }}
                                            />
                                          )}
                                          <View
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                          }}>  
                                            <Text
                                              style={{
                                                fontFamily: Platform.OS == 'android' ? 'Montserrat Regular' : 'Montserrat',
                                                color: '#D2D7F9',
                                                opacity: 0.5,
                                                fontSize: 14,
                                                marginTop: 60,
                                              }}>
                                              {i.brand}
                                            </Text>
                                          </View>
                                          <View
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                          }}>  
                                        <Text
                                          numberOfLines={2}
                                          style={{
                                            fontSize: 16,
                                            color: '#ECDBFA',
                                            fontFamily: Platform.OS == 'android' ? 'Montserrat-Bold' : 'Montserrat',
                                            marginTop: 2,
                                            marginRight: arOren == "it"?"12%":'2%',
                                          }}>
                                          {((i.name).length > maxlimit) ? (((i.name).substring(0, maxlimit - 3)) + '...') : i.name}
                                        </Text>
                                        </View>
                                        <View
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                          }}>  
                                        <Text
                                          style={{
                                            color: '#DF2EDC',
                                            fontSize: 12,
                                            fontFamily: Platform.OS == 'android' ? 'Montserrat Regular' : 'Montserrat',
                                            marginVertical: 10
                                          }}>
                                          KD {i.price}
                                        </Text>
                                        </View>
                                      </ImageBackground>
                                    </TouchableOpacity>
                                  </View>
                                );
                              }
                              }
                              numColumns={2}
                            />
                          </View>
                        </>
                      )}
                  </View>
                </>
              )}
          </View>
        ) : (
            <View style={{ marginTop: height * 0.35 }}>
              <ActivityIndicator color="#ECDBFA" size="small" />
            </View>
          )}
      </ImageBackground>
    </View>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  itemCount: state.cartReducer.totalItems,
})
const actionCreators = {
  add: cartActions.showCart,

};

const styles = StyleSheet.create({
  notch: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7f7f7f',
  },
  label: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  labeltext: {
    fontSize: 16,
    color: '#fff',
  },
  thumb: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
  railselected: {
    height: 4,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  },
  priceSeector: {
    marginTop: 10,
    marginBottom: 10
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 10
  }
});

export default connect(mapStateToProps, actionCreators)(LootStore);
