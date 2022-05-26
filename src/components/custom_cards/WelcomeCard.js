import { StyleSheet, View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../CustomButton';

const WelcomeCard = (props) => {

    const [loggedInUser, setLoggedInUser] = useState('')

    if (props.card === 'one') { 
        useEffect(() => { 
            AsyncStorage.getItem('user').then(user => {
                setLoggedInUser(JSON.parse(user))
            })
        }, [])
    
    }

    return (
        <LinearGradient
            colors={['#dccfff', '#dd5785']}
            style={styles.gradient}
        >
            {props.card === 'one' && <Text style={styles.firstText}>Hello {loggedInUser.firstname},</Text>}
            {props.card === 'one' && <Text style={styles.secondText}>We know this is your first time using Elder.app and we are excited to have you here ! Don't be scared, it will be fun and you will make a lot of new friends ! </Text>}
            {props.card === 'one' && <Text style={styles.thirdText}>Press this button for a quick introduction to our application </Text>}

            {props.card === 'two' && <Text style={styles.firstText}>Elder.app is a social platform designed to help you grow your online social skills.</Text>}
            {props.card === 'two' && <Text style={styles.secondText2}>You will be able to join groups that have different themes, to attend real-life activities hosted by us and other users,
            make friends, chat with them and post your thoughts, ideas or articles for the whole world to see (or just your friend, this is your choice!)</Text>}

            {props.card === 'three' && <Text style={styles.firstText3}>Before letting you to start exploring our app, we selected a few topics that you might like.</Text>}
            {props.card === 'three' && <Text style={styles.secondText3}>Select one ore more (or even all of them!). This way, you will get connected to people in groups that have similar passions to you !
            What's greater than being part of a community with the same interests as you ? </Text>}
            {props.card === 'three' && <Text style={styles.thirdText3}>To get started, just press the button below</Text>}

            <View style={styles.button_wrapper}>
                {
                    props.card === 'one'
                    && 
                    <CustomButton
                    text="GET STARTED" 
                    action={props.buttonPressed} 
                    type="PRIMARY_REGISTER"
                    /> 
                }

                {
                    props.card === 'two' 
                    && 
                    <CustomButton
                    text="CONTINUE" 
                    action={props.buttonPressed} 
                    type="PRIMARY_REGISTER"
                    /> 
                }

                {
                    props.card === 'three' 
                    && 
                    <CustomButton
                    text="CONTINUE" 
                    action={props.buttonPressed} 
                    type="PRIMARY_REGISTER"
                    /> 
                }
            </View> 
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    firstText: { 
        marginTop: '25%',
        marginLeft: '10%',
        fontFamily: 'monospace',
        fontSize: 15,
        color: 'white' 
    },

    secondText: { 
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        fontFamily: 'monospace',
        fontSize: 15,
        textAlign: 'justify',
        color: 'white',
    },

        thirdText: { 
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        fontFamily: 'monospace',
        fontSize: 15,
        textAlign: 'justify',
        color: 'white',
        marginBottom: '15%'
    },

    secondText2: { 
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        fontFamily: 'monospace',
        fontSize: 15,
        textAlign: 'justify',
        color: 'white',
        marginBottom: '15%'
    },

    firstText3: { 
        marginTop: '15%',
        marginLeft: '10%',
        fontFamily: 'monospace',
        fontSize: 15,
        color: 'white' 
    },

    secondText3: { 
        marginTop: '15%',
        marginLeft: '10%',
        marginRight: '10%',
        fontFamily: 'monospace',
        fontSize: 15,
        textAlign: 'justify',
        color: 'white',
    },

    thirdText3: { 
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        fontFamily: 'monospace',
        fontSize: 15,
        textAlign: 'justify',
        color: 'white',
        marginBottom: '5%'
    },




    button_wrapper:{
        marginLeft: '15%'
    },

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

export default WelcomeCard