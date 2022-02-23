import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react';
import { styles } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { server } from '../globalvar';
import { useNavigation } from '@react-navigation/native';

export default addSaving = ({ data }) => {
  const nav = useNavigation()
  const [focused, setFocused] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const phoneInput = Platform.OS === 'ios' ? 'number-pad' : 'numeric';

  const value = {
    name: name,
    amount: amount,
    savingDate: new Date()
  }

const addNewSaving = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token')
    const resp = await axios.post(`${server}/savings/${data}`, value, {
      headers: {
        access_token: token
      }
    })
    console.log(resp.data);
  } catch (err) {
    console.log(err);
  }
}

  return (
    <View style={styles.modalData}>
      <View>
        <Text style={savingModalStyle.title}>Add Saving</Text>
      </View>
      <View style={{marginTop: 10}}>
        <TextInput
          style={focused === "name" ? styles.modalInputOnFocus : styles.modalInput}
          placeholder='Saving Name'
          onFocus={() => setFocused('name')}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={focused === "amount" ? styles.modalInputOnFocus : styles.modalInput}
          placeholder='Saving Amount'
          keyboardType='numeric'
          onFocus={() => setFocused('amount')}
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <TouchableOpacity style={savingModalStyle.buttonContainer}
      onPress={() => {
        addNewSaving()
        Keyboard.dismiss()
        nav.navigate('Saving', {
          tripId: data
        })
        }}>
        <Text style={styles.mainButton}>Add Saving</Text>
      </TouchableOpacity>
    </View>
  )
}

const savingModalStyle = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 21
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 5,
    width: '75%'
  }
})