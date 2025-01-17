import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={[styles.container, { marginTop: statusBarHeight, paddingTop: 10}]}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
      <Text style={styles.title}>Welcome to Home!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    backgroundColor: '#f5f5f5',
    padding: 12, 
  },
  reactLogo: {
    height: 150,
    width: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
