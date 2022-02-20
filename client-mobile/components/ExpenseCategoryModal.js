import { View, Text, TextInput } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../styles'

export default expenseCategory = () => {
  return (
    <View style={styles.modalData}>

      <View>
        <Text style={{
          fontWeight: '700',
          fontSize: 23,
          paddingTop: 50,
          paddingBottom: 20
        }}>Choose Expense Category</Text>
      </View>
      <View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>

          <View style={{
            alignItems: 'center',
            marginHorizontal: 9,
          }}>
            <View style={styles.expenseIcon}>
              <FontAwesomeIcon name='film' size={25} color="#fff" />
            </View>
            <Text>Entertainment</Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginHorizontal: 9

          }}>
            <View style={styles.expenseIcon}>
              <FontAwesomeIcon name="taxi" size={25} color="#fff" />
            </View>
            <Text>Transportation</Text>
          </View>

          <View style={{
            alignItems: 'center',
            marginHorizontal: 9

          }}>
            <View style={styles.expenseIcon}>
              <FontAwesomeIcon name="hotel" size={25} color="#fff" />
            </View>
            <Text>Accomodation</Text>
          </View>

        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>

          <View style={{
            alignItems: 'center',
            marginHorizontal: 9
          }}>
            <View style={styles.expenseIcon}>
              <FontAwesomeIcon name="pizza-slice" size={25} color="#fff" />
            </View>
            <Text>Food</Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginHorizontal: 9

          }}>
            <View style={styles.expenseIcon}>
              <FontAwesomeIcon name="dumbbell" size={25} color="#fff" />
            </View>
            <Text>Lifestyle</Text>
          </View>

          <View style={{
            alignItems: 'center',
            marginHorizontal: 9

          }}>
            <View style={styles.expenseIcon}>
              <FontAwesomeIcon name="gift" size={25} color="#fff" />
            </View>
            <Text>Souvenir</Text>
          </View>

        </View>


      </View>
    </View>
  )
}