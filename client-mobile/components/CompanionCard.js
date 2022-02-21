import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function CompanionCard({data}) {
  return (
    <View style={companionCardStyle.containter}>
      <View style={{width: "60%"}}>
        <Text style={{fontWeight: "bold"}}>Username</Text>
        <Text>Email@email.com</Text>
      </View>
      <TouchableOpacity style={companionCardStyle.button}>
        <Text style={companionCardStyle.buttonText}>Delete Companion</Text>
      </TouchableOpacity>
    </View>
  )
}

const companionCardStyle = StyleSheet.create({
  containter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 15,
    backgroundColor: "#fff"
  },
  moneyText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  button: {
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: "#d0312d",
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})