import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Button
} from 'react-native';
import GradientCircle from '../components/gradientCircle';
import LinearGradient from 'react-native-linear-gradient';
import SmallBtn from '../svgs/smallBtn';
import {Context as AuthContext} from '../api/contexts/authContext';
import SmallLGBtn from './smallLGBtn';
import {showCartData} from '../api/buildYourPc';

const {width, height} = Dimensions.get('window');

const options = [
  require('../assets/back.png'),
  require('../assets/ic_cart2.png'),
  require('../assets/ic_search.png'),
  require('../assets/ic_filter.png'),
  
];

const LootStore = ({navigation}) => {
  const {fetchCategories, fetchItems} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Bottomloading, setBottomLoading] = useState(true);
  const [cartItems,setcartItems] = useState([]);
  const [cartData,setCartData] = useState([]);
  const [page,setPage] = useState(1);
  const maxlimit = 22;
  const subCategoryId = "";
  const [lastPage,setlastPage] = useState("");
  // console.log(items);

  useEffect(() => {
    showCartData().then((response) => {
      setcartItems(response.data.items)
      setCartData(response.data) 
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
        itemData = await fetchItems(x[current].id, b);
      } else {
        itemData = await fetchItems(x[current].id,subCategoryId,page);
        setlastPage(itemData.parameter.last_page);
      }
      if (itemData) {
        setItems(itemData.data);
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
      setBottomLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLodeMore = () => {
    if (page == lastPage){
      setPage(1);
    }else{
      setPage(page + 1);
    }
    fetchData1();
    // console.warn(page);
  }

  return (
    <View
      style={{
        backgroundColor: '#261D2A',
        width: width,
        overflowX: 'hidden',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width,
          height,
        }}>
          <ImageBackground
            source={require('../assets/dottedBackground.png')}
            style={{
              paddingHorizontal: width * 0.1,
            }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {options.map(
              (i, k) =>
                k === 0 && (
                  <TouchableOpacity
                    key={k}
                    onPress={() => {
                      navigation.goBack();
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
                    <TouchableOpacity key={k} onPress={() => {k === 1?navigation.navigate('cart'):{}}}>
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
                            {cartData.length == 0?"0":cartItems.length}
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
          <Text
            style={{
              color: '#ECDBFA',
              fontSize: 12,
              lineHeight: 16,
              fontFamily:'Montserrat-LightItalic'
            }}>
            DISCOVER
          </Text>
          <Text
            style={{
              color: '#ECDBFA',
              fontSize: 20,
              fontFamily: 'Michroma-Regular',
            }}>
            Loot Store
          </Text>

          {data ? (
            <View style={{width: '100%'}}>
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
                }}
                showsVerticalScrollIndicator={false}
                horizontal>
                {categories.map((i, k) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCurrent(i.index);
                      setSelectedSubCategory(0);
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

              <View style={{width: '100%'}}>
                <ScrollView
                  contentContainerStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal>
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                    }}
                    onPress={() => {
                      setSelectedSubCategory(0);
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
                          // console.log(k + 1);
                          setSelectedSubCategory(k + 1);
                        }}>
                        <SmallLGBtn
                          text={i.name}
                          // text={i.name.substring(0, 5)}
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
                <View
                  style={{
                    display: 'flex',
                    marginVertical: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
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
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                      }}>
                        {items.map(
                            (i, k) =>
                              i.status === 1 && (
                                <View key={k}>
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
                                        marginHorizontal:5,
                                        paddingTop: 20,
                                        width: width * 0.36,
                                        marginVertical: 20,
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
                                          fontFamily: 'Montserrat-Regular',
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
                                          fontFamily: 'Montserrat-Bold',
                                          marginTop:2,
                                          marginRight:"2%"
                                        }}>
                                        {((i.name).length > maxlimit)?(((i.name).substring(0,maxlimit-3)) + '...'):i.name}
                                      </Text>
                                      <Text
                                        style={{
                                          color: '#DF2EDC',
                                          fontSize: 12,
                                          fontFamily: 'Montserrat-Regular',
                                          marginVertical:10
                                        }}>
                                        KD {i.price}
                                      </Text>
                                    </ImageBackground>
                                  </TouchableOpacity>
                                </View>
                              ),
                          )}
                       </View>
                       {selectedSubCategory === 0?<Button title="Load More" onPress={() => {handleLodeMore()}}/>:null}
                      </>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View style={{marginTop: height * 0.35}}>
              <ActivityIndicator color="#ECDBFA" size="small" />
            </View>
          )}
        </ImageBackground>
      </ScrollView>
    </View>
  );
};


export default LootStore;
