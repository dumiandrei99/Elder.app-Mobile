import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import Logo from '../../assets/images/logo2.png';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import WelcomeCard from '../components/custom_cards/WelcomeCard';

const WelcomeView = ({navigation}) => {

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })
  }, []);

  const {height} = useWindowDimensions();
  const [welcomeCard, setWelcomeCard] = useState('one');

  let [fontsLoaded, error] = useFonts({
    JuliusSansOne_400Regular
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }
  
  const onGetStarted = () => { 
    setWelcomeCard('two')
  }

  const onContinueSecondCard = () => {
    setWelcomeCard('three')
  }

  const onContinueThirdCard = () => { 
    navigation.navigate("Prefferences")
  }

  return (
    <View>
        <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.1}]} 
            resizeMode="contain"
        />

        <Text style={[styles.label, {height: height * 0.1}]}> welcome to elder.app ! </Text>
    
        {welcomeCard === 'one' && <WelcomeCard buttonPressed={onGetStarted} card={welcomeCard}/>}
        {welcomeCard === 'two' && <WelcomeCard buttonPressed={onContinueSecondCard} card={welcomeCard}/>}
        {welcomeCard === 'three' && <WelcomeCard buttonPressed={onContinueThirdCard} card={welcomeCard}/>}

    </View>
  )
}

const styles = StyleSheet.create({

    label: {
        marginLeft: '12.5%',
        marginTop: '8.5%',
        color: '#dd5790',
        fontFamily: 'JuliusSansOne_400Regular',
        fontSize: 23,
    },

    root: {
        alignItems: 'center',
    },
    
    logo: {
        width: '25%',
        marginTop: '15%',
        maxWidth: 500,
        maxHeight: 200,
    },
}) 

export default WelcomeView