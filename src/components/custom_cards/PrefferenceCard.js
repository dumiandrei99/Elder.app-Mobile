import { StyleSheet, View, Text } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../custom_inputs/CustomInput';
import CustomButton from '../CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const PrefferenceCard = (props) => {
    
    return (
        <LinearGradient
            colors={props.pressed ? ['#dccfff', '#dd5785'] : ['transparent', 'transparent']}
            style={props.pressed ? styles.gradient_pressed : styles.gradient_not_pressed}
        >
            <Pressable onPress={props.action}>
                <View style ={styles.wrapper}> 
                    <Text style={props.pressed ? styles.pressed_text_style : styles.not_pressed_text_style}>{props.text}</Text>
                </View>
            </Pressable>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient_pressed: {
        marginLeft: '6.5%',
        width: '40%',
        height: '80%',
        borderRadius: 15,
    },

    gradient_not_pressed: {
        marginLeft: '6.5%',
        width: '40%',
        height: '80%',
        borderWidth: 4,
        borderColor: '#dd5785',
        borderRadius: 15,
    },

    wrapper: { 
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },

    pressed_text_style: {
        textAlign: 'center',
        color: 'white'
    },

    not_pressed_text_style: { 
        textAlign: 'center',
        color: '#dd5785'
    }
})

export default PrefferenceCard