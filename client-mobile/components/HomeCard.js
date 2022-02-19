import {
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

export default function HomeCard({ data }) {
  return (
    <TouchableOpacity style={{marginHorizontal: 10, marginVertical: 15}}>
      <Image source={{uri: data.tripImageUrl}} style={{height: 200, width: "100%", backgroundColor: "#fff", borderRadius: 10}} />
      <View style={{width: '100%', flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10, marginTop: 10}}>
        <View style={{ width: "65%"}}>
          <Text style={{flexWrap: 'wrap', fontSize: 16, fontWeight: "bold"}}>{ data.name }</Text>
          <Text style={{flexWrap: 'wrap'}}>{`${data.startDate} - ${data.endDate}`}</Text>
        </View>
        <View style={{ alignItems: "center", width: "35%" }}>
          <Text>Companion(s)</Text>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>{data.UserTrips}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}