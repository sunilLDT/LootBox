import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import Testing from './testing';
import Card from './card';
import Btn from './btn';
import Option1 from './1080P';
import Option2 from './2K';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getAllGames } from '../api/buildYourPc';
import AdvanceBuilderButton from '../components/AdvanceBuilderBtn';


const { width, height } = Dimensions.get('window');

const BuildYourPc = ({ navigation }) => {
  const [selected, setSelected] = useState([]);
  const [resolution, setResolution] = useState('1080P');
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    getAllGames(resolution).then((response) => {
      setGameData(response.data);
      setLoading(false)
    }).catch((error) => {
      console.log("getAllGames" +error);
      setLoading(false)
    });
  }, [resolution]);

  const submitGames = () => {
    if(selected.length > 0){
    navigation.navigate('PcDetails', { selectedGames: selected })
    } 
  }

  return (
    <View style={{backgroundColor:'#292633', width:'100%', height:'100%'}}>
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ width, height, overflowX: 'hidden' }}
    >
      <ImageBackground
        source={require('../assets/dottedBackground.png')}
        style={{
          width,
          minHeight: height,
          overflowX: 'hidden',
          backgroundColor: '#2A2D39',
          paddingHorizontal: width * 0.09,
        }}>
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
            onPress={() => navigation.navigate('AdvanceBuilder')}>
              <View style={{
                  height: 32,
                  width: 153,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AdvanceBuilderButton />
              </View>
          </TouchableOpacity>
          </View>

          <Text
          style={{
            color: '#ECDBFA',
            fontSize: 20,
            lineHeight: 28,
            fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
          }}>
          Select graphics and games to build your PC
          </Text>
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
                  style={{ width: 116 }}
                  onPress={() => {
                    setResolution('1080P');
                  }}>
                  <Option1 selected={resolution === '1080P'} />
                </TouchableOpacity>
                <View style={{ position: 'relative', right: 48, width: 84,  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setResolution('2K');
                    }}>
                    <Option2 selected={resolution === '2K'} text="2K" />
                  </TouchableOpacity>
                </View>
                <View style={{ position: 'relative', right: 94, width: 84 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setResolution('4K');
                    }}>
                    <Option2 selected={resolution === '4K'} text="4K" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => { }}>
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
          {gameData.map((i, k) => (
            <View key={k} style={{width: '100%', marginVertical: 10}}>
              {!selected.includes(i.game_id) ? (
                <TouchableWithoutFeedback
                  activeOpacity={0.2}
                  onPressIn={() => {
                    setSelected([...selected, i.game_id]);
                  }}>
                  <Card text={i.name} image={i.image} />
                </TouchableWithoutFeedback>
              ) : (
                  <TouchableWithoutFeedback
                    activeOpacity={0.2}
                    onPressIn={() => {
                      setSelected(selected.filter((x) => x !== i.game_id));
                    }}>
                    <Testing text={i.name} image={i.image} />
                  </TouchableWithoutFeedback>
                )}
            </View>
          ))}
          {gameData.length === 0?(
          <View style={{marginTop: height * 0.27}}>
            <ActivityIndicator color="#ECDBFA" size="small" />
          </View>):
          (
          <View style={styles.bottom}>
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() =>
                submitGames()
              }>
                <Btn text="BUILD YOUR PC" pay= "" />
              
            </TouchableOpacity>
          </View>
          )}
      </ImageBackground>
    </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default BuildYourPc;
