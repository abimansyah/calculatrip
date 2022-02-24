import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from "react-native"
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { server } from "../globalvar";
import { useNavigation, useFocusEffect } from '@react-navigation/native';


export default function AddCompanionModal({ setModalVisible, data }) {
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const addCompanion = async () => {
    // console.log('---------------');
    try {
      const token = await AsyncStorage.getItem('access_token')
      const resp = await axios.post(`${server}/trips/${data}`, {
        input: input
      }, {
        headers: {
          access_token: token
        }
      })
      Keyboard.dismiss()
      navigation.navigate('Companion', {tripId:data, companionId:input})
      Alert.alert('Success', resp.data.message)
      // console.log(resp.data);
    } catch (err) {
      Alert.alert('Sorry',err.response.data.message);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={modalStyle.centeredView}>
      <View style={modalStyle.modalView}>
        <Text style={{ marginVertical: 4, fontSize: 21, fontWeight: '700' }}>Invite Companion</Text>
        {/* text input */}
        <TextInput
          placeholder="Email / Username"
          placeholderTextColor={'#a6a6a6'}
          style={modalStyle.inputBar}
          onChangeText={setInput}
          value={input}
          textAlign={'center'}
        />

        {/* search city */}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false)
            addCompanion()
          }}
          style={modalStyle.modalContainer}>
          <View style={{ paddingHorizontal: 10 }}>
            <Ionicons name="person-add-outline" size={24} color='#0487d9' />
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={modalStyle.modalText}>Search</Text>
          </View>
        </TouchableOpacity>

        {/* close */}
        <TouchableOpacity
          style={modalStyle.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Ionicons name="close" size={24} color="red" />
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={modalStyle.modalText}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

const modalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: Dimensions.get('window').width - 20,
    marginHorizontal: 5,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    margin: 5,
    borderColor: "#E6E6E6",


  },
  modalText: {
    marginLeft: 40,
    fontSize: 15
  },
  inputBar: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 1,
    borderRadius: 6,
    backgroundColor: "white",
    borderColor: "#E6E6E6",

  },
})