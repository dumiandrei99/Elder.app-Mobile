import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import Logo from '../../assets/images/logo2.png';
import React, {useState} from 'react'
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import * as API_MESSAGES from "../api/authentication_endpoints";
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import RegisterCard from '../components/custom_cards/RegisterCard';
import RegisterErrorMessage from '../components/error_messages/RegisterErrorMessage'


const RegisterView = () => {
  const {height} = useWindowDimensions();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword,setRePassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

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

  const convertDateOfBirth = (day, month, year) => {
    return day + "/" + month + "/" + year
  }

  const onRegisterPress = () => {
    
    let dateOfBirth = convertDateOfBirth(day, month, year)

    let user = {
      username: username,
      password: password,
      re_password: repassword,
      first_name: firstname,
      last_name: lastname,
      email: email,
      date_of_birth: dateOfBirth
    }

    return API_MESSAGES.register(user, (result, status, error) => {
  
      if (result === null || (status !== 200 && status !== 201)) {
        console.log(status)
        console.log(error)
        console.warn("NOT ABLE TO CONNECT TO SERVER!")
      } else {
          // this means that the registration of the user was successful
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

        <Text style={[styles.label, {height: height * 0.1}]}> REGISTER </Text>

        <RegisterCard 
            username={username}
            password={password}
            repassword={repassword}
            firstname={firstname}
            lastname={lastname}
            email={email}
            day={day}
            month={month}
            year={year}
            setUsername={setUsername}
            setPassword={setPassword}
            setRePassword={setRePassword}
            setFirstName={setFirstName}
            setLastname={setLastname}
            setEmail={setEmail}
            setDay={setDay}
            setMonth={setMonth}
            setYear={setYear}
            onRegisterPress={onRegisterPress}
        />

        {showMessage && <RegisterErrorMessage isSuccess={registerSuccess} text={message} handlePress={hideMessage}></RegisterErrorMessage>}

    </View>
  )
}


const styles = StyleSheet.create({

  label: {
    marginLeft: '30%',
    color: '#dd5790',
    fontFamily: 'JuliusSansOne_400Regular',
    fontSize: 30
  },

  logo: {
    width: '25%',
    marginTop: '5%',
    maxWidth: 500,
    maxHeight: 200,
  },
})
export default RegisterView