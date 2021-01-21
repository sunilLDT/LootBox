import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Animated,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Btn from '../screens/btn';
import { getBannerApi } from './../api/buildYourPc';
import plainImage from '../assets/plainBg.png';
import { Context as AuthContext } from '../api/contexts/authContext';
const { width, height } = Dimensions.get('window');

/*const images = [
  require('../assets/img_1.png'),
  require('../assets/img_2.png'),
  require('../assets/img_3.png'),
];*/

const Slideshow = (props) => {
  scrollX = new Animated.Value(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState([true]);
  const { guestUserSignIn, state } = useContext(
    AuthContext,
  );

  useEffect(() => {
    getBannerApi().then((response) => {
      setImages([...response.data])
      setLoading(false)
    }).catch((error) => {
      console.log("banner" + error);
    })
  }, [])

  let position = Animated.divide(scrollX, width);
  const { navigation } = props;
  return (
    <ImageBackground
      source={plainImage}
      style={{}}
    >
      {loading ? (
        <View style={{ margin: height * 0.47, alignSelf: 'center' }}>
          <ActivityIndicator color="#ECDBFA" size="small" />
        </View>) :
        <>
          <View>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false },
              )}
              scrollEventThrottle={16}>
              {images.map((x, i) => (
                <View key={i} >
                  <ImageBackground
                    source={{ uri: x.image }}
                    style={{
                      width,
                      height,
                      resizeMode: 'cover',
                      backgroundColor: '#261D2A',
                    }}
                  />
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                    position: 'relative',
                    width: width,
                    bottom: 15,
                  }}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode='tail'
                      style={{
                        flex: Platform.OS == 'android' ? 0 : 1,
                        flexWrap: Platform.OS == 'android' ? 'nowrap' : 'wrap',
                        color: '#ECDBFA',
                        fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                        fontSize: 20,
                        lineHeight: 38,
                        marginHorizontal: 20,
                        paddingBottom: Platform.OS == 'ios' ?80:20,
                      }}>
                      {x.title}
                    </Text>
                    <TouchableOpacity style={{
                      width: '95%',
                      height: 50,
                      marginHorizontal: 10,
                    }}
                      onPress={() => { guestUserSignIn() }}
                    >
                      <View style={{
                        marginTop: -20,
                      }}>
                        <Btn text="GET STARTED" pay="" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto',
              top: 10,
              width: width,
              // left: width * 0.2,
            }}>
            {images?images.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.27, 1, 0.27],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    height: 4,
                    width: width * 0.27,
                    backgroundColor: '#DF2EDC',
                    margin: 8,
                    borderRadius: 5,
                  }}>
                </Animated.View>
              );
            }) : null}
          </View>
        </>
      }
    </ImageBackground>
  );
}

export default Slideshow;