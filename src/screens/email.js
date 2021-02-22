import React, {useContext, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import Input from '../components/input';
import Btn from './btn';
import {Context as AuthContext} from '../api/contexts/authContext';
import Modal from '../components/modal';
import {connect} from 'react-redux';
import PopUp from '../components/popup';

const {width, height} = Dimensions.get('window');

const Email = ({navigation, labels}) => {
  const {state, sendEmail} = useContext(AuthContext);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [popModal, setPopModal] = useState(false);
  const [contentModal, setContentModal] = useState('');

  const sendEmailFun = async () => {
    if(!title)
    {
      setPopModal(true);
      setContentModal(labels.fillTitle);
     }
    else if(!description){
      setPopModal(true);
      setContentModal(labels.fillDesc);
     
    }
    else{
      sendEmail(title, description);
    }
  }
  const popUpHandler=()=>{
    setPopModal(!popModal);
}

  return (
    <View
      style={{
        backgroundColor: '#261D2A',
      }}>
      <ImageBackground
        source={require('../assets/dottedBackground.png')}
        style={{
          width,
          height,
          overflow: 'hidden',
          padding: width * 0.1,
        }}>
          <PopUp visible={popModal} title={'Loot'} closeText={labels.ok} callBack={popUpHandler} content={contentModal}/>
        <View
          style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              style={{width: 48}}
              resizeMode="contain"
              source={require('../assets/back.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontStyle: 'italic',
              fontSize: 16,
              lineHeight: 16,
              opacity: 0.4,
              color: '#ECDBFA',
              marginLeft: 10,
              fontFamily: 'Montserrat-Italic',
            }}>
            {labels.contactUs}
          </Text>
        </View>
        {state.msg ? (
          <Modal msg={state.msg} hideBtn />
        ) : state.validationError ? (
          <Modal msg={state.validationError} />
        ) : null}
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '80%',
          }}>
          <View>
            <View style={{marginVertical: 15}}>
              <Input
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
                multiline
                style={{
                  height: height * 0.1,
                }}
              />
            </View>
            <View style={{marginVertical: 15}}>
              <Input
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
                style={{
                  height: height * 0.2,
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => sendEmailFun()}
            style={{
              width: '100%',
              height: height * 0.1,
            }}>
            {!state.loading ? (
              <Btn text={labels.submit} x="45" pay="" />
            ) : (
              <>
                <Btn text={' '} x="45" pay=""/>
                <ActivityIndicator
                  color="#ECDBFA"
                  size="small"
                  style={{bottom: 63}}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state) => ({
  labels:state.languageReducer.labels,
})

export default connect(mapStateToProps)(Email);