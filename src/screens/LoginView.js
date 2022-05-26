
import React, {useState, useEffect} from 'react'
import { View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../assets/images/logo2.png';
import LoginCard from '../components/custom_cards/LoginCard';
import * as API_MESSAGES from "../api/authentication_endpoints";
import LoginErrorMessage from '../components/error_messages/LoginErrorMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginView = ({navigation}) => {

  // Prevent going back 
  useEffect(() => {
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      })
  }, []);
    
  const {height} = useWindowDimensions();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hideErrorMessage = () => {
      setShowErrorMessage(false);
      setErrorMessage('');
  }

  const onSignUpPress = async () => {
    console.log(await AsyncStorage.getItem('user'))
    navigation.navigate("Register")
  }

  const onForgottenPasswordPress = () => {
    navigation.navigate("Forgotten Password")
  }


  const onLogInPress = () => {
      let usernameAndPassowrd = {
          password: password,
          username: username
      }

      console.log(usernameAndPassowrd)

      return API_MESSAGES.logIn(usernameAndPassowrd, async (result, status, error) => {
          if (result === null || (status !== 200 && status !== 201)) {
            console.log(status)
            console.log(error)
            console.warn("NOT ABLE TO CONNECT TO SERVER!")
          } else {
              // this means that the user is logged in, navigate him/her to the homepage
              if (result.token !== undefined) {
                // close the error message if a former wrong username or password were provided
                setShowErrorMessage(false)
                setErrorMessage('')

                // stringify & save the logged-in user in the async storage for a later use
                const stringifiedUser = JSON.stringify(result.user)
                await AsyncStorage.setItem('user', stringifiedUser)
                // navigate the user to the welcome page, if this is his/her first log-in
                navigation.navigate("Welcome Page")
              }
              
              // this means the user introduced wrong authorization credentials
              if (result.status !== '200') {
                setErrorMessage(result.message)
                setShowErrorMessage(true)
              }
          }
      })
  }
  
  return (
    <View style={styles.root}>

        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.3}]} 
          resizeMode="contain"
        />

        <LoginCard 
          onLogInPress={onLogInPress} 
          onForgottenPasswordPress={onForgottenPasswordPress}
          onSignUpPress={onSignUpPress}
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword}/> 

        {showErrorMessage && <LoginErrorMessage text={errorMessage} handlePress={hideErrorMessage}></LoginErrorMessage>}
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

export default LoginView