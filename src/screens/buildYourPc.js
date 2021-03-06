import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet, 
  FlatList,
  SafeAreaView
} from 'react-native';
import Testing from './testing';
import Card from './card';
import Option1 from './1080P';
import Option2 from './2K';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getAllGames} from '../api/buildYourPc';
import { SearchBar } from 'react-native-elements';
import { languagename } from '../components/LanguageName';
import { connect } from 'react-redux';
import PopUp from '../components/popup';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, {
  DialogContent,
  SlideAnimation,
} from 'react-native-popup-dialog';
import AdvanceBuilderButton from '../assets/buildpc.png';
import BuildYourPcImg from '../assets/lootbuttons/iOS/maincta.png';

const {width, height} = Dimensions.get('window');

const BuildYourPc = ({ navigation, labels }) => {
  const [selected, setSelected] = useState([]);
  const [resolution, setResolution] = useState('1080P');
  const [gameData, setGameData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [arOren, setarOren] = useState('en');
  const [popModal, setPopModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const [chooseModal,setChooseModal] = useState(false);
  const [reso,setRes] = useState('1080P');
 console.log( selected)
  languagename().then(res => setarOren(res))

  useEffect(() => {
    setLoading(true)
    getAllGames(resolution).then((response) => {
      setGameData(response.data);
      setFilterData(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log("getAllGames" + error);
      setLoading(false)
    });
  }, [resolution]);

  const changeResolution = (res) => {
    setSelected([]);
    setResolution(res);
    setChooseModal(!chooseModal)
  };

  const popUpHandler=()=>{
    setPopModal(!popModal);
}
  // const backHandle = () => {
  //   setPopModal(!popModal);
  //   return true;
  // }

  const submitGames = () => {
    if (selected.length > 0) {
      navigation.navigate('PcDetails', { selectedGames: selected })
    }
    else {
      setPopModal(true);
      setContentModal(labels.pleaseSelectAGame);

    }
  }
  
  const checkResolution = (res) => {
    setRes(res)
    setOpen(false)
      if(selected.length !== 0){
        setChooseModal(!chooseModal)
      }
      else{
        setResolution(res);
      }
  }

  const handleSearch = (text) => {
    if (text) {
      const newData = gameData.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilterData(newData)
      setQuery(text);
    } else {
      setFilterData(gameData);
      setQuery(text);
    }
  };

  const openClose = () => {
    setOpen(!open);
  };
  const handlePress = () => {
    setChooseModal(!chooseModal)
    return true;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={{ backgroundColor: '#292633', width: '100%', height: '100%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width, height, overflowX: 'hidden' }}
      >
        <ImageBackground
          source={require('../assets/signup.png')}
          style={{
            width,
            minHeight: height,
            overflowX: 'hidden',
            backgroundColor: '#2A2D39',
            paddingHorizontal: width * 0.09,
          }}>
             <PopUp visible={popModal} title={'Loot'} closeText={labels.ok}  callBack={popUpHandler} content={contentModal}/>
             <Dialog
                visible={chooseModal}
                onTouchOutside={() => { setChooseModal(!chooseModal) }}
                dialogStyle={{ backgroundColor: '#272732', width: "70%",paddingHorizontal:0 }}
                dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })}
                onHardwareBackPress={() => handlePress()}
              > 
                <View>
                  <View style={{
                    alignItems:'center',               
                    height:45,
                  }}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#865CF4', '#C01C8A',]} style={{
                        flex: 1,
                        borderRadius: 5,
                        width:"100%"
                    }}>
                      <Text style={{
                        fontSize: 18,
                        fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma', 
                        textAlign: 'center',
                        color: '#ffffff',
                        backgroundColor: 'transparent',
                      }}>
                        {labels.lootBox}
                      </Text>
                    </LinearGradient>
                  </View>
                  <DialogContent >
                    <View style={{
                      alignItems:'center',
                      paddingVertical:"15%"
                    }}>
                      <Text style={{
                        color:'#fff',
                        fontSize:15,
                        fontFamily:
                        Platform.OS == 'android'
                          ? 'Montserrat-Light'
                          : 'Montserrat',
                          paddingHorizontal:20
                      }}>
                        {labels.chooseResolutionForGames}
                      </Text>
                    </View>
                  </DialogContent>
                </View>
                  <View style={{
                      borderTopWidth:0.5,
                      borderColor:'#fff',
                      flexDirection:'row',
                      justifyContent:'space-between'
                    }}>
                      <TouchableOpacity style={{
                        width:"50%",
                        alignItems:'center',
                        borderRightWidth:0.5,
                        borderColor:"#fff",
                        paddingVertical:5
                        }} onPress={() => setChooseModal(!chooseModal)}>
                        <Text style={{
                          color:'#fff',
                          fontSize:18,
                          fontFamily:
                          Platform.OS == 'android'
                        ? 'Montserrat-Light'
                        : 'Montserrat',
                        }}>
                          {labels.cancel}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{
                        width:"50%",
                        alignItems:'center',
                        paddingVertical:5,
                        }} onPress={() => changeResolution(reso)}>
                        <Text style={{
                          color:'#fff',
                          fontSize:18,
                          fontFamily:
                          Platform.OS == 'android'
                        ? 'Montserrat-Light'
                        : 'Montserrat',
                        }}>
                          {labels.ok}
                        </Text>
                      </TouchableOpacity>
                    </View>
              </Dialog>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../assets/back.png')}
                resizeMode="contain"
                style={{
                  width: 48,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('AdvanceBuilder', { fromCart: 0 })}
            >
              <ImageBackground
                source={AdvanceBuilderButton}
                style={{
                  width:170,
                  height:48,
                  justifyContent:'center',
                  alignItems:'center',
                }}
              >
                <Text style={{
                  color:'#fff',
                  fontSize:14,
                  fontFamily:Platform.OS == 'android'? 'Montserrat-Bold':'Montserrat',
                }}>{labels.advancedBuilder}</Text>
              </ImageBackground>
            </TouchableOpacity>
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
                lineHeight: 28,
                fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
              }}>
              {labels.buildHeading}
            </Text>
          </View>
          
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: height * 0.04,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width:116,
                top: 10,
                display: 'flex',
                flexDirection: 'row',
              }}>
               <View style={{ position: 'relative',borderWidth:2,borderColor: 'rgba(0, 0, 0, .000001)', right:arOren == "ar"?14: 38, width: 116,}}> 
              <TouchableOpacity
                style={{ 
                  position:'relative',
                  right:arOren == "ar"?-12: -36
                }}
                onPress={() => {
                  checkResolution('1080P');
                }}>
                <Option1 selected={resolution === '1080P'} />
              </TouchableOpacity>
              </View> 
              <View style={{ position: 'relative',borderWidth:2,borderColor: 'rgba(0, 0, 0, .000001)', right:arOren == "ar"?14: 84, width: 84 }}>
                <TouchableOpacity
                  style={{
                    position:'relative',
                    right:arOren == "ar"?35: -35
                  }}
                  onPress={() => {
                    checkResolution('2K')
                  }}>
                  <Option2 selected={resolution === '2K'} text="2K" />
                </TouchableOpacity>
              </View>
              <View style={{ position: 'relative',borderWidth:2,borderColor: 'rgba(0, 0, 0, .000001)', right:arOren == "ar"?50: 80, width: 84 }}>
                <TouchableOpacity
                  style={{
                    position:'relative',
                    right:arOren == "ar"?47:18
                  }}
                  onPress={() => {
                    checkResolution('4K');
                  }}>
                  <Option2 selected={resolution === '4K'} text="4K" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => openClose()}>
              <Image
                resizeMode="contain"
                source={require('../assets/buildYourPc/search.png')}
                style={{
                  height: 28,
                  width: 80,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            {open &&  arOren == "en" ? (
              <SearchBar
                placeholder={labels.searchGame}
                round editable={true}
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                containerStyle={{
                   elevation:0,
                   backgroundColor:'#D2D7F9',
                   marginTop: '-7%',
                   marginBottom: "3%",
                   marginHorizontal: "5%",
                   borderRadius: 20,
                  }}
                inputContainerStyle={{ height: 30, backgroundColor: '#D2D7F9',}}
                inputStyle={{padding:0}}

              />
            ) : open &&  arOren == "ar"?(
              <SearchBar
                placeholder={labels.searchGame}
                round editable={true}
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                containerStyle={{
                   elevation:0,
                   backgroundColor:'#D2D7F9',
                   marginTop: '-7%',
                   marginBottom: "3%",
                   marginHorizontal: "5%",
                   borderRadius: 20,
                  }}
                inputContainerStyle={{ height: 30, backgroundColor: '#D2D7F9',}}
                inputStyle={{paddingTop:5,marginTop:5, textAlign:"right"}}
                />
            ):null}
          </View>
          {loading ? (
            <View style={{ marginTop: height * 0.19 }}>
              <ActivityIndicator color="#ECDBFA" size="small" />
            </View>) : filterData.length === 0 ? (
              <Text style={{
                color: "#fff",
                lineHeight: 32,
                fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                fontSize: 15, marginTop: height * 0.18
              }}
              >{labels.noGameAvailable}
              </Text>
            ) :(
                <>
                  <FlatList
                    keyExtractor={(item) => item.name}
                    showsVerticalScrollIndicator={false}
                    data={filterData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }, k) => {
                      return (
                        <View key={k} style={{ width: '100%', marginVertical: 10 }}>
                          {!selected.includes(item.game_id) ? (
                            <TouchableWithoutFeedback
                              activeOpacity={0.2}
                              onPressIn={() => {
                                setSelected([...selected, item.game_id]);
                              }}>
                              <Card x={200} text={item.name} image={item.image} />
                            </TouchableWithoutFeedback>
                          ) : (
                              <TouchableWithoutFeedback
                                activeOpacity={0.2}
                                onPressIn={() => {
                                  setSelected(selected.filter((x) => x !== item.game_id));
                                }}>
                                <Testing text={item.name} image={item.image} />
                              </TouchableWithoutFeedback>
                            )}
                        </View>
                      );
                    }
                    }
                  />
                  <View style={styles.bottom}>
                    <TouchableOpacity
                      activeOpacity={0.1}
                      onPress={() =>
                        submitGames()
                      }>
                      <ImageBackground
                        source={BuildYourPcImg}
                        style={{
                          width:315,
                          height:48,
                          justifyContent:'center',
                          alignItems:'center',
                          marginBottom:15
                        }}
                      >
                        <Text style={{
                          color:'#fff',
                          fontSize:18,
                          fontFamily:Platform.OS == 'android'? 'Montserrat-Bold':'Montserrat',
                        }}>
                          {labels.BuildYourPc}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </>
              )}
        </ImageBackground>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#292633',
    marginTop:-15,
  },
});
const mapStateToProps = (state) => ({
  labels: state.languageReducer.labels,
})


export default connect(mapStateToProps)(BuildYourPc);