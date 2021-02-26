import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, {
    DialogContent,
    SlideAnimation,

} from 'react-native-popup-dialog';
const PopUp = (props) => {
    return (
        <Dialog
            visible={props.visible}
            onTouchOutside={() => { props.callBack() }}
            dialogStyle={{ backgroundColor: '#272732', width: "70%", paddingHorizontal: 0 }}
            dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
            })}
            // onHardwareBackPress={() => {props.onhandlePress()}}
        >
            <View>
                <View style={{
                    alignItems: 'center',
                    height: 45,
                }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#865CF4', '#C01C8A',]} style={{
                        flex: 1,
                        borderRadius: 5,
                        width: "100%"
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontFamily: Platform.OS == 'android' ? 'Michroma-Regular' : 'Michroma',
                            textAlign: 'center',
                            color: '#ffffff',
                            backgroundColor: 'transparent',
                        }}>
                            {props.title}
                        </Text>
                    </LinearGradient>
                </View>
                <DialogContent >
                    <View style={{
                        alignItems: 'center',
                        paddingVertical: "15%"
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 15,
                            fontFamily:
                                Platform.OS == 'android'
                                    ? 'Montserrat-Light'
                                    : 'Montserrat',
                        }}>
                            {props.content}
                        </Text>
                    </View>
                </DialogContent>
            </View>
            <TouchableOpacity onPress={() => props.callBack()}>
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderTopWidth: 0.5,
                    borderColor: '#fff'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.callBack()
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            fontFamily:
                                Platform.OS == 'android'
                                    ? 'Montserrat-Light'
                                    : 'Montserrat',
                        }}>
                            {props.closeText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Dialog>
    )
}

export default (PopUp)