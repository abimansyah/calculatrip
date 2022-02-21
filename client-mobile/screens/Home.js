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


export default function Home({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const loginCheck = async () => {
    try {
      const getAccessToken = await AsyncStorage.getItem('access_token')
      if (getAccessToken !== null) {
        navigation.navigate('Home')
        setToken(getAccessToken);

      }

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (token) {
      axios.get('http://d65d-103-78-115-90.ngrok.io/trips', {
        headers: {
          access_token: token
        }
      })
        .then(res => {
          const response = res.data.Trips.map(el => {
            el.UserTrips = el.UserTrips.length
            return el
          })

          setTrips(response)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [token])

  useEffect(() => {
    loginCheck()

  }, [])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer, homeStyle.homeContainer}>
        <View style={{position: "relative"}}>
          <View style={homeStyle.headerContainer}>
            <Image source={logo} style={homeStyle.headerImage} />
            <Text style={homeStyle.headerText}>Calculatrip</Text>
          </View>
          <TouchableOpacity style={{position: "absolute", top: 0, right: 0, padding: 10, margin: 8}}>
            <View style={{position: "relative"}}>
              <Ionicons name="notifications" size={32} color="#0378a6" />
              <Text style={{position: "absolute", right: 2, top: -2, fontSize: 15, color: "red"}}>⬤</Text>
            </View>
          </TouchableOpacity>
        </View>
        {!loading && trips.length > 0 ? (
          <View>
            <FlatList
              nestedScrollEnabled={true}
              data={trips}
              renderItem={({ item }) => (<HomeCard data={item} />)}
              keyExtractor={(item) => `Trips${item.id}`}
              ListHeaderComponent={<HomeProfile />}
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
          <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
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