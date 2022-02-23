import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import "intl";
import "intl/locale-data/jsonp/en";
import { useEffect, useState } from 'react';
import { server } from '../globalvar';


export default function ExpensesCard({data, curr}) {
  const [token, setToken] = useState("")
  const [homeCurrency, setHomeCurrency] = useState("")

  const nav = useNavigation();
  const currencyFormat = (value)=>{
    return new Intl.NumberFormat(['ban', 'id']).format(value)
  }

  useEffect(async ()=> {
    try {
      const output = await AsyncStorage.getItem('access_token')
      setToken(output)
    } catch (error) {
      alert(error.data.message)
    }
  },[])
  
  return (
    <TouchableOpacity style={expensesCardStyle.containter}  onPress={() => nav.navigate('DetailExpenses', {
      data: data.id,
      tripId: data.tripId
    })}>
      <View style={{width: "55%", flexDirection: "row", alignItems: "center"}}>
        <Icon name={data.ExpenseCategory.icon} size={25} color="black" />
        <View style={{marginLeft: 12}}>
          <Text style={{fontWeight: "bold"}}>{data.name}</Text>
          <Text>{`${moment(new Date(data.expenseDate)).format('DD MMMM YYYY')}`}</Text>
        </View>
      </View>
      <View style={{flexDirection: "column", alignItems: "flex-end"}}>
        <Text>{data.ExpenseCategory.name}</Text>
        <Text style={expensesCardStyle.moneyText}>
          <Text style={{fontSize:14, color:"gray", fontWeight:"normal"}}>({curr}) </Text>
        {currencyFormat(data.amount)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const expensesCardStyle = StyleSheet.create({
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
    fontSize: 17,
    fontWeight: "bold"
  }
})