import { StyleSheet, View, Text } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../custom_inputs/CustomInput';
import CustomNumberOnlyInput from '../custom_inputs/CustomNumberOnlyInput';
import CustomButton from '../CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterCard = (props) => {
    return (
        <LinearGradient
            colors={['#dccfff', '#dd5785']}
            style={styles.gradient}
        >
            <View style={styles.root}>

                <View style={styles.inputs_wrapper}>
                    <CustomInput
                        placeholder='Enter your username...'
                        value={props.username}
                        setValue={props.setUsername}
                    />

                    <CustomInput
                        placeholder='Enter your first name...'
                        value={props.firstname}
                        setValue={props.setFirstName}
                    />

                    <CustomInput
                        placeholder='Enter your last name...'
                        value={props.lastname}
                        setValue={props.setLastname}
                    />

                    <CustomInput
                        placeholder='Enter your password...'
                        value={props.password}
                        setValue={props.setPassword}
                        isPassword={true}
                    />

                    <CustomInput
                        placeholder='Enter your password again...'
                        value={props.repassword}
                        setValue={props.setRePassword}
                        isPassword={true}
                    />

                    <CustomInput
                        placeholder='Enter your e-mail...'
                        value={props.email}
                        setValue={props.setEmail}
                    />
                    
                    <Text style={styles.label}>Enter your birthdate</Text>

                    <View style={styles.dateOfBirth}>
                        <CustomNumberOnlyInput
                                placeholder='Day'
                                value={props.day}
                                setValue={props.setDay}
                                isDay={true}
                        />

                        <CustomNumberOnlyInput
                                placeholder='Month'
                                value={props.month}
                                setValue={props.setMonth}
                        />

                        <CustomNumberOnlyInput
                                placeholder='Year'
                                value={props.year}
                                setValue={props.setYear}
                        />
                    </View>

                    <View style={styles.button_wrapper}>
                        <CustomButton 
                            text="REGISTER" 
                            action={props.onRegisterPress} 
                            type="PRIMARY_REGISTER"
                        />
                    </View> 

                </View>
        
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        marginTop: '-5%',
        width: '90%',
        marginLeft: '5%',
        height: '75%',
        maxHeight: 550,
        borderRadius: 15,
    },

    root: {
        alignItems: 'center',
    },

    inputs_wrapper: {
        width: '80%',
        height: '55%'
    },

    dateOfBirth: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    label: {
        color: "white",
        marginTop: "5%",
        marginLeft: "1%"
    },

    button_wrapper:{
        marginTop: '5%',
        marginLeft: '15%'
    }
})

export default RegisterCard