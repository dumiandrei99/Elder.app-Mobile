import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React, {useEffect} from 'react'
import Logo from '../../assets/images/logo2.png';

const HomeView = ({navigation}) => {

  // Prevent going back 
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })
  }, []);

  const {height} = useWindowDimensions();

  return (
    <View style={styles.root} >
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.3}]} 
          resizeMode="contain"
        />

        <Text>Home Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  root: {
    alignItems: 'center',
    padding: 20,
    marginTop: '15%'
  },

  logo: {
    width: '80%',
    maxWidth: 500,
    maxHeight: 200
  }
}) 

export default HomeView