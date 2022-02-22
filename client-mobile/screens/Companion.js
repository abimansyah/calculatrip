import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList,  } from 'react-native'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles"
import InviteCompanionModal from '../components/InviteCompanionModal';
import CompanionCard from '../components/CompanionCard';
import BottomTab from '../components/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { server } from '../globalvar';

export default function Companion({ route }) {
  const { tripId } = route.params;
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState('');
  const [companion, setCompanion] = useState([])
  const [loading, setLoading] = useState(false)
  const [trip, setTrip] = useState({})



  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const headerModal = () => {
    return (
      <View style={styles.modalHeader}>
        <View style={styles.modalPanelHeader}>
          <View style={styles.modalPanelHandle} />
        </View>
      </View>
    )
  }

  // fetch
  const loginCheck = async () => {
    try {
      const getAccessToken = await AsyncStorage.getItem('access_token')
      if (getAccessToken !== null) {
        setToken(getAccessToken);
      }

    } catch (err) {
      console.log(err);
    }
  }



  useEffect(() => {
    if (token) {
      axios.get(`${server}/trips/${tripId}`, {
        headers: {
          access_token: token
        }
      })
        .then(res => {
          setCompanion(res.data.Users)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [token])

  useEffect(() => {
    loginCheck()
  }, [])
  
  useEffect(() => {
    setOwner(companion.filter((el) => el.UserTrip.role === 'owner'))
  }, [companion])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BottomSheet
        ref={bs}
        snapPoints={[320, 0]}
        renderContent={() => { return (<InviteCompanionModal data={tripId}/>) }}
        renderHeader={headerModal}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
      />
      <Animated.View style={{ flex: 1, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>
        <View style={companionStyle.headerContainer}>
          <View style={companionStyle.headerView}>
            <TouchableOpacity style={{ padding: 15 }} >
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={companionStyle.title}>Companion</Text>
          </View>
          <View style={companionStyle.blueCardContainer}>
            <View style={companionStyle.blueCardView}>
              <Text style={companionStyle.blueCardDesc}>Owner</Text>
              <Text style={companionStyle.blueCardNumber}>{owner[0]?.username}</Text>
            </View>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={{ alignSelf: 'flex-start' }}>
              <Text style={companionStyle.addButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {!loading && companion.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              data={companion}
              renderItem={({ item }) => (<CompanionCard />)}
              keyExtractor={(item) => `Companion${item.id}`}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          ) : (
            <View style={companionStyle.emptyContainer}>
              <Text style={{ textAlign: "center" }}>Invite your companion{"\n"}to join your trip</Text>
            </View>
          )}
        </View>
        <BottomTab data={tripId} />
      </Animated.View>
    </SafeAreaView>
  )
}

const companionStyle = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    top: 0
  },
  headerView: {
    width: "100%",
    height: 170,
    backgroundColor: "#72c1f2"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 40
  },
  blueCardContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#0378a6',
    marginHorizontal: 20,
    marginTop: -50
  },
  blueCardView: {
    width: "80%"
  },
  blueCardNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff"
  },
  blueCardDesc: {
    color: "#fff",
    fontSize: 14
  },
  addButton: {
    fontSize: 32,
    backgroundColor: "#fff",
    color: '#0378a6',
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 50
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
  }
})