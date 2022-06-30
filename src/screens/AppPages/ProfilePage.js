import {View, StyleSheet, ScrollView, Text, Image, Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'
import * as API_POST from '../../api/post_endpoints'
import * as API_USERS from '../../api/user_endpoints'
import PostCard from '../../components/custom_cards/PostCard'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { PressabilityDebugView } from 'react-native/Libraries/Pressability/PressabilityDebug'

const ProfilePage = (props) => {
    const [posts, setPosts] = useState(null)
    const [media, setMedia] = useState(null)
    const [profilePicture, setProfilePicture] = useState(props.loggedInUser.profile_picture)

    useEffect(async () => { 

        let username_JSON = {
            username: props.loggedInUser.username,
            posts: 'profile'
        }

        API_POST.getPostsForUser(username_JSON, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                setPosts(result.reverse())
            }
        })
    }, [])

    useEffect(async() => {
        if (media != null) {
            const uploadData = new FormData()
            uploadData.append('username', props.loggedInUser.username)
    
            let mediaName = media.uri.split('/')
            mediaName = mediaName[mediaName.length - 1]
            uploadData.append('profile_picture', {
                uri: media.uri,
                type:'image/jpeg',
                name: mediaName
            })
    
            API_USERS.addProfilePicture(uploadData, (result) => {
                console.log(result)
            })
            setProfilePicture(media.uri)
            props.loggedInUser.profile_picture = media.uri
        }
    }, [media])

    const onChangeProfilePicture = async () => {
        const photo = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })
        
        if (!photo.cancelled) {
            setMedia(photo)
        }
    }

    return(
        <View>
            <View style={styles.scroll_view_wrapper}>
                <View style={styles.profile_picture_wrapper}>
                    <View style={{alignItems:'center'}}>
                        <Image source={props.loggedInUser.profile_picture == null ? 
                        require('./default_profile_picture.jpg')
                        :
                        {
                            uri: profilePicture
                        }}
                        style={styles.profile_picture} 
                        />
                        <Text style={styles.welcome_text}>{props.loggedInUser.username}</Text>
                    </View>
                    <Pressable style={{marginTop: '8%'}} onPress={onChangeProfilePicture}>
                        <Text style={styles.change_your_profile_picture}>Change profile picture</Text>
                    </Pressable>
                </View> 

                <ScrollView>
                    {   posts == null ?
                        <View>
                            <AntDesign name="loading1" style={styles.loading} size={40}/>
                        </View>
                        :
                        posts.length == 0 ? 
                        <View style={styles.no_posts_wrapper}>
                            <Text style={styles.no_posts}>You haven't posted yet...</Text>
                        </View>
                        :
                        posts.map((post, i) => {
                        return(
                            <PostCard
                                key={i}
                                numberOfLikes={post.number_of_likes}
                                numberOfComments={post.number_of_comments}
                                loggedInUser={props.loggedInUser}
                                group={post.group_name}
                                post_content={post.post_content}
                                post_image={post.post_image}
                                author={post.author}
                                post_uuid={post.post_uuid}
                                liked_post={post.liked}
                                profile_picture={profilePicture}
                            />
                            )
                        })  
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll_view_wrapper: {
        height: '90%',
    },

    profile_picture_wrapper: {
        height: '20%',
        width: '100%',
        flexDirection: 'row'
    },

    no_posts_wrapper:{
        marginTop:'50%',
        marginLeft:'32%',
    },

    no_posts: {
        color: '#dd5785'
    },

    profile_picture : {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginTop: '5%',
        marginLeft: '15%'
    },

    welcome_text: {
        color: '#dd5785',
        marginTop: '8%',
        marginLeft: '15%'
    },

    change_your_profile_picture: {
        marginTop: '4%',
        marginLeft: '30%',
        color: '#dd5785',
        textDecorationLine: 'underline'
    },

    loading: {
        color: '#dd5785',
        marginTop: '45%',
        marginLeft: '45%'
    }
  }) 

export default ProfilePage