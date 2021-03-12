import React from "react";
import { WebView } from 'react-native-webview';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
} from "react-native";

const Faq = (props) => {
    const {invoiceUrl} = props.route.params;
    return (
        <>
           <SafeAreaView >
            <View style={{ width: '100%', height: '100%' }}>
                <WebView
                    style={{ height: 400 }}
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                    source={{ uri: invoiceUrl }}>
                </WebView>
            </View>
        </SafeAreaView>
        </>
        
    )
}


export default Faq;

