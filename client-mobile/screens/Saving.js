import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Dimensions, KeyboardAvoidingView, Modal } from 'react-native'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles"
import AddSavingModal from '../components/AddSavingModal';
import SavingCard from '../components/SavingCard';
import BottomTab from '../components/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { server } from '../globalvar';
import moment from 'moment'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SavingModal from '../components/SavingModal';

export default function Saving({ route }) {
  const navigation = useNavigation();
  const { tripId } = route.params
  const [saving, setSaving] = useState([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const totalSaving = saving.length > 0 ? saving.map(el => el.amount).reduce((prev, cur) => prev + cur) : "Rp 0"

  console.log(tripId, 'saving ------------------');
  // fetch data
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
      axios.get(`${server}/savings/trip/${tripId}`, {
        headers: {
          access_token: token
        }
      })
        .then(res => {
          console.log(res.data);
          setSaving(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [token])

  useEffect(() => {
    loginCheck()
  }, [])
  // end of fetch data


  return (
    <SafeAreaView style={styles.screenSize}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* MODAL */}
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <SavingModal setModalVisible={setModalVisible} data={tripId} />
            </Modal>
            {/* MODAL */}
          </View>
          <View style={{ flex: 1 }}>
            <View style={savingStyle.headerContainer}>
              <View style={savingStyle.headerView}>
                <TouchableOpacity style={{ padding: 15 }}
                  onPress={() => {
                    navigation.navigate('Home')
                  }}>
                  <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={savingStyle.title}>Saving</Text>
              </View>
              <View style={savingStyle.blueCardContainer}>
                <View style={savingStyle.blueCardView}>
                  <Text style={savingStyle.blueCardDesc}>Total Saving</Text>
                  <Text style={savingStyle.blueCardNumber}>{totalSaving}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ alignSelf: 'flex-start' }}>
                  <Text style={savingStyle.addButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              {!loading && saving.length > 0 ? (
                <FlatList
                  nestedScrollEnabled={true}
                  data={saving}
                  renderItem={({ item }) => (<SavingCard data={item} />)}
                  keyExtractor={(item) => `Saving${item.id}`}
                  contentContainerStyle={{ paddingVertical: 10 }}
                />
              ) : (
                <View style={savingStyle.emptyContainer}>
                  <Text style={{ textAlign: "center" }}>Add your saving to see{"\n"}all of saving data</Text>
                </View>
              )}
            </View>
            <BottomTab data={tripId} />
          </View>
      </View>
    </SafeAreaView>
  )
}

const savingStyle = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    top: 0
  },
  headerView: {
    width: Dimensions.get('window').width,
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
    fontSize: 28,
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