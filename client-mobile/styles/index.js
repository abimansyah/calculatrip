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
  
  modalHeader: {
    backgroundColor: '#fff',
    shadowColor: '#333333',
    shadowOffset: {
      width: -1,
      height: -4
    },
    shadowRadius: 2,
    shadowOpacity: 0.07,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalPanelHeader: {
    alignItems: 'center'
  },

  modalPanelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7f7c7d',
    marginBottom: 10
  },

  modalData: {
    backgroundColor: backgroundColor,
    color: '#fff',
    alignItems: 'center',
    height: '80%',
    justifyContent: 'center'
  },
  
  modalInput: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: 250,
    height: 40
  },

  expenseIcon: {
    backgroundColor: mainColor,
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

