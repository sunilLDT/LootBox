import React, { useState, useEffect, useRef } from 'react';
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
import IcCardImage from '../../assets/itemBack.png';
import selectedIcCardImage from '../../assets/itemhover.png';
import backImage from '../../assets/back.png';
import searchImage from '../../assets/ic_search.png';
import filterImage from '../../assets/ic_filter.png';
import { addToCartAdvance, advancedBuilderItems,itemsAddedInCartApi,removeItemAPI, } from '../../api/buildYourPc';
import LinearGradient from 'react-native-linear-gradient';
import thumbnail from '../../assets/thumbnail.png';
import NextBtn from '../../components/NextBtn';
import SubCatBg from '../../assets/buildYourPc/Rectangle.png';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { packageActions } from '../../actions/package';
import { cartActions } from '../../actions/user';
import TickImage from '../../assets/tick.png';
import ItemDetails from '../PcDetails/ItemDetails';
import Dialog, {
  DialogContent,
  SlideAnimation,
} from 'react-native-popup-dialog';
import Filter from '../filter';
import PopUp from '../../components/popup';
import {languagename} from '../../components/LanguageName';
const { width, height } = Dimensions.get('window');


const AdvanceBuilder = (props) => {
  const propsFocused = props.navigation.isFocused();
  const {fromCart} = props.route.params;
  const {labels} = props;
  const scrollRef = useRef();
  const [subCategoryId, setSubCategoryid] = useState("");
  const [items, setItems] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [tick, setTick] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [subCatIndex, setSubCatIndex] = useState();
  const [maxIndex, setMaxIndex] = useState(0);
  const [linkedItems, setLinkedItems] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectStatus, setSelctStatus] = useState([]);
  const [isOptional,setIsOptional] = useState([]);
  const [isMultiple,setIsMultiple] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterValues, setFilterApplied] = useState({});
  const [cartAddedFilterItems,setCartAddedFilterItems] = useState([]);
  const [cartItemId,setCartItemId] = useState([]);
  const [ItemToDelete,setItemToDelete] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const [storeSubCatId,setStoreSubCatId] = useState();
  const [block,setBlock] = useState(0);
  const maxlimit = 20;
  const [arOren, setarOren] = useState('en');
  const [loadingItem, setLoadingItem] = useState(false)
  const kd = labels.kD;
  languagename().then((res) => setarOren(res));

  const selectedSubCategoryAdvance = (arr) => {
    let a = []
    arr.forEach(function (obj, index) {
      let b = {}
      b.cart_item_id = obj.cart_item_id
      b.item_id = obj.item_id
      a.push(b)
    });
    setCartItemId(a)
  }

  const popUpHandler=()=>{
    setPopModal(!popModal);
  }

  function filterIsOPtion(arr) {
    let isMultipleArray = [];
    let optionalArray = [];
    for(let sub of arr){
      if(sub.is_optional === true){
        optionalArray.push(sub.sub_category_id)
      }
      if(sub.is_multiple === true){
        isMultipleArray.push(sub.sub_category_id)
      }
    }
    setIsOptional(optionalArray)
    setIsMultiple(isMultipleArray)
  }
  
  useEffect(() => {
    props.categoryList();
    if(fromCart === 1){
      cartAddedFilterItems.map((subCat, i) => {
        if(i == 0){
          setSubCategoryid(subCat.sub_category_id)
        }
      })
      itemsAddedInCartApi().then((response) => {
        setCartAddedFilterItems(response.data)
        selectedSubCategoryAdvance(response.data)
        setItemList(response.data)
        
        var total = 0
        for (var i = 0, _len = response.data.length; i < _len; i++) {
          total += parseFloat(response.data[i]['price'])
        }
        setTotalPrice(total.toFixed(3))
        }).catch(error => console.log("itemsAddedInCartApi" + error))

        let index = selectStatus.find(obj => obj.status === false);
        if (!index) {
          setShowSubmit(true)
        }
        
    }
    setMaxIndex(props.categories.length);
    filterIsOPtion(props.categories);
    
    props.categories.map((subCat, i) => {
      if (i == 0) {
        setSubCategoryid(subCat.sub_category_id)
        props.categorySubCatgoryList(props.firstSubCatid)
      }
    });
    getStatus(props.categories);
    
  }, [propsFocused]);

  const getStatus = (arr) => {
    let a = []
    arr.forEach(function (obj, index) {
      let b = {}
      b.id = obj.sub_category_id
      b.status = false
      a.push(b)
    });
    setSelctStatus(a)
  }

  const setStatus = (catId) => {
    let a = selectStatus;
    let objIndex = a.findIndex((obj => obj.id == catId));    
    a[objIndex].status = true;
    setSelctStatus(a)
  }

  const subCategoryFun = (subCatId, index, source,ids) => {
    setSubCatIndex(index)
    if(fromCart === 1){
      scrollRef.current?.scrollTo({
        animated: true,
      });
      ids = ids.filter( function( item ) {
        for( var i=0, len=itemList.length; i<len; i++ ){
          if( itemList[i].item_id == item.item_id ) {
              return false;
          }
        }
        return true;
      });
      removeAdvanceBuilderItems(ids)
    }
    if (source == 1 || !filterValues) {
      scrollRef.current?.scrollTo({
        animated: true,
      });
      setSubCategoryid(subCatId);
      let id = subCatId;
      //Opn for new Logic
      /* if (subCatId == linkedItems.linkedItemId) {
         let result = itemList.find(x => x.sub_category_id === linkedItems.catId);
         id = result.item_id;
       }*/
      advancedBuilderItems(id, filterValues.filter_custome_field_id, filterValues.filter_custome_values).then((response) => {
        setItems(response.data)
        setFilteredDataSource(response.data)
        setLoadingItem(false)
      })
    } else {
        let objIndex = selectStatus.findIndex(obj => obj.id === subCatId);
        const statusOfSelect =  selectStatus[objIndex].status;
        if(statusOfSelect === true){
          scrollRef.current?.scrollTo({
            animated: true,
          });
          let id = subCatId;
          setSubCategoryid(id);
          advancedBuilderItems(id, filterValues.filter_custome_field_id, filterValues.filter_custome_values).then((response) => {
            setItems(response.data)
            setFilteredDataSource(response.data)
            setLoadingItem(false)
          })
        }
    }

  }

  const openClose = () => {
    setOpen(!open)
  }

  function removeAdvanceBuilderItems(arr){
    let itemsToDel = [];
    for(let cartItem of arr){
      itemsToDel.push(cartItem.cart_item_id)
    }
    setItemToDelete(itemsToDel)
  }

  const finalSubmit = async () => {
    setLoadingItem(true)
    try{
      if(fromCart === 1 && ItemToDelete.length !== 0){
        const removeitemConst = await removeItemAPI(ItemToDelete);
        console.log(removeitemConst)
      }
      let result = itemList.map(({ item_id}) => ({ item_id, quantity: 1, is_advance_builder: 1 }));
      const addResponse = await addToCartAdvance(result);
      if(addResponse.code == 200){
        props.add()
        props.navigation.navigate('cart');
      }
    }catch(e){
      console.log("final submit error "+e)
    }
     setLoadingItem(false)
  }

  const submitNow = (ids) => {
    setLoadingItem(true)
    scrollRef.current?.scrollTo({
      animated: true,
    });
    let i
    if(isOptional.includes(subCategoryId)){
     let objIndex = selectStatus.findIndex((obj => obj.id == subCategoryId));
     const statusOfSelect =  selectStatus[objIndex].status;
     if(statusOfSelect === false){
      setLoadingItem(false)
      setStatus(subCategoryId)
      i = selectedIndex + 1;
      setSelectedIndex(i)
     }
     else{
      i = selectedIndex;
      if(fromCart === 1){
        i = selectedIndex + 1;
        setSelectedIndex(i)
      }
     }
    }
    else{
      if(fromCart === 1){
        i = selectedIndex + 1;
        setSelectedIndex(i)
        setStatus(subCategoryId)
      }
      else{
        i = selectedIndex;
        setSelectedIndex(i) 
      }
      
    }

    let subCatId = props.categories[i];
    // if (subCatId.link_item_available) {
    //   setLinkedItems({ catId: subCatId.sub_category_id, linkedItemId: subCatId.link_item_available })
    // }
  
    if(!isOptional.includes(subCategoryId)){
      if(checkSelectedForNext()){
        subCatId && subCategoryFun(subCatId.sub_category_id, i, 1,cartItemId);
      }
      else{
        setPopModal(true);
        setContentModal(labels.selectoneitem);
        setLoadingItem(false)
      }
      
    }
    else{
      subCatId && subCategoryFun(subCatId.sub_category_id, i, 1,cartItemId);
    }
    // setTick([...tick, subCatId.sub_category_id]);

    let index = selectStatus.find(obj => obj.status === false);
    if (!index) {
      setShowSubmit(true)
    }
    // setLoadingItem(false)
  }

  
  const checkSelectedForNext = () => {
    return itemList.some(function (el) {
      return el.sub_category_id === subCategoryId;
    });
  }

  const checkSelectedForNextForMultiple = () => {
    return itemList.some(function (el) {
      return el.sub_category_id === subCategoryId;
    });
  }

  const selectItem = (i,ids) => {
    let result = itemList.some(x => x.sub_category_id === i.sub_category_id);
    if (!result) {
      setStoreSubCatId(i.sub_category_id);
      setStatus(i.sub_category_id);
      let k = selectedIndex;
      if(storeSubCatId !== i.sub_category_id){
        let objIndex = selectStatus.findIndex((obj => obj.id == i.sub_category_id));
        const statusOfSelect =  selectStatus[objIndex].status;
        if(statusOfSelect === true){
          if(!isOptional.includes(i.sub_category_id)){
            k = k + 1;
          }
          else{
            let objIndex = selectStatus.findIndex((obj => obj.id == i.sub_category_id));
            const statusOfSelect =  selectStatus[objIndex].status;
            if(statusOfSelect === true){
              if(subCatIndex >= selectedIndex){
                k = k+1;
              }

              console.log("selected index in second ======")
              console.log(selectedIndex)
              console.log("subcat index here******** ======")
              console.log(subCatIndex)
              
            }
          }
        }
      }
      setSelectedIndex(k);
      setTick([...tick, i.sub_category_id]);
      
    }

    var data = itemList;
    const checkitemExist = () => {
      return itemList.some(function (el) {
        return el.item_id === i.item_id;
      });
    }

    if(isMultiple.includes(subCategoryId)){
      if(checkitemExist()){
        for(var j = 0; j < data.length; j++) {
          if(data[j].item_id == i.item_id) {
              data.splice(j,1)
          }
        }
      }else{
        data.push(i)
        setItemList(data);
      }
    }
    else{
      if(checkSelectedForNextForMultiple()){
        let objIndex = data.some((obj => obj.sub_category_id == i.sub_category_id));
        if(objIndex === true){
          for(var j = 0; j < data.length; j++) {
            if(data[j].sub_category_id == i.sub_category_id) {
              if(data[j].item_id == i.item_id){
                if(isOptional.includes(data[j].sub_category_id)){
                  data.splice(j,1)
                }
              }else{
                data.splice(j,1)
                data.push(i)
              } 
              if(fromCart === 1){
                setStatus(i.sub_category_id)
              }
            }
          }
        }
      }else{
        data.push(i)
      }

    }
    if(fromCart === 1){
      ids = ids.filter( function( item ) {
        for( var i=0, len=itemList.length; i<len; i++ ){
            if( itemList[i].item_id == item.item_id ) {
                return false;
            }
        }
        return true;
      });
      removeAdvanceBuilderItems(ids)
    }
   
      var total = 0
      for (var i = 0, _len = data.length; i < _len; i++) {
        total += parseFloat(data[i]['price'])
      }
      setTotalPrice(total.toFixed(3))
     
      let index = selectStatus.find(obj => obj.status === false);
      if (!index) {
        setShowSubmit(true)
      }
      else if(fromCart === 1){
        setShowSubmit(true)
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
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(items);
      setSearch(text);
    }
  };


  const getName = (id) => {
    let a = itemList;
    for (var j = 0; j < a.length; j++) {
      if (a[j].sub_category_id === id) {
        return a[j].name.lenght > maxlimit ? (((a[j].name).substring(0, maxlimit - 3)) + '...') : a[j].name;
        break;
      }
    }
    return ''
  };

  const getPrice = (id) => {
    let a = itemList;
    for (var j = 0; j < a.length; j++) {
      if (a[j].sub_category_id === id) {
        return kd + a[j].price;
        break;
      }
    }
    return ''
  };

  const idExists = (id) => {
    return itemList.some(function (el) {
      return el.item_id === id;
    });
  }

  const subCatExists = (id) => {
    return itemList.some(function (el) {
      return el.sub_category_id === id;
    });
  }
  const onPressTouch = () => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  }

  useEffect(() => {
    if (filterValues)
    {advancedBuilderItems(subCategoryId, filterValues.filter_custome_field_id, filterValues.filter_custome_values).then((response) => {
      let d = {
        "name": response.data[0].name,
        "price": response.data[0].price,
        "sub_category_id": response.data[0].sub_category_id
      }
      setItems(response.data)
      setFilteredDataSource(response.data)
    })}

  }, [filterValues, subCategoryId,propsFocused])

  const handleFilters = (filterValues) => {
    setFilterApplied(filterValues)
    setFilter(false);
    // fetchData()
  }

  const handlePress = () => {
    setFilter(!filter)
    return true;
  }

  return (
    <View
      style={{
        backgroundColor: '#261D2A',
        flex:1
      }}>
      <ImageBackground
        source={require('../../assets/dottedBackground.png')}
        style={styles.background}
      >
         <PopUp visible={popModal} title={'Loot'} closeText={labels.ok} callBack={popUpHandler} content={contentModal}/>
        <ScrollView
          ref={scrollRef}
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
              <TouchableOpacity onPress={() => openClose()}>
                <Image
                  resizeMode="contain"
                  source={searchImage}
                  style={{
                    width: 48,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilter(true)}>
                <Image
                  resizeMode="contain"
                  source={filterImage}
                  style={{
                    width: 48,
                  }}
                />
              </TouchableOpacity>
            </View>

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
                      <Filter labels={props.labels} type="advanceBuilder" filter1={(r) => handleFilters(r)} initalValues={filterValues} selectedSubCategory={selectedIndex} allCategories={items} />
                    </View>
                </DialogContent>
            </Dialog>

          </View>
          {open &&  arOren == "en"?
            <SearchBar
              placeholder={props.labels.typeHere}
              round editable={true}
              value={search}
              onChangeText={(text) => searchFilterFunction(text)}
              containerStyle={{
                backgroundColor: '#D2D7F9',
                marginBottom: 10,
                marginHorizontal: width * 0.1,
                borderRadius: 20,
              }}
              inputContainerStyle={{ height: 36, backgroundColor: '#D2D7F9',}}
              inputStyle={{padding:0}}
            /> : open &&  arOren == "ar"?(
              <SearchBar
              placeholder={props.labels.typeHere}
              round editable={true}
              value={search}
              onChangeText={(text) => searchFilterFunction(text)}
              containerStyle={{
                backgroundColor: '#D2D7F9',
                marginBottom: 10,
                marginHorizontal: width * 0.1,
                borderRadius: 20,
              }}
              inputContainerStyle={{ height: 38, backgroundColor: '#D2D7F9',}}
              inputStyle={{paddingTop:5,marginTop:5, textAlign:"right"}}
              />
            ):null}
          {props.loadingCat ? (
            <View style={{ marginTop: height * 0.37 }}>
              <ActivityIndicator color="#ECDBFA" size="small" />
            </View>
          ) : (
              <>
                <View>
                  <Text style={styles.advanceBuilderText}>{labels.advanceBuilder}</Text>
                  <Text style={styles.lineText}>{labels.selectTheMost}</Text>
                </View>

                <View style={styles.mainContainer}>
                  <View style={styles.subCategoriesView}>
                    <ImageBackground source={SubCatBg} style={{ width: 100 }}>
                      {!props.loadingCat ? props.categories.map((part, index) => {
                        return (
                          <TouchableOpacity key={index} onPress={() => {
                            setFilterApplied({});
                            subCategoryFun(part.sub_category_id, index, fromCart === 1?1:0,cartItemId)
                          }}>
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
                                    right: 75,
                                    top: 18,
                                    zIndex: 100,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                </LinearGradient>
                              ) : tick === part.sub_category_id ? (
                                <Image
                                  source={TickImage}
                                  style={styles.tick}
                                />
                              ) : null}
                              {subCatExists(part.sub_category_id) ? <Image
                                source={TickImage}
                                style={styles.tick}
                              /> : null}
                              {part.logo !== ""?(
                                <Image style={styles.subImage}
                                resizeMode="contain"
                                source={{uri:part.logo}}
                              />
                              ):(
                                <Image style={styles.subImage}
                                resizeMode="contain"
                                source={thumbnail}/>
                              )}
                              
                              <Text
                                style={styles.subName}
                                numberOfLines={2}
                              > {((part.name).length > maxlimit) ? (((part.name).substring(0, 12 - 3)) + '...') : part.name}
                              </Text>
                              <View style={styles.selectedDetails}>
                                <View style={styles.sideBrand}>
                                  <Text style={styles.sideDetails}>
                                    {part.subName}
                                  </Text>
                                  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.sideDetails}>
                                    {((getName(part.sub_category_id)).length > maxlimit) ? (((getName(part.sub_category_id)).substring(0, 12 - 3)) + '...') : getName(part.sub_category_id)}
                                    {}
                                  </Text>
                                </View>
                                <Text>
                                  <Text style={styles.price}>{getPrice(part.sub_category_id)}</Text>
                                </Text>
                              </View>
                            </View>
                            <View style={{ width: '100%', height: 1, borderColor: '#424242', marginTop: 40, borderWidth: 0.5 }}></View>
                          </TouchableOpacity>
                        );
                      }) : null}
                    </ImageBackground>
                  </View>
                  {items ?
                    <View style={styles.flatlistContainer}>
                     {
                    loadingItem ? <View style={{ marginTop: height * 0.20 }}><ActivityIndicator  color="#ECDBFA" size="small"  /></View>:
                      <FlatList
                        keyExtractor={(item) => item.item_id}
                        data={filteredDataSource}
                        renderItem={({ item }, index) => {
                          const maxlimit = 22;
                          // console.log("75847586568567567867867")
                          // console.log(loadingItem)
                          return (
                            
                            <TouchableOpacity onPress={() => {
                            selectItem(item,cartItemId) 
                            // onPressTouch()
                            }
                            }>
                              <ImageBackground
                                // onPress={() => { }}
                                style={{}}
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
                                  <View
                                    style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  }}>  
                                    <Text
                                      style={styles.brand}>
                                      {item.brand}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  }}>  
                                    <Text ellipsizeMode='tail' numberOfLines={1}
                                      style={styles.name}>
                                      {((item.name).length > maxlimit) ? (((item.name).substring(0, 12 - 3)) + '...') : item.name}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  }}>  
                                    <Text
                                      style={styles.price}>
                                      {kd} {item.price}
                                    </Text>
                                  </View>
                                </View>
                              </ImageBackground>
                              <ItemDetails
                                itemid={item.item_id}
                                styleForArrow={1}
                              />
                            </TouchableOpacity>
                            
                          );
                        }}
                        numColumns={2}
                      />
                     }


                      
                      
                    </View> :filteredDataSource.length === 0 ?(
                      <Text style={{
                        color: "#fff",
                        lineHeight: 32,
                        fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                        fontSize: 15,
                        marginTop: height * 0.5
                      }}
                      >{labels.noGameAvailable}
                      </Text>
                    ): (<ActivityIndicator color="#ECDBFA" size="small" />)}
                </View>
              </>
            )}
        </ScrollView>
        {showSubmit ?
        <TouchableOpacity style={{
          width: '80%',
          height:60,
          marginLeft:"25%",
        }}  onPress={() => { finalSubmit(cartItemId) }}>
          <View >
            <NextBtn name={props.labels.submit} kd={kd} price={totalPrice} />
          </View>
        </TouchableOpacity> :
        <TouchableOpacity style={{
          width: '80%',
          height:60,
          marginLeft:"25%"
        }}  
        onPress={() => { submitNow(cartItemId) }}>
          <View>
            <NextBtn name={props.labels.Next} kd={kd} price={totalPrice} />
          </View>
        </TouchableOpacity>
       }
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    
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
    width: width * 0.3,
  },
  flatlistContainer: {
    width: width * 0.71,
  },
  box: {
    width: width * 0.28,
    height: height * 0.12,
    // borderBottomWidth: 0.3,
    // borderBottomColor: "#3D3E48",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  subImage: {
    width: 35,
    height: 35,
  },
  subName: {
    fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
    color: '#e6e6e6',
    fontSize: 9,
    paddingHorizontal: 12,
    textAlign:'center',

  },
  cardConatiner: {
    width: 122,//width * 0.32,122,
    height: 145,//height * 0.17,150,
    marginTop: 40,
    borderRadius: 20,
    marginLeft: 5,
    resizeMode: 'center',
  },
  itemImage: {
    width: 75,
    height: 55,
    alignSelf: 'center',
    position: 'relative',
    bottom: 20,
    borderRadius:7,
    // resizeMode:"center"

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
    paddingLeft: 2.5,
    fontSize: 9,
    color: '#ffffff',
    fontFamily: Platform.OS == 'android' ? 'Montserrat Regular' : 'Montserrat',

  },
  tick: {
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
  loadingCat: state.packageReducer.loadingCat,
  labels: state.languageReducer.labels,
  firstSubCatid:state.packageReducer.firstSubCatid,
  //selectStatus:state.packageReducer.selectStatus
})

const actionCreators = {
  categoryList: packageActions.getAdvanceCatList,
  categorySubCatgoryList: packageActions.getAdvanceSubCatList,
  updateCat: packageActions.updateCat,
  add: cartActions.addCartAction,

};

export default connect(mapStateToProps, actionCreators)(AdvanceBuilder);
