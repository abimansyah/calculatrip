import { SafeAreaView } from "react-native-safe-area-context"
import TripForm from "../components/TripForm"
import { styles } from "../styles"

export default function Editrip() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TripForm type="Edit" />
    </SafeAreaView>
  )
}