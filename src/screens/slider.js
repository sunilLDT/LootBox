import React,{useEffect} from 'react';
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
import {getBannerApi} from './../api/buildYourPc'
const {width, height} = Dimensions.get('window');

/*const images = [
  require('../assets/img_1.png'),
  require('../assets/img_2.png'),
  require('../assets/img_3.png'),
];*/

export default class Slideshow extends React.Component {
  scrollX = new Animated.Value(0);

  constructor(props) { 
    super(props); 
    this.state = { 
      images:[]
    }; 
} 
  componentDidMount() {
    getBannerApi().then((response) => {
      this.setState({
        images:response.data
      })
    }).catch((error) => {
      console.log("allAddressList" + error);
    })
}
  




  render() {
    let position = Animated.divide(this.scrollX, width);
    const {navigation} = this.props;
     const {images} = this.state
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
             {this.state.images.map((x, i) => (
  
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
                      {x.title}
                    </Text>
                    <TouchableWithoutFeedback onPress={() => {navigation.navigate('home')}}>
                        <View style={{width:'75%'}}>
                          <Btn  text="GET STARTED" pay=""/>
                        </View>
                    </TouchableWithoutFeedback> 
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
          {this.state.images?this.state.images.map((_, i) => {
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
          }):null}
        </View>
      </View>
    );
  }
}
