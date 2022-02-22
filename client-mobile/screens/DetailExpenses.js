import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles"

export default function DetailExpenses() {
  const [amount, setAmount] = useState("Rp 100.000.000")
  const [name, setName] = useState("Test Expenses Name")
  const [expenseDate, setExpenseDate] = useState("25 December 2021")
  const [description, setDescription] = useState("Test Expenses Description")
  const [paymentMethodId, setPaymentMethodId] = useState("Test payment Method id")
  const [imageFile, setImageFile] = useState("https://djuragan.sgp1.digitaloceanspaces.com/djurkam/production/images/lodgings/5c53b6ccd8ae3.png")

  return(
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ position: 'relative', height: '100%' }}>
        <View style={detailExpensesStyle.headerView}>
          <TouchableOpacity style={{padding: 15}} >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 40}}>
            <Ionicons name="book" size={48} color="white" />
            <View style={{alignItems: "flex-end"}}>
              <Text style={detailExpensesStyle.title}>{amount}</Text>
              <Text style={{color: "#fff"}}>1 $ = Rp 14000</Text>
            </View>
          </View>
        </View>
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
            <Text>{expenseDate}</Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: "bold"}}>Payment Method</Text>
            <Text>{paymentMethodId}</Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: "bold"}}>Expenses Description</Text>
            <Text>{description}</Text>
          </View>
          <View style={detailExpensesStyle.photoContainer}>
            <Text style={{fontWeight: "bold"}}>Photo</Text>
            <TouchableOpacity style={detailExpensesStyle.photoButton}>
              <Text style={detailExpensesStyle.photoText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
          <Image source={{uri: imageFile}} style={{width: "100%", height: 250, backgroundColor: "#123456"}}/>
        </View>
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