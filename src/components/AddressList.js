import React, {useState,useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {addressListApi} from '../api/buildYourPc';
const AddressList = ({navigation}) => {
    const [addressList,setAddressList] = useState([]);

    useEffect(() => {
        addressListApi().then((response) => {
          setAddressList(response.data)
        }).catch((erroe) => {
          console.log("AddressList" + erroe)
        })
    },[]);
    return(
        <View>
            {addressList.map((values,i) => {
            return(
            <TouchableOpacity 
            key={i}
            onPress={() => navigation.navigate('address',{addressId:values.address_id})}
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
                            
                        }}>
                    {values.area_name},{values.street}
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
                        }}>
                    {values.area_name},{values.street}
                    </Text>
                </View>
            )}  
            </TouchableOpacity>
            );
        })}
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
        marginVertical:5
    },
});

export default AddressList;