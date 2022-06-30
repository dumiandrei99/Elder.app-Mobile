import { StyleSheet, View, TextInput, Text, Pressable} from 'react-native'
import React from 'react'

const CustomPressableText = (props) => {
  return (
    <View>
        <Pressable onPress={props.onPress}> 
          <Text style={styles.no_recommended}>{props.message}</Text> 
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    no_recommended: {
        marginTop: '10%',
        width: '80%',
        marginLeft: '15%',
        fontFamily: 'monospace',
        fontSize: 15,
        color: '#dd5790',
        textAlign: 'justify',
        textDecorationLine: 'underline',
        marginBottom: '10%'
    },
})
export default CustomPressableText