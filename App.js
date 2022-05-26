import { StyleSheet, StatusBar, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';


export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor='transparent'/>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eedffd',
  },
});
