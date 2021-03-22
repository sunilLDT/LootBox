import React, {useState,useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { addressActions } from '../actions/address';
import {languagename} from '../components/LanguageName';
import {getSpecificAddress} from '../api/buildYourPc';

const AddressList = (props) => {
    const [arOren,setarOren] = useState('en');
    languagename().then(res => setarOren(res))
    useEffect(() => {
        props.showAddress();
    },[]);
    const navigateToForm = async (id) => {
        try{
            const response = await getSpecificAddress(id);
            props.navigation.navigate('address',{addressId:id,fullAddress:response.data});
        }catch(error){
            console.log("get specific data " + error)
        } 
    }
    return(
        <View>
            {props.address?props.address.map((values,i) => {
            return(
            <TouchableOpacity 
            key={i}
            onPress={() => navigateToForm(values.address_id)}
            >
            {values.is_default == 1?(
                <View style={styles.viewStyle}>
                    <Text
                        style={{
                        fontSize: 14,
                        color: '#ECDBFA',
                        width:"20%",
                        }}>
                        {values.address_type}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#ECDBFA',
                            marginRight:arOren == "ar"?"3%":"0%",
                            width:"80%"
                        }}>
                    <Text style={{fontSize:14,fontWeight:'bold'}}>{values.name+ ": "}</Text>
                        {values.floor !== null? "Floor: "+values.floor + ", ":null}
                        {values.apartment !== null?"Apartment: "+ values.apartment + ", ":null}
                        {values.avenue !== null?"Avenue: "+ values.avenue + ", ":null}
                        {"Street: "+values.street + ", "}
                        {"Block: "+values.block + ", "}
                        {"Area: "+values.area_name + ", "}
                        {"City: "+values.city_name}
                    </Text>
                </View>
            ):(
                <View style={styles.viewStyle}>
                    <Text
                        style={{
                        fontSize: 14,
                        color: '#ECDBFA',
                        opacity: 0.5,
                        width:"20%"
                        }}>
                        {values.address_type}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#ECDBFA',
                            opacity: 0.5,
                            marginRight:arOren == "ar"?"3%":"0%",
                            width:"80%",
                            
                        }}>
                    <Text style={{
                        fontSize:14,
                        fontWeight:'bold'
                        }}
                    >
                        {values.name+ ": "}
                    </Text>
                        {values.floor !== null? "Floor: "+values.floor + ", ":null}
                        {values.apartment !== null?"Apartment: "+ values.apartment + ", ":null}
                        {values.avenue !== null?"Avenue: "+ values.avenue + " ,":null}
                        {"Street: "+values.street + ", "}
                        {"Block: "+values.block + ", "}
                        {"Area: "+values.area_name + ", "}
                        {"City: "+values.city_name}
                    </Text>
                </View>
            )}  
            </TouchableOpacity>
            )
        }):null}
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical:30,
        borderColor:'#ffffff',
        borderWidth:0,
        flex:1,
        justifyContent:'space-between'
    },
});

const mapStateToProps = (state) => ({
    address: state.addressReducer.address,
    specificAdddressArray:state.addressReducer.specificAdddressArray,
    loading:state.addressReducer.loading
  })
  const actionCreators = {
    showAddress: addressActions.showAddress,
    specificAdddress: addressActions.specificAdddress,
  };
  
export default connect(mapStateToProps,actionCreators)(AddressList);