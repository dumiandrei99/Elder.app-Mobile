import { StyleSheet, View, Text } from 'react-native'
import React, {useState} from 'react'
import * as API from '../../api/group_endpoints';
import CustomButton from '../CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

const GroupCardV2 = (props) => {    

    let [fontsLoaded, error] = useFonts({
        JuliusSansOne_400Regular
    });

    if(!fontsLoaded) {
        return <AppLoading />
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
                    <Text style={props.alreadyIn ? styles.groupName_alreadyIn : styles.groupName}>{props.groupName}</Text>
                    {props.numberOfAppearances > 0 && 
                        <Text style={styles.numberOfAppearances}>
                            {props.numberOfAppearances + " similiar "+ (props.numberOfAppearances > 1 ? "users " : "user ") +  "joined this group"}
                        </Text>
                    }
                    <CustomButton
                        text="Go to group page"
                        action={props.onPress} 
                        type="GROUP_PRIMARY_IN_PAGE"
                    />     
                </View> 
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    gradient: {
        height: 200,
        marginBottom: '10%',
        marginLeft: 20,
        width: 200,
        borderRadius: 15,
    },

    groupName: {
        fontFamily: 'JuliusSansOne_400Regular',
        marginTop: '25%',
        color: '#dd5785',
        fontSize: 25
    },

    groupName_alreadyIn: {
        fontFamily: 'JuliusSansOne_400Regular',
        marginTop: '35%',
        color: '#dd5785',
        fontSize: 25
    },

    numberOfAppearances: {
        fontSize: 12,
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

export default GroupCardV2