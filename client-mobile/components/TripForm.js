import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, ImageBackground, Picker, ScrollView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateField from 'react-native-datefield';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { server } from '../globalvar';
import moment from 'moment'
import axios from 'axios'
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function TripForm({ type }) {
  const [randomPhotos] = useState([
    "https://images.unsplash.com/photo-1642287458180-449fad5abc2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    "https://images.unsplash.com/photo-1462400362591-9ca55235346a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2032&q=80",
    "https://images.unsplash.com/photo-1510908072721-6fbd31199630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1535747790212-30c585ab4867?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2025&q=80",
    "https://images.unsplash.com/photo-1465256410760-10640339c72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1488441770602-aed21fc49bd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
  ])
  const tomorrow = new Date()
  const [name, setName] = useState("")
  const [targetBudget, setTargetBudget] = useState("")
  const [homeCurrency, setHomeCurrency] = useState("idr")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(moment(tomorrow.setDate(tomorrow.getDate() + 1)).format('MM/DD/YYYY')))
  const [tripImage, setTripImage] = useState(null);
  const [focused, setFocused] = useState('')
  const phoneInput = Platform.OS === 'ios' ? 'number-pad' : 'numeric'
  const [token, setToken] = useState('')
  const navigation = useNavigation()
  const [isFile, setIsFile] = useState(false)
  const route = useRoute();
  const tripId = route.params?.tripId

  function formatDate(value) {
    let newDate = []
    let formated = value.toISOString().split('T')[0];
    formated = formated.split('-')
    newDate.push(formated[1])
    newDate.push(formated[2])
    newDate.push(formated[0])
    newDate = newDate.join('-')
    return newDate
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setIsFile(true)
      setTripImage(result.uri);
    }
  };

  const randomizeImage = async () => {
    let randomIndex = Math.floor(Math.random() * (5 + 1))
    setIsFile(false)
    setTripImage(randomPhotos[randomIndex])
  }

  const submitTrip = () => {
    
      let formDataBody = new FormData();
      let localUri = tripImage;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      if (isFile) {
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formDataBody.append('imageFile', { uri: tripImage, name: filename, type });
      } else {
        formDataBody.append('tripImageUrl', tripImage)
      }

      formDataBody.append('name', name)
      formDataBody.append('targetBudget', targetBudget)
      formDataBody.append('homeCurrency', homeCurrency)
      formDataBody.append('startDate', formatDate(startDate))
      formDataBody.append('endDate', formatDate(endDate))
      const link = type === "Add" ? `${server}/trips` : `${server}/trips/${tripId}`
      const method = type === "Add" ? "post" : "put"


      fetch(link,{
      method,
      headers: {
        'Content-Type': 'multipart/form-data', // kalo gabisa coba content type diapus
        access_token: token,
      },
      body: formDataBody,
    })
    .then((response)=> {
      if(response.ok) {
        return response.json()
      } else {
        return response.json().then((err)=> {
          throw err
        })
      }
    })
    .then((result)=>{
      setName("")
      setTargetBudget("")
      // console.log("Trip has been added");
      alert(result.message);
      if(type === "Add") {
        navigation.navigate('Home', {tripId})
      } else {
        navigation.navigate('Trip', { tripId })
      }
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  const loginCheck = async () => {
    try {
      const getAccessToken = await AsyncStorage.getItem('access_token')
      if (getAccessToken !== null) {
        setToken(getAccessToken);
      }
      return getAccessToken
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loginCheck()
    if (type === "Add") {
      randomizeImage()
    } else {
      loginCheck()
        .then(tokenA => {
          return axios.get(`${server}/trips/${tripId}`, {
            headers: {
              access_token: tokenA
            }
          })
        })
        .then(res => {
          setName(res.data.name)
          setTargetBudget(String(res.data.targetBudget))
          setHomeCurrency(res.data.homeCurrency.toLowerCase())
          setStartDate(new Date(res.data.startDate))
          setEndDate(new Date(res.data.endDate))
          setTripImage(res.data.tripImageUrl)
        })
        .catch(err => {
          console.log(err)
          if (err.response.data.message) alert(err.response.data.message)
        })
    }
  }, [])

  // dropdown
  const iosDropdown = (
      <RNPickerSelect
        value={homeCurrency}
        onValueChange={itemValue => setHomeCurrency(itemValue)}
        items={[
          { label: 'IDR', value: 'idr' },
          { label: 'USD', value: 'usd' },

        ]}
      />
    )

    const androidDropdown = (
      <Picker
        selectedValue={homeCurrency}
        onValueChange={itemValue => setHomeCurrency(itemValue)}
      >
        <Picker.Item label="IDR" value="idr" />
        <Picker.Item label="USD" value="usd" />
      </Picker>
    )

  // dropdown

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <ImageBackground style={editProfileStyle.imageContainer} source={{ uri: tripImage }}>
        <LinearGradient style={editProfileStyle.imageGradientContainer} colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.5 }}>
          <View style={editProfileStyle.iconContainer}>
            <TouchableOpacity style={editProfileStyle.iconButton}
              onPress={() => {
                if (type === "Add") {
                  navigation.navigate('Home')
                } else {
                  navigation.navigate('Trip', { tripId })
                }
              }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={editProfileStyle.imageButtonContainer}>
          <TouchableOpacity onPress={() => pickImage()} style={editProfileStyle.imageButton}>
            <Text style={editProfileStyle.imageButtonText}>Upload{'\n'}Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => randomizeImage()} style={editProfileStyle.imageButton}>
            <Text style={editProfileStyle.imageButtonText}>Random{'\n'}Photo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", paddingTop: 25, paddingBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{`${type} Trip`}</Text>
      </View>

      <ScrollView style={{paddingBottom: 5}}>
        <View style={{ marginHorizontal: 40, marginTop: 10, marginBottom: 30 }}>
          <Text>Trip Name</Text>
          <TextInput
            style={focused === 'name' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
            placeholder='Trip Name'
            onFocus={() => setFocused('name')}
            value={name}
            onChangeText={setName}
          />
          <Text>Trip Budget Target</Text>
          <TextInput
            keyboardType={phoneInput}
            style={focused === 'targetBudget' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
            placeholder='Trip Budget Target'
            onFocus={() => setFocused('targetBudget')}
            value={targetBudget}
            onChangeText={setTargetBudget}
          />
          <Text>Currency</Text>
          <View style={editProfileStyle.inputDate}>

            {
              Platform.OS === 'ios' ? iosDropdown : androidDropdown
            }



          </View>
          <Text>Start Date</Text>
          <View style={editProfileStyle.inputDate}>
            <DateField
              labelDate="Start date"
              labelMonth="Start month"
              labelYear="Start year"
              onSubmit={(value) => setStartDate(value)}
              value={startDate}
              defaultValue={startDate}
            />
          </View>
          <Text>End Date</Text>
          <View style={editProfileStyle.inputDate}>
            <DateField
              labelDate="End date"
              labelMonth="End month"
              labelYear="End year"
              onSubmit={(value) => setEndDate(value)}
              value={endDate}
              defaultValue={endDate}
            />
          </View>
          <TouchableOpacity style={{ marginVertical: 10, padding: 10, alignSelf: 'flex-end', backgroundColor: "#0378a6", borderRadius: 50 }}
            onPress={() => submitTrip()}
          >
            <Ionicons name="checkmark" size={28} color="#0378a6" style={editProfileStyle.checkButton} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
const editProfileStyle = StyleSheet.create({
  imageContainer: {
    height: 230,
    position: 'relative',
    justifyContent: "center",
    alignItems: "center"
  },
  imageGradientContainer: {
    height: "100%",
    width: "100%"
  },
  iconContainer: {
    padding: 10,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: "flex-start",
  },
  iconButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageButtonContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  imageButton: {
    padding: 15,
    marginHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15
  },
  imageButtonText: {
    color: "white",
    fontSize: 21,
    textAlign: "center"
  },
  inputDate: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 35,
    color: '#000',
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingLeft: 10,
    marginVertical: 10
  },
  inputOnFocus: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingLeft: 10,
    borderBottomColor: "#72c1f2",
    borderBottomWidth: 3,
    marginVertical: 10
  },
  checkContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    bottom: 40,
    position: 'absolute',
    paddingRight: 40,
  },
  checkButton: {
    backgroundColor: "#0378a6",
    color: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
  }
})