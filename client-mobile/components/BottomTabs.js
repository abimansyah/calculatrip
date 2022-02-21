import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRoute, useNavigation } from '@react-navigation/native';


export default function BottomTab({ data }) {
  console.log(data);

  const route = useRoute();
  const nav = useNavigation();

  const tripHome = route.name === 'Trip' ? "airplane" : "airplane-outline"
  const weather = route.name === 'Weather' ? "cloudy-night" : "cloudy-night-outline"
  const saving = route.name === 'Saving' ? "wallet" : "wallet-outline"
  const expense = route.name === 'Expenses' ? "reader" : "reader-outline"

  return (
    <View style={{
      backgroundColor: '#0487d9',
      width: '100%',
      height: 60,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      <TouchableOpacity
        onPress={() => nav.navigate('Trip', {
          tripId: data.id
        })}
      >
        <Ionicons name={tripHome} size={21} color="white" />
      </TouchableOpacity>

      <Ionicons name="person-add-outline" size={21} color="white" />
      <Ionicons name={weather} size={21} color="white" />
      <TouchableOpacity
        onPress={() => nav.navigate('Saving')}
      >
        <Ionicons name={saving} size={21} color="white" />
      </TouchableOpacity>
      <Ionicons name={expense} size={21} color="white" />
    </View>
  )
}