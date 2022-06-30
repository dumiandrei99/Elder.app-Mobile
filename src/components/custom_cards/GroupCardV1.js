import { StyleSheet, View, Text } from 'react-native'
import React, {useState} from 'react'
import * as API from '../../api/group_endpoints';
import CustomButton from '../CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

const GroupCardV1 = (props) => {    
    
    const [buttonPressed, setButtonPressed] = useState(false)
    let [fontsLoaded, error] = useFonts({
        JuliusSansOne_400Regular
    });

    if(!fontsLoaded) {
        return <AppLoading />
    }

    const onPress = () => {
        let userAndGroup = {
            group_name: props.groupName,
            username: props.loggedInUser.username
        }
                
        return API.addUserToGroup(userAndGroup, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
              console.log(status)
              console.log(error)
              console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                setButtonPressed(true)
            }
        })
    }

    return (
        <LinearGradient
            colors={['#dccfff', '#dd5785']}
            style={styles.gradient}
        >
            {props.loggedInUser.username == undefined ? 
                <View style={styles.wrapper}>
                    <Text style={styles.loading}>Loading...</Text> 
                </View>
                :
                <View style={styles.wrapper}>
                    <Text style={styles.groupName}>{props.groupName}</Text>
                    <Text style={styles.numberOfAppearances}>
                        {props.numberOfAppearances + " similiar "+ (props.numberOfAppearances > 1 ? "users " : "user ") +  "joined this group"}
                    </Text>
                    <Text style={styles.groupDescription}>{props.groupDescription}</Text>
                    {buttonPressed === false ?
                        <CustomButton
                            text="Join this group"
                            action={onPress} 
                            type="GROUP_PRIMARY"
                        /> :
                        <Text style={styles.joinedGroup}>JOINED!</Text>
                    }
                </View> 
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    gradient: {
        height: 300,
        marginTop: '10%',
        marginLeft: '10%',
        width: '80%',
        borderRadius: 15,
    },

    groupName: {
        fontFamily: 'JuliusSansOne_400Regular',
        marginTop: '5%',
        color: '#dd5785',
        fontSize: 20
    },

    numberOfAppearances: {
        marginTop: '5%',
        color: '#eedffd',
    },

    groupDescription: {
        textAlign: 'justify',
        marginTop: '7.5%',
        color: 'white',
        width: '80%'
    },

    joinedGroup: {
        textAlign :'justify',
        position: 'absolute',
        bottom: 0,
        marginBottom: '5%',
        color: '#eedffd'
    },

    wrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    button: {
        height: '50%',
        width: '50%'
    },

    loading: {
        color: 'white',
        textAlign: 'center',
    }

})

export default GroupCardV1