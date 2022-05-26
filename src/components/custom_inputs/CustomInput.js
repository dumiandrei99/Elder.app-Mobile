import { StyleSheet, View, TextInput, Text, Pressable} from 'react-native'
import React from 'react'

const CustomInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor='white'
        value={props.value}
        onChangeText={props.setValue}
        style={props.withButton ? styles.input_with_button : styles.input}
        secureTextEntry={props.isPassword}
      /> 

      {props.withButton ?
        <Pressable onPress={props.inputButtonPressed}> 
          <Text style={styles.inside_input_button}>{props.buttonMessage}</Text> 
        </Pressable>
        : 
        <Text></Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      width: '100%',
      height: '22%',
      borderColor: '#dd5790',
      borderWidth: 2,
      borderRadius: 5,
      marginTop:'10%',
      flexDirection: 'row'
    },

    input: {
      paddingLeft: 10,
      color: 'white',
      width: '100%',
      height: '100%',
    },

    input_with_button: {
      paddingLeft: 10,
      color: 'white',
      width: '75%',
      height: '100%',
    },

    inside_input_button: {
      color: 'white',
      paddingTop: '2%'
    }
})
export default CustomInput