import {
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'; 


export default function HomeCard({ data }) {
  const navigation = useNavigation() 
  return (
    <TouchableOpacity style={{marginHorizontal: 10, marginVertical: 15}}
    onPress={() => {
      navigation.navigate('Trip', {
        tripId: data.Trip.id
      })
    }}
    >
      <Image source={{uri: data.Trip.tripImageUrl}} style={{height: 200, width: "100%", backgroundColor: "#fff", borderRadius: 10}} />
      <View style={{width: '100%', flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10, marginTop: 10}}>
        <View style={{ width: "65%"}}>
          <Text style={{flexWrap: 'wrap', fontSize: 16, fontWeight: "bold"}}>{ data.Trip.name }</Text>
          <Text style={{flexWrap: 'wrap'}}>{`${moment(new Date(data.Trip.startDate)).format('DD MMMM YYYY')} - ${moment(new Date(data.Trip.endDate)).format('DD MMMM YYYY')}`}</Text>
        </View>
        <View style={{ alignItems: "center", width: "35%" }}>
          <Text>Companion(s)</Text>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>{data.UserTrips}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}