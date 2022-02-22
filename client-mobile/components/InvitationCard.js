import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function InvitationCard({data}) {
  return (
    <View style={companionCardStyle.containter}>
      <View>
        <Text>Invitation from username</Text>
        <Text style={{fontWeight: "bold"}}>Trip Name</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={companionCardStyle.acceptButton}>
          <Text style={companionCardStyle.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={companionCardStyle.rejectButton}>
          <Text style={companionCardStyle.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const companionCardStyle = StyleSheet.create({
  containter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 15,
    backgroundColor: "#fff"
  },
  moneyText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  rejectButton: {
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: "#d0312d",
    borderRadius: 10,
  },
  acceptButton: {
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: "#3cb043",
    borderRadius: 10,
    marginHorizontal: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})