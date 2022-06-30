import { View, Image, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import {isLoading, useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import Logo from '../../assets/images/logo2.png';
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import CustomPressableText from '../components/custom_inputs/CustomPressableText';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import GroupCardV1 from '../components/custom_cards/GroupCardV1';
import AsyncStorage from '@react-native-async-storage/async-storage'


const RecommendedGroupsView = ({route, navigation}) => {
    const [loggedInUser, setLoggedInUser] = useState('')
    
    useEffect(() => { 
        AsyncStorage.getItem('user').then(user => {
            setLoggedInUser(JSON.parse(user))
        })
    }, [])

    // // Prevent going back 
    // useEffect(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //     e.preventDefault();
    //     })
    // }, []);

    const {height} = useWindowDimensions();
    const nav = useNavigation();
    const groups = route.params.groups;

    let [fontsLoaded, error] = useFonts({
        JuliusSansOne_400Regular
    });

    if(!fontsLoaded) {
        return <AppLoading />
    }

    const onPress = () => {
        nav.navigate("Home")
    }

    const onJoinGroup= () => {
        console.log("A")
    }
    
    return (
            <View>
                <View styles={styles.logo_root}>
                    <Image 
                        source={Logo} 
                        style={[styles.logo, {height: height * 0.1}]} 
                        resizeMode="contain"
                    />
                    <Text style={styles.label}>Your recommended groups</Text> 
                    {
                        Object.keys(groups).length === 0 
                        &&
                        <Text style={styles.no_recommended}>Unfortunately, it seems like we can't currently find any users with similar interests with you, so therefore
                        can't recommend you any groups. But don't worry ! As more users join our platform, you will get recommended groups other have joined. You can access 
                        the Groups page from the Home page and choose whatever group you might want to join. Always check the Groups page, because everytime a new user joins,
                        your recommended groups update !
                        {'\n'} {'\n'}PS: This helps other users with same interests as you join the same groups you are in, so you will be friends ! After all, isn't that the whole point ?
                        </Text>
                    }

                    {
                        Object.keys(groups).length === 0
                        &&
                        <CustomPressableText onPress={onPress} message={"Let's go to the Home Page ->"} />
                    }
                    
                    {
                        Object.keys(groups).length > 0
                        &&
                        <View style={{height: '75%'}}>
                            <ScrollView>
                                {groups.map((group,i) => { 
                                    return(
                                        <GroupCardV1 
                                            key={group.group_name} 
                                            groupName={group.group_name}
                                            numberOfAppearances={group.number_of_appearances} 
                                            groupDescription={group.group_description} 
                                            buttonPressed={onJoinGroup}
                                            loggedInUser={loggedInUser}
                                        />
                                        )
                                })}
                                <CustomPressableText onPress={onPress} message={"Let's go to the Home Page ->"} />
                            </ScrollView>
                        </View>
                    }
                </View>
            </View>
    )
}

const styles = StyleSheet.create({

    label: {
      marginTop: '10%',
      width: '100%',
      marginLeft: '11.5%',
      color: '#dd5790',
      fontFamily: 'JuliusSansOne_400Regular',
      fontSize: 20,
      textAlign: 'left'
    },

    no_recommended: {
        marginTop: '20%',
        width: '80%',
        marginLeft: '10%',
        fontFamily: 'monospace',
        fontSize: 15,
        color: '#dd5790',
        textAlign: 'justify'
    },

    scroll_view_style: {
        paddingBottom: 1000,
    },

    logo_root: {
        alignItems: 'center',
    },
  
    logo: {
        marginTop: '15%',
        marginLeft: '7.5%',
        width: '80%',
        maxWidth: 500,
        maxHeight: 200
    },

    prefferences_wrapper: {
        width: '100%',
    },

    prefference_row: { 
        height: '40%',
        marginTop: '2%',
        flexDirection: 'row'
    },

    button_view: { 
        height: '15%',
        marginTop: '5%',
        marginLeft: '15%'
    },
    
  })

export default RecommendedGroupsView