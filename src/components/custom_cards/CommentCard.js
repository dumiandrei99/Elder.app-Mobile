import { StyleSheet, View, Text, Image} from 'react-native'
import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as API_POST from '../../api/post_endpoints'
import { EvilIcons, AntDesign } from '@expo/vector-icons'; 
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';

const CommentCard = (props) => {
    return (
        <LinearGradient
            colors={['#dccfff', '#dd5785']}
            style={styles.gradient}
        >
            <View style={styles.user_wrapper}>
                <Text style={styles.loggedInUser}>{props.author == props.loggedInUser ? "You" : props.author}</Text>
                <Text style={styles.said}>said...</Text>
            </View>

            <Text style={styles.comment}>{props.comment}</Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        width: '90%',
        marginLeft: '5%',
        marginTop: '10%',
        borderRadius: 10
    },

    user_wrapper: {
        width: '100%',
        flexDirection: 'row',
        marginTop: '2%',
    },

    loggedInUser: {
        marginLeft: '5%',
        color: '#9F2B68'
    },

    said: {
        marginLeft: '2%',
        color: 'white'
    },

    comment: { 
        marginLeft: '5%',
        marginTop: '3%',
        marginBottom: '3%',
        color: 'white'
    },
})

export default CommentCard