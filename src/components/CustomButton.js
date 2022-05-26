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

    text_TERTIARY_LOGIN: {
        color: 'white',
    },

    text_TERTIARY_SIGNUP: {
        color: 'white',
    }
})
export default CustomButton