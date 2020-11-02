import React, { useState, useEffect,useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Expand from '../../assets/ic_expand1.png';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getItemDetails } from '../../api/buildYourPc';
import CPUImage from '../../assets/cpu.jpg';
import Icons from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import IcDetailCard from '../../assets/ic_details_card.png';
import Btn from '../../screens/btn';

const { width, height } = Dimensions.get('window');
const ItemDetails = (props) => {
    const itemId = props.itemid;
    const refRBSheet = useRef();
    const [itemDetails,setItemDetails] = useState({});

    useEffect(() => {
        
    },[]);

    const GetItemDetails = () => {
        refRBSheet.current.open();
        getItemDetails(itemId).then((response) => {
            setItemDetails(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log("getItemDetails" + error);
        });
    }

    return(
        <View>
        <TouchableOpacity style={styles.expandContainer} onPress={() => GetItemDetails()}>
            <Image style={styles.expand} source={Expand}/>
        </TouchableOpacity>
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            style={styles.bottomSheet}
            animationType="fade"
            height={450}
            closeOnPressMask={true}
        >
            <ScrollView>
                <View style={styles.imageTextContainer}>
                    <View style={styles.brandItem}>
                        <Image
                        source={CPUImage}
                        style={styles.image}
                        />
                        <Text style={styles.item}>i7 64652k</Text>
                        <Text style={styles.brand}>intel</Text>
                    </View>
                    <View style={styles.brandItem}>
                        <Icons
                        name="x" size={20}
                        onPress={() => refRBSheet.current.close()}
                        style={styles.cross}  
                        />
                        <Text style={styles.price}>KD 2,000</Text>
                    </View>
                </View>
                <View style={styles.desToBtn}>
                    <View style={styles.description}>
                        <Text>New 10th Gen Intel® Core™ processors deliver remarkable performance upgrades for improved productivity and stunning entertainment, including 5.3 GHz, ...</Text>
                    </View>
                    <ImageBackground
                    source={IcDetailCard}
                    style={styles.detailsCardImage}
                    >
                        <View
                            style={styles.headingView}>
                            <Text
                                style={styles.packageText}>
                                Package Details (4 Items)
                            </Text>
                        </View>
                        <View
                            style={styles.dataView}>
                            {[...Array(4).keys()].map((i, k) => (
                                <View
                                style={styles.permormanceDetails}
                                key={k}>
                                <Text
                                    style={styles.performaceItem}>
                                    #of course
                                </Text>
                                <Text
                                    style={styles.itemData}>
                                    3.5 GHz
                                </Text>
                                </View>
                            ))}
                            </View>
                    </ImageBackground>
                    <ImageBackground
                    source={IcDetailCard}
                    style={styles.detailsCardImage}
                    >
                        <View
                            style={styles.headingView}>
                            <Text
                                style={styles.packageText}>
                                Processors Graphics
                            </Text>
                        </View>
                        <View
                            style={styles.dataView}>
                            {[...Array(4).keys()].map((i, k) => (
                                <View
                                style={styles.permormanceDetails}
                                key={k}>
                                <Text
                                    style={styles.performaceItem}>
                                    Graphics Basic Frequency
                                </Text>
                                <Text
                                    style={styles.itemData}>
                                    350 MHz
                                </Text>
                                </View>
                            ))}
                            </View>
                    </ImageBackground>

                    <TouchableOpacity style={styles.btn} onPress={() => {}}>
                        <Btn text="Select this CPU" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </RBSheet>
    </View>
    );
}

const styles = StyleSheet.create({
    expand:{
        width:16,
        height:10,
    },
    bottomSheet:{
        backgroundColor: "transparent",
    },
    expandContainer:{
        display:"flex",
        alignItems:'flex-end',
        bottom: 11,
        right:6,
    },
    image:{
        width:width*0.2,
        height:height*0.1,
        position:'relative',
        top:"-40%",

    },
    imageTextContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:"10%",
    },
    brandItem:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
    },
    item:{
        position:'relative',
        top:"-30%",
        fontSize:20,
    },
    brand:{
        position:'relative',
        top:"-30%",
        fontSize:15,    
    },
    cross:{
        position:'relative',
        top:"-30%",
        left:"80%",
    },
    price:{
        fontSize:18,
        position:'relative',
        top:"-20%",
    },
    description:{
        paddingHorizontal:"10%",
        position:'relative',
        top:"-4%",
    },
    desToBtn:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
    },
    detailsCardImage:{
        width:width*0.9,
        height:height*0.4,
        position:'relative',
        left:"10%",
        borderRadius: 10,
        marginVertical: "2%",
        overflow: 'hidden',
    },
    headingView:{
        padding: 20,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderBottomWidth: 0.3,
    },
    packageText:{
        color: '#fff',
        fontSize: 12,
        opacity: 0.8,
    },
    dataView:{
        padding: 20,
        borderBottomColor: 'rgba(255,255,255,0.3)',
    },
    permormanceDetails:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    performaceItem:{
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    itemData:{
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
    },
    btn:{
        marginHorizontal:"7%",
    },
});

export default ItemDetails;
