import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  FlatList
} from 'react-native';
import GradientCircle from '../components/gradientCircle';
import LinearGradient from 'react-native-linear-gradient';
import { Context as AuthContext } from '../api/contexts/authContext';
import SmallLGBtn from './smallLGBtn';
import { showCartData } from '../api/buildYourPc';
import SaveButton from '../components/SaveBtn';
import { SearchBar } from 'react-native-elements';
import strings from '../languages/index';
import { connectAdvanced } from 'react-redux';

const { width, height } = Dimensions.get('window');

const options = [
  require('../assets/back.png'),
  require('../assets/ic_cart2.png'),
  require('../assets/ic_search.png'),
  require('../assets/ic_filter.png'),
];

const LootStore = ({ navigation }) => {
  const { fetchCategories, fetchItems } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartItems, setcartItems] = useState(0);
  const [page, setPage] = useState(1);
  const maxlimit = 15;
  const subCategoryId = "";
<<<<<<< HEAD
  const [lastPage, setlastPage] = useState(0);
  const [totalPage, setToalPage] = useState(0);
=======
  const [lastPage, setlastPage] = useState("");
>>>>>>> 9b805bec01daeb67a30406ceee237bbce1f2265e
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);


  useEffect(() => {
    showCartData().then((response) => {
      if (response.data.length !== 0) {
       
        setcartItems(response.data.total_items);
      }
    }).catch((error) => {
      console.log("showCartDataOnHome" + error);
    });
  }, []);

  const fetchData = useCallback(async () => {
    if (selectedSubCategory === 0) {
      await fetchData1();
    } else {
      if (selectedSubCategory !== 0) {
        await fetchData1(subCategories[current][selectedSubCategory - 1].id);
      }
    }
  }, [selectedSubCategory, current]);

  const changeCategory=(id)=>{
    setSelectedSubCategory(id);
    setPage(1);
    setlastPage(0)
  }

  const changeSubCategory=(id)=>{
    setSelectedSubCategory(id);
    setPage(1)
    setlastPage(0)
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
      console.log("B is value os "+x[current].id)
      if (b) {
        itemData = await fetchItems(x[current].id, b);
      } else {
        itemData = await fetchItems(x[current].id, subCategoryId, page);
        setlastPage(itemData.parameter.last_page);
        //setlastPage(itemData.parameter.to)

      }
      //console.log(itemData);

      if (itemData) {
        setItems(itemData.data);
        setFilteredDataSource(itemData.data);
      }

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
    console.log(page +'   '+lastPage)
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

  return (
    <View style={{backgroundColor:'#292633', width:'100%', height:'100%'}}>
    
        <ImageBackground
          source={require('../assets/dottedBackground.png')}
          style={{
            height:height,
          }}>
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
                    onPress={() => { navigation.goBack() }}>
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
                    <TouchableOpacity key={k} onPress={() => { k === 1 ? navigation.navigate('cart') : k === 2 ? openClose() : {} }}>
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
                            {cartItems}
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
              containerStyle={{ borderRadius: 22, height: 50, marginBottom: 20, marginHorizontal: width * 0.1 }}
              inputContainerStyle={{ height: 30, }}
            />) : null}
          <Text
            style={{
              color: '#ECDBFA',
              fontSize: 12,
              lineHeight: 16,
              fontFamily: Platform.OS=='android'?'Montserrat-LightItalic':'Montserrat',
              paddingHorizontal: width * 0.1,
            }}>
            DISCOVER
          </Text>
          <Text
            style={{
              color: '#ECDBFA',
              fontSize: 20,
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
              paddingHorizontal: width * 0.1,
            }}>
            {strings.lootStore}
          </Text>

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
                    }}>
                    <SmallLGBtn
                      text="All"
                      selected={selectedSubCategory === 0}
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
                          setSelectedSubCategory(k + 1);
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
                          <View style={{flex:1}}>
                            <FlatList
                             style={{height:height*0.65,marginTop:-15}}
                              contentContainerStyle={{
                                marginBottom: 10
                               
                              }}
                              showsVerticalScrollIndicator={false}
                              scrollEnabled={true}
                              data={filteredDataSource}
                              onEndThreshold={0.5}
                             // onMomentumScrollEnd={() => handleLodeMore()}
                              onEndReached={() => setCallOnScrollEnd(true)}
                              onMomentumScrollEnd={() => {
                                callOnScrollEnd && handleLodeMore()
                                setCallOnScrollEnd(false)
                              }}

                              keyExtractor={(item) => item.item_id}
                              renderItem={({ item: i }, k) => {
                                  return (
                                    <View  style={{flexGrow:1}} key={k}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          navigation.navigate('itemDesc', {
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
                                          <Text
                                            style={{
                                              fontFamily: Platform.OS=='android'?'Montserrat Regular':'Montserrat', 
                                              color: '#D2D7F9',
                                              opacity: 0.5,
                                              fontSize: 14,
                                              marginTop: 60,
                                            }}>
                                            {i.brand}
                                          </Text>
                                          <Text
                                            numberOfLines={2}
                                            style={{
                                              fontSize: 16,
                                              color: '#ECDBFA',
                                              fontFamily: Platform.OS=='android'?'Montserrat-Bold':'Montserrat',
                                              marginTop: 2,
                                              marginRight: "2%"
                                            }}>
                                            {((i.name).length > maxlimit) ? (((i.name).substring(0, maxlimit - 3)) + '...') : i.name}
                                          </Text>
                                          <Text
                                            style={{
                                              color: '#DF2EDC',
                                              fontSize: 12,
                                              fontFamily: Platform.OS=='android'?'Montserrat Regular':'Montserrat',
                                              marginVertical: 10
                                            }}>
                                            KD {i.price}
                                          </Text>
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
                    {/* {selectedSubCategory === 0 && lastPage !== 1 ? (
                      <View style={{ paddingBottom: 20, flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => { handleLodeMore() }}>
                          <SaveButton text="Load More" x="120" />
                        </TouchableOpacity>
                      </View>
                    )
                      : null
                    } */}
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
export default LootStore;
