import React, {useState, useContext} from 'react';
import {
  StyleSheet,
} from 'react-native';
import {Context as AuthContext} from '../api/contexts/authContext';
import SimpleAlert from './SimpleAlert';

const App = ({msg, hideBtn}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const {removeError,setValidationError} = useContext(AuthContext);

  return (
    <>
    {modalVisible?(
      <SimpleAlert 
      msg={msg} 
      removeError={removeError()} 
      setValid={setValidationError(null)}
      />
    ):null}
    
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    marginVertical: 40,
    backgroundColor: '#393743',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Platform.OS=='android'?'Michroma-Regular':'Michroma',  
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#ECDBFA',
    fontSize:22,
   
  },
});

export default App;
