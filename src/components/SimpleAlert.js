
import React from "react";
import { Alert } from "react-native";


const SimpleAlert = ({msg,removeError,setValid}) => {
    const errorMsg = () => {
        removeError;
        setValid;
    }
    Alert.alert(
        "Lootdfsvfsvs",
        msg,
        [
            { text: "OK", onPress: () => errorMsg() }
        ],
        { cancelable: false }
    );
    return null;
}

export default SimpleAlert;