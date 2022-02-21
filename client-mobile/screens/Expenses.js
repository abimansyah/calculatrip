import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles"
import ExpensesCard from '../components/ExpensesCard';
import ExpenseCategoryModal from '../components/ExpenseCategoryModal';

export default function Expenses() {
  const [expenses, setExpenses] = useState([
    {
      "id": 1,
      "name": "expense trip one",
      "userId": 1,
      "tripId": 1,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 2,
      "name": "expense trip one",
      "userId": 1,
      "tripId": 2,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 3,
      "name": "expense trip one",
      "userId": 1,
      "tripId": 3,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 4,
      "name": "expense trip one",
      "userId": 1,
      "tripId": 4,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 5,
      "name": "expense trip ",
      "userId": 2,
      "tripId": 1,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 6,
      "name": "expense trip ",
      "userId": 2,
      "tripId": 2,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 7,
      "name": "expense trip",
      "userId": 2,
      "tripId": 3,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 8,
      "name": "expense trip",
      "userId": 2,
      "tripId": 4,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 9,
      "name": "expense trip ",
      "userId": 3,
      "tripId": 1,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    },
    {
      "id": 10,
      "name": "expense trip ",
      "userId": 3,
      "tripId": 2,
      "amount": 5000,
      "expenseCategoryId": 1,
      "paymentMethodId": 1,
      "location": "Indonesia",
      "description": "trip expense",
      "expenseDate": "02-01-2022"
    }
  ])
  const [loading, setLoading] = useState(false)

  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const totalExpenses = expenses.length > 0 ? expenses.map(el => el.amount).reduce((prev, cur) => prev + cur) : "Rp 0"

  const headerModal = () => {
    return (
      <View style={styles.modalHeader}>
        <View style={styles.modalPanelHeader}>
          <View style={styles.modalPanelHandle} />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BottomSheet
        ref={bs}
        snapPoints={[550, 0]}
        renderContent={() => { return (<ExpenseCategoryModal/>) }}
        renderHeader={headerModal}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
      />
      <Animated.View style={{ flex: 1, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>
        <View style={expensesStyle.headerContainer}>
          <View style={expensesStyle.headerView}>
            <TouchableOpacity style={{padding: 15}} >
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={expensesStyle.title}>Expenses</Text>
          </View>
          <View style={expensesStyle.blueCardContainer}>
            <View style={expensesStyle.blueCardView}>
              <Text style={expensesStyle.blueCardDesc}>Total Expenses</Text>
              <Text style={expensesStyle.blueCardNumber}>{totalExpenses}</Text>
            </View>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={{ alignSelf: 'flex-start' }}>
              <Text style={expensesStyle.addButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          { !loading && expenses.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true} 
              data={expenses}
              renderItem={({ item }) => (<ExpensesCard data={item} />)}
              keyExtractor={(item) => `Expenses${item.id}`}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          ) : (
            <View style={expensesStyle.emptyContainer}>
              <Text style={{textAlign: "center"}}>Add your expenses to see{"\n"}all of expenses data</Text>
            </View>
          ) }
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const expensesStyle = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    top: 0
  },
  headerView: {
    width: Dimensions.get('window').width,
    height: 170,
    backgroundColor: "#72c1f2"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 40
  },
  blueCardContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#0378a6',
    marginHorizontal: 20,
    marginTop: -50
  },
  blueCardView: {
    width: "80%"
  },
  blueCardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff"
  },
  blueCardDesc: {
    color: "#fff",
    fontSize: 14
  },
  addButton: {
    fontSize: 32,
    backgroundColor: "#fff",
    color: '#0378a6',
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 50
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
  }
})