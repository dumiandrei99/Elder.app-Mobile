import { View, Image, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useFonts} from 'expo-font';
import PrefferenceCard from '../components/custom_cards/PrefferenceCard';
import AppLoading from 'expo-app-loading';
import Logo from '../../assets/images/logo2.png';
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as API from '../api/group_endpoints';

const PrefferencesView = () => {

    const {height} = useWindowDimensions();

    const [prefferences, setPrefferences] = useState({
        walking: false,
        sports: false,
        hiking: false,
        biking: false,
        reading: false,
        swimming: false,
        hunting: false,
        writing: false,
        music: false,
        painting:false
    })
    const [pressedWalking, setPressedWalking] = useState(false)
    const [pressedSports, setPressedSports] = useState(false)
    const [pressedHiking, setPressedHiking] = useState(false)
    const [pressedBiking, setPressedBiking] = useState(false)
    const [pressedReading, setPressedReading] = useState(false)
    const [pressedSwimming, setPressedSwimming] = useState(false)
    const [pressedHunting, setPressedHunting] = useState(false)
    const [pressedWriting, setPressedWriting] = useState(false)
    const [pressedMusic, setPressedMusic] = useState(false)
    const [pressedPainting, setPressedPainting] = useState(false)

    useEffect(() => { 
        
        if(pressedWalking) {
            prefferences['walking'] = true
        } else {
            prefferences['walking'] = false
        }  

        if(pressedSports) {
            prefferences['sports'] = true
        } else {
            prefferences['sports'] = false
        }  

        if(pressedHiking) {
            prefferences['hiking'] = true
        } else {
            prefferences['hiking'] = false
        }  

        if(pressedBiking) {
            prefferences['biking'] = true
        } else {
            prefferences['biking'] = false
        }  

        if(pressedReading) {
            prefferences['reading'] = true
        } else {
           prefferences['reading'] = false
        }  

        if(pressedSwimming) {
            prefferences['swimming'] = true
        } else {
            prefferences['swimming'] = false
        }  

        if(pressedHunting) {
            prefferences['hunting'] = true
        } else {
            prefferences['hunting'] = false
        }  

        if(pressedWriting=== true) {
            prefferences['writing'] = true
        } else {
            prefferences['writing'] = false
        }  

        if(pressedMusic=== true) {
           prefferences['music'] = true
        } else {
            prefferences['music'] = false
        }  

        if(pressedPainting=== true) {
            prefferences['painting'] = true
        } else {
            prefferences['painting'] = false
        }  

        setPrefferences(prefferences)
    }, [pressedWalking, pressedBiking, pressedHiking, pressedHunting, pressedMusic, pressedPainting, 
        pressedReading, pressedSports, pressedSwimming, pressedWalking, pressedWriting])

    const onWalkingPressed = () => { 
        setPressedWalking(!pressedWalking)
    }

    const onSportsPressed = () => { 
        setPressedSports(!pressedSports)
    }

    const onHikingPressed = () => { 
        setPressedHiking(!pressedHiking)
    }

    const onBikingPressed = () => { 
        setPressedBiking(!pressedBiking)
    }

    const onReadingPressed = () => { 
        setPressedReading(!pressedReading)
    }

    const onSwimmingPressed = () => { 
        setPressedSwimming(!pressedSwimming)
    }

    const onHuntingPressed = () => { 
        setPressedHunting(!pressedHunting)
    }

    const onWritingPressed = () => { 
        setPressedWriting(!pressedWriting)
    }

    const onMusicPressed = () => { 
        setPressedMusic(!pressedMusic)
    }

    const onPaintingPressed = () => { 
        setPressedPainting(!pressedPainting)
    }

    const onContinue = async () => { 
        const user = await AsyncStorage.getItem('user')
        const user_JSON = JSON.parse(user)

        let prefferences_JSON = {
            username: user_JSON.username,
            prefferences: prefferences
        }  

        return API.recommendGroups(prefferences_JSON, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
              console.log(status)
              console.log(error)
              console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                console.log(result)
            }
        })
    }


    let [fontsLoaded, error] = useFonts({
        JuliusSansOne_400Regular
    });

    if(!fontsLoaded) {
        return <AppLoading />
    }

    
    return (
        <View style={{height: '100%'}}>
            <View styles={styles.logo_root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.1}]} 
                    resizeMode="contain"
                />
                <Text style={styles.label}>Let's choose your prefferences !</Text> 
            </View>
        
            <ScrollView>
                <View style={{paddingBottom: '270%'}}>
                    <View style={styles.prefference_row}>
                        <PrefferenceCard text="Walking" pressed={pressedWalking} action={onWalkingPressed}/>
                        <PrefferenceCard text="Sports" pressed={pressedSports} action={onSportsPressed}/>
                    </View>
                    <View style={styles.prefference_row}>
                        <PrefferenceCard text="Hiking" pressed={pressedHiking} action={onHikingPressed}/>
                        <PrefferenceCard text="Biking" pressed={pressedBiking} action={onBikingPressed}/>
                    </View>
                    <View style={styles.prefference_row}>
                        <PrefferenceCard text="Reading" pressed={pressedReading} action={onReadingPressed}/>
                        <PrefferenceCard text="Swimming" pressed={pressedSwimming} action={onSwimmingPressed}/>
                    </View>
                    <View style={styles.prefference_row}>
                        <PrefferenceCard text="Hunting" pressed={pressedHunting} action={onHuntingPressed}/>
                        <PrefferenceCard text="Writing" pressed={pressedWriting} action={onWritingPressed}/>
                    </View>
                    <View style={styles.prefference_row}>
                        <PrefferenceCard text="Music" pressed={pressedMusic} action={onMusicPressed}/>
                        <PrefferenceCard text="Painting" pressed={pressedPainting} action={onPaintingPressed}/>
                    </View>

                    <View style={styles.button_view}> 
                        <CustomButton
                            text="CONTINUE" 
                            action={onContinue} 
                            type="PRIMARY_REGISTER"
                        /> 
                    </View>
                </View>
            </ScrollView>  
        </View>
    )
}

const styles = StyleSheet.create({

    label: {
      marginTop: '10%',
      width: '100%',
      marginLeft: '6%',
      color: '#dd5790',
      fontFamily: 'JuliusSansOne_400Regular',
      fontSize: 20,
      textAlign: 'left'
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
    }
  })

export default PrefferencesView