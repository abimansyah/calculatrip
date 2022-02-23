
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image, Picker, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import DateField from 'react-native-datefield';
import { styles } from "../styles"
import logo from '../assets/logo.png'
import axios from 'axios';
import { server } from '../globalvar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';



export default function AddExpenses({ route }) {
  const nav = useNavigation();
  const { categoryId, tripId, iconName } = route.params;
  const [amount, setAmount] = useState(null);
  const [name, setName] = useState("");
  const [expenseDate, setExpenseDate] = useState("12/25/2021");
  const [description, setDescription] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState(1);
  const [focused, setFocused] = useState("");
  const [scanImage, setScanImage] = useState(null);
  const [token, setToken] = useState("");


  const phoneInput = Platform.OS === "ios" ? "number-pad" : "numeric";
  function formatDate(value) {
    let newDate = [];
    let formated = value.toISOString().split("T")[0];
    formated = formated.split("-");
    newDate.push(formated[1]);
    newDate.push(formated[2]);
    newDate.push(formated[0]);
    newDate = newDate.join("-");
    setExpenseDate(newDate);
  }

  const loginCheck = async () => {
    try {
      const getAccessToken = await AsyncStorage.getItem("access_token");
      if (getAccessToken !== null) {
        setToken(getAccessToken);
      }
      return getAccessToken;
    } catch (err) {
      console.log(err);
    }
  };

  const pickScanImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setScanImage(result.uri);
    }
  };

  const scanReceipt = async () => {

    let formDataBody = new FormData();
    let localUri = scanImage;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formDataBody.append("imageFile", { uri: scanImage, name: filename, type });
    const link = `${server}/ocr`;
    fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data", // kalo gabisa coba content type diapus
        access_token: token,
      },
      body: formDataBody,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((err) => {
            throw err;
          });
        }
      })
      .then((result) => {
        setDescription(result.message)
      })
      .catch((err) => {
        alert(err.message)
      });
  };

  useEffect(() => {
    loginCheck();
  }, []);

  useEffect(()=>{
    if(scanImage) {
      scanReceipt()
    }
  },[scanImage])

  // useEffect(async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('access_token')
  //     console.log(tripImage, '---------');
  //     const resp = await axios.post(`${server}/ocr`, {
  //       imageFile: tripImage
  //     }, {
  //       headers: {
  //         access_token: token
  //       }
  //     })
  //     console.log(resp.data, '=======');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [tripImage])

  const value = {
    name: name,
    amount: amount,
    expenseCategoryId: categoryId,
    paymentMethodId: paymentMethodId,
    expenseDate: expenseDate,
    description: description,
  };

  const addNewExpense = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const resp = await axios.post(`${server}/expenses/${tripId}`, value, {
        headers: {
          access_token: token,
        },
      });
      console.log(typeof resp.data);
      if (typeof resp.data === "object") {
        nav.navigate("Expenses", {
          tripId: tripId,
        });
      }
    } catch (err) {

      console.log(err.message);
    }
  };

  const iosDropdown = (
    <RNPickerSelect
      value={paymentMethodId}
      onValueChange={itemValue => setPaymentMethodId(itemValue)}
      items={[
        { label: 'Cash', value: 1 },
        { label: 'Credit', value: 2 },

      ]}
    />
  )

  const androidDropdown = (
    <Picker
      selectedValue={paymentMethodId}
      onValueChange={(itemValue) => setPaymentMethodId(itemValue)}
    >
      <Picker.Item label="Cash" value={1} />
      <Picker.Item label="Credit" value={2} />
    </Picker>
  )

  // dropdown

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setIsFile(true)
      setTripImage(result.uri);
    }
  };

  return (

    <SafeAreaView style={styles.screenSize}>
      <KeyboardAvoidingView behavior={focused === 'amount' ? 'height' : 'position'} keyboardVerticalOffset={0}>
        <View style={{ position: 'relative', height: '94%' }}>

          <View style={editProfileStyle.headerView}>
            <TouchableOpacity style={{ padding: 15 }}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 40 }}>
              <Icon name={iconName} size={48} color="white" />
              <View style={{ alignItems: "flex-end" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 32, color: "#fff" }}>Rp </Text>
                  <TextInput
                    keyboardType={phoneInput}
                    style={focused === "amount" ? editProfileStyle.title : editProfileStyle.title}
                    placeholder="Amount"
                    placeholderTextColor="#a2e1ff"
                    onFocus={() => setFocused("amount")}
                    value={amount}
                    onChangeText={setAmount}
                    textAlign="right"
                  />
                </View>
                <Text style={{ color: "#fff" }}>1 $ = Rp 14000</Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", paddingTop: 25, paddingBottom: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{`Add Expenses`}</Text>
            </View>
            <View style={{ marginHorizontal: 40, marginVertical: 10 }}>
              <Text>Expenses Name</Text>
              <TextInput style={focused === "name" ? editProfileStyle.inputOnFocus : editProfileStyle.input} placeholder="Expenses Name" onFocus={() => setFocused("name")} value={name} onChangeText={setName} />
              <Text>Expenses Date</Text>
              <View style={editProfileStyle.inputDate}>
                <DateField labelDate="Expenses date" labelMonth="Expenses month" labelYear="Expenses year" onSubmit={(value) => formatDate(value)} defaultValue={new Date(expenseDate)} />
              </View>
              <Text>Payment Method</Text>
              <View style={editProfileStyle.inputDate}>

                {
                  Platform.OS === 'ios' ? iosDropdown : androidDropdown
                }
              </View>
              <View style={editProfileStyle.descriptionContainer}>
                <Text>Expenses Description</Text>
                <TouchableOpacity style={editProfileStyle.receiptButton}
                  onPress={() => pickImage()}
                >
                  <Text style={editProfileStyle.receiptText}>Upload Receipt</Text>

                </TouchableOpacity>
              </View>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={focused === "description" ? editProfileStyle.textAreaOnFocus : editProfileStyle.textArea}
                placeholder="Expenses Description"
                onFocus={() => setFocused("description")}
                value={description}
                onChangeText={setDescription}
              />
              <View style={editProfileStyle.checkContainer}>
                <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => addNewExpense()}>
                  <Ionicons name="checkmark" size={24} color="#0378a6" style={editProfileStyle.checkButton} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const editProfileStyle = StyleSheet.create({
  headerView: {
    width: "100%",
    height: 150,
    backgroundColor: "#72c1f2",
  },
  title: {
    width: "75%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  inputDate: {
    borderWidth: 1,
    borderColor: "#c1c1c1",
    borderRadius: 5,
    width: "100%",
    height: 35,
    color: "#000",
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c1c1c1",
    borderRadius: 5,
    width: "100%",
    height: 40,
    color: "#000",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputOnFocus: {
    borderWidth: 1,
    borderColor: "#c1c1c1",
    borderRadius: 5,
    width: "100%",
    height: 40,
    color: "#000",
    paddingHorizontal: 10,
    borderBottomColor: "#72c1f2",
    borderBottomWidth: 3,
    marginVertical: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  receiptButton: {
    marginLeft: 10,
    padding: 10,
    alignSelf: "flex-start",
    backgroundColor: "#0378a6",
    borderRadius: 10,
  },
  receiptText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#c1c1c1",
    borderRadius: 5,
    width: "100%",
    height: 80,
    color: "#000",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  textAreaOnFocus: {
    borderWidth: 1,
    borderColor: "#c1c1c1",
    borderRadius: 5,
    width: "100%",
    height: 80,
    color: "#000",
    paddingHorizontal: 10,
    borderBottomColor: "#72c1f2",
    borderBottomWidth: 3,
    marginVertical: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginHorizontal: 40,
  },
  avatarView: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginVertical: 10,
  },
  avatarViewCheck: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0378a6",
    borderRadius: 30,
    marginVertical: 10,
  },
  checkContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  checkButton: {
    fontSize: 28,
    backgroundColor: "#0378a6",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 50,
  },
});
