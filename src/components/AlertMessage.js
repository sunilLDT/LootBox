import React,{useEffect} from 'react';
import {
    View,
    Image,
    Dimensions,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'; 
import Icons from 'react-native-vector-icons/Feather';
import Btn from '../../src/screens/btn';
import { connect } from 'react-redux';
import { cartActions } from '../actions/user';

const {width, height} = Dimensions.get('window');

const AlertMessage = (props) => {
    useEffect(() => {
        props.empty();
      }, []);

    const {msgUrl} = props.route.params;

    return (
        <ImageBackground
            source={require('../assets/plainBg.png')}
            style={styles.imageBg}>
            <SafeAreaView style={styles.mainContainer}>
                
                    <View style={styles.container}>
                        {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback"?<Image style={styles.checkImage} source={require('../assets/check.png')}/>:<Icons name="x" size={35}
                                style={styles.cross}  
                                />}
                        {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback"?<Text style={styles.msg}>Order{"\n"}Successful</Text>:<Text style={styles.msg}>Order{"\n"}Failed</Text>}
                        {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback"?<Text style={styles.line}>Your Order will be delivered{"\n"}between 48-72 Hours</Text>:null}
                    </View>
                    <View style={styles.btnCotainer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('orders')}>
                            <Btn style={styles.btn} text="View Order" pay=""/>
                        </TouchableOpacity>
                    </View>
                
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:"100%",
        height:height*0.9,
        marginTop:'20%',
    },
    imageBg:{
        width,
        minHeight: height,
        overflow: 'hidden',
        backgroundColor: '#2A2D39',
        paddingHorizontal: width * 0.09,
        paddingVertical: width * 0.07,
    },  
    container:{
        justifyContent:'center',
        marginLeft:"15%",
    },
    msg:{
        fontSize:20,
        color:'#fff',
    },
    line:{
        marginVertical:"3%",
        color:'rgba(255,255,255,0.3)',
    },
    checkImage:{
        marginVertical:"3%",
    },
    cross:{
        marginVertical:"3%",
        color: '#842D8A',
    },
    btnCotainer:{
        width:width*0.6,
        marginHorizontal:"18%",
        marginTop:"70%",
    }
});



const mapStateToProps = (state) => ({
    cart: state.cartReducer.cart,

})

const actionCreators = {
    empty: cartActions.emptyCartAction,

};

export default connect(mapStateToProps, actionCreators)(AlertMessage)
