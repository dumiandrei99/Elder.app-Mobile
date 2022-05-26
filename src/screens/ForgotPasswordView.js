import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import Logo from '../../assets/images/logo2.png';
import React, {useState} from 'react'
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import * as API_MESSAGES from "../api/authentication_endpoints";
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import ForgotPasswordCard from '../components/custom_cards/ForgotPasswordCard';
import ForgotPasswordErrorMessage from '../components/error_messages/ForgotPasswordErrorMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const ForgotPasswordView = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [message, setMessage] = useState('');

  let [fontsLoaded, error] = useFonts({
    JuliusSansOne_400Regular
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }


  const hideMessage = () => {
    setShowMessage(false);
    setMessage('');
  }

  const resetPasswordPressed = () => {
    let emailAndVerificationCode = {
      email: email,
      verification_code: verificationCode
    }

    console.log(emailAndVerificationCode)

    return API_MESSAGES.checkVerificationCode(emailAndVerificationCode, async (result, status, error) => {
  
      if (result === null || (status !== 200 && status !== 201)) {
        console.log(status)
        console.log(error)
        console.warn("NOT ABLE TO CONNECT TO SERVER!")
      } else {
          // this means that the verification code validation was successful
          if (result.status === '200') {

            // set the verification code and email in the async storage in order to use them later in the changing password view
            await AsyncStorage.setItem('verification_code', verificationCode)
            await AsyncStorage.setItem('email', email)
            console.log("TEST")
            navigation.navigate("Reset Password")
          } else {
            setMessage(result.message)
            setShowMessage(true)
            setRegisterSuccess(false)
          }
        }
     })
  }

  const getCodePressed = () => {
    
    let eMail = {
      email: email
    }

    console.log(eMail)

    return API_MESSAGES.generateVerificationCode(eMail, (result, status, error) => {
  
      if (result === null || (status !== 200 && status !== 201)) {
        console.log(status)
        console.log(error)
        console.warn("NOT ABLE TO CONNECT TO SERVER!")
      } else {
          // this means that the code generation was successful
          if (result.status === '200') {
            setMessage(result.message)
            setShowMessage(true)
            setRegisterSuccess(true)
          } else {
            setMessage(result.message)
            setShowMessage(true)
            setRegisterSuccess(false)
          }
        }
     })

  }

  return (
    <View>
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.1}]} 
          resizeMode="contain"
        />

      <Text style={[styles.label, {height: height * 0.1}]}>RESET YOUR PASSWORD</Text>

      <ForgotPasswordCard 
        resetPasswordPressed={resetPasswordPressed} 
        getCodePressed={getCodePressed} 
        email={email} 
        setEmail={setEmail}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
      />

      {showMessage && <ForgotPasswordErrorMessage isSuccess={registerSuccess} text={message} handlePress={hideMessage}></ForgotPasswordErrorMessage> }
    </View>
  )
}

const styles = StyleSheet.create({

  label: {
    width: '100%',
    marginLeft: '15%',
    marginTop: '5%',
    color: '#dd5790',
    fontFamily: 'JuliusSansOne_400Regular',
    fontSize: 22
  },

  logo: {
    width: '25%',
    marginTop: '5%',
    maxWidth: 500,
    maxHeight: 200,
  },
})

export default ForgotPasswordView