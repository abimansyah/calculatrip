import { Text, View, StatusBar, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles/index'

import Login from './screens/Login';
import Register from './screens/Register';

import { BottomModal } from './components/InviteCompanionModal';
import Test from './screens/TestBottomModal';
import Home from './screens/Home';
import Trip from './screens/Trip';
import Saving from './screens/Saving';
import Expenses from './screens/Expenses';
import Companion from './screens/Companion';
import EditProfile from './screens/EditProfile';
import AddTrip from './screens/AddTrip';
import Editrip from './screens/EditTrip';
import AddExpenses from './screens/AddExpenses';


export default function App() {
  return (
    <SafeAreaProvider style={styles.mainContainer}>
      <View style={styles.screenSize}>
        <AddExpenses />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}