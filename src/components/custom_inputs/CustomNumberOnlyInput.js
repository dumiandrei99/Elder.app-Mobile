import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'

const CustomNumberOnlyInput = (props) => {
  return (
    <View style={props.isDay ? styles.container : styles.containerMiddleAndRight}>
      <TextInput
        keyboardType='numeric'
        returnKeyType={'done'}
        placeholder={props.placeholder}
        placeholderTextColor='white'
        value={props.value}
        onChangeText={props.setValue}
        style={styles.input}
        secureTextEntry={props.isPassword}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: '25%',
        height: '100%',
        marginTop: '2%',
        borderColor: '#dd5790',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 20
    },

    containerMiddleAndRight: {
        backgroundColor: 'transparent',
        width: '25%',
        height: '100%',
        marginTop: '2%',
        marginLeft: '12%',
        borderColor: '#dd5790',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 20
    },

    input: {
        color: 'white',
        height: '100%',
        width: '100%',
    }
})
export default CustomNumberOnlyInput