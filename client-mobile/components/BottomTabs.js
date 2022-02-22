import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRoute, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function BottomTab({ data }) {
  console.log(data, 'bottom tab');

  const route = useRoute();
  const nav = useNavigation();

  const tripHome = route.name === 'Trip' ? "airplane" : "airplane-outline"
  const weather = route.name === 'Weather' ? "cloudy-night" : "cloudy-night-outline"
  const saving = route.name === 'Saving' ? "wallet" : "wallet-outline"
  const expense = route.name === 'Expenses' ? "reader" : "reader-outline"
  const companion = route.name === 'Companion' ? "person-add" : "person-add-outline"

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
      <TouchableOpacity style={{padding: 10}}
        onPress={() => nav.navigate('Trip', {
          tripId: data
        })}
      >
        <Ionicons name={tripHome} size={21} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={{padding: 10}}
        onPress={() => nav.navigate('Companion', {
          tripId: data
        })}
      >
        <Ionicons name={companion} size={21} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={{padding: 10}}>
        <Ionicons name={weather} size={21} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={{padding: 10}}
        onPress={() => nav.navigate('Saving', {
          tripId: data
        })}
      >
        <Ionicons name={saving} size={21} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={{padding: 10}}
        onPress={() => nav.navigate('Expenses', {
          tripId: data
        })}
      >
        <Ionicons name={expense} size={21} color="white" />
      </TouchableOpacity>

    </View>
  )
}

// export default function BottomTab() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Trip" component={Trip} data={}/>
//       <Tab.Screen name="Saving" component={Saving} />
//     </Tab.Navigator>
//   );
// }