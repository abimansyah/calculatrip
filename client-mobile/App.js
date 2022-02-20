import { Text, View, StatusBar, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles/index'

import Login from './screens/Login';
import Register from './screens/Register';
import { BottomModal } from './components/InviteCompanionModal';
import Test from './screens/TestBottomModal';
export default function App() {
  return (
    <SafeAreaProvider style={styles.mainContainer}>
      <View style={styles.screenSize}>
        <Test />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}