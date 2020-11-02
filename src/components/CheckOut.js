import React from "react";
import { WebView } from 'react-native-webview';
import {
    StyleSheet,
    View,
    SafeAreaView,
} from "react-native"



const CheckOut = ({navigation,route}) => {
    const {paymentUrl} = route.params;
const _onNavigationStateChange = (webViewState) => {
    console.log(webViewState.url)
    if(webViewState.url == "https://test-api.loot-box.co/api/hesabe-success-callback"){
        console.log("success");
    }
    else{
        console.log("errrrorr");
    }
    }
    return (
        <SafeAreaView >
            <View style={{ width: '100%', height: 600 }}>
                <WebView
                    style={{ height: 400 }}
                    onNavigationStateChange={_onNavigationStateChange.bind(this)}
                    originWhitelist={['*']}
                    scalesPageToFit={false}
                    source={{ uri: paymentUrl }}>
                </WebView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: "-2%",

        marginBottom: "-2%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        margin: 8,
    },

});
export default CheckOut;