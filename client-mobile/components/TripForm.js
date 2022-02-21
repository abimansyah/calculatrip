import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, ImageBackground, Picker } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateField from 'react-native-datefield';

export default function TripForm({ type }) {
  const [name, setName] = useState("")
  const [targetBudget, setTargetBudget] = useState("")
  const [homeCurrency, setHomeCurrency] = useState("idr")
  const [startDate, setStartDate] = useState("12/25/2021")
  const [endDate, setEndDate] = useState("12/25/2021")
  const [focused, setFocused] = useState('')
  const phoneInput = Platform.OS === 'ios' ? 'number-pad' : 'numeric'

  function formatDate(value, type) {
    let newDate = []
    let formated = value.toISOString().split('T')[0];
    formated = formated.split('-')
    newDate.push(formated[1])
    newDate.push(formated[2])
    newDate.push(formated[0])
    newDate = newDate.join('-')
    type === "startDate" ? setStartDate(newDate) : setEndDate(newDate)
  }

  return(
    <View style={{ position: 'relative', height: '100%' }}>
      <ImageBackground style={editProfileStyle.imageContainer} source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80" }}>
        <LinearGradient style={editProfileStyle.imageGradientContainer} colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']} start={{x:0.5, y:0}} end={{x:0.5, y:0.5}}>
          <View style={editProfileStyle.iconContainer}>
            <TouchableOpacity style={editProfileStyle.iconButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={editProfileStyle.imageButtonContainer}>
          <TouchableOpacity style={editProfileStyle.imageButton}>
            <Text style={editProfileStyle.imageButtonText}>Upload{'\n'}Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={editProfileStyle.imageButton}>
            <Text style={editProfileStyle.imageButtonText}>Random{'\n'}Photo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={{width: "100%", flexDirection: "row", justifyContent: "center", paddingTop: 25, paddingBottom: 10}}>
        <Text style={{fontSize: 18, fontWeight: "bold"}}>{`${type} Trip`}</Text>
      </View>
      <View style={{marginHorizontal: 40, marginVertical: 10}}>
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
          <Picker
            selectedValue={homeCurrency}
            onValueChange={itemValue => setHomeCurrency(itemValue)}
          >
            <Picker.Item label="IDR" value="idr" />
            <Picker.Item label="USD" value="usd" />
          </Picker>
        </View>
        <Text>Start Date</Text>
        <View style={editProfileStyle.inputDate}>
          <DateField
            labelDate="Start date"
            labelMonth="Start month"
            labelYear="Start year"
            onSubmit={(value) => formatDate(value, "startDate")}
            defaultValue={new Date(startDate)}
          />
        </View>
          <Text>End Date</Text>
        <View style={editProfileStyle.inputDate}>
          <DateField
            labelDate="End date"
            labelMonth="End month"
            labelYear="End year"
            onSubmit={(value) => formatDate(value, "endDate")}
            defaultValue={new Date(endDate)}
          />
        </View>
      </View>
      <View style={editProfileStyle.checkContainer}>
        <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
          <Ionicons name="checkmark" size={24} color="#0378a6" style={editProfileStyle.checkButton} />
        </TouchableOpacity>
      </View>
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
    position: 'absolute',
    bottom: 40,
    paddingRight: 40
  },
  checkButton: {
    fontSize: 32,
    backgroundColor: "#0378a6",
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 50
  }
})