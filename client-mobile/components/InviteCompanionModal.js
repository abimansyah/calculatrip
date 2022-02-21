import { View, Text, TextInput } from 'react-native'
import { useState } from 'react';
import { styles } from '../styles'

export default inviteCompanion = () => {
  const [focused, setFocused] = useState('')
  const [email, setEmail] = useState('')
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
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={
        {
          paddingHorizontal: 20,
          paddingTop: 5,
          width: '75%'
        }
      }>
        <Text style={styles.mainButton}>Invite Companion</Text>
      </View>
    </View>
  )
}