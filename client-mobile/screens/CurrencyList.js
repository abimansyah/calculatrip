import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  phoneInput,
  focused,
  ScrollView,
  Touchable,
} from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { styles } from "../styles";
import InviteCompanionModal from "../components/InviteCompanionModal";
import CompanionCard from "../components/CompanionCard";
import BottomTab from "../components/BottomTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../globalvar";
import { useNavigation } from "@react-navigation/native";

export default function CurrencyList () {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  // const [text, setText] = useState("");
  const [currency, setCurrency] = useState([])
  const [filteredCurrency, setFilteredCurrency]= useState([])
  const [filter, setFilter] = useState('')
  const navigation = useNavigation()

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

  const getCurrency = async () => {
    try {
      let response = await axios({
        url:`${server}/exchangerate`,
        method:'get',
        headers:{
          access_token: token
        }
      })
      setCurrency(response.data)
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const Item = ({description, code}) => (
    <TouchableOpacity 
    onPress={
      navigation.navigate('AddExpenses',{code:code})
    }
    style={{
      backgroundColor: "white",
      height: 55,
      marginBottom: 2,
      paddingTop: 4,
      paddingLeft: 25
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: "bold"
      }}>{code}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  )

  // search filter

  const renderItem = ({ item }) => (
    <Item description={item.description} code={item.code} />
  );


  useEffect(() => {
    loginCheck()
  }, [])

  

  useEffect(() => {
    getCurrency()
  }, [token])

  useEffect(() => {
    setFilteredCurrency(currency)
  }, [currency])
  
  useEffect(()=> {
    
    if(!filter){
      setFilteredCurrency(currency)
    } else {
      let output 
      output = currency.filter(el => 
        el.description.toLowerCase().includes(filter.toLowerCase()) || el.code.toLowerCase().includes(filter.toLowerCase()))   
        setFilteredCurrency(output)
      }
  }, [filter])

  return(
    <SafeAreaView style={styles.screenSize}>
      
        <View style={styles.mainContainer}>
         
         
            <View style={currencyStyle.headerContainer}>
              <View style={currencyStyle.headerView}>
                <TouchableOpacity style={{ padding: 15 }}
                  >
                  <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={currencyStyle.title}>Currency</Text>
              </View>
              <View style={currencyStyle.blueCardContainer}>
                <View style={currencyStyle.blueCardView}>
                <TextInput
                    keyboardType={phoneInput}
                    style={currencyStyle.inputBar}
                    placeholderTextColor="#a2e1ff"
                    value={filter}
                    onChangeText={setFilter}
                    textAlign="right"
                    placeholder="Search currency"
                  />
                </View>
                
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{
                marginTop:5
              }}>
            <FlatList
              data={filteredCurrency}
              renderItem={renderItem}
              keyExtractor={item => item.description}
            />

              </View>

              {/* {!loading && companion.length > 0 ? (
                <FlatList
                  nestedScrollEnabled={true}
                  data={companion}
                  renderItem={({ item }) => (<CompanionCard data={item} />)}
                  keyExtractor={(item) => `Companion${item.id}`}
                  contentContainerStyle={{ paddingVertical: 10 }}
                />
              ) : (
                <View style={currencyStyle.emptyContainer}>
                  <Text style={{ textAlign: "center" }}>Invite your companion{"\n"}to join your trip</Text>
                </View>
              )} */}
            </View>


            
          
        </View>

     
      </SafeAreaView>
  )

  
}

const currencyStyle = StyleSheet.create({
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
    width: "100%"
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
  },

  inputBar: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 6,
    backgroundColor: "white",
    borderColor: "#E6E6E6",
    textAlign:"left"
  },
})