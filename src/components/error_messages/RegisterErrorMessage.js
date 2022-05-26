import {Text, StyleSheet, View, Pressable } from 'react-native'
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons'; 

import React from 'react'


const RegisterErrorMessage = (props) => {

    return (
        <View style={styles.root}>
           
            {props.isSuccess ? 
                <AntDesign name="checkcircle" size={20} style={styles.greenCheck} />
                : 
                <FontAwesome name="exclamation-circle" size={20} style={styles.exclamation} 
            />}

            <Text style={styles.text}>{props.text}</Text>

            <Pressable style={styles.cross} onPress={props.handlePress}>
                <Entypo name="cross" size={16} color="#dd5790" />
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '5%',
        width: '90%',
        marginLeft: '5%',
        marginTop: '5%',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#dd5790',
        flexDirection: 'row',
    },

    greenCheck: {
        marginLeft: '2%',
        marginTop: '1.5%',
        color: 'green'
    },

    exclamation:{
        marginLeft: '2%',
        marginTop: '1.5%',
        color: '#dd5790'
    },

    text: {
        marginTop: '2%',
        fontSize: 12,
        marginLeft: '3%',
        color: '#dd5790'
    },

    cross: {
        flex: 1,
        width: '5%',
        alignSelf: 'baseline',
        alignItems:'flex-end',
        marginTop: '2%',
    }
})

export default RegisterErrorMessage