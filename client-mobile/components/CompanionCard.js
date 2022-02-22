import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function CompanionCard({data}) {
  return (
    <View style={companionCardStyle.containter}>
      <View style={{width: "60%"}}>
        <Text style={{fontWeight: "bold"}}>{data.username}</Text>
        <Text>{data.email}</Text>
      </View>
      <View style={data.UserTrip.status=== "accept"? companionCardStyle.buttonAccept:companionCardStyle.buttonPending}>
        <Text>{data.UserTrip.status}</Text>
      </View>
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
  buttonAccept: {
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: "green",
    borderRadius: 10
  },
  buttonPending: {
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: "yellow",
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})