import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from "react-native"
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { server } from "../globalvar";
import { useNavigation, useNavigationState } from '@react-navigation/native'; import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles'


export default function ExpenseCategory({ setModalVisible, data }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const navigation = useNavigation()

  const value = {
    name: name,
    amount: amount,
    savingDate: new Date()
  }

  const addNewSaving = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token')
      const resp = await axios.post(`${server}/savings/${data}`, value, {
        headers: {
          access_token: token
        }
      })

      Alert.alert('Success add new saving', resp.data.message);
      navigation.navigate('Saving', { tripId: data, savingId: `${name}${amount}` })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={modalStyle.centeredView}>
        <View style={modalStyle.modalView}>
          <Text style={{ marginVertical: 4, fontSize: 21, fontWeight: '700' }}>Select Category</Text>
          {/* text input */}


          <View style={{ flexDirection: 'column', justifyContent: 'flex-end', height: 500 }}>

            {/* row1 */}
            <View style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
              paddingHorizontal: 10,
            }}>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 1,
                    tripId: data,
                    iconName: 'food'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 2,
                    tripId: data,
                    iconName: 'taxi'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 3,
                    tripId: data,
                    iconName: 'bed'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {navigation.navigate('AddExpenses', {
                  categoryId: 4,
                  tripId: data,
                  iconName: 'cart'
                })
                setModalVisible(false)
              }}
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
                onPress={() => {navigation.navigate('AddExpenses', {
                  categoryId: 5,
                  tripId: data,
                  iconName: 'coffee'
                })
                setModalVisible(false)
              }}
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
                onPress={() => {navigation.navigate('AddExpenses', {
                  categoryId: 6,
                  tripId: data,
                  iconName: 'beer'
                })
                setModalVisible(false)
              }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 7,
                    tripId: data,
                    iconName: 'airplane'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 8,
                    tripId: data,
                    iconName: 'binoculars'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 9,
                    tripId: data,
                    iconName: 'basket'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 10,
                    tripId: data,
                    iconName: 'weight-lifter'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 11,
                    tripId: data,
                    iconName: 'drama-masks'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 12,
                    tripId: data,
                    iconName: 'cash-multiple'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 13,
                    tripId: data,
                    iconName: 'currency-usd'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 14,
                    tripId: data,
                    iconName: 'washing-machine'
                  })
                  setModalVisible(false)
                }}
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
                onPress={() => {
                  navigation.navigate('AddExpenses', {
                    categoryId: 15,
                    tripId: data,
                    iconName: 'file'
                  })
                  setModalVisible(false)
                }}
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
      </View>
    </TouchableWithoutFeedback >
  )
}

const modalStyle = StyleSheet.create({
  centeredView: {
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: Dimensions.get('window').width - 20,
    marginHorizontal: 5,
    marginBottom: 70,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    margin: 5,
    borderColor: "#E6E6E6",


  },
  modalText: {
    marginLeft: 40,
    fontSize: 15
  },
  inputBar: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 1,
    borderRadius: 6,
    backgroundColor: "white",
    borderColor: "#E6E6E6",

  },
})