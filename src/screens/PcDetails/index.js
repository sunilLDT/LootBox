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


const {width, height} = Dimensions.get('window');


const PcDetails = ({navigation, route}) => {
  const {selectedGames} = route.params;
  const [packageData, setPackageData] = React.useState([]);

  React.useEffect(() => {
    packageListByGames(selectedGames).then((response) => {
      setPackageData(response.data);
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
                        <Text style={styles.detailsText1}>KD {Object.entries(cpuDetail.items).length === 0?"Price":cpuDetail.items[index].price}</Text>
                        <Image style={styles.arrow} source={PriceArrowImage}/>
                    </View>
                </View>

                <View style={styles.attributesView}>
                    <View style={styles.attributesViewTouch}>
                        <TouchableOpacity>
                            <Text style={styles.attrHeading}>{Object.entries(cpuDetail.items).length === 0?"categoryName":cpuDetail.items[index].sub_category_name}</Text>
                        </TouchableOpacity>
                        <Text style={styles.attrText}>{Object.entries(cpuDetail.items).length === 0?"Name":cpuDetail.items[index].name}</Text>
                    </View>
                </View>

                <View style={styles.playableView}>
                </View>
                </ImageBackground>
            </TouchableOpacity>
          );
        })}
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
    top:"-50%",
    right:"50%",

},
container:{
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
},
linearGradient:{
    height:"70%",
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
    fontSize:18,
    marginVertical:15,
    fontFamily: 'Michroma-Regular',
    fontWeight:"100",
    width:150,
    marginLeft:"28%",
},
detailsText1:{
    color:'#75788E',
    marginVertical:10,
    fontFamily:'Michroma-Regular',
    marginTop:20,
    marginLeft:"8%",
},
attributesView:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    marginLeft:"5%",
    marginTop:"1%",
},
attributesView1:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    marginLeft:"5%",
    marginTop:"1.5%",
    
},
attributesViewTouch:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    marginLeft:"5%",
},
attributesViewTouch1:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    marginLeft:"1.5%",
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
},
attrText:{
    color:'#5A5963',
    padding:6,
    borderWidth:1,
    paddingHorizontal:10,
    borderTopRightRadius:8,
    borderBottomRightRadius:8,
    borderLeftWidth:0,
    borderColor:'#5A5963'
},
arrow:{
    marginBottom:"7%",
    marginLeft:"-11%",
},
});

export default PcDetails;
