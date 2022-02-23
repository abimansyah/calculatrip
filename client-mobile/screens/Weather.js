import { StyleSheet, Text, View, Picker, Image, Modal, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/index'

import { useState, useEffect } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server } from '../globalvar';





import BottomTab from "../components/BottomTabs";

export default function Weather({ route }) {
  const tripId = route.params?.tripId

  const [city, setCity] = useState({
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04n"
      }
    ],

    "main": {
      "temp": 27.08,
      "feels_like": 30.02,
      "temp_min": 24.13,
      "temp_max": 27.27,
      "pressure": 1011,
      "humidity": 81,
      "sea_level": 1011,
      "grnd_level": 1009
    },

    "wind": {
      "speed": 2.27,
      "deg": 220,
      "gust": 3.73
    },
    "sys": {
      "type": 2,
      "id": 2033644,
      "country": "ID",
      "sunrise": 1645570706,
      "sunset": 1645614839
    },
    "name": "Jakarta",
  }
  )
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("Jakarta");
  const [token, setToken] = useState('')

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


  const searchCity = async () => {
    try {
      let response = await axios.post(`${server}/weather/city`, {
        city: text
      }, {
        headers: {
          access_token: token
        },
      })
      setCity(response.data)
      setText('')
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    loginCheck()
  }, [])

  useEffect(() => {
    searchCity()
  }, [token])

  return (
    <SafeAreaView style={weatherStyle.container}>
      <View style={weatherStyle.container}>
        <Text style={weatherStyle.todayText}>Today</Text>

        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={weatherStyle.cityContainer}>

          {/* <Picker
            selectedValue={city}
            onValueChange={itemValue => setCity(itemValue)}
            style={weatherStyle.cityPicker}
            itemStyle={{height: 40}}
          >
            <Picker.Item label="Jakarta" value="Jakarta" />
            <Picker.Item label="United State Kemana aja bo leh" value="United State Kemana aja bo leh" />
          </Picker> */}
          <Text style={weatherStyle.city}>{city.name}, {city.sys.country} &nbsp;
            <Ionicons
              name="search"
              size={30}
              color="white"

            />
          </Text>
        </TouchableOpacity>


        {/* MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={weatherStyle.centeredView}>
            <View style={weatherStyle.modalView}>

              {/* text input */}
              <TextInput
                placeholder="Search city"
                style={weatherStyle.inputBar}
                onChangeText={setText}
                value={text}
              />

              {/* search city */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible)
                  searchCity()
                }}
                style={weatherStyle.modalContainer}>
                <View style={{ paddingHorizontal: 10 }}>
                  <Ionicons name="search" size={24} color='#0487d9' />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={weatherStyle.modalText}>Search</Text>
                </View>
              </TouchableOpacity>

              {/* close */}
              <TouchableOpacity
                style={weatherStyle.modalContainer}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <Ionicons name="close" size={24} color="red" />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={weatherStyle.modalText}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* MODAL */}



        <Ionicons name={weatherSymbol(city?.weather[0].main)} size={150} color="white" style={{ marginVertical: 30 }} />
        <Text style={weatherStyle.weatherStatus}>{city?.weather[0].description}</Text>
        <Text style={weatherStyle.weatherDegree}>{city.main.temp}°</Text>
        <View style={weatherStyle.detailContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white" }}>Wind</Text>
            <Feather name="wind" size={24} color="white" style={{ marginVertical: 10 }} />
            <Text style={weatherStyle.detailText}>{city.wind.speed} mph</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white" }}>Humidity</Text>
            <Ionicons name="water" size={24} color="#72c1f2" style={{ marginVertical: 10 }} />
            <Text style={weatherStyle.detailText}>{city.main.humidity}%</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white" }}>Feeling</Text>
            <FontAwesome5 name="temperature-low" size={24} color="white" style={{ marginVertical: 10 }} />
            <Text style={weatherStyle.detailText}>{city.main.feels_like}°C</Text>
          </View>
        </View>
        <BottomTab data={tripId} />
      </View>
    </SafeAreaView>
  )
}

const weatherStyle = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#72c1f2"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalContainer: {
    // backgroundColor: "orange", 
    width: 300,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  modalText: {
    marginLeft: 40,
    fontSize: 15
  },
  inputBar: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 130,
    width: "100%",
    borderRadius: 6,
    backgroundColor: "white",
    borderColor: "#E6E6E6",
  },


  todayText: {
    marginTop: 50,
    fontSize: 18,
    color: "white"
  },
  cityContainer: {
    width: "100%",
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  city: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    flexWrap: "wrap",
    textAlign: "center",
    marginHorizontal: 15
  },
  cityPicker: {
    width: "100%",
    height: 40,
    position: "absolute",
    color: "#72c1f2"
  },
  weatherStatus: {
    fontSize: 18,
    color: "white"
  },
  weatherDegree: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white"
  },
  detailContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    marginVertical: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#0378a6'
  },
  detailText: {
    color: "white",
    fontWeight: "bold"
  },
})
const weatherSymbol = (icon) => {
  switch (icon) {
    case "Clear":
      return "sunny"
      break;
    case "Clouds":
      return "partly-sunny"
      break;
    case "Rain":
      return "rainy"
      break;
    case "Drizzle":
      return "rainy"
      break;
    case "Thunderstorm":
      return "thunderstorm"
      break;
    case "Snow":
      return "snow"
      break;
    case "Mist":
      return "menu"
      break;
    case "Smoke":
      return "menu"
      break;
    case "Haze":
      return "menu"
      break;
    case "Dust":
      return "menu"
      break;
    case "Fog":
      return "menu"
      break;
    case "Sand":
      return "menu"
      break;
    case "Ash":
      return "menu"
      break;
    case "Squall":
      return "menu"
      break;
    case "Tornado":
      return "menu"
      break;
    default:
      return "alert-circle-outline"
      break;
  }
}