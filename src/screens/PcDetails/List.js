import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import SearchImage from '../../assets/buildYourPc/search.png';
import IcCardImage from '../../assets/ic3.png';
import selectedIcCardImage from '../../assets/Rectangle.png'
import { ScrollView } from 'react-native-gesture-handler';
import { getCategoriesItem } from '../../api/buildYourPc';
import ItemDetails from './ItemDetails';
import { connect } from 'react-redux';
import { cartActions } from '../../actions/user';

var sel = [];
const ListDetails = (props) => {
    const [categoryItems, setCategoyItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([0]);

    useEffect(() => {
        getCategoriesItem(props.data.sub_category_id, props.data.item_id, props.data.sub_category_name).then((response) => {
            setCategoyItems(response.data);
        }).catch((error) => {
            console.log("getCategoriesItems" + error);
        });
    }, []);

    const selectHandler = (id) => {
        let item = {
            "item_id": id,
            "quantity": 1
        };
        setSelectedItems([selectedItems, id]);
        props.add(item)
       
        // console.log(selectedItems);   
        console.log(props.cart);
    }

    const selectDisplay = (id) => {
        let a = [...selectedItems]
        if (!a.includes(id)) {
            return true;
        }
        if (a.includes(id)) {
            return false;
        }
    }
    return (
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
                        style={{ fontSize: 12, color: '#D2D7F9', fontWeight: '300' }}>
                        List Of {props.data.sub_category_name}
                    </Text>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={() => {
                            props.navigation.navigate('ItemListing', {
                                items: categoryItems,
                                sub_category_name:props.data.sub_category_name,
                            });
                        }}>
                        <Text
                            style={{
                                fontSize: 10,
                                color: '#DF2EDC',
                                fontWeight: '300',
                            }}>
                            View all
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('ItemListing', {
                                items: categoryItems,
                                sub_category_name:props.data.sub_category_name,
                            });
                        }}>
                        <Image
                            source={SearchImage}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal={true} style={{}}>
                {categoryItems.map((processer, index) => {  
                    return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => { selectHandler(processer.item_id) }}
                        style={{ padding: 20 }}
                    >
                        <ImageBackground
                            source={!selectDisplay(processer.item_id) ? selectedIcCardImage : IcCardImage}
                            style={{ width: 139, height: 151 }}
                        >
                            <View
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    marginTop: 30,
                                }}>
                                <Image
                                    source={{ uri: processer.image }}
                                    style={{ width: 48, height: 40, marginBottom: 10,alignSelf:'center' }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '700',
                                        color: '#FFFFFF',
                                        marginBottom: 10,
                                        alignSelf:'center'
                                    }}>
                                    {processer.name}

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
                                        marginBottom: 10,
                                        fontStyle: 'italic',
                                        textAlign: 'center',
                                    }}>
                                    +KD {processer.price}
                                </Text>
                            </View>
                        </ImageBackground>
                        <ItemDetails
                            itemid={processer.item_id}
                            addToSelected={selectHandler}
                        />
                    </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    )
};


const mapStateToProps = (state) => ({
    cart: state.cartReducer.cart,

})

const actionCreators = {
    add: cartActions.addCartAction,

};

export default connect(mapStateToProps, actionCreators)(ListDetails)

