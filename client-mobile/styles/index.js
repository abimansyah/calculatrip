import { StyleSheet, Dimensions } from "react-native";

export const logoColor = '#72c1f2'
export const backgroundColor = '#f0f1f2'
export const mainColor = '#0487d9'
export const secondColor = '#0378a6'

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
    paddingVertical: 5,
    overflow: 'hidden'
  },

  divInput: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15
  },

  input: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingLeft: 10
  },

  inputOnFocus: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingLeft: 10,
    borderBottomColor: mainColor,
    borderBottomWidth: 3
  },

  dateinput: {
    width: '90%',
    borderRadius: 5,
    borderColor: '#c1c1c1',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 15,
    marginVertical: 8
  },
});

