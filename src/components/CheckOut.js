import React from "react";
import { WebView } from 'react-native-webview';
import {
    View,
    Text,
    SafeAreaView,
} from "react-native";
import { connect } from 'react-redux';

const CheckOut = (props) => {
    const {labels} = props.route.params;
    const { paymentUrl } = props.route.params;
    const _onNavigationStateChange = (webViewState) => {
        var fullUrl = webViewState.url;
        var msgUrl = fullUrl.substring(0, 56);
        console.log(msgUrl)
        // if(msgUrl == "https://test-api.loot-box.co/api/hesabe-success-callback" || msgUrl == "https://test-api.loot-box.co/api/hesabe-error-callback"){
        if (msgUrl.includes('hesabe-success-callback')) {
            props.navigation.navigate('alertMessage', { msgUrl: msgUrl });
        } else if (msgUrl.includes('hesabe-error-callback')) {
            alert(labels.paymentFailed)
            props.navigation.navigate('cart')
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

const mapStateToProps = (state) => ({
    labels:state.languageReducer.labels,
  })
export default connect(mapStateToProps)(CheckOut)