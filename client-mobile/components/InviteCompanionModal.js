import { View, Text, TextInput } from 'react-native'
import { styles } from '../styles'

export default inviteCompanion = () => {
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
          style={styles.modalInput}
          keyboardType='email-address'
          placeholder='Email / Username'
          onFocus={() => setFocused('email')}
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