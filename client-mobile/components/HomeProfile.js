import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server } from '../globalvar';

export default function HomeProfile({ tripId }) {
  const navigation = useNavigation()
  const [user, setUser] = useState({})
  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token')
      alert("See you again!")
      navigation.navigate('Login')
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(async () => {
    try {
      const token = await AsyncStorage.getItem('access_token')
      const res = await axios.get(`${server}/users/profile`, {
        headers: {
          access_token: token
        }
      })
      setUser(res.data)
    } catch(err) {
      console.log(err)
      if(typeof err === "object" && err.response.data.message) {
        alert(err.response.data.message)
      }
    }
  }, [tripId])

  return (
    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", marginVertical: 5, marginHorizontal: 10, padding: 15, borderRadius: 10, backgroundColor: '#0378a6' }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <View style={{height: 70, width: 70, marginHorizontal: 10, justifyContent: 'center', alignItems: "center", backgroundColor: "#fff", borderRadius: 30}}>
          <Ionicons name={user.avatar} size={48} color="#0378a6" />
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 21, fontWeight: "bold", color: "#fff" }}>{user.username}</Text>
          <Text style={{ paddingBottom: 10, color: "#fff" }}>{user.email}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ padding: 10, alignSelf: 'flex-start', backgroundColor: "#fff", borderRadius: 10 }} onPress={() => navigation.navigate('EditProfile')}>
              <Text style={{ color: '#0378a6', fontWeight: 'bold' }}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 10, padding: 10, alignSelf: 'flex-start', backgroundColor: "#d0312d", borderRadius: 10 }} onPress={doLogout}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}