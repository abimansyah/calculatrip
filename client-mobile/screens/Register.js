import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from 'react-native-input-style';
import { styles } from '../styles';
import logo from '../assets/logo.png'

export default function Register() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 40
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

          <View style={
            {
              height: '42%'
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
                Sign Up
              </Text>
            </View>

            <View>
              <Input
                id="name"
                label="Email"
                onInputChange={setEmail}
                keyboardType="default"
                required
                outlined
                borderColor="#0487d9"
              />
              <Input
                id="name"
                label="Username"
                onInputChange={setUsername}
                keyboardType="default"
                required
                outlined
                borderColor="#0487d9"
              />
              <Input
                id="password"
                label="Password"
                secureTextEntry
                onInputChange={setPassword}
                keyboardType="default"
                required
                outlined
                borderColor="#0487d9"
              />
            </View>
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
              Already Registered?  
              <Text style={{color: '#0487d9', textDecorationLine: 'underline'}}> Sign In Here</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
