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
import NextBtn from '../../components/NextBtn';
import SubCatBg from '../../assets/buildYourPc/Rectangle.png';
import SelectedImage from '../../assets/Rectangle.png';

const {width, height} = Dimensions.get('window');

const AdvanceBuilder = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [pcPartSubcategory, setpcPartSubcategory] = useState([]);
  const [subCategoryId,setSubCategoryid] = useState("");
  const [items,setItems] = useState([]);
  const [selectedItems,setSelectedItems] = useState([]);
  const [allSubCategoriesId,SetAllSubCategoriesId] = useState([]);
  // console.log(allSubCategoriesId);

  // console.log(selectedItems);

  useEffect(() => {
    setLoading(true)
    pcPartSubcategoryApi().then((response) => {
      setpcPartSubcategory(response.data);
      pcPartSubcategory.map((i,k)=>{
        SetAllSubCategoriesId(i.sub_category_id);
      })
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

  const selectItem = (sub_category_id,item_id) => {
    if(selectedItems && !selectedItems.length){
      setSelectedItems([...selectedItems,{subCategoryId: sub_category_id, itemId: item_id}])
    }
    else{
      selectedItems.map((i,k) => {
        if(i.subCategoryId === sub_category_id){
          setSelectedItems(prevState => ([
            ...prevState,{subCategoryId: sub_category_id, itemId:selectedItems[k].itemId = item_id}
          ]))
        }
        else{
          setSelectedItems([...selectedItems,{subCategoryId: sub_category_id, itemId: item_id}])
        }
      })
    }
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
          {loading ? (
          <View style={{marginTop: height * 0.37}}>
              <ActivityIndicator color="#ECDBFA" size="small" />
          </View>
            ):(
          <>
          <View>
            <Text style={styles.advanceBuilderText}>Advance Builder</Text>
            <Text style={styles.lineText}>Select the configuration you like the most.</Text>
          </View>

          <View style={styles.mainContainer}>
              <View style={styles.subCategoriesView}>
                <ImageBackground source={SubCatBg} style={{}}>
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
                                right:24,
                                top: 31,
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
                            <Text
                            style={styles.subName}
                            numberOfLines={2}
                            >
                            {part.name}
                            </Text>
                            <View style={styles.selectedDetails}>
                              <View style={styles.sideBrand}>
                                <Text style={styles.sideDetails}>
                                  intel
                                </Text>
                                <Text style={styles.sideDetails}>
                                  i7-432k
                                </Text>
                              </View>
                              <Text style={styles.sidePrice}>
                                KD 2,200
                              </Text>
                            </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
                </ImageBackground>
              </View>
            

            <View style={styles.flatlistContainer}>
              <FlatList
                keyExtractor={(item) => item.item_id}
                data={items}
                renderItem={({ item }, index) => {
                  const maxlimit = 22;
                  return(
                    <TouchableOpacity onPress={() => selectItem(item.sub_category_id,item.item_id)}>
                      <ImageBackground
                        onPress={() => {}}
                        source={cardImage}
                        style={styles.cardConatiner}
                        key={index}
                      >
                        <View
                          style={{
                            justifyContent: 'flex-start',
                            alignContent: 'flex-start',
                            paddingHorizontal:10,
                          }}>
                            {item.image && item.image !== ""?(
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
                            style={styles.brand}>
                            {item.brand}
                          </Text>
                          <Text
                            style={styles.name}>
                            {((item.name).length > maxlimit)?(((item.name).substring(0,maxlimit-3)) + '...'):item.name}
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
              <TouchableOpacity onPress={() => {navigation.navigate('addToCart')}}>
                <View style={styles.nextBtn}>
                  <NextBtn/>
                </View>
              </TouchableOpacity>
            </View>          
          </View>
          </>
          )}
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
    fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
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
    width:"100%",
  },
  subCategoriesView:{
    width:width*0.29,
  },
  flatlistContainer:{
    width:width*0.71,
  },
  box:{
    width:width*0.3,
    height:height*0.25,
    borderBottomWidth:1,
    borderBottomColor:"#3D3E48",
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  subImage:{
    width:35,
    height:35,
  },
  subName:{
    color:'#fff',
    fontSize:11,
    paddingHorizontal:12,
    marginTop:5,
  },
  cardConatiner: {
    width: width*0.30,
    marginTop:40,
    marginLeft:10
  },
  itemImage:{
    width: 65,
    height: 45,
    alignSelf: 'center',
    position:'relative',
    bottom:20
  },
  brand:{
    fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma', 
    color: '#D2D7F9',
    opacity: 0.5,
    fontSize: 12,
  },
  name:{
    fontSize: 14,
    color: '#ECDBFA',
    fontFamily: Platform.OS=='android'?'Montserrat-Bold':'Montserrat', 
    marginTop: 2,
    marginRight: "2%"
  },
  price:{
    color: '#DF2EDC',
    fontSize: 9,
    fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
    paddingVertical: 10,
  },
  sidePrice:{
    color: '#DF2EDC',
    fontSize: 9,
    fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
    paddingTop:5
  },
  selectedDetails:{
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
  },
  sideBrand:{
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
  },
  sideDetails:{
    color:'#fff',
    paddingLeft:2.5,
    paddingTop:5
  }
 
});

export default AdvanceBuilder;
