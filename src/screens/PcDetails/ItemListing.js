import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import IcCardImage from '../../assets/ic_card_a0.png';

const {width, height} = Dimensions.get('window');

const ItemListing = ({navigation, route}) => {
  const {items} = route.params;
  return (
    <ImageBackground
      source={require('../../assets/plainBg.png')}
      style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={styles.backButtonContentConatiner}>
          <Image
            source={require('../../assets/back.png')}
            resizeMode="contain"
            style={styles.backImage}
          />
        </View>
      </TouchableOpacity>
      <FlatList
        keyExtractor={(item) => item.name}
        data={items || []}
        renderItem={({item}, index) => {
          return (
            <ImageBackground
              source={IcCardImage}
              style={styles.cardConatiner}
              key={index}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Image
                  source={{uri:item.image}}
                  style={{width: 48, height: 40, marginBottom: 10, alignSelf: 'center'}}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: 10,
                  }}>
                  {item.brandName}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: 10,
                    opacity: 0.5,
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#FFFFFF',
                    marginBottom: 10,
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                  +KD {item.price}
                </Text>
              </View>
            </ImageBackground>
          );
        }}
        numColumns={3}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#2A2D39',
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.04,
  },
  backButtonContentConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backImage: {
    width: 48,
  },
  backTitle: {
    paddingHorizontal: 20,
    fontSize: 12,
    opacity: 0.5,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  cardConatiner: {
    width: 108,
    height: 131,
    margin: 10,
  },
});

export default ItemListing;
