import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Button
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateField from 'react-native-datefield';
import { styles, mainColor } from '../styles';
import logo from '../assets/logo.png'


export default function Register() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 2
  const topViewHeight = Platform.OS === 'ios' ? '22%' : '25%'
  const phoneInput = Platform.OS === 'ios' ? 'number-pad' : 'numeric'
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState('')

  function formatDate(value) {
    let newDate = []
    let formated = value.toISOString().split('T')[0];
    formated = formated.split('-')
    newDate.push(formated[1])
    newDate.push(formated[2])
    newDate.push(formated[0])
    newDate = newDate.join('-')
    setDate(newDate);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={{ height: '100%' }}>
            <View style={
              {
                height: topViewHeight,
              }
            }>
              <Image
                source={logo}
                style={
                  {
                    width: 280,
                    height: 280,
                    position: 'absolute',
                    left: 190,
                    top: 0,
                  }
                }
              />
            </View>

            {/* title */}
            <View style={{ paddingHorizontal: 30 }}>
              <View
                style={
                  {
                    paddingLeft: 10,
                    paddingBottom: 20
                  }
                }>
                <Text
                  style={
                    {
                      fontSize: 40,
                      fontWeight: '700'
                    }
                  }
                >
                  Create
                </Text>
                <Text
                  style={
                    {
                      fontSize: 40,
                      fontWeight: '700'
                    }
                  }
                >
                  An Account
                </Text>

              </View>
              {/* title */}


              <View style={{ height: '55%' }}>
                <View style={styles.divInput}>
                  <TextInput
                    style={focused === 'username' ? styles.inputOnFocus : styles.input}
                    placeholder='Username'
                    onFocus={() => setFocused('username')}
                  />
                </View>

                <View style={styles.divInput}>
                  <TextInput
                    keyboardType='email-address'
                    style={focused === 'email' ? styles.inputOnFocus : styles.input}
                    placeholder='Email'
                    onFocus={() => setFocused('email')}
                  />
                </View>

                <View style={styles.divInput}>
                  <TextInput
                    secureTextEntry={true}
                    style={focused === 'password' ? styles.inputOnFocus : styles.input}
                    placeholder='Password'
                    onFocus={() => setFocused('password')}
                  />
                </View>

                <View style={styles.dateinput}>
                  <DateField
                    labelDate="Birth date"
                    labelMonth="Birth month"
                    labelYear="Birth year"
                    onSubmit={(value) => formatDate(value)}
                  />
                </View>

                <View style={styles.divInput}>
                  <TextInput
                    keyboardType={phoneInput}
                    style={focused === 'phoneNumber' ? styles.inputOnFocus : styles.input}
                    placeholder='Phone Number'
                    onFocus={() => setFocused('phoneNumber')}
                  />
                </View>


                <View style={
                  {
                    paddingHorizontal: 15,
                    paddingTop: 20,
                  }
                }
                >
                  <Text style={styles.mainButton}>Sign Up</Text>
                </View>
              </View>

              <View style={
                {
                  padding: 10,
                  alignItems: 'center',
                  height: 40

                }
              }>
                <Text>
                  Already Registered?
                  <Text style={{ color: '#0487d9', textDecorationLine: 'underline' }}> Sign In Here</Text>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}
