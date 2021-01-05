import React from "react";
import { WebView } from 'react-native-webview';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
} from "react-native";

const CheckOut = ({ navigation, route }) => {

    const { paymentUrl } = route.params;
    const _onNavigationStateChange = (webViewState) => {
        var fullUrl = webViewState.url;
        var msgUrl = fullUrl.substring(0, 56);
        // if(msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback" || msgUrl == "https://test-api.loot-box.co/api/hesabe-error-callback"){
        if (msgUrl.includes('hesabe-success-callback') || msgUrl.includes('hesabe-error-callback')) {
            navigation.navigate('alertMessage', { msgUrl: msgUrl });
        }
    }
    return (
        <SafeAreaView >
            <View style={{ width: '100%', height: '100%' }}>
                <WebView
                    style={{ height: 400 }}
                    onNavigationStateChange={_onNavigationStateChange.bind(this)}
                    originWhitelist={['*']}
                    // scalesPageToFit={true}
                    source={{ uri: paymentUrl }}>
                </WebView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
});
export default CheckOut;