import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
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
  StyleSheet,
  SafeAreaView
} from 'react-native';
import GradientCircle from '../components/gradientCircle';
import LinearGradient from 'react-native-linear-gradient';
import {Context as AuthContext} from '../api/contexts/authContext';
import SmallLGBtn from './smallLGBtn';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {cartActions} from '../actions/user';
import Filter from './filter';
import Dialog,{DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {flattenDeep, values, keys, map, set} from 'lodash';
import {languagename} from '../components/LanguageName';
const {width, height} = Dimensions.get('window');

const options = [
  require('../assets/back.png'),
  require('../assets/ic_cart2.png'),
  require('../assets/ic_search.png'),
  require('../assets/ic_filter.png'),
];
const THUMB_RADIUS = 12;
const LootStore = (props) => {
  
  const scrollRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [isRoll, setIsRoll] = useState(false);
  const {fetchCategories, fetchItems} = useContext(AuthContext);
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
  const subCategoryId = '';
  const [lastPage, setlastPage] = useState(0);
  const [totalPage, setToalPage] = useState(0);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [allfilter, setAllfilter] = useState(false);
  const [allfilterId, setAllfilterId] = useState({});
  const [all1, setAll1] = useState();
  const [paginationLoader, setPaginationLoader] = useState(false);
  const [arOren, setarOren] = useState('en');
  languagename().then((res) => setarOren(res));
  const [filterValues, setFilterApplied] = useState({});

  const fetchData = useCallback(async () => {
    try {
      if (selectedSubCategory === 0) {
        await fetchData1();
      } else {
        if (selectedSubCategory !== 0) {
          console.log("selected sub cat ====")
          console.log(selectedSubCategory)
          await fetchData1(subCategories[current][selectedSubCategory - 1].id);
          // await fetchData1(keys(selectedSubCategory));
        }
      }
    } catch (errr) {
      console.log(errr);
    }
  }, [selectedSubCategory, current, filterValues]);

  const changeCategory = (id) => {
    setSelectedSubCategory(id);
    setPage(1);
    setlastPage(0);
    setFilterApplied({});
  };

  const changeSubCategory = (id) => {
    setPage(1);
    setlastPage(0);
    setFilterApplied({});
  };

  const allFilterFunction = async (r) => {
    setPage(1);
    setAll1(r.all);
    const cat = categories.map((i, k) => {
      return i.id;
    });

    const itemData = await fetchItems(
      cat[current],
      keys(selectedSubCategory)[0],
      page,
      r.filter_custome_field_id,
      r.filter_custome_values,
      r.minPrice,
      r.maxPrice,
      r.all,
    );

    setItems(itemData.data);
    setFilteredDataSource(itemData.data);
  };

  const fetchData1 = async (b) => {
    setLoading(true);
    const categories = await fetchCategories();
    
    if (categories) {
      setData(categories);
      var x = categories.map((i, k) => {
        return {id: i.category_id, name: i.name_en, index: k};
      });
      setCategories(x);
      var itemData = null;

      if (b) {
        console.log("in alll fro all in b ")
        console.log(b)
        itemData = await fetchItems(
          x[current].id,
          b,
          undefined,
          filterValues.filter_custome_field_id,
          filterValues.filter_custome_values,
          filterValues.minPrice,
          filterValues.maxPrice,
        );
      } else {
        itemData = await fetchItems(
          x[current].id,
          subCategoryId,
          page,
          filterValues.filter_custome_field_id,
          filterValues.filter_custome_values,
          filterValues.minPrice,
          filterValues.maxPrice,
        );
        
        setlastPage(itemData.parameter.last_page);
      }

      if (itemData) {
        setItems(itemData.data);
        setFilteredDataSource(
          page === 1
            ? itemData.data
            : [...filteredDataSource, ...itemData.data],
        );
        //console.log('filters page' + page);
        // setFilteredDataSource(itemData.data)
      }
      1;

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
  const fetchData2 = async (b) => {
    setPaginationLoader(true);
    const categories = await fetchCategories();
    if (categories) {
      setData(categories);
      var x = categories.map((i, k) => {
        return {id: i.category_id, name: i.name_en, index: k};
      });
      setCategories(x);
      var itemData = null;

      if (b) {
        itemData = await fetchItems(
          x[current].id,
          b,
          undefined,
          filterValues.filter_custome_field_id,
          filterValues.filter_custome_values,
          filterValues.minPrice,
          filterValues.maxPrice,
          undefined,
          search
        
        );
      } else {
        itemData = await fetchItems(
          x[current].id,
          subCategoryId,
          page,
          filterValues.filter_custome_field_id,
          filterValues.filter_custome_values,
          filterValues.minPrice,
          filterValues.maxPrice,
          undefined,
          search
        );
        setlastPage(itemData.parameter.last_page);
      }

      if (itemData) {
        setItems(itemData.data);
        setFilteredDataSource(
          page === 1
            ? itemData.data
            : [...filteredDataSource, ...itemData.data],
        );
        //console.log('filters page' + page);
        // setFilteredDataSource(itemData.data)
      }
      1;

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
      setPaginationLoader(false);
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
      setLoading(false);
      setPage(page + 1);
      fetchData2();
    }
    //else {
    //   setPage(1);
    // }
    // setPage(1);
  };

  const openClose = () => {
    setOpen(!open);
  };

  const onPressTouch = (k) => {
    scrollRef.current?.scrollTo({
      y: 0,
      x: 0,
      animated: false,
    });
  };

  const searchFilterFunction = (text) => {
    setPage(1);
    setSearch(text);
    if(text){
      setTimeout(()=>{
        fetchData2();
      },1000)
    }
    /*if (text) {
      const newData = items.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(items);
      setSearch(text);
    }*/
  };

  const handlePress = () => {
    setFilter(!filter);
    return true;
  };

  const handleFilters = (filterValues) => {
    setFilterApplied(filterValues);
    setFilter(!filter);
  };

  const checkFilter = () => {
    selectedSubCategory == 0 ? setAllfilter(true) : setFilter(!filter);
  };
  const openNextModal = () => {
    setAllfilter(!allfilter);
    setFilter(!filter);
    handleFilters({
      filter_custome_field_id: keys(selectedSubCategory),
      filter_custome_values: flattenDeep(
        values(selectedSubCategory),
      ),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={{backgroundColor: '#292633', width: '100%', height: '100%'}}>
      <ImageBackground
        source={require('../assets/dottedBackground.png')}
        style={{
          height: height,
        }}>
        <Dialog
          visible={filter}
          containerStyle={{zIndex: 10, elevation: 10}}
          onHardwareBackPress={() => handlePress()}
          dialogStyle={{
            backgroundColor: '#272732',
            width: '100%',
            height: '50%',
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          onTouchOutside={() => {
            setFilter(!filter);
          }}>
          <DialogContent>
            <View>
              <Filter
                labels={props.labels}
                initalValues={filterValues}
                filter1={(r) => {
                  setFilterApplied(r);
                  allFilterFunction(r);
                  setFilter(!filter);
                }}
                selectedSubCategory={selectedSubCategory}
                allCategories={subCategories[current]}
              />
            </View>
          </DialogContent>
        </Dialog>
        {/* filter for all */}
        <Dialog
          visible={allfilter}
          containerStyle={{zIndex: 10, elevation: 10}}
          onHardwareBackPress={() => handlePress()}
          dialogStyle={{
            backgroundColor: '#272732',
            width: '100%',
            height: '50%',
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          onTouchOutside={() => {
            setAllfilter(!allfilter);
          }}>
          <DialogContent>
            {/* <View>
            {subCategories[0].map((items) => {
            return <Text>{items.name}</Text> })}
            </View> */}
            <View
              style={{
                height: '100%',
                width: '100%',
                marginTop: 15,
                paddingBottom: 15,
              }}>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TouchableOpacity onPress={() => setAllfilter(false)}>
                    <Text style={styles.textStyle}>{props.labels.cancel}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={() => openNextModal()}>
                    <Text style={styles.textStyle}>{props.labels.choose}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                style={{
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                }}>
                <View style={styles.tab}>
                  {subCategories.length !== 0 ? (
                    subCategories[current].map((filterData) => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginRight: 10,
                            marginBottom: 10,
                          }}
                          onPress={() => {
                            if (
                              selectedSubCategory[filterData.id] &&
                              selectedSubCategory[filterData.id].includes(
                                filterData.name,
                              )
                            ) {
                              const filterValues = flattenDeep(
                                values(selectedSubCategory),
                              );
                              const filterReturn = filterValues.filter(
                                (item) => item !== filterData.name,
                              );
                              setSelectedSubCategory({
                                ...selectedSubCategory,
                                [filterData.id]: filterReturn,
                              });
                            } else if (selectedSubCategory[filterData.id]) {
                              setSelectedSubCategory({
                                ...selectedSubCategory,
                                ...selectedSubCategory[filterData.id].push(
                                  filterData.name,
                                ),
                              });
                            } else {
                              setSelectedSubCategory({
                                ...selectedSubCategory,
                                [filterData.id]: [filterData.name],
                              });
                            }
                          }}>
                          <SmallLGBtn
                            text={filterData.name}
                            selected={
                              selectedSubCategory.length !== 0 &&
                              selectedSubCategory[filterData.id] &&
                              selectedSubCategory[filterData.id].includes(
                                filterData.name,
                              )
                            }
                          />
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <ActivityIndicator
                      marginTop={height * 0.12}
                      color="#ECDBFA"
                      size="small"
                    />
                  )}
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
                  onPress={() => {
                    props.navigation.goBack();
                  }}>
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
                  <TouchableOpacity
                    key={k}
                    onPress={() => {
                      k === 1
                        ? props.navigation.navigate('cart')
                        : k === 2
                        ? openClose()
                        : checkFilter();
                    }}>
                    {k === 1 && (
                      <LinearGradient
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 0}}
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
                          {props.itemCount == undefined ? '0' : props.itemCount}
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
        {open &&  arOren == "en"? (
          <SearchBar
            placeholder={props.labels.typeHere}
            round
            editable={true}
            value={search}
            onChangeText={(text) => searchFilterFunction(text)}
            containerStyle={{
              backgroundColor: '#D2D7F9',
              marginBottom: 10,
              marginHorizontal: width * 0.1,
              borderRadius: 20,
            }}
            inputContainerStyle={{height: 36,marginTop:0, backgroundColor: '#D2D7F9',}}
            inputStyle={{padding:0}}
                      />
        ) :open &&  arOren == "ar"?(
          <SearchBar
            placeholder={props.labels.typeHere}
            round
            editable={true}
            value={search}
            onChangeText={(text) => searchFilterFunction(text)}
            containerStyle={{
              backgroundColor: '#D2D7F9',
              marginBottom: 10,
              marginHorizontal: width * 0.1,
              borderRadius: 20,
            }}
            inputContainerStyle={{height: 38,marginTop:0, backgroundColor: '#D2D7F9',}}
            inputStyle={{paddingTop:5,marginTop:5, textAlign:"right"}}
          />
        ):null}
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
              fontFamily:
                Platform.OS == 'android'
                  ? 'Montserrat-LightItalic'
                  : 'Montserrat',
              paddingHorizontal: width * 0.1,
            }}>
          {props.labels.discover}
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
              fontFamily:
                Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
              paddingHorizontal: width * 0.1,
            }}>
            {props.labels.lootStore}
          </Text>
        </View>

        {data ? (
          <View style={{width: '100%'}}>
            <View >
              <ScrollView
              alwaysBounceHorizontal={true}
                style={{
                  marginVertical: 20,
                }}
                contentContainerStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  paddingHorizontal: width * 0.06,
                }}
                horizontal>
                {categories.map((i, k) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCurrent(i.index);
                      changeCategory(0);
                      setPage(1);
                      setOpen(false);
                      onPressTouch(k);
                      setIsFocused(true);
                      // setIsRoll(true);
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
                        fontSize:arOren == "ar"?12: 14,
                        fontFamily: 'Montserrat-Bold',
                        lineHeight: 16,
                        color: '#ECDBFA',
                        opacity: i.index === current ? 1 : 0.4,
                        marginLeft: i.index === current ? 10 : 0,
                      }}>
                      {i.name}
                    </Text>
                    
                  </TouchableOpacity>
                );
              })}
              </ScrollView>
            </View>

            <View style={{width: '100%',alignItems: 'flex-start',}}>
              <ScrollView
                alwaysBounceHorizontal={true}
                ref={scrollRef}
                contentContainerStyle={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: width * 0.1,
                }}
                // snapToStart={isFocused == true && isRoll == true ? true : false}
                // scrollEventThrottle={200}
                showsHorizontalScrollIndicator={false}
                horizontal>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                  }}
                  onPress={() => {
                    changeSubCategory(0);
                    setSelectedSubCategory(0);
                    setOpen(false);
                    setIsFocused(false);
                    setIsRoll(false);
                  }}>
                  <SmallLGBtn text={props.labels.all} selected={selectedSubCategory === 0} />
                </TouchableOpacity>

                {subCategories[current] &&
                  subCategories[current].map((i, k) => (
                    <TouchableOpacity
                      style={{
                        marginRight: 10,
                      }}
                      key={k}
                      onPress={() => {
                        setSelectedSubCategory(k + 1);
                        setOpen(false);
                        changeSubCategory(0);
                        setAll1('');
                        // onPressTouch(k);
                        setIsFocused(false);
                        setIsRoll(false);
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
              <View style={{marginTop: height * 0.27}}>
                <ActivityIndicator color="#ECDBFA" size="small" />
              </View>
            ) : (
              <>
                <View
                  style={{
                    paddingVertical:50,
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
                        {props.labels.noItemAvailable}
                      </Text>
                    </View>
                  ) : (
                    <>
                      <View style={{flex: 1,}}>
                        <FlatList
                          style={{height: height * 0.6,}}
                          contentContainerStyle={{
                            marginBottom: 10,
                            paddingTop:7
                          }}
                          showsVerticalScrollIndicator={false}
                          scrollEnabled={true}
                          data={filteredDataSource}
                          //
                          onEndReachedThreshold={0.1}
                          // onMomentumScrollEnd={() => handleLodeMore()}
                          onEndReached={() => handleLodeMore()}
                          //  onMomentumScrollEnd={() => {
                          //    callOnScrollEnd && handleLodeMore()
                          //    setCallOnScrollEnd(false)
                          //  }}

                          keyExtractor={(item) => item.item_id}
                          renderItem={({item: i}, k) => {
                            return (
                              <View style={{flexGrow: 1,
                              }} key={k}>
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
                                      // transform: [{ scaleX:arOren == "ar"? -1:1 }]

                                    }}>
                                    {i.image ? (
                                      <Image
                                        resizeMode="contain"
                                        source={{
                                          uri: i.image,
                                        }}
                                        style={{
                                          width: 80,
                                          height: 81,
                                          position: 'absolute',
                                          top: -24,
                                          alignSelf:'center',
                                          borderRadius: 10,
                                          resizeMode:'cover'
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
                                          fontFamily:
                                            Platform.OS == 'android'
                                              ? 'Montserrat Regular'
                                              : 'Montserrat',
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
                                          fontFamily:
                                            Platform.OS == 'android'
                                              ? 'Montserrat-Bold'
                                              : 'Montserrat',
                                          marginTop: 2,
                                          marginRight:
                                            arOren == 'it' ? '12%' : '2%',
                                        }}>
                                        {i.name.length > maxlimit
                                          ? i.name.substring(0, maxlimit - 3) +
                                            '...'
                                          : i.name}
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
                                          fontFamily:
                                            Platform.OS == 'android'
                                              ? 'Montserrat Regular'
                                              : 'Montserrat',
                                          marginVertical: 10,
                                        }}>
                                       {props.labels.kD} {i.price}
                                      </Text>
                                    </View>
                                  </ImageBackground>
                                </TouchableOpacity>
                              </View>
                            );
                          }}
                          numColumns={2}
                        />
                        {paginationLoader ? (
                          <View style={{marginBottom: height * 3}}>
                            <ActivityIndicator color="#ECDBFA" size="small" />
                          </View>
                        ) : null}
                      </View>
                    </>
                  )}
                </View>
              </>
            )}
          </View>
          
        ) : (
          <View style={{marginTop: height * 0.35}}>
            <ActivityIndicator color="#ECDBFA" size="small" />
          </View>
        )}
      </ImageBackground>
    </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  itemCount: state.cartReducer.totalItems,
  labels: state.languageReducer.labels,
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
  safeArea: {
    flex: 1,
    backgroundColor: '#292633',
    marginTop:-15,
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
    marginBottom: 10,
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 10,
  },
});

export default connect(mapStateToProps, actionCreators)(LootStore);
