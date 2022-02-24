import React, { useState, useEffect, useCallback } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Dimensions, Modal } from 'react-native'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles"
import ExpensesCard from '../components/ExpensesCard';
import ExpenseCategoryModal from '../components/ExpenseCategoryModal';
import BottomTab from '../components/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { server } from '../globalvar';
import moment from 'moment'
import { useNavigation, useNavigationState } from '@react-navigation/native';
import "intl";
import "intl/locale-data/jsonp/en";
import ExpenseCategory from '../components/ExpenseCategory';
import { useFocusEffect } from '@react-navigation/native';




export default function Expenses({ route }) {
  const navigation = useNavigation();
  const { tripId } = route.params
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  const routesLength = useNavigationState(state => state.routes.length);
  const [trip, setTrip] = useState({})
  const currencyFormat = (value) => {
    return new Intl.NumberFormat(['ban', 'id']).format(value)
  }
  const totalExpenses = expenses.length > 0 ? expenses.map(el => el.amount).reduce((prev, cur) => prev + cur) : 0



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

  const fetchData = () => {

    AsyncStorage.getItem('access_token')
      .then(tokenUser => {
        return axios.get(`${server}/trips/${tripId}`, {
          headers: {
            access_token: tokenUser
          }
        })
      })
      .then(resp => {
        setTrip(resp.data)
      })
      .catch(err => {
        console.log(err);
      })

    AsyncStorage.getItem('access_token')
      .then(tokenUser => {
        return axios.get(`${server}/expenses/trip/${tripId}`, {
          headers: {
            access_token: tokenUser
          }
        })
      })
      .then(res => {
        setExpenses(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

    //autofetch
    useFocusEffect(useCallback(() => {
      fetchData()
      return () => true
    }, [route.params?.expensesId]))
    //autofetch
  


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
              // Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <ExpenseCategory setModalVisible={setModalVisible} data={tripId} />
          </Modal>
        </View>

        {/* MODAL */}

        <View style={{ flex: 1 }}>
          <View style={expensesStyle.headerContainer}>
            <View style={expensesStyle.headerView}>
              <TouchableOpacity style={{ padding: 15 }}
                onPress={() => {
                  navigation.navigate('Home')
                }}>
                <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>
              <Text style={expensesStyle.title}>Expenses</Text>
            </View>
            <View style={expensesStyle.blueCardContainer}>
              <View style={expensesStyle.blueCardView}>
                <Text style={expensesStyle.blueCardDesc}>Total Expenses</Text>

                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                  <Text style={expensesStyle.blueCardNumber}>{currencyFormat(totalExpenses)}</Text>
                  <Text style={{ marginTop: 8, fontSize: 20, marginLeft: 10, fontWeight: "bold", color: "white" }}>{trip.homeCurrency}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)} style={{ alignSelf: 'flex-start' }}>
                <Text style={expensesStyle.addButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {!loading && expenses.length > 0 ? (
              <FlatList
                nestedScrollEnabled={true}
                data={expenses}
                renderItem={({ item }) => (<ExpensesCard data={item} curr={trip.homeCurrency} />)}
                keyExtractor={(item) => `Expenses${item.id}`}
                contentContainerStyle={{ paddingVertical: 10 }}
              />
            ) : (
              <View style={expensesStyle.emptyContainer}>
                <Text style={{ textAlign: "center" }}>Add your expenses to see{"\n"}all of expenses data</Text>
              </View>
            )}
          </View>
          <BottomTab data={tripId} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const expensesStyle = StyleSheet.create({
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
    width: "80%",

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