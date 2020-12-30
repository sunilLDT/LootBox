import React from "react";
import { WebView } from 'react-native-webview';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
} from "react-native";

const Faq = ({ navigation, route }) => {
    return (
        <>
           <SafeAreaView >
            <View style={{ width: '100%', height: '100%' }}>
                <WebView
                    style={{ height: 400 }}
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                    source={{ uri: 'https://www.google.com' }}>
                </WebView>
            </View>
        </SafeAreaView>
        </>
        
    )
}


export default Faq;

