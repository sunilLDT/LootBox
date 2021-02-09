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

const AddressList = (props) => {
    const [arOren,setarOren] = useState('en');
    languagename().then(res => setarOren(res))
    useEffect(() => {
        props.showAddress();
    },[]);
    return(
        <View>
            {props.address?props.address.map((values,i) => {
            return(
            <TouchableOpacity 
            key={i}
            onPress={() => props.navigation.navigate('address',{addressId:values.address_id})}
            >
            {values.is_default == 1?(
                <View style={styles.viewStyle}>
                    <Text
                        style={{
                        fontSize: 14,
                        color: '#ECDBFA',
                        
                        }}>
                        {values.address_type}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#ECDBFA',
                            marginRight:arOren == "it"?"6%":"0%",
                        }}>
                    {values.area_name},{values.city_name}
                    </Text>
                </View>
            ):(
                <View style={styles.viewStyle}>
                    <Text
                        style={{
                        fontSize: 14,
                        color: '#ECDBFA',
                        opacity: 0.5,
                        
                        }}>
                        {values.address_type}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#ECDBFA',
                            opacity: 0.5,
                            marginRight:arOren == "it"?"6%":"0%",
                            
                        }}>
                    {values.area_name},{values.city_name}
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
        marginVertical:5,
        borderColor:'#ffffff',
        borderWidth:0,
        marginLeft:10,
        flex:1,
        marginTop:20,
        justifyContent:'space-between'
    },
});

const mapStateToProps = (state) => ({
    address: state.addressReducer.address,
  })
  const actionCreators = {
    showAddress: addressActions.showAddress,
  
  };
  
export default connect(mapStateToProps,actionCreators)(AddressList);