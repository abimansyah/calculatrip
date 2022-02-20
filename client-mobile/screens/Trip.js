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

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/index'
import TripImage from '../components/TripImage';

const screenWidth = Dimensions.get("window").width;
const data = [
  {
    name: "Seoul",
    population: 4,
    color: "#023859",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2,
    color: "#036099",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 3,
    color: "#0477BF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 3,
    color: "#058FE6",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 6,
    color: "#0487D9",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
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

export default function Trip() {
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.mainContainer, { height: "100%" }}>
          <TripImage data="https://jooinn.com/images/city-landscape-53.jpg" />
          <View style={tripStyle.titleContainer}>
            <Text style={tripStyle.titleText}>Nama Trip</Text>
            <Text>25 December 2021 - 2 January 2022</Text>
          </View>
          <View style={tripStyle.darkCardContainer}>
            <View style={tripStyle.innerCardContainer}>
              <View style={tripStyle.innerCardView}>
                <Text style={tripStyle.innerCardBudget}>Budget Target</Text>
              </View>
              <View style={tripStyle.innerCardView}>
                <Text style={tripStyle.innerCardNumber}>Rp 100.000.000</Text>
              </View>
            </View>
            <View style={tripStyle.blueCardContainer}>
              <View style={tripStyle.blueCardView}>
                <Text style={tripStyle.blueCardNumber}>Rp 100.000.000</Text>
                <Text style={tripStyle.blueCardDesc}>Saving</Text>
              </View>
              <View style={tripStyle.cardSeparator} />
              <View style={tripStyle.blueCardView}>
                <Text style={tripStyle.blueCardNumber}>Rp 100.000.000</Text>
                <Text style={tripStyle.blueCardDesc}>Expenses</Text>
              </View>
            </View>
          </View>


          {/* <View style={tripStyle.emptyContainer}>
          <Text style={{textAlign: "center"}}>Add your expenses to see{"\n"}the summary of trip expenses</Text>
        </View> */}

          <View style={{flex: 1, marginTop: 5}}>
            <View style={{alignItems: 'center'}}>
              <PieChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 10]}
                absolute
              />
            </View>
          </View>


        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ScrollView>
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