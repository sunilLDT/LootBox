import React,{useState,useEffect} from 'react';
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
import {pcPartSubcategoryApi,getItemsSubCatApi} from '../../api/buildYourPc';
import LinearGradient from 'react-native-linear-gradient';
import cardImage from '../../assets/ic_card_a0.png';
import thumbnail from '../../assets/thumbnail.png';

const {width, height} = Dimensions.get('window');

const AdvanceBuilder = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [pcPartSubcategory, setpcPartSubcategory] = useState([]);
  const [subCategoryId,setSubCategoryid] = useState("");
  const [items,setItems] = useState([]);

  useEffect(() => {
    setLoading(true)
    pcPartSubcategoryApi().then((response) => {
      setpcPartSubcategory(response.data);
      setLoading(false)
    }).catch((error) => {
        console.log("pcPartSubcategory list" + error)
        setLoading(false)
    });
    return () => {
        console.log("willUnMount");
    }
  }, []);

  const subCategoryFun = (subCatId) => {
    setSubCategoryid(subCatId);
    getItemsSubCatApi(subCatId).then((response) => {
      setItems(response.data)
    }).catch((error) => {
        console.log("getItemsSubCat for advance builder" + error)
        setLoading(false)
    });
  }
  

  return (
      <ImageBackground
      source={require('../../assets/dottedBackground.png')}
      style={styles.background}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width, height, overflowX: 'hidden'}}
        >
          <View style={styles.topContainer}>
              <View>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
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

          <View>
            <Text style={styles.advanceBuilderText}>Advance Builder</Text>
            <Text style={styles.lineText}>Select the configuration you like the most.</Text>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.subCategoriesView}>
              {pcPartSubcategory.map((part,index) => {
                if(part.status === 1){
                  return(
                    <TouchableOpacity key={index} onPress={() => subCategoryFun(part.sub_category_id)}>
                      <View style={styles.box} >
                        {subCategoryId === part.sub_category_id?(
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#C01C8A', '#865CF4']}
                            style={{
                              width: 8,
                              height: 8,
                              position: 'absolute',
                              right:17,
                              top: 20,
                              zIndex: 100,
                              borderRadius:50,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                          </LinearGradient>
                          ):null}
                          <Image style={styles.subImage}
                            resizeMode="contain"
                            source={filterImage}
                          />
                          <Text style={styles.subName}>{part.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>

            <View style={styles.flatlistContainer}>
              <FlatList
                keyExtractor={(item) => item.item_id}
                data={items}
                renderItem={({ item }, index) => {
                  const maxlimit = 22;
                  if(item.status === 1){
                  return(
                    <ImageBackground
                      onPress={() => {}}
                      source={cardImage}
                      style={styles.cardConatiner}
                      key={index}
                    >
                      <View
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                          {item.image?(
                            <Image
                              source={{ uri: item.image }}
                              style={styles.itemImage}
                            />
                        ):(
                          <Image
                            source={thumbnail}
                            style={styles.itemImage}
                          />
                        )}
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            marginBottom: 5,
                            alignSelf:'center',
                          }}>
                          {((item.name).length > maxlimit)?(((item.name).substring(0,maxlimit-3)) + '...'):item.name}
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
                            marginBottom: 20,
                            textAlign: 'center',
                          }}>
                          KD {item.price}
                        </Text>
                      </View>
                    </ImageBackground>
                  );
                }
                }}
                numColumns={2}
              />
            </View>          
          </View>
        </ScrollView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background:{
    height:height,
    width:width,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.1,
  },
  searchFilter:{
    display: 'flex',
    flexDirection:'row',
  },
  advanceBuilderText:{
    fontSize:20,
    fontFamily:'Michroma-Regular',
    color:'#fff',
    paddingHorizontal: width * 0.1,
  },
  lineText:{
    fontSize:12,
    color:'#D2D7F9',
    marginVertical:10,
    fontFamily:'Montserrat-LightItalic',
    paddingHorizontal: width * 0.1,
  },
  mainContainer:{
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:"5%",
  },
  subCategoriesView:{
    width:width*0.3,
  },
  flatlistContainer:{
    width:width*0.7,
    marginLeft:'-5%'
  },
  box:{
    width:width*0.24,
    height:height*0.17,
    borderBottomWidth:0.6,
    borderBottomColor:"#D2D7F9",
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  subImage:{
    width:50,
    height:50,
  },
  subName:{
    color:'#fff',
    fontSize:12,
    marginTop:2
  },
  cardConatiner: {
    width: width*0.30,
    height: height*0.22,
    margin:"4%",
  },
  itemImage:{
    width: 65,
    height: 45,
    marginBottom: 30,
    alignSelf: 'center',
    marginTop:'-10%',
  },
});

export default AdvanceBuilder;
