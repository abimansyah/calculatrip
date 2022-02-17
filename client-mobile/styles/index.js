import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
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

