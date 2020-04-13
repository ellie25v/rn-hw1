import React, {useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ContextApp, initialState, testReducer} from "./context/reducers";
import Input from './components/input/Input';



export default function App() {

  const [state, dispatch] = useReducer(testReducer, initialState);

  return (
    <ContextApp.Provider value={{dispatch, state}}>
      <View style={styles.container}>
        <Input />
      </View>
    </ContextApp.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }

});
