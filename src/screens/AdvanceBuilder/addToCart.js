import React,{useState,useEffect} from 'react';
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
import backImage from '../../assets/back.png';
import ItemCard from '../../assets/ic_card.png';
import ExpandImage from '../../assets/ic_expand1.png';
import PayBtn from '../../components/PayBtn';
import SearchImage from '../../assets/buildYourPc/search.png';
import IcCardImage from '../../assets/ic3.png';
import thumbnail from '../../assets/thumbnail.png';
import CloseImage from '../../assets/ic-3copy.png';
const {width, height} = Dimensions.get('window');

const AddToCart = (props) => {
    const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
    const [upwardImage, setUpwardImage] = useState(true);
    const[categoryItems, setCategoryItems]=useState([]);
    const[name, setName]=useState('');
    const[price, setPrice]=useState('');
    const [totalPrice,setTotalPrice]=useState(0);
    const[cat, setCat]=useState('');
    const maxlimit=22;
    var imgSource = upwardImage ? ExpandImage : CloseImage;
    const openClose = () => {
        setUpwardImage(!upwardImage)
        setShowCpuProcesserList(!showCpuPerocessersList)
    }
    useEffect(() => {
        // console.log(props.route.params.data);
        setCat(props.route.params.data[0].sub_category_name);
        setName(props.route.params.data[0].name)
        setPrice(props.route.params.data[0].price)
        setCategoryItems(props.route.params.data);
        setTotalPrice(props.route.params.data.reduce(function (cnt, o) { return cnt + parseInt(o.price); }, 0));
      }, []);

    const selectHandler = (id, name, price) => {
        setCat(id);
        setName(name);
        setPrice(price);
    }

    return(
        
        <ImageBackground
        source={require('../../assets/signup.png')}
        style={styles.background}
        >
            <View
            style={{width, height, overflowX: 'hidden'}}
            >
                <View style={styles.topContainer}>
                    <View>
                        <TouchableOpacity onPress={() => {props.navigation.goBack()}}>
                            <Image
                                resizeMode="contain"
                                source={backImage}
                                style={{
                                width: 48,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.advanceBuilderText}>Advance Builder</Text>
                    <Text style={styles.lineText}>KD {totalPrice}.000</Text>
                </View>

                <ImageBackground
                source={ItemCard}
                style={{
                    width: width * 0.9,
                    height: 51,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 15,
                    marginVertical: 30,
                    alignContent: 'center',
                    padding: 15,
                    overflow: 'hidden',
                    marginLeft:35
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}>
                        <Text

                            style={{
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                color: '#D2D7F9',
                                fontSize: 14,
                                fontStyle: 'italic',
                                fontWeight: "bold",
                            }}>
                            {(((name).substring(0, maxlimit - 3)) + '...')}
                        </Text>
                        <Text
                            ellipsizeMode='tail' numberOfLines={2}
                            style={{

                                textAlign: 'center',
                                textAlignVertical: 'center',
                                color: '#D2D7F9',
                                fontSize: 14,
                                fontStyle: 'italic',
                                opacity: 0.5,
                                fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                            }}>
                            {(((cat).substring(0, maxlimit - 3)) + '...')}

                            {/* {props.data.name ? (((props.data.name).substring(0, maxlimit - 3)) + '...') : (((props.data.name).substring(0, maxlimit - 3)) + '...')} */}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                color: '#D2D7F9',
                                fontSize: 14,
                                fontStyle: 'italic',
                                opacity: 0.5,
                            }}>
                            {/* KD {props.data.price ? props.data.price : props.data.price} */}
                            KD  {(((price).substring(0, maxlimit - 3)) + '...')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => openClose()}>
                        <View
                            style={{
                                alignSelf: 'flex-end',
                                justifyContent: 'flex-end',
                                bottom: -6,
                                right: -6,
                            }}>
                            <Image
                                source={imgSource}
                                width={100}
                                height={100}
                                style={{ width: 29, height: 11 }}
                            />
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
                {showCpuPerocessersList?(
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 20,
                            marginHorizontal:30
                        }}>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text
                                style={{ fontSize: 14, color: '#D2D7F9', fontWeight: '300' }}>
                                List of Items
                            </Text>
                            <TouchableOpacity
                                style={{ marginHorizontal: 10 }}
                                onPress={() => {
                                    props.navigation.navigate('advanceListing', {
                                        items: categoryItems,
                                        //sub_category_name: props.data.sub_category_name,
                                        //selected: selectedItems,
                                        //pIndex:props.parentIndex
                                    })}}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#DF2EDC',
                                        fontWeight: '300',
                                        fontStyle: 'italic'
                                    }}>
                                    View all
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {categoryItems.map((processer, index) => {
                            const maxlimit = 22;
                            return (
                                <>
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() =>  {selectHandler(processer.sub_category_name, processer.name, processer.price) }}
                                        style={{ padding: 20 }}>

                                        <ImageBackground
                                            source = {IcCardImage}

                                           style={{ width: 139, height: 151 }}>
                                            <View
                                                style={{
                                                    alignSelf: 'center',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    marginTop: 30,
                                                }}>
                                                {processer.image == ""?(
                                                <Image
                                                source={thumbnail}
                                                style={{ width: 48, height: 40, marginBottom: 10, alignSelf: 'center' }}
                                                />  
                                                ):(
                                                <Image
                                                    source={{ uri: processer.image }}
                                                    style={{ width: 48, height: 40, marginBottom: 10, alignSelf: 'center' }}
                                                />
                                                )}
                                                <Text
                                                    adjustsFontSizeToFit={true}
                                                    numberOfLines={2}
                                                    
                                                    style={{
                                                        fontSize: 11,
                                                        fontWeight: '700',
                                                        color: '#FFFFFF',
                                                        marginBottom: 10,
                                                        alignSelf: 'center'
                                                    }}>
                                                    {processer.name ? (((processer.name).substring(0, maxlimit - 3)) + '...') : (((processer.name).substring(0, maxlimit - 3)) + '...')}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 10,
                                                        fontWeight: '700',
                                                        color: '#FFFFFF',
                                                        marginBottom: 10,
                                                        opacity: 0.5,
                                                        fontStyle: 'italic',
                                                        textAlign: 'center',
                                                    }}>
                                                    {processer.brand}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        fontWeight: '400',
                                                        color: '#FFFFFF',
                                                        fontStyle: 'italic',
                                                        textAlign: 'center',
                                                        marginBottom: 40,
                                                    }}>
                                                    +KD {processer.price}
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </>
                            );
                        })}
                    </ScrollView>
                </View>
                ):null}
                <View style={styles.bottom}>
                    <TouchableOpacity  onPress={() => {}}>
                        <PayBtn price={totalPrice} text="ADD TO CART" x="175"/>             
                    </TouchableOpacity>
                </View>  
            </View>            
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
background:{
    height:height,
    width:width,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
},
topContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.1,
  },
advanceBuilderText:{
    fontSize:22,
    fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
    color:'#fff',
    paddingHorizontal: width * 0.1,
},
lineText:{
    fontSize:16,
    color:'#fff',
    marginVertical:10,
    fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',
    paddingHorizontal: width * 0.1,
  },
bottom:{
    flex:1,
    justifyContent:'flex-end',
    marginLeft:"9%"
}
});

export default AddToCart;