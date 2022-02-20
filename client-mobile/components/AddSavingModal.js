import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { styles } from '../styles'

export default inviteCompanion = () => {
  const [focused, setFocused] = useState('')
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
        />
        <TextInput
          style={focused === "amount" ? styles.modalInputOnFocus : styles.modalInput}
          placeholder='Saving Amount'
          keyboardType={phoneInput}
          onFocus={() => setFocused('amount')}
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