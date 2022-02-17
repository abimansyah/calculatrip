import { Text, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/Login';
import { styles } from './styles/index'

export default function App() {
  return (
    <SafeAreaProvider style={styles.mainContainer}>
      <View style={styles.screenSize}>
        <Login />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}