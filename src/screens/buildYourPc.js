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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Testing from './testing';
import Card from './card';
import Btn from './btn';
import Option1 from './1080P';
import Option2 from './2K';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getAllGames} from '../api/buildYourPc';


const {width, height} = Dimensions.get('window');

const BuildYourPc = ({navigation}) => {
  const [selected, setSelected] = useState([]);
  const [resolution, setResolution] = useState('1080P');
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    getAllGames(resolution).then((response) => {
      setGameData(response.data); 
    });
  }, [resolution]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{width, height, overflowX: 'hidden'}}>
      <ImageBackground
        source={require('../assets/dottedBackground.png')}
        style={{
          width,
          minHeight: height,
          overflowX: 'hidden',
          backgroundColor: '#2A2D39',
          paddingHorizontal: width * 0.09,
          paddingVertical: width * 0.07,
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
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                borderRadius: 10,
                borderColor: '#C01C8A',
                borderWidth: 1.5,
                height: 32,
                width: 153,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={['rgba(184,37,154,0.16)', 'rgba(184,37,154,0.16)']}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#fff',
                  opacity: 0.87,
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                }}>
                Advanced Builder
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: '#ECDBFA',
            fontSize: 20,
            lineHeight: 28,
            // fontFamily: 'Michroma-Regular',
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
              style={{width: 116}}
              onPress={() => {
                setResolution('1080P');
              }}>
              <Option1 selected={resolution === '1080P'} />
            </TouchableOpacity>
            <View style={{position: 'relative', right: 50, width: 84}}>
              <TouchableOpacity
                onPress={() => {
                  setResolution('2K');
                }}>
                <Option2 selected={resolution === '2K'} text="2K" />
              </TouchableOpacity>
            </View>
            <View style={{position: 'relative', right: 100, width: 84}}>
              <TouchableOpacity
                onPress={() => {
                  setResolution('4K');
                }}>
                <Option2 selected={resolution === '4K'} text="4K" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => {}}>
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

        {gameData.map((i, k) => {
          return(
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
          );
        })}
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() =>
            navigation.navigate('PcDetails', {selectedGames: selected})
          }>
          <Btn />
        </TouchableOpacity>
        {/*
        <ActivityIndicator
          color="#ECDBFA"
          size="large"
          style={{
            marginVertical: height * 0.08,
          }}
        /> */}
      </ImageBackground>
    </ScrollView>
  );
};

export default BuildYourPc;
