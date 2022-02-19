import { Text, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles/index'

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

export default function App() {
  return (
    <SafeAreaProvider style={styles.mainContainer}>
      <View style={styles.screenSize}>
        <Home />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}