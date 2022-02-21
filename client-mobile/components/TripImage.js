import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function TripImage({ data }) {
  const navigation = useNavigation();
  return (
    <ImageBackground style={styles.imageDetail} source={{
      uri: data,
    }}>
      <LinearGradient style={styles.imageDetail} colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.5 }}>
        <View style={styles.iconContainer}>
          {/* <TouchableOpacity style={styles.iconButton}
          onPress={() => {
            navigation.goBack();
          }}> */}
          <TouchableOpacity style={styles.iconButton}
            onPress={() => {
              navigation.navigate('Home')
            }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageDetail: {
    height: 230,
    position: 'relative',
  },
  iconContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});