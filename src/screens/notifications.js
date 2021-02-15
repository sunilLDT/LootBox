import React,{useState,useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getNotification} from '../api/buildYourPc';
const {width, height} = Dimensions.get('window');

const Notifications = ({navigation}) => {
const [notification, setNotification] = useState([]);
  useEffect(() => {
    getNotification().then((response) => {
      console.log("****************");
      // console.log(response.data);
       setNotification(response.data);
    
    }).catch((error) => {
      console.log("notification error" + error)
    })
  },[])
  return (
    <View
      style={{
        backgroundColor: '#261D2A',
      }}>
      <ImageBackground
        source={require('../assets/dottedBackground.png')}
        style={{
          width,
          height,
          overflow: 'hidden',
          padding: width * 0.1,
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              style={{width: 48}}
              resizeMode="contain"
              source={require('../assets/back.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'italic',
              fontSize: 12,
              color: '#ECDBFA',
              marginLeft: 10,
            }}>
            NOTIFICATIONS
          </Text>
        </View>

        {notification.map((data) => (
          <LinearGradient
            key={data.order_id}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['rgba(255,255,255,0.069)', 'rgba(255,255,255,0.003) ']}
            style={[
              {
                display: 'flex',
                justifyContent: 'space-around',
                borderRadius: 10,
                height: height * 0.15,
                width: width * 0.8,
                marginBottom: 30,
                padding: 20,
              },
            ]}>
            <Text
              style={{
               
                color: '#ECDBFA',
                fontSize: 16,
              }}>
            {data.title_en}
            </Text>
            <Text
              style={{
               paddingTop : "4%",
                color: '#ECDBFA',
                fontSize: 14,
                opacity: 0.4
              }}>
            {data.description_en}
            </Text>
          </LinearGradient>
        ))}
      </ImageBackground>
    </View>
  );
};

export default Notifications;
