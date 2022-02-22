import React, { useEffect, useState } from 'react'
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
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import Load from "react-native-loading-gif";
import { styles } from '../styles';
import logo from '../assets/logo.png'


export default function Login({ navigation }) {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 40
  const [emailUsername, setEmailUsername] = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState('')

  // send data to server
  const doLogin = async (req, res) => {
    try {
      const resp = await axios.post('http://d65d-103-78-115-90.ngrok.io/users/login', {
        loginInput: emailUsername,
        password: password
      })
      console.log(resp.data);
      setEmailUsername("")
      setPassword("")
      await AsyncStorage.setItem('access_token', resp.data.access_token)
      navigation.navigate('Home')
    } catch (err) {
      console.log(err);
      alert(err.response.data.message)
    }
  }

  const loginCheck = async () => {
    const getAccessToken = await AsyncStorage.getItem('access_token')
    if (getAccessToken !== null) {
      navigation.navigate('Home')
    }
  }

  useEffect(() => {
    loginCheck()
  }, [])


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
                  onChangeText={(emailUsernameData) => setEmailUsername(emailUsernameData)}
                  value={emailUsername}
                />
              </View>

              <View style={styles.divInput}>
                <TextInput
                  secureTextEntry={true}
                  style={focused === 'password' ? styles.inputOnFocus : styles.input}
                  placeholder='Password'
                  onFocus={() => setFocused('password')}
                  onChangeText={(passwordData) => setPassword(passwordData)}
                  value={password}
                />
              </View>

            </ScrollView>

            <TouchableOpacity onPress={doLogin}>
              <View style={
                {
                  paddingHorizontal: 15,
                  paddingTop: 20,
                }
              }>

                <Text style={styles.mainButton}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={
            {
              flex: 1,
              paddingTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: 'center'
            }
          }>
            <Text>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={{ color: '#0487d9', textDecorationLine: 'underline' }}> Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  );
}
