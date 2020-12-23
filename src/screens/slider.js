import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Animated,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import Btn from '../screens/btn';

const {width, height} = Dimensions.get('window');

const images = [
  require('../assets/img_1.png'),
  require('../assets/img_2.png'),
  require('../assets/img_3.png'),
];

export default class Slideshow extends React.Component {
  scrollX = new Animated.Value(0);

  render() {
    let position = Animated.divide(this.scrollX, width);
    const {navigation} = this.props;

    return (
      <View >
        <View>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}>
            {images.map((x, i) => {
              return (
                <View key={i} >
                  <ImageBackground
                    source={x}
                    style={{
                      width,
                      height,
                      backgroundColor: '#261D2A',
                    }}
                  />
                  <View
                    style={{
                      bottom: height * 0.3,
                      width: width,
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#ECDBFA',
                        fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                        fontSize: 20,
                        lineHeight: 28,
                        marginHorizontal:60
                      }}>
                      Lorem ipsum dolor sit amet, consectetur{' '}
                    </Text>
                    <TouchableWithoutFeedback onPress={() => {navigation.navigate('home')}}>
                        <View style={{width:'75%'}}>
                          <Btn  text="GET STARTED" pay=""/>
                        </View>
                    </TouchableWithoutFeedback> 
                    </View>
                </View>
              );
            })}
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
          {images.map((_, i) => {
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
                }}></Animated.View>
            );
          })}
        </View>
      </View>
    );
  }
}
