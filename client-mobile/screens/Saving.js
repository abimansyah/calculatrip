import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles"
import AddSavingModal from '../components/AddSavingModal';
import SavingCard from '../components/SavingCard';

export default function Saving() {
  const [saving, setSaving] = useState([
    {
      "id": 1,
      "name": "saving name",
      "amount": 10000,
      "userId": 1,
      "tripId": 1,
      "savingDate": "02-01-2022"
    },
    {
      "id": 2,
      "name": "saving name",
      "amount": 10000,
      "userId": 1,
      "tripId": 2,
      "savingDate": "02-01-2022"
    },
    {
      "id": 3,
      "name": "saving name",
      "amount": 10000,
      "userId": 1,
      "tripId": 3,
      "savingDate": "02-01-2022"
    },
    {
      "id": 4,
      "name": "saving name",
      "amount": 10000,
      "userId": 1,
      "tripId": 4,
      "savingDate": "02-01-2022"
    },
    {
      "id": 5,
      "name": "saving name",
      "amount": 10000,
      "userId": 2,
      "tripId": 1,
      "savingDate": "02-01-2022"
    },
    {
      "id": 6,
      "name": "saving name",
      "amount": 10000,
      "userId": 2,
      "tripId": 2,
      "savingDate": "02-01-2022"
    },
    {
      "id": 7,
      "name": "saving name",
      "amount": 10000,
      "userId": 2,
      "tripId": 3,
      "savingDate": "02-01-2022"
    },
    {
      "id": 8,
      "name": "saving name",
      "amount": 10000,
      "userId": 2,
      "tripId": 4,
      "savingDate": "02-01-2022"
    }
  ])
  const [loading, setLoading] = useState(false)

  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const totalSaving = saving.length > 0 ? saving.map(el => el.amount).reduce((prev, cur) => prev + cur) : "Rp 0"

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
        snapPoints={[450, 0]}
        renderContent={() => { return (<AddSavingModal />) }}
        renderHeader={headerModal}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
      />
      <Animated.View style={{ flex: 1, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>
        <View style={savingStyle.headerContainer}>
          <View style={savingStyle.headerView}>
            <TouchableOpacity style={{ padding: 15 }} >
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={savingStyle.title}>Saving</Text>
          </View>
          <View style={savingStyle.blueCardContainer}>
            <View style={savingStyle.blueCardView}>
              <Text style={savingStyle.blueCardDesc}>Total Saving</Text>
              <Text style={savingStyle.blueCardNumber}>{totalSaving}</Text>
            </View>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={{ alignSelf: 'flex-start' }}>
              <Text style={savingStyle.addButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {!loading && saving.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              data={saving}
              renderItem={({ item }) => (<SavingCard data={item} />)}
              keyExtractor={(item) => `Saving${item.id}`}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          ) : (
            <View style={savingStyle.emptyContainer}>
              <Text style={{ textAlign: "center" }}>Add your saving to see{"\n"}all of saving data</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const savingStyle = StyleSheet.create({
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