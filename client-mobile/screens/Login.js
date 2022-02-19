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
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from 'react-native-input-style';
import { styles } from '../styles';
import logo from '../assets/logo.png'

export default function Login() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 40
  const [emailUsername, setEmailUsername] = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState('')
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

          <View style={
            {
              height: '55%'
            }
          }>
            <Image
              source={logo}
              style={
                {
                  width: 300,
                  height: 300,
                  position: 'absolute',
                  left: 160,
                  top: 30,
                }
              }
            />
          </View>

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
                Sign In
              </Text>
            </View>

            <ScrollView>

              <View style={styles.divInput}>
                <TextInput
                  keyboardType='email-address'
                  style={focused === 'email' ? styles.inputOnFocus : styles.input}
                  placeholder='Email / Username'
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

            </ScrollView>
            
            <View style={
              {
                paddingHorizontal: 15,
                paddingTop: 20,
              }
            }>
              <Text style={styles.mainButton}>Sign In</Text>
            </View>
          </View>

          <View style={
            {
              flex: 1,
              paddingTop: 20,
              alignItems: 'center'
            }
          }>
            <Text>
              Don't have an account?
              <Text style={{ color: '#0487d9', textDecorationLine: 'underline' }}> Sign Up Here</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
