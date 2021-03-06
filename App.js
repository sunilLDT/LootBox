import React, { useEffect, useContext,useState } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { Easing, Platform, Dimensions, View, StatusBar, SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
  // CardStyleInterpolators,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signin from './src/screens/signin';
import Signup from './src/screens/signup';
import Language from './src/screens/language';
import OtpVerification from './src/screens/otpVerification';
import Slider from './src/screens/slider';
import Home from './src/screens/home';
import CustomDrawerContent from './src/components/drawer';
import { Provider as AuthProvider } from './src/api/contexts/authContext';
import { setNavigator } from './src/api/contexts/navigationRef';
import { Context as AuthContext } from './src/api/contexts/authContext';
import BuildYourPc from './src/screens/buildYourPc';
import ContactUs from './src/screens/contactUs';
import Faq from './src/screens/faq';
import Profile from './src/screens/profile';
import OrderSuccess from './src/screens/orderSuccess';
import Notifications from './src/screens/notifications';
import ItemDesc from './src/screens/itemDesc';
import ForgotPassword from './src/screens/forgotPassword';
import LootStore from './src/screens/lootStore';
import CPUS from './src/screens/cpus';
import Cart from './src/screens/cart';
import Orders from './src/screens/orders';
import LootBox2 from './src/screens/lootBox2';
import PcDetails from './src/screens/PcDetails';
import AdvanceBuilder from './src/screens/AdvanceBuilder';
import ProductDetails from './src/screens/PcDetails/ProductDetails';
import ItemListing from './src/screens/PcDetails/ItemListing';
import CheckOut from './src/components/CheckOut';
import AlertMessage from './src/components/AlertMessage';
import changePasswordNumber from './src/screens/changePhoneNumber';
import Address from './src/screens/Address';
import OrderDetails from './src/screens/OrderDetails';
import { store, persistedStore } from './src/store/index';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Email from './src/screens/email';
import AddToCart from './src/screens/AdvanceBuilder/addToCart';
import AddvanceListing from './src/screens/AdvanceBuilder/advanceListing';
import AsyncStorage from '@react-native-community/async-storage';
import NewPassword from './src/screens/newPassword';
 import messaging from '@react-native-firebase/messaging';
 import { navigate } from './src/api/contexts/navigationRef';
 import { languageActions } from './src/actions/language';

const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();
const Auth = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const AuthScreen = ({ navigation }) => {
  return (
    <Auth.Navigator
      initialRouteName="signin"
      screenOptions={{
        gestureEnabled: false,
        swipeEnabled: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        ...TransitionPresets.SlideFromRightIOS,
        // ...TransitionPresets.FadeFromBottom
        // cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
        // forFadeBottomFromAndroid
        cardStyle: { backgroundColor: '#000000' },
      }}
      headerMode="none"
      
      >
      <Auth.Screen name="signin" component={Signin} />
      <Auth.Screen name="signup" component={Signup} />
    </Auth.Navigator>

  );
};
const Drawer = createDrawerNavigator();

const HomeScreen = () => (
  <Drawer.Navigator
    drawerStyle={{
      backgroundColor: '#261D2A',
      width: width,
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerType="slide"
    overlayColor="transparent"
    initialRouteName="home">
    <Drawer.Screen name="home" component={Home} />
  </Drawer.Navigator>
);

const App = () => {
  const { checkUser } = useContext(AuthContext);
  const check = async () => {
    await checkUser();
    SplashScreen.hide();
  };
  useEffect(() => {
    AsyncStorage.getItem("phoneNumber").then((value) => {
      store.dispatch(languageActions.getLabelAction(value));
    })
    check();
    requestUserPermission();
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
    // return unsubscribe;
  },[]);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data,
      );
      navigate({ name: 'orders' });
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage.data.notificationType);
      
    });
    
    messaging()
      .getToken()
      .then(token => {
        AsyncStorage.setItem('deviceToken', token);
      });
     
      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          
        }
      });

      var forBoad = ""
      AsyncStorage.getItem("language").then((res) => {
        // console.log(AsyncStorage.getItem('deviceToken'));
        // console.log("device token for unsubscribe ======")
        // console.log(token)
        forBoad = res;
        messaging().subscribeToTopic('broadcast_notifications_'+forBoad)
        .then((response) => {
          console.log('broadcast_notifications_'+forBoad )
          if(res == "ar"){
            messaging().unsubscribeFromTopic('broadcast_notifications_en')
            .then(function(response) {
              console.log('Successfully unsubscribed from topic in english:', response);
            }).catch(function(error) {
              console.log('Error unsubscribing from topic in english:', error);
            });
          }else{
            messaging().unsubscribeFromTopic('broadcast_notifications_ar')
            .then(function(response) {
              console.log('Successfully unsubscribed from topic in arabic:', response);
            }).catch(function(error) {
              console.log('Error unsubscribing from topic in arabic:', error);
            });
          }
        });
      })
      messaging()
      .getToken()
      .then(token => {
        // console.log(token)
      });
    
  }, [ ]);

   requestUserPermission = async () => {
     const authStatus = await messaging().requestPermission();
     const enabled =
       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

     if (enabled) {
       getFcmToken() //<---- Add this
      //  console.log('Authorization status:', authStatus);
     }
   }

   getFcmToken = async () => {
     const fcmToken = await messaging().getToken();

     if (fcmToken) {
      console.log("Your Firebase Token is:", fcmToken);
     } else {
      console.log("Failed", "No token received");
     }
   }

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: '#261D2A',
      }}>

      <StatusBar hidden />
      <NavigationContainer
        ref={(navigator) => {
          setNavigator(navigator);
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,

            transitionSpec: {
              open: closeConfig,
              close: closeConfig,
            },

            gestureEnabled: false,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
            cardStyle: { backgroundColor: '#000000' },
          }}
          //headerMode="none"
          >
           
          <Stack.Screen name="language" component={Language} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="auth" component={AuthScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="otp" component={OtpVerification} />
          <Stack.Screen name="newPassword" component={NewPassword} />
          <Stack.Screen name="slider" component={Slider} />
          
          <Stack.Screen name="buildYourPc" component={BuildYourPc} />
          <Stack.Screen name="contact" component={ContactUs} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="orderSuccess" component={OrderSuccess} />
          <Stack.Screen name="notifications" component={Notifications} />
          <Stack.Screen name="itemDesc" component={ItemDesc} />
          <Stack.Screen name="forgotPassword" component={ForgotPassword} />
          <Stack.Screen name="lootStore" component={LootStore} />
          <Stack.Screen name="cpus" component={CPUS} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="orders" component={Orders} />
          <Stack.Screen name="lootbox2" component={LootBox2} />
          <Stack.Screen name="PcDetails" component={PcDetails} />
          <Stack.Screen name="AdvanceBuilder" component={AdvanceBuilder} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="ItemListing" component={ItemListing} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="Faq" 
          
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#292633',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
            },
            title: 'Invoice'
            }} 
          component={Faq} />
          <Stack.Screen  options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#292633',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
            },
            title: 'Payment'
            }}  name="checkout" component={CheckOut} />
          <Stack.Screen name="alertMessage" component={AlertMessage} />
          <Stack.Screen name="changePasswordNumber" component={changePasswordNumber} />
          <Stack.Screen name="address" component={Address} />
          <Stack.Screen name="email" component={Email} />
          <Stack.Screen name="addToCart" component={AddToCart} />
          <Stack.Screen name="advanceListing" component={AddvanceListing} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default () => {
  const [set,noset] = useState('en');
  const languageChange = async () => {
      let languagename = await AsyncStorage.getItem('language');
      noset(languagename)
  };
  languageChange()
  return (
  
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    
  );
};