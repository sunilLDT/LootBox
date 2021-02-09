import React , {useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {} from 'react-native-animatable';
import PriceArrowImage from '../../assets/ic_arrow1.png';
import DetailsInfoCard from '../../assets/buildYourPc/details_info_card.png';
import {packageListByGames} from '../../api/buildYourPc';
import PlayableImg from '../../assets/playable.png';
import Thumbnail from '../../assets/thumbnail.png';
import strings from '../../languages/index';
import {languagename} from '../../components/LanguageName';
const {width, height} = Dimensions.get('window');

const PcDetails = ({navigation, route}) => {

  const {selectedGames} = route.params;
  const [packageData, setPackageData] = React.useState([]);
  const [item, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arOren,setarOren] = useState('en')

  languagename().then(res => setarOren(res))
    useEffect(() => {
    setLoading(true)
    packageListByGames(selectedGames).then((response) => {
      setPackageData(response.data);
      setItems(response.data[0].items);
      setLoading(false);
      console.log(packageData)
    }).catch((error) => {
        console.log("Package list by games" + error)
        setLoading(false)
    });
    return () => {
        console.log("willUnMount");
    }
  }, [selectedGames]);

  const sum = (pack) => {
    var total = 0
    for ( var i = 0, _len = pack.length; i < _len; i++ ) {
        total += parseFloat(pack[i]['price']);
    }
    return total.toFixed(3);
  }

  Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
  }

  return (
    <View style={{backgroundColor:'#292633', width:'100%', height:'100%'}}>
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
            // paddingHorizontal: width * 0.09,
            paddingLeft:width*0.04,
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
                transform: [
                    { scaleX: arOren == "it"?-1:1 }
                  ]
            }}
            />
        </TouchableOpacity>
        <Text
            style={styles.screenName}>
            {strings.packages}
        </Text>
        </View>
        {packageData.map((cpuDetail, index) =>{
          return (
         <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('ProductDetails',{PackageId:cpuDetail.package_id})}
          >  
            <View
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
            <ImageBackground style={{
                 width:Platform.OS=='android'?372:350,
                 height:278,
                 marginVertical:"5%",
                 marginLeft:arOren == "it"?"-7%":"0%",
            }}
            source={DetailsInfoCard}
            >
                <View style={styles.container}>
                    {cpuDetail.image?(
                        <Image style={styles.images} source={{uri:cpuDetail.image}}/>
                    ):(
                        <Image source={require('../../assets/thumbnail.png')} style={styles.images}/>
                    )}
                    <View style={styles.detailsContainer}>

                        <Text numberOfLines={3} style={{color:'white',
                            fontSize:15,
                            fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
                            fontWeight:"100",
                            marginLeft:arOren == "it"?'-20%':"0%",
                            }}>{cpuDetail.name}
                        </Text>
                        <Text style={styles.detailsText1}>KD {sum(cpuDetail.items)}</Text>
                        <Image style={styles.arrow} source={PriceArrowImage}/>
                    </View>
                </View>
                <View style={{zIndex:8000,marginLeft:50}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            width: 550,
                            borderWidth:0,
                            borderColor:'#ffffff',
                            zIndex:9000
                        }}
                    >
                    <View onStartShouldSetResponder={() => true}>
                        <FlatList
                            keyExtractor={() => item.item_id}
                            style={styles.parentView}
                            data={cpuDetail.items}
                            renderItem={({item},index) => {
                                return (
                                    <View key={index} style={styles.attributesView}>
                                        <View style={styles.attributesViewTouch}>
                                            <Text style={{
                                                color:'#ECDBFA',
                                                borderWidth:1,
                                                padding:6,
                                                borderTopLeftRadius:arOren == "it"? 0:8,
                                                borderBottomLeftRadius:arOren == "it"? 0:8,
                                                borderTopRightRadius:arOren == "it"? 8:0,    //ar
                                                borderBottomRightRadius:arOren == "it"? 8:0,  //ar
                                                paddingHorizontal:10,
                                                fontStyle:'italic',
                                                borderColor:'#5A5963',
                                                fontSize:12,
                                            }}>{item.name}</Text>
                                            <Text style={{
                                                color:'#5A5963',
                                                padding:6,
                                                borderWidth:1,
                                                paddingHorizontal:10,
                                                borderTopRightRadius:arOren == "it"?0:8,
                                                borderBottomRightRadius:arOren == "it"?0:8,
                                                borderTopLeftRadius:arOren == "it"?8:0,
                                                borderBottomLeftRadius:arOren == "it"?8:0,
                                                borderLeftWidth:arOren == "it"? 1:0,
                                                borderColor:'#5A5963',
                                                fontSize:12,
                                            }}>{item.brand}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                            numColumns= {2}
                        />
                    </View>
                    </ScrollView>
                </View>
                <View style={styles.playableView}>
                    <ImageBackground
                        source={PlayableImg}
                        style={styles.playableBtn}
                    >
                        <Text 
                        style={styles.playableText}>
                            Playable at <Text style={{color:'#fff',fontWeight:'bold',fontStyle:'italic'}}>
                                {cpuDetail.graphic_quality == 1?"LOW ":cpuDetail.graphic_quality == 2?"MEDIUM ":"HIGH "}
                                </Text>
                            <Text style={{color:'#fff',}}>Graphics</Text>
                        </Text>
                    </ImageBackground>
                </View>
            </ImageBackground>
            </View>
       </TouchableOpacity>
          );
        })}
        {loading ? (
        <View style={{marginTop: height * 0.37}}>
            <ActivityIndicator color="#ECDBFA" size="small" />
        </View>
        ) :packageData.length === 0?(
            <Text style={{
                color:"#fff",
                lineHeight: 32,
                fontFamily:Platform.OS=='android'?'Michroma-Regular':'Michroma',
                fontSize:15,marginTop: height * 0.32
            }}
            >No PACKAGE AVAILABLE FOR THIS GAME
            </Text>
        ):null}
        </ImageBackground>   
     </ScrollView>
      </View>
      
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
        height:height*0.2,
        resizeMode:'contain',
    },
    container:{
        display: 'flex',
        alignItems:'center',
        flexDirection: 'row',
        marginBottom:-11
    },
    detailsContainer:{
        display:'flex',
        alignItems:'flex-start',
        flexDirection:'column',
        marginHorizontal:"5%",
    },
   
    detailsText1:{
        color:'#75788E',
        marginVertical:7,
        fontFamily:Platform.OS=='android'?'Michroma-Regular':'Michroma',
        fontSize:10,
    },
    parentView:{
        marginLeft:'10%',
        // paddingBottom:"2%",
        zIndex:9000,
        marginVertical:13
    },
    attributesView:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginLeft:"2%",
        marginVertical:"1%",
    },
    attributesViewTouch:{
        display:'flex',
        flexDirection:'row',
    }, 
    attrHeading:{
        color:'#ECDBFA',
        borderWidth:1,
        padding:6,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        borderTopRightRadius:8,    //ar
        borderBottomRightRadius:8,  //ar
        paddingHorizontal:10,
        fontStyle:'italic',
        borderColor:'#5A5963',
        fontSize:12,
    },
    arrow:{
        marginBottom:"3%",
        marginLeft:'-1%',
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
        marginRight:'5%'
    },
    playableText:{
        color:'#7A7584',
        fontWeight:'100',
        fontSize:12,
        marginRight:'5%'

    },
});

export default PcDetails;
