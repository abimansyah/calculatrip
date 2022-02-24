import React, { useEffect, useState, useCallback } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView,Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { server } from '../globalvar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import "intl";
import "intl/locale-data/jsonp/en";
import Login from './Login';

export default function DetailExpenses({ route }) {
  const expenseId = route.params.data
  const tripId = route.params.tripId
  const nav = useNavigation();
  const [amount, setAmount] = useState("Rp 100.000.000")
  const [name, setName] = useState("Test Expenses Name")
  const [expenseDate, setExpenseDate] = useState("25 December 2021")
  const [description, setDescription] = useState("Test Expenses Description")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [imageFile, setImageFile] = useState("")
  const [token, setToken] = useState("")
  const [expensePhoto, setExpensePhoto] = useState("")
  const [allImages, setAllImages] = useState([])
  const [homeCurrency, setHomeCurrency] = useState("")
  const link = server

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setExpensePhoto(result.uri);
      
      uploadPhoto(result.uri)
    }

  };

  const currencyFormat = (value)=>{
    return new Intl.NumberFormat(['ban', 'id']).format(value)
  }
  const dateFormat = (date)=> {
    return date.split('T')[0]
  }

  const uploadPhoto = (Url) => {
    let formDataBody = new FormData();
    let localUri = Url;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formDataBody.append('imageFile', { uri: Url, name: filename, type });

    fetch(`${link}/expenses/${expenseId}/image`,{
    method:'POST',
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
    alert(result.message);
    fetchImages()
  })
  .catch((err)=>{
    alert(err.message);
  })
  }

  useEffect( async () => {
    try {
      const output = await AsyncStorage.getItem('access_token')
      setToken(output)
      const resp = await axios.get(`${server}/expenses/${expenseId}`, {
        headers: {
          access_token: output
        }
      })
      // console.log(output);
      setName(resp.data.name);
      setAmount(resp.data.amount);
      setExpenseDate(resp.data.expenseDate);
      setDescription(resp.data.description);

      const response = await axios({
        method:'GET',
        url: `${server}/expenses/${expenseId}`,
        headers: {
          access_token: output,
        },
      })
      setAllImages(response.data.Images)
      const currentTrip = await axios({
        method:'GET',
        url: `${server}/trips/${tripId}`,
        headers: {
          access_token: output,
        },
      })
      setHomeCurrency(currentTrip.data.homeCurrency)
      setPaymentMethod(response.data.PaymentMethod.name)

    } catch (err) {
      console.log(err);
    }

  }, [])

    const fetchImages = () => {
      axios({
        method:'GET',
        url: `${server}/expenses/${expenseId}`,
        headers: {
          access_token: token,
        },
      })
      .then((response)=>{
        setAllImages(response.data.Images)
      })
      .catch((err)=>{
        alert(err.data)
      })
    }

    // useFocusEffect(useCallback(() => {
    //   fetchImages()
    //   return () => true
    // }, [expensePhoto]))


  return(
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ position: 'relative', height: '100%' }}>
        <View style={detailExpensesStyle.headerView}>
          <TouchableOpacity style={{padding: 15}} onPress={() => nav.navigate('Expenses', {
            tripId
          })} >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 40}}>
            <Ionicons name="book" size={48} color="white" />
            <View style={{alignItems: "flex-end"}}>
              <Text style={detailExpensesStyle.title}>{homeCurrency} {homeCurrency ? currencyFormat(amount): null}</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={{width: "100%", flexDirection: "row", justifyContent: "center", paddingTop: 25, paddingBottom: 10}}>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>Detail Expenses</Text>
        </View>
        <View style={{marginHorizontal: 40, marginVertical: 10}}>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: "bold"}}>Expenses Name</Text>
            <Text>{name}</Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: "bold"}}>Expenses Date</Text>
            <Text>{dateFormat(expenseDate)}</Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: "bold"}}>Payment Method</Text>
            <Text>{paymentMethod}</Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: "bold"}}>Expenses Description</Text>
            <Text>{description}</Text>
          </View>
          <View style={detailExpensesStyle.photoContainer}>
            <Text style={{fontWeight: "bold"}}>Photo</Text>
            <TouchableOpacity 
            onPress={()=>{pickImage()}}
            style={detailExpensesStyle.photoButton}>
              <Text style={detailExpensesStyle.photoText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection:"row", flexWrap: "wrap", justifyContent:"space-between"}}>
          {
            allImages?.map(el => (
                <Image key={el.id} source={{uri: el.imageUrl}} style={{width: "48%", height: 100, backgroundColor: "#123456", marginBottom:10}}/>
              ))
          }
            </View>
          
        </View>
        </ScrollView>
        
      </View>
    </SafeAreaView>
  )
}
const detailExpensesStyle = StyleSheet.create({
  headerView: {
    width: "100%",
    height: 150,
    backgroundColor: "#72c1f2"
  },
  title: {
    width: "100%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  photoContainer: {
    flexDirection:"row",
    alignItems: "center",
    marginBottom: 10
  },
  photoButton: {
    marginLeft: 10,
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: "#0378a6",
    borderRadius: 10 
  },
  photoText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})