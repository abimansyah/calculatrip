import {
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  ImageBackground,
  Pressable,
  Linking
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'


import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundColor, styles } from '../styles/index'
import TripImage from '../components/TripImage';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import BottomTab from '../components/BottomTabs';
import { server } from '../globalvar';
import loadingGif from '../assets/loading.gif'
import "intl";
import "intl/locale-data/jsonp/en";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};





export default function Trip({ route }) {
  const navigation = useNavigation()
  const { tripId } = route.params
  const [token, setToken] = useState('')
  const [saving, setSaving] = useState('')
  const [expense, setExpense] = useState('')
  const [expenseData, setExpenseData] = useState([])
  const [trip, setTrip] = useState({})
  const [cartData, setCartData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

  const [coloredCart, setColoredCart] = useState([])

  const [loading, setLoading] = useState(true)
  console.log(trip.homeCurrency);

  const newCartData = (newData) => {
    const temp = []
    newData.forEach(el => {
      if (temp.length === 0) {
        temp.push({
          name: el.ExpenseCategory.name,
          amount: el.amount
        })
      } else {
        // if (temp.length <= 5) {
        //   const findone = temp.findIndex(elm => elm.name === el.ExpenseCategory.name);
        //   if (findone >= 0) {
        //     temp[findone].amount += el.amount
        //   } else {
        //     temp.push({
        //       name: el.ExpenseCategory.name,
        //       amount: el.amount
        //     })
        //   }
        // } else {
        //   if (!temp[5]) {
        //     temp.push({
        //       name: 'others',
        //       amount: el.amount
        //     })
        //   } else {
        //     temp[5].amount += el.amount
        //   }
        // }
        const findone = temp.findIndex(elm => elm.name === el.ExpenseCategory.name);
        if (findone >= 0) {
          temp[findone].amount += el.amount
        } else {
          if (temp.length <= 5) {
            temp.push({
              name: el.ExpenseCategory.name,
              amount: el.amount
            })
          } else {
            if (!temp[5]) {
              temp.push({
                name: 'others',
                amount: el.amount
              })
            } else {
              temp[5].amount += el.amount
            }
          }
        }
      }
      console.log(temp, '-----------------------');
    });
    setCartData(temp)
    //handlechart
  }


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

  const deleteTrip = async () => {
    try {
      await axios.delete(`${server}/trips/${trip.id}`, {
        headers: {
          access_token: token
        }
      })
      navigation.navigate('Home')
    } catch (err) {
      console.log(err);
    }
  }

  const downloadReport = async () => {
    try {
      const response = await axios.get(`${server}/report/${trip.id}`, {
        headers: {
          access_token: token
        }
      })
      Linking.openURL(response.data.url)
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (token) {

      axios.get(`${server}/trips/${tripId}`, {

        headers: {
          access_token: token
        }
      })
        .then(res => {
          setTrip(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [token])

  // saving
  useEffect(() => {
    if (token) {


      axios.get(`${server}/savings/trip/${trip.id}`, {

        headers: {
          access_token: token
        }
      })
        .then(res => {
          setSaving(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [trip])

  // expense
  useEffect(() => {
    if (token) {

      axios.get(`${server}/expenses/trip/${trip.id}`, {

        headers: {
          access_token: token
        }
      })
        .then(res => {
          setExpense(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [trip])

  useEffect(() => {
    loginCheck()
  }, [])

  useEffect(() => {
    if (expense) {
      const newCartData = () => {
        const sorting = expense?.map(el => {
          let show = {
            name: el.ExpenseCategory.name,
            amount: el.amount
          }
          return show
        }).reduce((prev, cur) => {
          const found = prev.find(a => a.name === cur.name)
          if (!found) {
            prev.push({ name: cur.name, amount: cur.amount })
          } else {
            found.amount += cur.amount
          }
          return prev
        }, []).sort((a, b) => {
          if (a.amount > b.amount) return -1
          if (a.amount < b.amount) return 1
          return 0
        }).reduce((prev, cur) => {
          if (prev.length < 5) {
            prev.push(cur)
          } else if (prev.length === 5) {
            prev.push({ name: "Others", amount: cur.amount })
          } else {
            prev[5].amount += cur.amount
          }
          return prev
        }, [])
        return sorting
      }
      setCartData(newCartData());
    }
  }, [expense])

  if (cartData) {
    const color = [
      '#BFBC88',
      '#038C65',
      '#F28705',
      '#F23C13',
      '#8C6542',
      '#591441',
    ]
    for (let i = 0; i < cartData.length; i++) {

      cartData[i].color = color[i],
        cartData[i].legendFontColor = "#7F7F7F",
        cartData[i].legendFontSize = 11
    }
  }


  const currencyFormat = (value) => {
    return new Intl.NumberFormat(['ban', 'id']).format(value)
  }

  const totalSavingNumber = saving.length > 0 ? saving.map(el => el.amount).reduce((prev, cur) => prev + cur) : 0

  const totalExpensesNumber = expense.length > 0 ? expense.map(el => el.amount).reduce((prev, cur) => prev + cur) : 0

  const totalSaving = saving.length > 0 ? saving.map(el => el.amount).reduce((prev, cur) => prev + cur) : 0

  const totalExpenses = expense.length > 0 ? expense.map(el => el.amount).reduce((prev, cur) => prev + cur) : 0

  const remainingSavings = totalSavingNumber - totalExpensesNumber

  const budgetVsExpenses = trip.targetBudget - totalExpensesNumber

  return (
    <SafeAreaView style={styles.screenSize}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.mainContainer}>

            <ImageBackground style={tripStyle.imageDetail} source={{ uri: trip.tripImageUrl }}>
              <LinearGradient style={tripStyle.imageDetail} colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.5 }}>
                <View style={tripStyle.iconContainer}>
                  <TouchableOpacity style={tripStyle.iconButton}
                    onPress={() => {
                      navigation.navigate('Home')
                    }}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={tripStyle.iconButton}>
                    <Ionicons name="ellipsis-vertical" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>

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
              <View style={tripStyle.centeredView}>
                <View style={tripStyle.modalView}>

                  {/* edit trip */}
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      navigation.navigate('EditTrip', {
                        tripId: trip.id
                      })

                    }}
                    style={tripStyle.modalContainer}>
                    <View style={{ paddingHorizontal: 10 }}>
                      <Feather name="edit" size={24} color="green" />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text style={tripStyle.modalText}>Edit Trip</Text>
                    </View>
                  </TouchableOpacity>

                  {/* download report */}
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      downloadReport()
                    }}
                    style={tripStyle.modalContainer}>
                    <View style={{ paddingHorizontal: 10 }}>
                      <Feather name="download" size={24} color='#0487d9' />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text style={tripStyle.modalText}>Download Trip Report</Text>
                    </View>
                  </TouchableOpacity>

                  {/* delete */}
                  <TouchableOpacity style={tripStyle.modalContainer}
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      deleteTrip()
                    }}
                  >
                    <View style={{ paddingHorizontal: 10 }}>
                      <AntDesign name="delete" size={24} color="black" />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text style={tripStyle.modalText}>Delete</Text>
                    </View>
                  </TouchableOpacity>

                  {/* close */}
                  <TouchableOpacity style={tripStyle.modalContainer}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <View style={{ paddingHorizontal: 10 }}>
                      <Ionicons name="close" size={24} color="red" />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text style={tripStyle.modalText}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* MODAL */}



            <View style={tripStyle.titleContainer}>

              <Text style={tripStyle.titleText}>{trip.name}</Text>
              <Text>{`${moment(new Date(trip.startDate)).format('DD MMMM YYYY')} - ${moment(new Date(trip.endDate)).format('DD MMMM YYYY')}`}</Text>
            </View>
            <View style={tripStyle.darkCardContainer}>
              <View style={tripStyle.innerCardContainer}>
                <View style={tripStyle.innerCardView}>
                  <Text style={tripStyle.innerCardBudget}>Budget Target</Text>
                </View>
                <View style={tripStyle.innerCardView}>
                  <Text style={tripStyle.innerCardNumber}> {trip.homeCurrency} {currencyFormat(trip.targetBudget)}</Text>
                </View>
              </View>
              <View style={tripStyle.blueCardContainer}>
                <View style={tripStyle.blueCardView}>
                  <Text style={tripStyle.blueCardNumber}>{trip.homeCurrency} {currencyFormat(totalSaving)}</Text>
                  <Text style={tripStyle.blueCardDesc}>Saving</Text>
                </View>
                <View style={tripStyle.cardSeparator} />
                <View style={tripStyle.blueCardView}>
                  <Text style={tripStyle.blueCardNumber}>{trip.homeCurrency} {currencyFormat(totalExpenses)}</Text>
                  <Text style={tripStyle.blueCardDesc}>Expenses</Text>
                </View>
              </View>

              {/* remaining savings */}

              <View style={tripStyle.innerCardContainerBottom}>
                <View style={tripStyle.innerCardView}>
                  <Text style={tripStyle.innerCardBudgetRemainingSaving}>Remaining Savings</Text>
                </View>
                <View style={tripStyle.innerCardView}>
                  <Text style={remainingSavings < 0 ? tripStyle.blueCardNumberMinus : tripStyle.blueCardNumberPlus}>{trip.homeCurrency} {currencyFormat(remainingSavings)}</Text>
                </View>
              </View>

              {/* target budget vs actual expenses */}

              <View style={tripStyle.innerCardContainerBottomBottom}>
                <View style={tripStyle.innerCardView}>
                  <Text style={tripStyle.innerCardBudgetRemainingSaving}>Budget vs Expenses</Text>
                </View>
                <View style={tripStyle.innerCardView}>
                  <Text style={budgetVsExpenses < 0 ? tripStyle.blueCardNumberMinus : tripStyle.blueCardNumberPlus}>{trip.homeCurrency} {currencyFormat(budgetVsExpenses)}</Text>
                </View>
              </View>



            </View>



            {/* <View style={tripStyle.emptyContainer}>
              <Text style={{textAlign: "center"}}>Add your expenses to see{"\n"}the summary of trip expenses</Text>
              </View> */}

            <View style={{ flex: 1, marginTop: 5, paddingRight: 15 }}>
              <View style={{ alignItems: 'center' }}>
                <PieChart
                  data={cartData}
                  width={screenWidth}
                  height={200}
                  chartConfig={chartConfig}
                  accessor={"amount"}
                  backgroundColor={"transparent"}
                  paddingLeft={"0"}
                  center={[30, 10]}
                  absolute
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

      </ScrollView>

      <BottomTab data={trip.id} />
      {loading ? (
        <View style={{ width: "100%", height: "100%", position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(240, 240, 240, 0.5)" }}>
          <Image source={loadingGif} />
        </View>
      ) : undefined}

    </SafeAreaView >


  );
}

const tripStyle = StyleSheet.create({
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







  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    height: '100%'
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 5
  },
  darkCardContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#03658c'
  },
  innerCardContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 5,
  },
  innerCardContainerBottom: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 0,
    backgroundColor: "white"
  },
  innerCardContainerBottomBottom: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 15,
    marginBottom: -10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: '#0378a6',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  innerCardView: {
    width: "50%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center"
  },
  innerCardBudget: {
    color: "#fff",
    fontSize: 16
  },
  innerCardRemainingSaving: {
    fontSize: 16
  },
  innerCardNumber: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff"
  },
  blueCardContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#0378a6'
  },
  blueCardView: {
    width: "50%",
    flexDirection: "column",
    alignItems: "center"
  },
  cardSeparator: {
    height: "100%",
    width: 1,
    backgroundColor: "#fff"
  },
  blueCardNumber: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff"
  },
  blueCardNumberPlus: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#3cb043"
  },
  blueCardNumberMinus: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#E53232"
  },
  blueCardDesc: {
    color: "#fff",
    fontSize: 14
  },
  imageDetail: {
    height: 200,
    position: 'relative',
  },
  iconContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})