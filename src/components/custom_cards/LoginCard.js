import { StyleSheet, View, Text } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../custom_inputs/CustomInput';
import CustomButton from '../CustomButton';
import { LinearGradient } from 'expo-linear-gradient';


const LoginCard = (props) => {
    
    return (
        <LinearGradient
            colors={['#dccfff', '#dd5785']}
            style={styles.gradient}
        >
            <View style={styles.root}>

                <View style={styles.inputs_and_forgot_password_wrapper}>
                    <CustomInput
                        placeholder='Enter your username...'
                        value={props.username}
                        setValue={props.setUsername}
                    />

                    <CustomInput
                        placeholder='Enter your password...'
                        value={props.password}
                        setValue={props.setPassword}
                        isPassword={true}
                    />
                    
                    <CustomButton 
                        text="Forgot your password?" 
                        type="TERTIARY_LOGIN" 
                        action={props.onForgottenPasswordPress}
                    />
                    
                </View>
                
                <CustomButton 
                    text="LOG-IN" 
                    action={props.onLogInPress} 
                    type="PRIMARY"
                />

                <CustomButton 
                    text="Don't have an account? Sign up!" 
                    action={props.onSignUpPress}
                    type="TERTIARY_SIGNUP" 
                /> 
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        maxHeight: 340,
        height: '55%',
        borderRadius: 15,
    },

    root: {
        alignItems: 'center',
        paddingTop: '5%',
    },

    inputs_and_forgot_password_wrapper: {
        width: '80%'
    }
})

export default LoginCard