import {Text, StyleSheet, View, Pressable } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'; 

import React from 'react'


const LoginErrorMessage = (props) => {

    return (
        <View style={styles.root}>
            <FontAwesome name="exclamation-circle" size={20} style={styles.exclamation}/>
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
        width: '100%',
        marginTop: '5%',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#dd5790',
        flexDirection: 'row',
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

export default LoginErrorMessage