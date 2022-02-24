import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { server } from '../globalvar';
import "intl";
import "intl/locale-data/jsonp/en";
import { useNavigation, useNavigationState } from '@react-navigation/native';
const currencyFormat = (value)=>{
  return new Intl.NumberFormat(['ban', 'id']).format(value)
}

export default function SavingCard({ data, curr, tripId }) {
  const navigation = useNavigation()
  // console.log(data);
  // console.log(data.id, '==================');
  const deleted =  () => {
    // console.log(data.id, '<+<++++<+<<+');
    AsyncStorage.getItem('access_token')
      .then(token => {
        console.log(token);
        return axios({
          method: "delete",
          url: `${server}/savings/${data.id}`,
          headers: {
            access_token: token
          }
        })
      })
      .then(res => {
        // console.log(res.data);
        Alert.alert('Success delete', res.data.message)
        navigation.navigate('Saving', {tripId, savingId:`${data.id}`})
      })
      .catch(err => {
        Alert.alert('Sorry', "You're not authorize" )
      })
    // try {
    //   const token = await AsyncStorage.getItem('access_token');
    //   await axios.delete(`${server}`)
    // } catch (err) {
    //   console.log(err);
    // }
  }

  const deleteSaving = () => Alert.alert(
    `Are You sure want to delete ${data.name}?`,
    '',
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
    <TouchableHighlight onLongPress={() => deleteSaving()} underlayColor="white">
      <View style={savingCardStyle.containter}>
        <View style={{ width: "55%" }}>
          <Text style={{ fontWeight: "bold" }}>{data.name}</Text>
          <Text>{moment(new Date(data.savingDate)).format('DD MMMM YYYY')}</Text>
        </View>
        <Text style={savingCardStyle.moneyText}><Text style={{fontSize:14, color:"gray", fontWeight:"normal"}}>({curr}) </Text>{currencyFormat(data.amount)}</Text>
      </View>
    </TouchableHighlight>

  )
}

const savingCardStyle = StyleSheet.create({
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
  }
})