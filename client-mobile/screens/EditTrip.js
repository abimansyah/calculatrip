import { SafeAreaView } from "react-native-safe-area-context"
import TripFormEdit from "../components/TripFormEdit"
import { styles } from "../styles"

export default function Editrip() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TripFormEdit type="Edit" />
    </SafeAreaView>
  )
}