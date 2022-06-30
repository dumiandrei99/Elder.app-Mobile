import { StyleSheet, View, Text, Image} from 'react-native'
import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as API_POST from '../../api/post_endpoints'
import { EvilIcons, AntDesign } from '@expo/vector-icons'; 
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';


const PostCard = (props) => {
    const [likedPost, setLikedPost] = useState(props.liked_post)
    const [numberOfLikes, setNumberOfLikes] = useState(props.numberOfLikes)
    const [numberOfComments, setNumberOfComments] = useState(props.numberOfComments)
    const navigation = useNavigation()

    const likePress = () => {
        const username_and_post_JSON = {
            username: props.loggedInUser.username,
            post_uuid: props.post_uuid
        }

        if (likedPost){
            setLikedPost(false)
            setNumberOfLikes(numberOfLikes - 1)
        } else {
            setLikedPost(true)
            setNumberOfLikes(numberOfLikes + 1)
        }
        
        API_POST.like(username_and_post_JSON, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            }
        })
    }

    const commentPress = () => {
        navigation.push("Comment", {
            loggedInUser: props.loggedInUser,
            post_uuid: props.post_uuid,
            numberOfComments: numberOfComments,
            setNumberOfComments: setNumberOfComments
        })
    }

    return (
        <LinearGradient
            colors={['#dccfff', '#dd5785']}
            style={props.post_image != null ? styles.gradient_image : styles.gradient_no_image}
        >
                <View style={{width: '100%', height:'100%'}}>
                    <View style={styles.profile_and_group_wrapper}>
                        <Image source={props.profile_picture == null ? 
                            require('./default_profile_picture.jpg')
                            :
                            {
                                uri: props.profile_picture
                            }}
                        style={styles.profile_picture}/>
                        <Text style={styles.loggedInUser}>{props.author == props.loggedInUser.username ? "You posted" : props.author}</Text>
                        <Text style={styles.said}>in</Text>
                        <Text style={styles.group}>{props.group}</Text>
                    </View>
                    {props.post_image != null &&
                        <View style={styles.image_wrapper}>
                            <Image style={styles.image} source={{
                                uri: props.post_image
                            }}/>
                        </View>
                    }
                    <Text style={props.post_image != null ? styles.post_content_image : styles.post_content_no_image}>"{props.post_content}"</Text>
                    <View style={props.post_image != null ? styles.like_and_comment_wrapper_image : styles.like_and_comment_wrapper_no_image}>
                        <Pressable style={{flexDirection:'row', marginLeft: '17%'}} onPress={likePress}> 
                            <AntDesign style={styles.like} name={likedPost ? "star" : "staro"} color="#9F2B68" size={32}/>
                            <Text style={styles.numbers}>{numberOfLikes}</Text>
                        </Pressable>

                        <Pressable style={{flexDirection:'row'}} onPress={commentPress}>
                            <EvilIcons style={styles.comment} name="comment" color="#9F2B68" size={40}/>
                            <Text style={styles.numbers}>{numberOfComments}</Text>
                        </Pressable>
           
                    </View>

                </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient_image: {
        width: '90%',
        height: 600,
        marginLeft: '5%',
        marginTop: '5%',
        marginBottom: '5%',
        borderRadius: 10
    },

    image_wrapper:{ 
        height:'65%',
        width: '100%'
    },

    gradient_no_image: {
        width: '90%',
        height: 300,
        marginLeft: '5%',
        marginTop: '5%',
        marginBottom: '5%',
        borderRadius: 10
    },

    profile_and_group_wrapper: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        marginTop: '2%',
    },

    profile_picture : {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: '5%',
    },

    loggedInUser: {
        marginLeft: '2%',
        marginTop: '3%',
        color: '#9F2B68'
    },

    said: {
        marginTop:'3%',
        marginLeft: '2%',
        color: 'white'
    },

    group: {
        marginTop:'3%',
        color: '#9F2B68',
        marginLeft: '2%'
    },

    post_content_no_image: {
        color: '#9F2B68',
        marginLeft: '10%',
        marginTop: '15%',
        textAlign: 'justify'
    },

    post_content_image: { 
        color: '#9F2B68',
        marginLeft: '10%',
        marginTop: '5%',
        textAlign: 'justify'
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },

    like_and_comment_wrapper_image: {
        width: '100%',
        height: '10%',
        flexDirection: "row",
        position: 'absolute',
        bottom: 0,
    },

    like_and_comment_wrapper_no_image: {
        width: '100%',
        height: '10%',
        flexDirection: "row",
        position: 'absolute',
        bottom: 0,
        marginBottom: '5%',
    },

    like:{ 
        marginLeft: '15%'
    },

    comment: { 
        marginLeft: '38%'
    },

    numbers: {
        color: '#9F2B68',
        marginTop: '1.5%',
        fontSize: 18,
        marginLeft: '2%'
    }
})

export default PostCard