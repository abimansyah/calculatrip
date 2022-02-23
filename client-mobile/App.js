import { Text, View, StatusBar, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import HomeCard from './components/HomeCard';
import EditProfile from './screens/EditProfile';
import AddTrip from './screens/AddTrip';
import EditTrip from './screens/EditTrip';
import AddExpenses from './screens/AddExpenses';
import DetailExpenses from './screens/DetailExpenses';
import Notification from './screens/Notification';
import Weather from './screens/Weather';
import CurrencyList from './screens/CurrencyList';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={styles.mainContainer}>
      <NavigationContainer>
        <View style={styles.screenSize}>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='Login' component={ Login } />
            <Stack.Screen name='Register' component={ Register } />
            <Stack.Screen name='Home' component={ Home } />
            <Stack.Screen name='Notification' component={ Notification } />
            <Stack.Screen name='EditProfile' component={ EditProfile } />
            <Stack.Screen name='Trip' component={ Trip } />
            <Stack.Screen name='HomeCard' component={ HomeCard } />
            <Stack.Screen name='Saving' component={ Saving } />
            <Stack.Screen name='Expenses' component={ Expenses } />
            <Stack.Screen name='AddTrip' component={ AddTrip } />
            <Stack.Screen name='EditTrip' component={ EditTrip } />
            <Stack.Screen name='Companion' component={ Companion } />
            <Stack.Screen name='AddExpenses' component={ AddExpenses } />
            <Stack.Screen name='DetailExpenses' component={ DetailExpenses } />
            <Stack.Screen name='Weather' component={ Weather } />
            <Stack.Screen name='CurrencyList' component={ CurrencyList } />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}