import { StyleSheet, Dimensions } from "react-native";

const logoColor = '#72c1f2'
const backgroundColor = '#fff'
const mainColor = '#0487d9'
const secondColor = '#0378a6'

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: backgroundColor,
    position: 'relative'
  },

  
  screenSize: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  mainButton: {
    backgroundColor: mainColor,
    color: backgroundColor,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    borderRadius: 5,
    paddingVertical: 5
  }
});

