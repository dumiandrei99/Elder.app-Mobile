import { View,StyleSheet, Image, useWindowDimensions, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons'; 
import HomePage from './AppPages/HomePage';
import GroupsPage from './AppPages/GroupsPage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Logo from '../../assets/images/logo2.png';
import AsyncStorage from '@react-native-async-storage/async-storage'
import NewPostPage from './AppPages/NewPostPage';
import ProfilePage from './AppPages/ProfilePage'
import SettingsPage from './AppPages/SettingsPage';

const HomeView = ({navigation}) => {

  const [loggedInUser, setLoggedInUser] = useState('')
  const [home, setHome] = useState(true)
  const [groups, setGroups] = useState(false)
  const [profile, setProfile] = useState(false)
  const [settings, setSettings] = useState(false)
  const [newPost, setNewPost] = useState(false)

  const {height} = useWindowDimensions();

  // Prevent going back and load the logged in user
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })

    AsyncStorage.getItem('user').then(user => {
      setLoggedInUser(JSON.parse(user))
    })
  
  }, []);

  const onHomePress = () => {
    setHome(true)
    setGroups(false)
    setProfile(false)
    setSettings(false)
    setNewPost(false)
  }

  const onGroupsPress = () => {
    setHome(false)
    setGroups(true)
    setProfile(false)
    setSettings(false)
    setNewPost(false)
  }

  const onProfilePress = () => {
    setHome(false)
    setGroups(false)
    setProfile(true)
    setSettings(false)
    setNewPost(false)

  }

  const onSettingsPress = () => {
    setHome(false)
    setGroups(false)
    setProfile(false)
    setSettings(true)
    setNewPost(false)

  }

  const onNewPostPress = () => {
    setHome(false)
    setGroups(false)
    setProfile(false)
    setSettings(false)
    setNewPost(true)
  }

    return (
    <View>
        {
          loggedInUser == '' ? 
            <View style={styles.root}>
              <Text style={styles.loading}>Loading...</Text>
            </View>
          :
            <View style={styles.root}>
              <View style={styles.horizontalWrapper}>
                <Image 
                  source={Logo} 
                  style={[styles.logo, {height: height * 0.1}]} 
                  resizeMode="contain"
                />
                <Pressable onPress={onNewPostPress} style={styles.add_wrapper}>
                  <MaterialIcons name="add" size={40} style={styles.add}/>
                </Pressable>
              </View>

              {home && <HomePage loggedInUser={loggedInUser}/>}
              {groups && <GroupsPage loggedInUser={loggedInUser}/>}
              {newPost && <NewPostPage loggedInUser={loggedInUser}/>}
              {profile && <ProfilePage loggedInUser={loggedInUser}/>}
              {settings && <SettingsPage loggedInUser={loggedInUser}/>}

              <View style={styles.bottom_navbar}>
                <Pressable onPress={onHomePress} style={styles.navbar_view}>
                  <AntDesign name="home" size={35} style={home ? styles.navbar_item_selected : styles.navbar_item}/>
                </Pressable>
                  
                <Pressable onPress={onGroupsPress} style={styles.navbar_view}>
                  <MaterialIcons name="groups" size={35} style={groups ? styles.navbar_item_selected : styles.navbar_item}/>
                </Pressable>

                <Pressable onPress={onProfilePress} style={styles.navbar_view}>
                  <AntDesign name="profile" size={35} style={profile ? styles.navbar_item_selected : styles.navbar_item}/>
                </Pressable>

                <Pressable onPress={onSettingsPress} style={styles.navbar_view}>
                  <Feather name="settings" size={35} style={settings ? styles.navbar_item_selected : styles.navbar_item}/>
                </Pressable>
              </View> 
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%'
  },

  bottom_navbar: {
    position: 'absolute',
    width: '100%',
    height: '7.5%',
    bottom: 0,
    flexDirection: 'row'
  },

  navbar_view: {
    width: '25%',
    paddingTop: 5,
    alignItems: 'center',
    backgroundColor:'#dd5790',
    marginTop: '2%',
  },

  navbar_item: {
    color: 'white'
  },

  navbar_item_selected: {
    color: '#9F2B68'
  },

  logo: {
    width: '40%',
    maxWidth: 500,
    maxHeight: 200,
    marginTop: '10%'
  },

  horizontalWrapper: {
    flexDirection: 'row'
  },

  add: {
    marginLeft: '60%',
    color: '#dd5790'
  },

  add_wrapper: {
    marginTop: '17.5%',
  },

  loading: {
    textAlign: 'center',
    color: '#dd5785'
  }

}) 

export default HomeView