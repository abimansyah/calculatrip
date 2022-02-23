import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function CompanionCard({data}) {
  return (
    <View style={companionCardStyle.containter}>
      <View style={{width: "60%"}}>
        <Text style={{fontWeight: "bold"}}>{data.username}</Text>
        <Text>{data.email}</Text>
      </View>
      <View style={companionCardStyle.buttonStatus}>
        <Text style={data.UserTrip.status=== "accept"? companionCardStyle.buttonTextAccept:companionCardStyle.buttonTextPending}>{data.UserTrip.status}</Text>
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
    backgroundColor: "#3cb043",
    borderRadius: 10,
  },
  buttonPending: {
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: "#CC9426",
    borderRadius: 10,
  },
  buttonStatus:{
    padding: 7,
    alignSelf: 'flex-start',
    backgroundColor: "#EDEDED",
    borderRadius: 6,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  buttonTextAccept: {
    color: "#3cb043",
    fontWeight: 'bold'
  },
  buttonTextPending: {
    color: '#E2AE12',
    fontWeight: 'bold'
  },
})