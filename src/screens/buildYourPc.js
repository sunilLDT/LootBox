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
  Alert,
} from 'react-native';
import Testing from './testing';
import Card from './card';
import Btn from './btn';
import Option1 from './1080P';
import Option2 from './2K';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getAllGames} from '../api/buildYourPc';
import AdvanceBuilderButton from '../components/AdvanceBuilderBtn';
import { SearchBar } from 'react-native-elements';
import { languagename } from '../components/LanguageName';
import { connect } from 'react-redux';
import PopUp from '../components/popup';

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
  };

  const popUpHandler=()=>{
    setPopModal(!popModal);
}

  const submitGames = () => {
    if (selected.length > 0) {
      navigation.navigate('PcDetails', { selectedGames: selected })
    }
    else {
      setPopModal(true);
      setContentModal(labels.pleaseSelectAGame);

    }
  }
  // const checkResolution = (res) => {
  //   setOpen(false)
  //   if (selected.length !== 0) {
  //     setPopModal(true);
  //     setContentModal(labels.chooseResolutionForGames);
  //   }
  //   else {
  //     setResolution(res);
  //   }
  // }
  const checkResolution = (res) => {
    setOpen(false)
      if(selected.length !== 0){
        Alert.alert(
          "Loot",
          "You can choose only one resolution for games",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => changeResolution(res)}
          ],
          { cancelable: false }
        );
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

  return (
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
             <PopUp visible={popModal} title={'Loot'} closeText={labels.ok} callBack={popUpHandler} content={contentModal}/>
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
              onPress={() => navigation.navigate('AdvanceBuilder', { fromCart: 0 })}>
              <View style={{
                height: 32,
                width: 153,
              }}>
                <AdvanceBuilderButton text={labels.advancedBuilder} />
              </View>
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
                width: 116,
                top: 10,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{ width: 116, }}
                onPress={() => {
                  checkResolution('1080P');
                }}>
                <Option1 selected={resolution === '1080P'} />
              </TouchableOpacity>
              <View style={{ position: 'relative', right: 48, width: 84, }}>
                <TouchableOpacity
                  onPress={() => {
                    checkResolution('2K')
                  }}>
                  <Option2 selected={resolution === '2K'} text="2K" />
                </TouchableOpacity>
              </View>
              <View style={{ position: 'relative', right: 94, width: 84 }}>
                <TouchableOpacity
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
            {open ? (
              <SearchBar
                placeholder={labels.searchGame}
                lightTheme round editable={true}
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                containerStyle={{
                  backgroundColor: '#D2D7F9',
                  marginTop: '-7%',
                  marginBottom: "3%",
                  marginHorizontal: "5%",
                  borderRadius: 10,
                }}
                inputContainerStyle={{ height: 20, backgroundColor: '#D2D7F9', marginTop: -5 }}
              />
            ) : null}
          </View>
          {loading ? (
            <View style={{ marginTop: height * 0.19 }}>
              <ActivityIndicator color="#ECDBFA" size="small" />
            </View>) : gameData.length === 0 ? (
              <Text style={{
                color: "#fff",
                lineHeight: 32,
                fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                fontSize: 15, marginTop: height * 0.18
              }}
              >{labels.noGameAvailable}
              </Text>
            ) : (
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
                              <Card text={item.name} image={item.image} />
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
                      <Btn text={labels.BuildYourPc} pay="" />

                    </TouchableOpacity>
                  </View>
                </>
              )}
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
const mapStateToProps = (state) => ({
  labels: state.languageReducer.labels,
})


export default connect(mapStateToProps)(BuildYourPc);
