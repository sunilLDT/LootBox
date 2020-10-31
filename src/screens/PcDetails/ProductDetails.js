import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BackgroundImage from '../../assets/buildYourPc/triangleBg.png';
import GameImage from '../../assets/buildYourPc/games.png';
import Btn from '../btn';
import ExpandImage from '../../assets/ic_expand1.png';
import { ScrollView } from 'react-native-gesture-handler';
import ItemCard from '../../assets/ic_card.png';
import { packageDetailsById } from '../../api/buildYourPc';
import ListDetails from '../PcDetails/List';

const { width, height } = Dimensions.get('window');

const ProductDetails = ({ navigation, route }) => {

  const { PackageId } = route.params;

  const [packageDetailsData, setPackageDetailsData] = useState({});

  const [packageDetails, setPackageDetails] = useState([]);

  useEffect(() => {
    packageDetailsById(PackageId).then((response) => {
      setPackageDetails(response.data.items);
      setPackageDetailsData(response.data);
    }).catch((error) => {
      console.log("PackageDetails" + error);
    });
  }, [PackageId]);


  const [showCpuPerocessersList, setShowCpuProcesserList] = React.useState(false,);

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
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
      <ScrollView
        style={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}>
        {packageDetails.map((item, index) => {
          return (
            <View key={index}>
              <View >
                <Image
                  source={{ uri: packageDetailsData.image }}
                  width={100}
                  height={100}
                  style={{
                    width: 312,
                    height: 200,
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{ alignSelf: 'center' }}>
                    <Text style={styles.brandTitle}>{packageDetailsData.name}</Text>
                    <Text style={styles.price}>KD {item.price}</Text>
                  </View>
                  <Image
                    source={GameImage}
                    width={100}
                    height={100}
                    style={{
                      width: 200,
                      height: 100,
                      alignSelf: 'center',
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>
                <View>
                  <ImageBackground
                    source={ItemCard}
                    width={100}
                    height={100}
                    style={{
                      width: 357,
                      height: 51,
                      borderRadius: 20,
                      marginBottom: 20,
                      alignContent: 'center',
                      padding: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: '#D2D7F9',
                          fontSize: 14,
                          fontStyle: 'italic',
                        }}>
                        {item.sub_category_name}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: '#D2D7F9',
                          fontSize: 14,
                          fontStyle: 'italic',
                          opacity: 0.5,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: '#D2D7F9',
                          fontSize: 14,
                          fontStyle: 'italic',
                          opacity: 0.5,
                        }}>
                        {item.price}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setShowCpuProcesserList(!showCpuPerocessersList)}>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                          bottom: -6,
                          right: -8,
                        }}>
                        <Image
                          source={ExpandImage}
                          width={100}
                          height={100}
                          style={{ width: 29, height: 11 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                  {showCpuPerocessersList ? (
                      <ListDetails
                        data={item}
                        navigation={navigation}
                      ></ListDetails>
                  ) : null}
                </View>
            </View>
          );
        })}

        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => navigation.navigate('cart')}>
          <Btn />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#2A2D39',
    // paddingHorizontal: width * 0.09,
    // paddingVertical: width * 0.09,
  },
  backButtonContentConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: width * 0.09,
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
  brandTitle: {
    fontSize: 20,
    color: '#ECDBFA',
    textAlign: 'left',
    width: 139,
  },
  price: {
    fontSize: 12,
    color: '#ECDBFA',
    marginTop: 10,
  },
  scrollViewContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default ProductDetails;