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
  ScrollView
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



import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundColor, styles } from '../styles/index'
import TripImage from '../components/TripImage';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTab from '../components/BottomTabs';
import { server } from '../globalvar';



const screenWidth = Dimensions.get("window").width;
const data = [
  {
    name: "trans",
    amount: 12000,
    color: "#023859",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "trans",
    amount: 32000,
    color: "#036099",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    amount: 121000,
    color: "#0477BF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    amount: 75000,
    color: "#058FE6",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    amount: 12000,
    color: "#0487D9",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "mantapi",
    amount: 120000,
    color: "#0417D9",
    legendFontColor: "#743F2F",
    legendFontSize: 15
  },
];

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
  const url = 'https://efdf-125-165-106-74.ngrok.io'
  const navigation = useNavigation()
  const { tripId } = route.params
  const [token, setToken] = useState('')
  const [saving, setSaving] = useState('')
  const [expense, setExpense] = useState('')
  const [expenseData, setExpenseData] = useState([])
  const [trip, setTrip] = useState({})

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
      console.log(trip.id);

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
      console.log(trip.id);

      axios.get(`${server}/expenses/trip/${trip.id}`, {

        headers: {
          access_token: token
        }
      })
        .then(res => {
          console.log(res.data);
          setExpense(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [trip])

  useEffect(() => {
    loginCheck()
  }, [])

  

  const totalSaving = saving.length > 0 ? `Rp. ${saving.map(el => el.amount).reduce((prev, cur) => prev + cur)}` : "Rp 0"

  const totalExpenses = expense.length > 0 ? `Rp. ${expense.map(el => el.amount).reduce((prev, cur) => prev + cur)}` : "Rp 0"

  return (
    <>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.mainContainer, { height: "100%" }}>
            <TripImage data={trip.tripImageUrl} />
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
                  <Text style={tripStyle.innerCardNumber}>Rp {trip.targetBudget}</Text>
                </View>
              </View>
              <View style={tripStyle.blueCardContainer}>
                <View style={tripStyle.blueCardView}>
                  <Text style={tripStyle.blueCardNumber}>{totalSaving}</Text>
                  <Text style={tripStyle.blueCardDesc}>Saving</Text>
                </View>
                <View style={tripStyle.cardSeparator} />
                <View style={tripStyle.blueCardView}>
                  <Text style={tripStyle.blueCardNumber}>{totalExpenses}</Text>
                  <Text style={tripStyle.blueCardDesc}>Expenses</Text>
                </View>
              </View>
            </View>


            {/* <View style={tripStyle.emptyContainer}>
          <Text style={{textAlign: "center"}}>Add your expenses to see{"\n"}the summary of trip expenses</Text>
        </View> */}

            <View style={{ flex: 1, marginTop: 5 }}>
              <View style={{ alignItems: 'center' }}>
                <PieChart
                  data={data}
                  width={screenWidth}
                  height={200}
                  chartConfig={chartConfig}
                  accessor={"amount"}
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                  center={[10, 10]}
                  absolute
                />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView >
        <BottomTab data={trip.id}/>
    </>
  );
}

const tripStyle = StyleSheet.create({
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
    marginBottom: 5
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
    borderRadius: 10,
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
  blueCardDesc: {
    color: "#fff",
    fontSize: 14
  }
})