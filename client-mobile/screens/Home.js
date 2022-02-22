import {
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/logo.png'
import { styles } from '../styles/index'
import HomeProfile from '../components/HomeProfile';
import HomeCard from '../components/HomeCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { server } from '../globalvar';


export default function Home({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true)
  const [notif, setNotif] = useState(false)
  const isFocused = useIsFocused();
  useEffect(async() => {
    try {
      const token = await AsyncStorage.getItem('access_token')
      const res = await axios.get(`${server}/trips`, {
        headers: {
          access_token: token
        }
      })
      const response = res.data.map(el => {
        el.UserTrips = el.Trip.Users.length
        return el
      })
      setTrips(response)
      setLoading(false)
      const invite = await axios.get(`${server}/users/invitation`, {
        headers: {
          access_token: token
        }
      })
      if(invite.data.length > 0) {
        setNotif(true)
      }
    } catch(err) {
      console.log(err)
      if(typeof err === "object" && err.response.data.message) {
        alert(err.response.data.message)
      }
    }
  }, [isFocused])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer, homeStyle.homeContainer}>
        <View style={{position: "relative"}}>
          <View style={homeStyle.headerContainer}>
            <Image source={logo} style={homeStyle.headerImage} />
            <Text style={homeStyle.headerText}>Calculatrip</Text>
          </View>
          {/* <Text>{JSON.stringify(trips)}</Text> */}
          <TouchableOpacity style={{position: "absolute", top: 0, right: 0, padding: 10, margin: 8}}>
            <View style={{position: "relative"}}>
              <Ionicons name="notifications" size={32} color="#0378a6" />
              { notif ? ( <Text style={{position: "absolute", right: 2, top: -2, fontSize: 15, color: "red"}}>⬤</Text> ) : undefined}
            </View>
          </TouchableOpacity>
        </View>
        {!loading && trips?.length > 0 ? (
          <View>
            <FlatList
              nestedScrollEnabled={true}
              data={trips}
              renderItem={({ item }) => (<HomeCard data={item} />)}
              keyExtractor={(item) => `Trips${item.id}`}
              ListHeaderComponent={<HomeProfile isFocused={isFocused} />}
              contentContainerStyle={{ paddingBottom: 170 }}
            />
          </View>
        ) : (
          <>
            <HomeProfile />
            <View style={homeStyle.emptyContainer}>
              <Text style={{ textAlign: "center" }}>Add your trip to see{"\n"}all of trips data</Text>
            </View>
          </>
        )}
        <View style={homeStyle.addContainer}>
          <TouchableOpacity style={{ alignSelf: 'flex-start' }}
          onPress={() => navigation.navigate('AddTrip')}
          >
            <Text style={homeStyle.addButton}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const homeStyle = StyleSheet.create({
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    height: '100%'
  },
  addContainer: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    position: 'absolute',
    bottom: 10
  },
  addButton: {
    fontSize: 32,
    backgroundColor: "#0378a6",
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 50
  }
})