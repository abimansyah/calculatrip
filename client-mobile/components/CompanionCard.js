import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { server } from '../globalvar';

export default function CompanionCard({ data }) {
  console.log(data);

  const deleted = () => {
    AsyncStorage.getItem('access_token')
      .then(token => {
        return axios({
          method: "delete",
          url: `${server}/trips/${data.UserTrip.TripId}/${data.id}`,
          headers: {
            access_token: token
          }
        })
      })
      .then(res => {
        console.log(res.data);
        Alert.alert('Success delete', res.data.message)
      })
      .catch(err => {
        Alert.alert('Sorry', "You're not authorize" )
      })
  }

  const deleteCompanion = () => Alert.alert(
    `Are You sure want to remove ${data.username}?`,
    `You can invite ${data.username} again later`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => deleted() }
    ]
  );

  return (

    <TouchableHighlight onLongPress={() => deleteCompanion()} underlayColor="white">
      <View style={companionCardStyle.containter}>
        <View style={{ width: "60%" }}>
          <Text style={{ fontWeight: "bold" }}>{data.username}</Text>
          <Text>{data.email}</Text>
        </View>
        <View style={data.UserTrip.status === "accept" ? companionCardStyle.buttonAccept : companionCardStyle.buttonPending}>
          <Text>{data.UserTrip.status}</Text>
        </View>

      </View>
    </TouchableHighlight>
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