import {
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/logo.png'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';



export default function HomeProfile() {
  const navigation = useNavigation()
  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token')
      navigation.navigate('Login')
    } catch (err) {
      console.log(err);
    }
  }
  
  // useEffect



  return (

    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", marginVertical: 5, marginHorizontal: 10, padding: 15, borderRadius: 10, backgroundColor: '#0378a6' }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <View style={{height: 70, width: 70, justifyContent: 'center', alignItems: "center", backgroundColor: "#fff", borderRadius: 30}}>
          <Ionicons name="airplane" size={48} color="#0378a6" />
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 21, fontWeight: "bold", color: "#fff" }}>dyahachwatiningrum</Text>
          <Text style={{ paddingBottom: 10, color: "#fff" }}>dyahachwatiningrum@gmail.com</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ padding: 10, alignSelf: 'flex-start', backgroundColor: "#fff", borderRadius: 10 }}>
              <Text style={{ color: '#0378a6', fontWeight: 'bold' }}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 10, padding: 10, alignSelf: 'flex-start', backgroundColor: "#fff", borderRadius: 10 }} onPress={doLogout}>
              <Text style={{ color: '#0378a6', fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={{flexDirection: "column", alignItems:"center"}}>
        <Ionicons name="star-outline" size={32} color="white" />
        <Text style={{paddingTop: 10, color: "#fff", fontWeight: "bold"}}>Regular</Text>
      </View> */}
    </View>
  )
}