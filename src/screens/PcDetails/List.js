import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import SearchImage from '../../assets/buildYourPc/search.png';
import IcCardImage from '../../assets/ic3.png';
import selectedIcCardImage from '../../assets/Rectangle.png'
import ExpandImage from '../../assets/ic_expand1.png';
import CloseImage from '../../assets/ic-3copy.png';
import { ScrollView } from 'react-native-gesture-handler';
import ItemCard from '../../assets/ic_card.png';
import { getCategoriesItem , packageDetailsById} from '../../api/buildYourPc';
import ItemDetails from './ItemDetails';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';
import { packageActions } from '../../actions/package';
import thumbnail from '../../assets/thumbnail.png';
import {languagename} from '../../components/LanguageName';
var sel = [];
const maxlimit = 12;
const { width, height } = Dimensions.get('window');

const ListDetails = (props) => {
    const [upwardImage, setUpwardImage] = useState(true);
    const [showCpuPerocessersList, setShowCpuProcesserList] = useState(false);
    const [open, setOpen] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryItems, setCategoyItems] = useState([]);
    const [packageDetails, setPackageDetails] = useState({});
    const [selectedItems, setSelectedItems] = useState({
        "item_id": 1,
        "quantity": 1,
        "price": 0
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [arOren,setarOren] = useState('en');
    languagename().then(res => setarOren(res))

    var imgSource = upwardImage ? ExpandImage : CloseImage;
    useEffect(() => {
        getCategoriesItem(props.data.sub_category_id, props.data.item_id, props.data.sub_category_name).then((response) => {
            setCategoyItems(response.data);
            let item = {
                "item_id": response.data[0].item_id,
                "quantity": 1,
                "price": response.data[0].price,
                "name": response.data[0].name
            };
            setSelectedItems(item);
            //setTotalPrice(props.cart.reduce(function (cnt, o) { return cnt + parseInt(o.price); }, 0));
        }).catch((error) => {
            console.log("getCategoriesItems" + error);
        });
    }, []);

    const selectHandler = (id, name, price) => {
        let ar = [];
        ar = props.packages;
        ar[props.parentIndex].item_id = id;
        ar[props.parentIndex].name = name;
        ar[props.parentIndex].price = price;
        ar[props.parentIndex].quantity = 1;
        setName(name);
        setPrice(price);
        props.updatePackages(ar);
    }

    const idExists=(id)=> {
        return props.packages.some(function(el) {
          return el.item_id === id;
        }); 
      }

    const openClose = (item_id) => {
        setUpwardImage(!upwardImage)
        setOpen("");
        setOpen(item_id);
        setShowCpuProcesserList(!showCpuPerocessersList)
    }

    return (
        <View>
            {packageDetails ?
                <View>

                    {/*props.parentIndex == 0 ? <View >
                        <Image
                            source={{ uri: props.imData }}
                            width={100}
                            height={100}
                            style={{
                                width: 312,
                                height: 200,
                                alignSelf: 'center',
                            }}
                        />
                        <View
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}>
                            <View style={{ alignSelf: 'center', paddingLeft: '2%' }}>
                                <Text style={styles.brandTitle}>{props.packName}</Text>
                                <Text style={styles.brandTitle}>{props.cart.reduce(function (cnt, o) { return cnt + parseInt(o.price); }, 0)}</Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {props.coverImage.map((cImages, index) => {
                                    return (
                                        <Image
                                            key={index}
                                            source={{ uri: cImages.image_path }}
                                            style={styles.coverImage}
                                        />
                                    );
                                })}
                            </ScrollView>
                        </View>
                            </View> : null*/}

                    <ImageBackground
                        source={ItemCard}
                        style={{
                            width: width * 0.9,
                            height: 51,
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 15,
                            marginBottom: 20,
                            alignContent: 'center',
                            padding: 15,
                            overflow: 'hidden'
                        }}>
                            <TouchableOpacity
                            onPress={() => openClose(props.data.item_id)}>
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
                                {(((props.data.sub_category_name).substring(0, maxlimit - 3)) + '...')}
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
                                {props.data.name ? (((props.data.name).substring(0, maxlimit - 3)) + '...') : (((props.data.name).substring(0, maxlimit - 3)) + '...')}
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
                                KD {props.data.price ? props.data.price : props.data.price}
                            </Text>
                        </View>
                        
                            <View
                                style={{
                                    alignSelf: 'flex-end',
                                    justifyContent: 'flex-end',
                                    bottom: -6,
                                    right: arOren == "it"?-12:-6,
                                }}>
                                <Image
                                    source={imgSource}
                                    width={100}
                                    height={100}
                                    style={{ width: 29, height: 11 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </ImageBackground></View> : null}
            {showCpuPerocessersList && open == props.data.item_id ? (
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 20,
                        }}>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text
                                style={{ fontSize: 14, color: '#D2D7F9', fontWeight: '300' }}>
                                List Of {props.data.sub_category_name}
                            </Text>
                            <TouchableOpacity
                                style={{ marginHorizontal: 10 }}
                                onPress={() => {
                                    props.navigation.navigate('ItemListing', {
                                        items: categoryItems,
                                        sub_category_name: props.data.sub_category_name,
                                        selected: selectedItems,
                                        pIndex:props.parentIndex
                                    });
                                }}>
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
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(props.parentIndex)
                                    props.navigation.navigate('ItemListing', {
                                        items: categoryItems,
                                        sub_category_name: props.data.sub_category_name,
                                        selected: selectedItems,
                                        pIndex:props.parentIndex
                                    });
                                }}>
                                <Image
                                    source={SearchImage}
                                    style={{ width: 20, height: 20 }}
                                />
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
                                        onPress={() => { selectHandler(processer.item_id, processer.name, processer.price) }}
                                        style={{ padding: 20 }}>
                                        <ImageBackground
                                            source = {idExists(processer.item_id) ? selectedIcCardImage : IcCardImage}
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
                                                />):(
                                                <Image
                                                    source={{ uri: processer.image }}
                                                    style={{ width: 48, height: 40, marginBottom: 10, alignSelf: 'center',borderRadius:7 }}
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
                                        <ItemDetails
                                            itemid={processer.item_id}
                                            sub_category_name={props.data.sub_category_name}
                                        />
                                    </TouchableOpacity>
                                    {/* )*/}
                                </>
                            );  
                        })}
                    </ScrollView>
                </View>
            ) : null}
        </View>


    )
};

const styles = StyleSheet.create({
    container: {
        width,
        height: height,
    },
    backButtonContentConatiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: width * 0.09,
    },
    backImage: {
        width: 48,
    },
    backTitle: {
        paddingHorizontal: 20,
        fontSize: 12,
        opacity: 0.5,
        color: '#FFFFFF',
        fontStyle: 'italic',
    },
    brandTitle: {
        fontSize: 20,
        color: '#ECDBFA',
        textAlign: 'left',
        width: 139,
        fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
    },
    price: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.3)',
        marginTop: 5,
        fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
    },
    scrollViewContainer: {
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    coverImage: {
        width: 80,
        height: 100,
        margin: 3,
        borderRadius: 10,
        marginHorizontal: 5
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});
const mapStateToProps = (state) => ({
    cart: state.cartReducer.cart,
    packages:state.packageReducer.packages,

})

const actionCreators = {
    add: cartActions.addCartAction,
    updatePackages: packageActions.updatePackages,

};

export default connect(mapStateToProps, actionCreators)(React.memo(ListDetails))

