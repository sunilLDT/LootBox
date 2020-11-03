import React from 'react';
import {
    View,
    Image,
    Dimensions,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Btn from '../../src/screens/btn'; 

const {width, height} = Dimensions.get('window');

const AlertMessage = ({navigation,route}) => {
    const {msgUrl} = route.params;
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <Image style={styles.checkImage} source={require('../assets/check.png')}/>
                {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback"?<Text style={styles.msg}>Order{"\n"}Successful</Text>:<Text style={styles.msg}>Order{"\n"}Failed</Text>}
                {msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback"?<Text style={styles.line}>Your Order will be delivered{"\n"}between 48-72 Hours</Text>:null}
            </View>
            <View style={styles.btnCotainer}>
                <TouchableOpacity onPress={() => {}}>
                    <Btn style={styles.btn} text="View Order" pay=""/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:"100%",
        height:height*0.9,
        marginTop:'20%',
    },
    container:{
        justifyContent:'center',
        marginLeft:"15%",
    },
    msg:{
        fontSize:20,
    },
    line:{
        marginVertical:"3%",
    },
    checkImage:{
        marginVertical:"3%",
    },
    btnCotainer:{
        width:width*0.6,
        marginHorizontal:"18%",
        marginTop:"55%",
    }
});

export default AlertMessage;
