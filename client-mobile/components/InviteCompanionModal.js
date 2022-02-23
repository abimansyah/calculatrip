import { View, Text, TextInput,TouchableOpacity } from 'react-native'
import { useState } from 'react';
import { styles } from '../styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { server } from '../globalvar';


export default inviteCompanion = ({ data }) => {
  const [focused, setFocused] = useState('');
  const [input, setInput] = useState('');

  const addCompanion = async () => {
    console.log('---------------');
    try {
      const token = await AsyncStorage.getItem('access_token')
      const resp = await axios.post(`${server}/trips/${data}`, {
        input: input
      }, {
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
        <Text style={{
          fontWeight: '700',
          fontSize: 23
        }}>Invite Companion</Text>
      </View>
      <View >
        <TextInput
          style={focused === "email" ? styles.modalInputOnFocus : styles.modalInput}
          keyboardType='email-address'
          placeholder='Email / Username'
          onFocus={() => setFocused('email')}
          value={input}
          onChangeText={setInput}
        />
      </View>
      <View style={
        {
          paddingHorizontal: 20,
          paddingTop: 5,
          width: '75%'
        }
      }>
        <TouchableOpacity
          onPress={() => addCompanion()}
        >
          <Text style={styles.mainButton}>Invite Companion</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}