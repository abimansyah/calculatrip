import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles"
import InviteCompanionModal from '../components/InviteCompanionModal';
import CompanionCard from '../components/CompanionCard';

export default function Companion() {
  const [companion, setCompanion] = useState([
    {
      "id": 1
    },
    {
      "id": 2
    },
    {
      "id": 3
    }
  ])
  const [loading, setLoading] = useState(false)

  const bs = React.createRef();
  const fall = new Animated.Value(1);

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
    <SafeAreaView style={styles.mainContainer}>
      <BottomSheet
        ref={bs}
        snapPoints={[450, 0]}
        renderContent={() => { return (<InviteCompanionModal/>) }}
        renderHeader={headerModal}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
      />
      <Animated.View style={{ flex: 1, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>
        <View style={companionStyle.headerContainer}>
          <View style={companionStyle.headerView}>
            <TouchableOpacity style={{padding: 15}} >
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={companionStyle.title}>Companion</Text>
          </View>
          <View style={companionStyle.blueCardContainer}>
            <View style={companionStyle.blueCardView}>
              <Text style={companionStyle.blueCardDesc}>Owner</Text>
              <Text style={companionStyle.blueCardNumber}>Dyah Achwatiningrum</Text>
            </View>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)} style={{ alignSelf: 'flex-start' }}>
              <Text style={companionStyle.addButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          { !loading && companion.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true} 
              data={companion}
              renderItem={({ item }) => (<CompanionCard/>)}
              keyExtractor={(item) => `Companion${item.id}`}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          ) : (
            <View style={companionStyle.emptyContainer}>
              <Text style={{textAlign: "center"}}>Invite your companion{"\n"}to join your trip</Text>
            </View>
          ) }
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const companionStyle = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    top: 0
  },
  headerView: {
    width: "100%",
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
    fontSize: 25,
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