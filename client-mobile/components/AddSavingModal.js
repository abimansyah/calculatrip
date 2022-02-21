import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { styles } from '../styles'

export default addSaving = () => {
  const [focused, setFocused] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const phoneInput = Platform.OS === 'ios' ? 'number-pad' : 'numeric'
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
      <TouchableOpacity style={savingModalStyle.buttonContainer}>
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