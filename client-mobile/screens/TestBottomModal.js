import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, Image } from 'react-native'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "../styles"
import InviteCompanionModal from '../components/InviteCompanionModal';
import expenseCategory from '../components/ExpenseCategoryModal';
import logo from '../assets/logo.png'
export default function Test() {
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const [focused, setFocused] = useState('')



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
        renderContent={expenseCategory}
        renderHeader={headerModal}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
      />
      <Animated.View style={
        {
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))
        }
      }>
        <Text> ini test untuk bottom modal</Text>
        <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
          <Image source={logo} style={{ height: 100, width: 100 }} />
          <Text> ini test untuk bottom modal</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}