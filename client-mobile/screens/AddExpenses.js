import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image, Picker, KeyboardAvoidingView, ScrollView, Modal, Alert, FlatList, Dimensions, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Entypo, Feather, AntDesign, FontAwesome} from "@expo/vector-icons";
import DateField from "react-native-datefield";
import { styles } from "../styles";
import logo from "../assets/logo.png";
import axios from "axios";
import { server } from "../globalvar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import loadingGif from '../assets/loading.gif'
import RNPickerSelect from 'react-native-picker-select';


export default function AddExpenses({ route }) {


  const nav = useNavigation();
  const { categoryId, tripId, iconName } = route.params;
  const [amount, setAmount] = useState(null);
  const [name, setName] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState(1);
  const [focused, setFocused] = useState("");
  const [scanImage, setScanImage] = useState(null);
  const [token, setToken] = useState("");
   const [tripImage, setTripImage] = useState(null);
  const [isFile, setIsFile] = useState(false)
  const [homeCurrency, setHomeCurrency] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [currency, setCurrency] = useState([])
  const [filteredCurrency, setFilteredCurrency]= useState([])
  const [filter, setFilter] = useState('')
  const [compareCurrency, setCompareCurrency]= useState('IDR')
  const [convertedCurrency, setConvertedCurrency] = useState(0)
  const [trip, setTrip] = useState({})
  const [loading, setLoading] = useState(false)


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
      setLoading(true)
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
      })
      .finally(() => {
        setLoading(false)
      })
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

  useEffect(async()=> {
    try {
      const token = await AsyncStorage.getItem('access_token')
      const response = await axios.get(`${server}/trips/${tripId}`,{
        headers: {
          access_token: token
        }
      })
      setHomeCurrency(response.data.homeCurrency.toUpperCase())
    } catch (err) {
      console.log(err);
    }
  },[])

  useEffect (async() => {
    try {
      const response = await axios({
        method:'post',
        url:`${server}/exchangerate`,
        data:{
          from:compareCurrency,
          to: homeCurrency,
          amount:1
        }
      })
      console.log(response.data);
      setConvertedCurrency(response.data.rate)
    } catch (err) {
      console.log(err);
    }
  },[compareCurrency])




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
      setLoading(true)
      if(homeCurrency !== compareCurrency) {
        value.amount = Math.ceil(amount*convertedCurrency)
      }
      console.log(value.amount);
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
      setLoading(false)
      console.log(err);
      if (typeof err === "object" && err.response.data.message) {
        alert(err.response.data.message)
      }
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
      onPress={()=> {
      setModalVisible(!modalVisible)
      setCompareCurrency(code)
    }}
    style={editProfileStyle.modalContainer}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{code}</Text>
      </View>
      <View>
        <Text style={{ paddingRight: 50 }}>{description}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => (
    <Item description={item.description} code={item.code} />
  );

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

 
  // console.log(paymentMethodId);
  return (


    <SafeAreaView style={styles.screenSize}>
      <KeyboardAvoidingView behavior={focused === 'amount' ? 'height' : 'position'} keyboardVerticalOffset={0}>
        <View style={{ position: 'relative', height: '94%' }}>

          <View style={editProfileStyle.headerView}>
            <TouchableOpacity 
            onPress={()=> {nav.navigate('Expenses', tripId)}}
            style={{ padding: 15 }}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 25 }}>
              <Icon name={iconName} size={48} color="white" />
              <View style={{ alignItems: "flex-end", marginRight:20}}>
                <View style={{ flexDirection: "row" }}>



                  {/* currency button */}

                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems:"center" }}
                    onPress={()=> {
                      setModalVisible(!modalVisible)
                    }}
                  >
                  <Text  style={{ fontSize: 32, color: "#fff" }}>{compareCurrency}
                  </Text>
                  <Entypo name="chevron-small-down" size={24} color="white" />
                  </TouchableOpacity>

                  {/* currency button */}


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
                <Text style={{ color: "#fff", marginRight:20 }}>
                  1 {compareCurrency} = {homeCurrency} {convertedCurrency} </Text>
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

                <DateField labelDate="Expenses date" labelMonth="Expenses month" labelYear="Expenses year" onSubmit={(value) => setExpenseDate(new Date(value))} defaultValue={expenseDate} />

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

          {loading ? (
              <View style={{width: "100%", height: "100%", position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(240, 240, 240, 0.5)"}}>
                <Image source={loadingGif} />
              </View>
            ) : undefined}

        </View>

        {/* MODAL */}
      <View style={{
        // position:'absolute',
        // height: windowHeight,
        // justifyContent:"center"
      }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          
        >
          <View style={editProfileStyle.centeredView}>
            <View style={editProfileStyle.modalView}>

              {/* search */}
              <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    width: "10%"
                  }}
                >
                  <Ionicons name="arrow-back" size={24} color="#72c1f2" />
                </TouchableOpacity>
                <TextInput style={{ backgroundColor: "white", height: 35, width: "82%", borderBottomWidth: 1, marginRight: 10, borderBottomColor: "#72c1f2" }}
                  value={filter}
                  onChangeText={setFilter}
                />
              </View>
              <FlatList
                data={filteredCurrency}
                renderItem={renderItem}
                keyExtractor={item => item.description}
              />

            </View>
          </View>
        </Modal>
      </View>
        {/* MODAL */}




      </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
}
const windowHeight = Dimensions.get('window').height;
const editProfileStyle = StyleSheet.create({
  mainContainer:{
    // height:windowHeight,
    justifyContent:"center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    position:"absolute",
    height:windowHeight*0.6,
    width:350,
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
    backgroundColor: "white", 
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth:1,
    borderBottomColor:"#72c1f2",
    marginBottom:3,
  },
  modalText: {
    marginLeft: 40,
    fontSize: 15
  },









  headerView: {
    width: "100%",
    height: 150,
    backgroundColor: "#72c1f2",
  },
  title: {
    width: "65%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    // marginHorizontal:10,
    marginLeft:10,
    marginRight:20,
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
