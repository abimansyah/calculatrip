import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export default function ExpensesCard({data}) {
  return (
    <TouchableOpacity style={expensesCardStyle.containter}>
      <View style={{width: "55%", flexDirection: "row", alignItems: "center"}}>
        <FontAwesomeIcon name='taxi' size={25} color="black" />
        <View style={{marginLeft: 12}}>
          <Text style={{fontWeight: "bold"}}>{data.name}</Text>
          <Text>{data.expenseDate}</Text>
        </View>
      </View>
      <View style={{flexDirection: "column", alignItems: "flex-end"}}>
        <Text>{data.expenseCategoryId}</Text>
        <Text style={expensesCardStyle.moneyText}>{data.amount}</Text>
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