import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import DateField from 'react-native-datefield';
import { styles } from "../styles"
import logo from '../assets/logo.png'

export default function EditProfile() {
  const [username, setUsername] = useState("Username")
  const [email, setEmail] = useState("Email@gmail.com")
  const [birthDate, setBirthDate] = useState("12/25/2021")
  const [phoneNumber, setPhoneNumber] = useState("081108101")
  const [avatar, setAvatar] = useState("081108101")
  const [focused, setFocused] = useState('')
  const phoneInput = Platform.OS === 'ios' ? 'number-pad' : 'numeric'

  function formatDate(value) {
    let newDate = []
    let formated = value.toISOString().split('T')[0];
    formated = formated.split('-')
    newDate.push(formated[1])
    newDate.push(formated[2])
    newDate.push(formated[0])
    newDate = newDate.join('-')
    setBirthDate(newDate);
  }

  return(
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ position: 'relative', height: '100%' }}>
        <View style={editProfileStyle.headerView}>
          <TouchableOpacity style={{padding: 15}} >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{marginLeft: 40, color: "#fff"}}>Username</Text>
          <TextInput
            style={focused === 'username' ? editProfileStyle.title : editProfileStyle.title}
            placeholder='Username'
            placeholderTextColor="#a2e1ff"
            onFocus={() => setFocused('username')}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={{width: "100%", flexDirection: "row", justifyContent: "center", paddingTop: 25}}>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>Edit Profile</Text>
        </View>
        <View style={{marginHorizontal: 40, marginVertical: 10}}>
          <TextInput
            keyboardType='email-address'
            style={focused === 'email' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
            placeholder='Email'
            onFocus={() => setFocused('email')}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            secureTextEntry={true}
            style={focused === 'password' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
            placeholder="New Password"
            onFocus={() => setFocused('password')}
          />
          <View style={editProfileStyle.inputDate}>
            <DateField
              labelDate="Birth date"
              labelMonth="Birth month"
              labelYear="Birth year"
              onSubmit={(value) => formatDate(value)}
              defaultValue={new Date(birthDate)}
            />
          </View>
          <TextInput
            keyboardType={phoneInput}
            style={focused === 'phoneNumber' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
            placeholder='Phone Number'
            onFocus={() => setFocused('phoneNumber')}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: "space-between", flexWrap: "wrap", marginHorizontal: 40}}>
          <TouchableOpacity onPress={() => setAvatar("A")}>
            <Image source={logo} style={{height: 70, width: 70, backgroundColor: "#fff", borderRadius: 30, marginVertical: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar("B")}>
            <Image source={logo} style={{height: 70, width: 70, backgroundColor: "#fff", borderRadius: 30, marginVertical: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar("C")}>
            <Image source={logo} style={{height: 70, width: 70, backgroundColor: "#fff", borderRadius: 30, marginVertical: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar("D")}>
            <Image source={logo} style={{height: 70, width: 70, backgroundColor: "#fff", borderRadius: 30, marginVertical: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar("A")}>
            <Image source={logo} style={{height: 70, width: 70, backgroundColor: "#fff", borderRadius: 30, marginVertical: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar("B")}>
            <Image source={logo} style={{height: 70, width: 70, backgroundColor: "#fff", borderRadius: 30, marginVertical: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar("C")}>
            <Image source={logo} style={{height: 70, width: 70, backgroundColor: "#fff", borderRadius: 30, marginVertical: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar("D")}>
            <Image source={logo} style={{height: 70, width: 70, backgroundColor: "#fff", borderRadius: 30, marginVertical: 10}} />
          </TouchableOpacity>
        </View>
        <View style={editProfileStyle.checkContainer}>
          <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
            <Ionicons name="checkmark" size={24} color="black" style={editProfileStyle.checkButton} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
const editProfileStyle = StyleSheet.create({
  headerView: {
    width: "100%",
    height: 150,
    backgroundColor: "#72c1f2"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 40,
    borderBottomColor: "#fff",
    borderBottomWidth: 1
  },

  inputDate: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 35,
    color: '#000',
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingLeft: 10,
    marginVertical: 10
  },

  inputOnFocus: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingLeft: 10,
    borderBottomColor: "#72c1f2",
    borderBottomWidth: 3,
    marginVertical: 10
  },
  checkContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: 'absolute',
    bottom: 40,
    paddingRight: 40
  },
  checkButton: {
    fontSize: 32,
    backgroundColor: "#0378a6",
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 50
  }
})