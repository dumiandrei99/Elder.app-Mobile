import { View, Text, StyleSheet, Image, useWindowDimensions, Pressable } from 'react-native'
import Logo from '../../assets/images/logo2.png';
import React, {useState} from 'react'
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import * as API from "../api/authentication_endpoints";
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import ForgotPasswordErrorMessage from '../components/error_messages/ForgotPasswordErrorMessage';
import CustomInput from '../components/custom_inputs/CustomInput'
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ChangePasswordView = ({route}) => {
  const {height} = useWindowDimensions();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('')
  const [changeSuccess, setChangeSuccess] = useState(false);
  const navigation = useNavigation()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const {loggedInUser, isChangePassword, verificationCode} = route.params

  let [fontsLoaded, error] = useFonts({
    JuliusSansOne_400Regular
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  const onChangePassword = () => {
    let changePassword_JSON = {}
    if (route.params.isChangePassword) {
        changePassword_JSON = {
          username: loggedInUser.username,
          type: 'change_password',
          old_password: oldPassword,
          new_password: newPassword
        }
    } else {
       changePassword_JSON = {
        verification_code: verificationCode,
        type: 'reset_password',
        new_password: newPassword
      }
    }

    console.log(changePassword_JSON)

    API.changePassword(changePassword_JSON, (result) => {
      setShowMessage(true)
      if (result.message) {
        setChangeSuccess(false)
        setMessage(result.message)
      } else {
        setChangeSuccess(true)
        setMessage(result)
      }
    })
  }

  const onGoBackHome = () => {
    navigation.push("Log-in")
  }

  const hideMessage = () => {
    setShowMessage(false)
    setMessage('')
  }

  return (
    <View>
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.1}]} 
          resizeMode="contain"
        />

      <View style={{width: '100%', alignItems:'center'}}>
        <Text style={[styles.label, {height: height * 0.1}]}>CHANGE YOUR PASSWORD</Text>
      </View>
      {
        isChangePassword && 
        <View style={styles.input}>
            <CustomInput
              placeholder='Enter your old password...'
              value={oldPassword}
              setValue={setOldPassword}
              changePassword={true}
              isPassword={true}
          />
        </View>
      }

      <View style={styles.input}>
        <CustomInput
            placeholder='Enter your new password...'
            value={newPassword}
            setValue={setNewPassword}
            changePassword={true}
            isPassword={true}
        />
      </View>

      <CustomButton 
            text="Change your password" 
            action={onChangePassword} 
            type="CHANGE_PASSWORD"
      /> 

      {!isChangePassword && 
      <Pressable onPress = {onGoBackHome}>
        <Text style={styles.go_back_home}>Go back home</Text>
      </Pressable> 
      }

      {showMessage && <ForgotPasswordErrorMessage changePassword = {true} isSuccess={changeSuccess} text={message} handlePress={hideMessage}></ForgotPasswordErrorMessage> }
    </View>
  )
}

const styles = StyleSheet.create({

  label: {
    width: '100%',
    marginTop: '5%',
    color: '#dd5790',
    fontFamily: 'JuliusSansOne_400Regular',
    fontSize: 22,
    textAlign:'center'
  },

  logo: {
    width: '25%',
    marginTop: '5%',
    maxWidth: 500,
    maxHeight: 200,
  },

  input: {
    width: '80%',
    marginLeft: '10%'
  },

  go_back_home: {
    marginLeft: '36.5%',
    marginTop: '5%',
    color: '#dd5790',
    textDecorationLine: 'underline'
  }

})

export default ChangePasswordView