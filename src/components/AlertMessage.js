import React, { useEffect } from 'react';
import {
    View,
    Image,
    Dimensions,
    Text,
    BackHandler,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import ViewBtn from '../components/SaveBtn';
import { connect } from 'react-redux';
import { cartActions } from '../actions/user';

const { width, height } = Dimensions.get('window');

const AlertMessage = (props) => {
    console.log("labales from success")
    console.log(props.labels)
    useEffect(() => {
        props.empty();
        props.add();
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }, []);

    const handleBackButton = () => {
        console.log('Back button is pressed');
        return true;
    }

    const { msgUrl } = props.route.params;
    return (
        <ImageBackground
            source={require('../assets/signup.png')}
            style={styles.imageBg}>
            <SafeAreaView style={styles.mainContainer}>

                <View style={styles.container}>
                    {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback" ||msgUrl == "success"  ?
                     <Image style={styles.checkImage} source={require('../assets/check.png')} />
                      : 
                      <Icons name="x" size={35}
                        style={styles.cross}
                     />
                    }
                    {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback" ||msgUrl == "success" ? <Text style={styles.msg}>{props.labels.order}{"\n"}{props.labels.successful}</Text> : <Text style={styles.msg}>props.labels.order{"\n"}props.labels.failed</Text>}
                    {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback" ||msgUrl == "success" ? <Text style={styles.line}>Your Order will be delivered{"\n"}between 48-72 Hours</Text> : <Text style={styles.line}>You can try again !</Text>}
                </View>
                <View style={styles.btnCotainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('orders')}>
                        <ViewBtn text={props.labels.viewOrder} x="117" />
                    </TouchableOpacity>
                </View>
                <View>
          <TouchableOpacity style={{marginTop:5,marginLeft:40}} onPress={() => props.navigation.navigate('home')}>
            <View style={{width:"87%", marginVertical: 50,}}>
              <ViewBtn text={props.labels.continueShopping} x="100" />
            </View>
          </TouchableOpacity>
        </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: height * 0.9,
        marginTop: '20%',
    },
    imageBg: {
        width,
        minHeight: height,
        overflow: 'hidden',
        backgroundColor: '#2A2D39',
        paddingHorizontal: width * 0.09,
        paddingVertical: width * 0.07,
    },
    container: {
        justifyContent: 'center',
        marginLeft: "15%",
    },
    msg: {
        fontSize: 20,
        color: '#fff',
        fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
    },
    line: {
        marginVertical: "3%",
        color: 'rgba(255,255,255,0.3)',
    },
    checkImage: {
        marginVertical: "3%",
    },
    cross: {
        marginVertical: "3%",
        color: '#842D8A',
    },
    btnCotainer: {
        width: width * 0.84,
        flex: 1,
        justifyContent: 'flex-end',
        marginVertical: 20,
    }
});



const mapStateToProps = (state) => ({
    cart: state.cartReducer.cart,
    labels: state.languageReducer.labels,
})

const actionCreators = {
    empty: cartActions.emptyCartAction,
    add: cartActions.addCartAction,
};

export default connect(mapStateToProps, actionCreators)(AlertMessage)
