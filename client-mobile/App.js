import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/Login';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.screenSize}>
        <Login />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0487d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenSize: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
});