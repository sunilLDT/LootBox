import React , {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {} from 'react-native-animatable';
import PriceArrowImage from '../../assets/ic_arrow1.png';
import DetailsInfoCard from '../../assets/buildYourPc/details_info_card.png';
import {packageListByGames} from '../../api/buildYourPc';
import PlayableImg from '../../assets/playable.png';


const {width, height} = Dimensions.get('window');


const PcDetails = ({navigation, route}) => {

  const {selectedGames} = route.params;

  const [packageData, setPackageData] = React.useState([]);

  const [item, setItems] = useState([]);

  const TotalPrice = item.reduce((Price, item) => Price + parseInt(item.price), 0);


  React.useEffect(() => {
    packageListByGames(selectedGames).then((response) => {
      setPackageData(response.data);
      setItems(response.data[0].items);
    });
  }, [selectedGames]);

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{width, height, overflowX: 'hidden'}}
    >
        <ImageBackground
        source={require('../../assets/plainBg.png')}
        style={{
            width,
            minHeight: height,
            overflowX: 'hidden',
            backgroundColor: '#2A2D39',
            paddingHorizontal: width * 0.09,
        }}>
        
        <View
        style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
        }}>
        <TouchableOpacity
            onPress={() => {
            navigation.goBack();
            }}>
            <Image
            source={require('../../assets/back.png')}
            resizeMode="contain"
            style={{
                width: 48,
            }}
            />
        </TouchableOpacity>
        <Text
            style={styles.screenName}>
            Packages
        </Text>
        </View>
        {packageData.map((cpuDetail, index) => {
          return (
            <TouchableOpacity
             key={index}
             onPress={() => navigation.navigate('ProductDetails',{PackageId:cpuDetail.package_id})}
             >
                <ImageBackground style={styles.linearGradient}
                source={DetailsInfoCard}
                >
                <View style={styles.container}>
                    <Image style={styles.images} source={{uri:cpuDetail.image}}/>
                    <View style={styles.detailsContainer}>
                        <Text numberOfLines={3} style={styles.detailsText}>{cpuDetail.name}</Text>
                        <Text style={styles.detailsText1}>KD {TotalPrice.toFixed(3)}</Text>
                        <Image style={styles.arrow} source={PriceArrowImage}/>
                    </View>
                </View>
                {cpuDetail.items.map((details,i) => {
                    return (
                        <View key={i} style={styles.attributesView}>
                            <View style={styles.attributesViewTouch}>
                                <Text style={styles.attrHeading}>{Object.entries(cpuDetail.items).length === 0?"categoryName":details.name}</Text>
                                <Text style={styles.attrText}>{Object.entries(cpuDetail.items).length === 0?"Name":details.brand}</Text>
                            </View>
                        </View>
                    );
                })}
                <View style={styles.playableView}>
                    <ImageBackground
                        source={PlayableImg}
                        style={styles.playableBtn}
                    >
                        <Text 
                        style={styles.playableText}>
                            Playable at <Text style={{color:'#fff',fontWeight:'bold',fontStyle:'italic'}}>
                                {cpuDetail.graphic_quality == 1?"HIGH ":cpuDetail.graphic_quality == 2?"MEDIUM ":"LOW "}
                                </Text>
                            <Text style={{color:'#fff',}}>Graphics</Text>
                        </Text>
                    </ImageBackground>
                </View>
                </ImageBackground>
            </TouchableOpacity>
          );
        })}
        {packageData.length === 0?<Text style={{color:"#fff",lineHeight: 32,fontFamily:'Michroma-Regular',fontSize:15}}>No PACKAGE AVAILABLE FOR THIS GAME</Text>:null}
        </ImageBackground>   
      </ScrollView>
      
  );
};

const styles = StyleSheet.create({
    screenName:{
        fontStyle: 'italic',
        fontSize: 12,
        color: '#ECDBFA',
        marginLeft:10,
        textTransform:'uppercase',
    },
    images:{
        width:width*0.4,
        height:height*0.4,
        resizeMode:"contain",
        position:'absolute',
        top:"-51%",
        right:"50%",

    },
    container:{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    linearGradient:{
        height:255,
        marginVertical:"5%",
        
    },
    detailsContainer:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
    },
    detailsText:{
        alignItems:'flex-end',
        color:'white',
        fontSize:15,
        marginTop:"5%",
        fontFamily: 'Michroma-Regular',
        fontWeight:"100",
        width:150,
        marginLeft:"28%",
    },
    detailsText1:{
        color:'#75788E',
        marginVertical:7,
        fontFamily:'Michroma-Regular',
        marginLeft:"12%",
        fontSize:10,
    },
    attributesView:{
        display:'flex',
        alignSelf:'center',
        flexDirection:'row',
        marginLeft:"4%",
        marginTop:"2%",
        
    },
    attributesViewTouch:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:"5%",
    }, 
    attrHeading:{
        color:'#ECDBFA',
        borderWidth:1,
        padding:6,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        paddingHorizontal:10,
        fontStyle:'italic',
        borderColor:'#5A5963',
        fontSize:12,
    },
    attrText:{
        color:'#5A5963',
        padding:6,
        borderWidth:1,
        paddingHorizontal:10,
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
        borderLeftWidth:0,
        borderColor:'#5A5963',
        fontSize:12,
    },
    arrow:{
        marginBottom:"3%",
        marginLeft:"-5%",
    },
    playableView:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    playableBtn:{
        width:200,
        height:22,
        justifyContent:'center',
        alignItems:'center',
    },
    playableText:{
        color:'#7A7584',
        fontWeight:'100',
        fontSize:12,
    },
});

export default PcDetails;
