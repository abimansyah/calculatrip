import { KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import TripForm from "../components/TripForm"
import { styles } from "../styles"

export default function AddTrip() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TripForm type="Add" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}