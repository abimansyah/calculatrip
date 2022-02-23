import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server } from '../globalvar';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function InvitationCard({data}) {
  const navigation = useNavigation();
  const buttonClick = (response) => {
    AsyncStorage.getItem('access_token')
      .then(token => {
        return axios({
          method: "patch",
          url: `${server}/trips/${data.id}`,
          headers: {
            access_token: token
          },
          data: {
            status: response
          }
        })
      })
      .then(res => {
        navigation.navigate('Notification', {userId: data.id})
        Alert.alert("Success",res.data.message)
      })
      .catch((err)=>{
        console.log(err)
        if (typeof err === "object" && err.response.data.message) {
          Alert.alert("Error",err.response.data.message)
      }
      })
  }
  return (
    <View style={companionCardStyle.containter}>
      <View>
        <Text>Invitation from {data.Trip.UserTrips[0].User.username}</Text>
        <Text style={{fontWeight: "bold"}}>{data.Trip.name}</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={companionCardStyle.acceptButton} onPress={() => buttonClick("accept")}>
          <Text style={companionCardStyle.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={companionCardStyle.rejectButton} onPress={() => buttonClick("reject")}>
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