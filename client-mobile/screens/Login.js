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
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// import Load from "react-native-loading-gif";

import { styles } from '../styles';
import logo from '../assets/logo.png'
import loadingGif from '../assets/loading.gif'
import { server } from '../globalvar';


export default function Login({ navigation }) {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 40
  const [emailUsername, setEmailUsername] = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState('')
  const [loading, setLoading] = useState(false)

  // send data to server
  const doLogin = async (req, res) => {
    try {
      setLoading(true)
      const resp = await axios.post(`${server}/users/login`, {
        loginInput: emailUsername,
        password: password
      })
      console.log(resp.data);
      setEmailUsername("")
      setPassword("")
      await AsyncStorage.setItem('access_token', resp.data.access_token)
      Alert.alert("Success","Welcome to Calculatrip!")
      setLoading(false)
      navigation.navigate('Home')
    } catch (err) {
      setLoading(false)
      console.log(err);
      Alert.alert("Error",err.response.data.message)
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
          <View style={{position: "relative", height: "100%"}}>
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
          
          {loading ? (
              <View style={{width: "100%", height: "100%", position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(240, 240, 240, 0.5)"}}>
                <Image source={loadingGif} />
              </View>
            ) : undefined}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  );
}
