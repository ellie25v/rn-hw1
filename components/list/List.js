import React, {useContext} from "react";
import { FlatList, View, SafeAreaView, Text, TouchableOpacity, StyleSheet , Alert} from "react-native";
import {ContextApp} from "../../context/reducers";


const List = ({deleteNote}) => {
    // console.log('notes', notes)
    const {state, dispatch} = useContext(ContextApp);

    const getTextStyle = (note) => {
        if(note.priority === 'low') {
         return {
            height: 40,
            borderRadius: 7,
            marginTop: 10,
            padding: 5,
            backgroundColor: '#6BDCA8',
            justifyContent: 'center'
         }
        } else if(note.priority === 'moderate'){
          return {
            height: 40,
            borderRadius: 7,
            marginTop: 10,
            padding: 5,
            backgroundColor: '#F5C729',
            justifyContent: 'center'
          }
        } else if(note.priority ==='high'){
            return {
              height: 40,
              borderRadius: 7,
              marginTop: 10,
              backgroundColor: '#FA566D',
              justifyContent: 'center'
            }
    }}

    const alertDel =  (item) => {
        Alert.alert(
            "Do you want to delete this note?",
            item.value,
            [
              { text: "Cancel",  onPress: () => console.log("Cancel Pressed")},
              {text: "Delete", onPress: () => deleteNote(item.id), style: "cancel" },
            ])
            // console.log('notes', notes)
    }

    return(
    <View style={styles.wrapper}>
      <SafeAreaView>
        <FlatList
          keyExtractor={(item) => item.id}
          data={state}
          renderItem={({ item }) => (
            <View style={getTextStyle(item)}>
              <TouchableOpacity
              style={styles.btn}
                activeOpacity={0.1}
                onLongPress={() => alertDel(item)}
              >
                <Text
                  style={styles.text}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  )};
  
  export default List;

const styles = StyleSheet.create({
    wrapper: {
    //   backgroundColor: '#ccc',
      marginHorizontal: 10,
      marginTop: 15,
    },
    btn: {
        alignSelf: 'stretch',
    },
    text: {
        color: '#fff',
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center"
    },
  
  });