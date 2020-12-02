import React, {  useRef, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Expand from '../../assets/ic-3copy.png';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getItemDetails } from '../../api/buildYourPc';
import Icons from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import IcDetailCard from '../../assets/ic_details_card.png';
import Btn from '../../screens/btn';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';
import ViewMoreText from 'react-native-view-more-text';


const { width, height } = Dimensions.get('window');
const ItemDetails = (props) => {
    const itemId = props.itemid;
    const refRBSheet = useRef();
    const [itemDetails,setItemDetails] = React.useState({});
    const [customFieldsValue,setCustomFieldsValue] =  React.useState([]);

    const renderViewMore = (onPress) => {
        return(
          <Text style={styles.moreLess} onPress={onPress}>more</Text>
        )
      };
    const renderViewLess = (onPress) => {
        return(
          <Text style={styles.moreLess} onPress={onPress}>less</Text>
        )
      };

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
        let item = {
            "item_id": id,
            "quantity": 1
        };
        setSelectedItems([...selectedItems, id]);
        props.add(item);
        refRBSheet.current.close()
    }

    return(
        <View>
        <TouchableOpacity style={styles.expandContainer} onPress={() => GetItemDetails()}>
            <Image style={styles.expand} source={Expand}/>
        </TouchableOpacity>
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            style={styles.bottomSheet}
            animationType="fade"
            height={500}
            closeOnPressMask={true}
            customStyles={{
                draggableIcon: {
                  backgroundColor: "#2E2E3A"
                },
                container:{
                    backgroundColor: "#2E2E3A", 
                    borderTopLeftRadius:30,
                    borderTopRightRadius:30,
                }
              }}
        >
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.imageTextContainer}>
                    <View style={styles.brandItem}>
                        <Image
                        source={{uri:itemDetails.image}}
                        style={styles.image}
                        />
                        <Text numberOfLines={2} style={styles.item}>{itemDetails.name}</Text>
                        <Text style={styles.brand}>{itemDetails.brand}</Text>
                    </View>
                    <View style={styles.brandItem}>
                        <Icons
                        name="x" size={20}
                        onPress={() => refRBSheet.current.close()}
                        style={styles.cross}  
                        />
                        <Text style={styles.price}>KD {itemDetails.price}</Text>
                    </View>
                </View>
                <View style={styles.desToBtn}>
                    <View style={styles.description}>
                        <ViewMoreText
                            numberOfLines={3}
                            renderViewMore={renderViewMore}
                            renderViewLess={renderViewLess}
                            textStyle={{textAlign:'left'}}
                        >
                            <Text style={styles.descriptionText}>
                            {itemDetails.description} 
                            </Text>
                        </ViewMoreText>
                    </View>
                    <ImageBackground
                    source={IcDetailCard}
                    style={styles.detailsCardImage}
                    >
                        <View
                            style={styles.headingView}>
                            <Text
                                style={styles.packageText}>
                                Package Details ({customFieldsValue.length} items)
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
                        <Btn text="Select this CPU" pay=""/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </RBSheet>
    </View>
    );
}

const styles = StyleSheet.create({
    expand:{
        width:25,
        height:13,
    },
    scrollViewContainer:{
    },
    bottomSheet:{
        backgroundColor: "transparent",
    },
    expandContainer:{
        display:"flex",
        alignItems:'flex-end',
        bottom: 13,
        right:8,
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
        fontSize:17,
        color:'#fff',
        marginVertical:5,
        fontFamily:'Michroma-Regular',
        width:width*0.5
    },
    brand:{
        position:'relative',
        fontSize:15,
        color: 'rgba(255,255,255,0.3)', 
        marginVertical:5,
        fontFamily:'Michroma-Regular',   
    },
    cross:{
        position:'relative',
        left:"80%",
        top:"-20%",
        color: '#842D8A',
        marginVertical:5,
    },
    price:{
        fontSize:12,
        position:'relative',
        color: 'rgba(255,255,255,0.3)',
        marginVertical:5,
        fontFamily:'Michroma-Regular',
    },
    description:{
        paddingHorizontal:"10%",
        position:'relative',
        marginVertical:5,
    },
    descriptionText:{
        color: 'rgba(255,255,255,0.3)',
    },
    desToBtn:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
    },
    detailsCardImage:{
        width:width*0.9,
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
        color: 'rgba(255,255,255,0.3)',
        fontSize: 14,
    },
    itemData:{
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
    },
    btn:{
        marginHorizontal:"7%",
    },
    moreLess:{
        color:'#fff',
        fontWeight:'bold',
    }
});

const mapStateToProps = (state) => ({
    cart: state.cartReducer.cart,

})

const actionCreators = {
    add: cartActions.addCartAction,

};

export default connect(mapStateToProps, actionCreators)(ItemDetails)


