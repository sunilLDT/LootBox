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



export default App;