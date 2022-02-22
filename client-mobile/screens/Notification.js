import {
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/logo.png'
import { styles } from '../styles/index'
import { useState, useCallback } from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server } from '../globalvar';
import InvitationCard from '../components/InvitationCard';

export default function Notification({ navigation, route }) {
  const [notif, setNotif] = useState([]);
  const [loading, setLoading] = useState(true)
  const fetchData = () => {
    AsyncStorage.getItem('access_token')
      .then(token => {
        return axios.get(`${server}/users/invitation`, {
          headers: {
            access_token: token
          }
        })
      })
      .then(res => {
        setNotif(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useFocusEffect(useCallback(() => {
    fetchData()
    return () => true
  }, [route.params?.userId]))
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer, notifStyle.homeContainer}>
        <View style={{position: "relative"}}>
          <View style={notifStyle.headerContainer}>
            <Image source={logo} style={notifStyle.headerImage} />
            <Text style={notifStyle.headerText}>Calculatrip</Text>
          </View>
          <TouchableOpacity style={{ padding: 20, position: "absolute" }} onPress={() => navigation.navigate('Home', {tripId: 0})}>
            <Ionicons name="arrow-back" size={30} color="#0378a6" />
          </TouchableOpacity>
        </View>
        <Text style={notifStyle.title}>Trip Invitation</Text>
        {!loading && notif.length > 0 ? (
          <View>
            <FlatList
              nestedScrollEnabled={true}
              data={notif}
              renderItem={({ item }) => (<InvitationCard data={item} />)}
              keyExtractor={(item) => `Notif${item.id}`}
            />
          </View>
        ) : (
          <View style={notifStyle.emptyContainer}>
            <Text style={{ textAlign: "center" }}>Here is a list of trip invitation{"\n"}you will get from your companion</Text>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const notifStyle = StyleSheet.create({
  homeContainer: {
    position: 'relative',
    height: '100%'
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    fontWeight: "bold"
  },
  headerImage: {
    width: 40,
    height: 40
  },
  headerText: {
    fontSize: 21,
    color: "#0378a6",
    paddingLeft: 5
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 10
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    height: '100%'
  }
})