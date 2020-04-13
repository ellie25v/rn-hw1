import React, { useContext, useEffect, useState }  from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, Text, Platform, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {ContextApp} from "../../context/reducers";
import List from '../list/List';
import uuid from 'uuid-random';

const initialState = {
    value: '',
    priority: '',
    id: undefined
}
// const initialNotes = {
//     notes: [{value: 'aaa', priority: 'low'}, {value: 'bbb', priority: 'moderate'}],
// }

export default function Input() {
  const [value, setValue] = React.useState(initialState);
//   const [notes, setNote] = React.useState([]);
  const {state, dispatch} = useContext(ContextApp);

    const addNote = () => {
        if(value.value !== '' && value.priority !==undefined){
            dispatch({
                type: 'addNote',
                payload: {value: value.value, priority: value.priority, id: value.id}
            })}
        // setNote(prevState => {
        //     console.log('prevState', prevState);
        //     return  [{value: state.value, priority: state.priority, id: state.id}, ...prevState]})}
    }
    const deleteNote = (id) => {
        dispatch({
            type: 'deleteNote',
            payload: id
        })
        // notes.filter( note => note.id !== id)
    }

    useEffect(() => {
        addNote();
        console.log('value', value)
        console.log('state', state)
        setValue(initialState)
    }, [value.id]);

    const alertPriority = () => {
    Keyboard.dismiss();
    console.log('value.value', value)
    Alert.alert(
      "Choose Priority",
      value.value,
      [
        { text: "Low", onPress: () => setValue({priority: "low", value: value.value, id: uuid()}) },
        { text: "Moderate", onPress: () => setValue({priority: "moderate", value: value.value, id: uuid()}) },
        { text: "High", onPress: () => setValue({priority: "high", value: value.value, id: uuid()}) },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={styles.mainWrapper}>
      <View style={styles.inputWrapper}>
        <TextInput
            style={styles.input}
            placeholder={'Enter smth...'}
            placeholderTextColor={'grey'}
            onChangeText={text => setValue({value: text})}
            value={value.value}
        />
        <LinearGradient
        colors={['#8AEAB1', '#FBD786', '#f7797d']}
        start={ [0, 0.5 ]}
        end={[1, 0.5 ]}
        style={styles.btn}>
        <TouchableOpacity
            onPress={() => alertPriority()}
            activeOpacity={0.5}
            style={styles.press}
        >
            <Text style={styles.btnTitle}>
                Add Note
             </Text>
        </TouchableOpacity>
        </LinearGradient>
     </View>
     {/* {console.log('state.notes', notes)} */}
     <List deleteNote={deleteNote}/>
    </View>
  );
}

const styles = StyleSheet.create({
    mainWrapper: {
        flexDirection: "column",
    },
    inputWrapper:{
        flexDirection: "row",
        marginTop: 50,
        justifyContent: 'space-around'
    },
    input: {
        color: '#73A691',
        height: 35,
        fontWeight: "500",
        padding: 5,
        paddingLeft: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 24,
        width: 220,
        ...Platform.select({
            ios: {
                fontWeight: "500",
            },
            android: {
                fontWeight: "400",
            },
        })},
    btn: {
        height: 35,
        borderRadius: 17,
        width: 130,
        alignItems: 'center',
        justifyContent: "center"
    },
    press: {
        flex: 1,
        borderRadius: 17,
        width: 130,
        alignItems: 'center',
        justifyContent: "center"
    },
    btnTitle: {
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        // backgroundColor: "#f7797d"
    }
})

