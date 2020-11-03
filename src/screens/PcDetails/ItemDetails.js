import React, {  useRef } from 'react';
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
import Icons from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import IcDetailCard from '../../assets/ic_details_card.png';
import Btn from '../../screens/btn';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';

const { width, height } = Dimensions.get('window');
const ItemDetails = (props) => {
    const itemId = props.itemid;
    const refRBSheet = useRef();
    const [itemDetails,setItemDetails] = React.useState({});
    const [customFieldsValue,setCustomFieldsValue] =  React.useState([]);

    const GetItemDetails = () => {
        refRBSheet.current.open();
        getItemDetails(itemId).then((response) => {
            setItemDetails(response.data);
            setCustomFieldsValue(response.data.custom_fields_values);
        }).catch((error) => {
            console.log("getItemDetails" + error);
        });
    }



    const selectItem=(id)=>{
        console.log(props.cart);
        let item = {
            "item_id": id,
            "quantity": 1
        };
        //setSelectedItems([...selectedItems, id]);
        props.add(item);
        refRBSheet.current.close()
        console.log(props.cart);
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
            height={500}
            closeOnPressMask={true}
        >
            <ScrollView>
                <View style={styles.imageTextContainer}>
                    <View style={styles.brandItem}>
                        <Image
                        source={{uri:itemDetails.image}}
                        style={styles.image}
                        />
                        <Text style={styles.item}>{itemDetails.name}</Text>
                        <Text style={styles.brand}>{itemDetails.brand}</Text>
                    </View>
                    <View style={styles.brandItem}>
                        <Icons
                        name="x" size={20}
                        onPress={() => refRBSheet.current.close()}
                        style={styles.cross}  
                        />
                        <Text style={styles.price}>{itemDetails.price}</Text>
                    </View>
                </View>
                <View style={styles.desToBtn}>
                    <View style={styles.description}>
                        <Text>{itemDetails.description}</Text>
                    </View>
                    <ImageBackground
                    source={IcDetailCard}
                    style={styles.detailsCardImage}
                    >
                        <View
                            style={styles.headingView}>
                            <Text
                                style={styles.packageText}>
                                Package Details (2 items)
                            </Text>
                        </View>
                        <View
                            style={styles.dataView}>
                            {customFieldsValue.map((customValues, index) => {
                                return(
                                <View
                                style={styles.permormanceDetails}
                                key={index}>
                                <Text
                                    style={styles.performaceItem}>
                                   {customValues.name}
                                </Text>
                                <Text
                                    style={styles.itemData}>
                                    {customValues.value}
                                </Text>
                                </View>
                                );
                            })}
                            </View>
                    </ImageBackground>

                    <TouchableOpacity style={styles.btn} onPress={() => {selectItem(itemId)}}>
                        <Btn text="Select this CPU" pay=" "/>
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
        fontSize:20,
    },
    brand:{
        position:'relative',
        fontSize:15,    
    },
    cross:{
        position:'relative',
        left:"80%",
        top:"-20%"
    },
    price:{
        fontSize:18,
        position:'relative',
    },
    description:{
        paddingHorizontal:"10%",
        position:'relative',
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

const mapStateToProps = (state) => ({
    cart: state.cartReducer.cart,

})

const actionCreators = {
    add: cartActions.addCartAction,

};

export default connect(mapStateToProps, actionCreators)(ItemDetails)


