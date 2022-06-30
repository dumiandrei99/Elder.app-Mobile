import {View, StyleSheet, ScrollView, Text} from 'react-native'
import React, {useState, useEffect} from 'react'
import PostCard from '../../components/custom_cards/PostCard'
import * as API from '../../api/authentication_endpoints'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'


const SettingsPage = (props) => {
    const navigation = useNavigation()

    const onEditPrefferences = () => {
        navigation.push("Prefferences", {
            editPrefferences: true
        })
    }

    const onChangePassword = () => { 
        navigation.push("Change Password", {
            loggedInUser: props.loggedInUser,
            isChangePassword: true,
            verificationCode: null
        })
    }
    
    const onLogOut = async () => {
        API.logOut(() => {})
        await AsyncStorage.removeItem("user")
        navigation.push("Log-in")
    }

    return(
        <View>
            <View style={styles.scroll_view_wrapper}> 
                <CustomButton 
                        text="Edit Prefferences" 
                        action={onEditPrefferences} 
                        type="SETTINGS_1"
                /> 

                <CustomButton 
                        text="Change Password" 
                        action={onChangePassword} 
                        type="SETTINGS"
                /> 

                <CustomButton 
                        text="Log-Out" 
                        action={onLogOut} 
                        type="SETTINGS_LOGOUT"
                /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll_view_wrapper: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
  }) 

export default SettingsPage