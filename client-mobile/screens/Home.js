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
import logo from '../assets/logo.png'
import { styles } from '../styles/index'
import HomeProfile from '../components/HomeProfile';
import HomeCard from '../components/HomeCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get('https://a730-125-165-106-74.ngrok.io/trips')
      .then(res => {
        res.data = res.data.map(el => {
          el.UserTrips = el.UserTrips.length
          return el
        })
        setTrips(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer, homeStyle.homeContainer}>
        <View style={homeStyle.headerContainer}>
          <Image source={logo} style={ homeStyle.headerImage } />
          <Text style={homeStyle.headerText}>Calculatrip</Text>
        </View>
        { !loading && trips.length > 0 ? (
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
              <Text style={{textAlign: "center"}}>Add your trip to see{"\n"}all of trips data</Text>
            </View>
          </>
        ) }
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