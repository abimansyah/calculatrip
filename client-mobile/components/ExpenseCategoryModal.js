import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles'
import { useNavigation } from '@react-navigation/native';

export default expenseCategory = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.modalData}>

      {/* title */}
      <View>
        <Text style={{
          fontWeight: '700',
          fontSize: 23,
          paddingBottom: 20
        }}>Choose Expense Category</Text>
      </View>
      {/* title */}

      <View style={{ flexDirection: 'column' }}>

        {/* row1 */}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          paddingHorizontal: 10

        }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 1,
              tripId: data,
              iconName: 'food'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9,
            }}>
              <View style={styles.expenseIcon}>
                <Icon name='food' size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Restaurant</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 2,
              tripId: data,
              iconName: 'taxi'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="taxi" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Transportation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 3,
              tripId: data,
              iconName: 'bed'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="bed" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Accomodation</Text>
            </View>
          </TouchableOpacity>

        </View>
        {/* row1 */}

        {/* row2 */}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 4,
              tripId: data,
              iconName: 'cart'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9,
            }}>
              <View style={styles.expenseIcon}>
                <Icon name='cart' size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Groceries</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 5,
              tripId: data,
              iconName: 'coffee'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="coffee" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Coffee</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 6,
              tripId: data,
              iconName: 'beer'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="beer" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Drink</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* row2 */}

        {/* row3 */}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 7,
              tripId: data,
              iconName: 'airplane'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9,
            }}>
              <View style={styles.expenseIcon}>
                <Icon name='airplane' size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Flight</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 8,
              tripId: data,
              iconName: 'binoculars'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="binoculars" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Sightseeing</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 9,
              tripId: data,
              iconName: 'basket'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="basket" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Shopping</Text>
            </View>
          </TouchableOpacity>

        </View>
        {/* row3 */}

        {/* row 4 */}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 10,
              tripId: data,
              iconName: 'weight-lifter'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9,
            }}>
              <View style={styles.expenseIcon}>
                <Icon name='weight-lifter' size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Activities</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 11,
              tripId: data,
              iconName: 'drama-masks'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="drama-masks" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Entertaiment</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 12,
              tripId: data,
              iconName: 'cash-multiple'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="cash-multiple" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Exchange</Text>
            </View>
          </TouchableOpacity>

        </View>
        {/* row 4 */}

        {/* row5 */}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 13,
              tripId: data,
              iconName: 'currency-usd'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9,
            }}>
              <View style={styles.expenseIcon}>
                <Icon name='currency-usd' size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Fees</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 14,
              tripId: data,
              iconName: 'washing-machine'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="washing-machine" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>Laundry</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenses', {
              categoryId: 15,
              tripId: data,
              iconName: 'file'
            })}
          >
            <View style={{
              alignItems: 'center',
              marginHorizontal: 9

            }}>
              <View style={styles.expenseIcon}>
                <Icon name="file" size={25} color="#fff" />
              </View>
              <Text style={styles.icontText}>General</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* row5 */}
      </View>
    </View>
  )
}