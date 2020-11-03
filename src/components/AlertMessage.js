import React,{useEffect} from 'react';
import {
    View,
    Image,
    Dimensions,
    Text,
    StyleSheet,
} from 'react-native';
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
        
        <View style={styles.container}>
            <Image style={styles.checkImage} source={require('../assets/check.png')}/>
            {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback"?<Text style={styles.msg}>Order{"\n"}Successful</Text>:<Text style={styles.msg}>Order{"\n"}Failed</Text>}
            {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback"?<Text style={styles.line}>Your Order will be delivered{"\n"}between 48-72 Hours</Text>:null}
            <Btn text="View Order" pay=" " 
                onPress={() =>props.navigation.navigate('home')}
            pay=""/>
        </View>
       
            
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:height*0.5,
        justifyContent:'center',
        marginLeft:"15%"
    },
    msg:{
        fontSize:20,
    },
    line:{
        marginVertical:"3%",
    },
    checkImage:{
        marginVertical:"3%",
    }
});



const mapStateToProps = (state) => ({
    cart: state.cartReducer.cart,

})

const actionCreators = {
    empty: cartActions.emptyCartAction,

};

export default connect(mapStateToProps, actionCreators)(AlertMessage)
