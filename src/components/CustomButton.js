import { View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'

const CustomButton = (props) => {
  return (
    <Pressable onPress={props.action} style={styles["container_" + props.type]}>
      <Text style={styles["text_" + props.type]}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container_PRIMARY: {
        backgroundColor: '#dd5790',
        width: '80%',
        padding: 15,
        marginTop: '1%',
        alignItems: 'center',
        borderRadius: 25
    },

    container_PRIMARY_REGISTER: {
        backgroundColor: '#eedffd',
        width: '80%',
        padding: 15,
        marginTop: '1%',
        alignItems: 'center',
        borderRadius: 25
    },

    container_GROUP_PRIMARY: {
        backgroundColor: '#eedffd',
        width: '70%',
        position: 'absolute',
        bottom: 0,
        padding: 10,
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: '5%'
    },

    container_GROUP_PRIMARY_IN_PAGE: {
        backgroundColor: '#eedffd',
        width: '80%',
        position: 'absolute',
        bottom: 0,
        padding: 5,
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: '5%'
    },

    container_ADD_PHOTO: { 
        backgroundColor: 'transparent',
        width: '40%',
        padding: 30,
        marginLeft: '5%',
        marginTop: '2%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#9F2B68'
    },

    container_ADD_POST: { 
        backgroundColor: '#9F2B68',
        width: '90%',
        padding: 10,
        marginLeft: '5%',
        marginTop: '10%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#9F2B68'
    },

    container_SETTINGS_1: {
        backgroundColor: 'transparent',
        width: '90%',
        padding: 10,
        marginTop: '25%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dd5790'
    },

    container_SETTINGS: {
        backgroundColor: 'transparent',
        width: '90%',
        padding: 10,
        marginTop: '10%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dd5790'
    },

    container_SETTINGS_LOGOUT: {
        backgroundColor: '#dd5790',
        width: '90%',
        padding: 10,
        marginTop: '70%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dd5790'
    },

    container_CHANGE_PASSWORD: {
        backgroundColor: '#dd5790',
        width: '80%',
        padding: 10,
        marginLeft: '10%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dd5790'
    },


    container_TERTIARY_LOGIN: {
        alignSelf: 'flex-end',
    },

    container_TERTIARY_SIGNUP: {
        marginTop: '3%'
    },

    text_PRIMARY: {
        fontWeight: 'bold',
        color: '#eedffd',
    },

    text_PRIMARY_REGISTER: {
        fontWeight: 'bold',
        color: '#dd5790',
    },

    text_GROUP_PRIMARY: {
        fontWeight: 'bold',
        color: '#dd5790',
    },  
    
    text_GROUP_PRIMARY_IN_PAGE: {
        fontWeight: 'bold',
        color: '#dd5790',
    }, 
    
    text_ADD_PHOTO: {
        color: '#9F2B68'
    },

    text_ADD_POST: {
        color: '#eedffd'
    },

    text_SETTINGS: {
        color: '#dd5790'
    },

    text_SETTINGS_1: {
        color: '#dd5790'
    },

    text_SETTINGS_LOGOUT: {
        color: 'white'
    },

    text_CHANGE_PASSWORD: {
        color: 'white'
    },

    text_TERTIARY_LOGIN: {
        color: 'white',
    },

    text_TERTIARY_SIGNUP: {
        color: 'white',
    }
})
export default CustomButton