import {View, StyleSheet, ScrollView, Pressable, TextInput, Text} from 'react-native'
import React, {useState, useEffect} from 'react'
import CommentCard from '../../components/custom_cards/CommentCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as API_POST from '../../api/post_endpoints'
import { LogBox } from 'react-native';

const CommentPage = ({route}) => {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const { loggedInUser, post_uuid, numberOfComments, setNumberOfComments} = route.params
    const [comment, setComment] = useState('')
    const [existingComments, setExistingComments] = useState([])

    const onComment = () => {
        let comment_JSON = { 
            username: loggedInUser.username,
            post_uuid: post_uuid,
            comment: comment
        }
        
        API_POST.comment(comment_JSON, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                if (!result.status) {
                    setExistingComments([...existingComments, result])
                    setComment('')
                }
            }
        })
    }

    useEffect(() => {
        let post_JSON = {
            post_uuid: post_uuid
        }

        API_POST.getComments(post_JSON, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                setNumberOfComments(numberOfComments + 1)
                setExistingComments(result)
            }
        })
    }, [])

    return(
        <View>
            <View style={styles.scroll_view_wrapper}>
                <ScrollView>
                    {existingComments.length == 0 ?
                        <Text style={styles.no_existing_comments}>No existing comments for this post</Text>
                        : 
                        existingComments.map((comment, i) => {
                            return (
                                <CommentCard 
                                    key={i}
                                    loggedInUser={loggedInUser.username}
                                    author={comment.author}
                                    comment={comment.comment}
                                />   
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={styles.add_comment}>

            <TextInput
                placeholder={"Write a comment..."}
                placeholderTextColor='white'
                value={comment}
                onChangeText={setComment}
                style={styles.input}
            /> 
            <Pressable onPress={onComment}>
                <Text style={styles.comment_button}>Comment</Text>
            </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll_view_wrapper: {
        height: '90%',
    },

    add_comment: {
        height: '10%',
        backgroundColor: '#9F2B68',
        flexDirection: 'row'
    },

    comment_button: {
        color: 'white',
        marginTop: '30%',
        marginLeft: '12%'
    },

    input: {
        width: '70%',
        marginLeft: '5%',
        marginTop: '5%',
        borderWidth: 1,
        height: '60%',
        textAlignVertical: 'top',
        borderRadius: 15,
        borderColor: 'white',
        padding: 15,
        color: 'white'
    },

    no_existing_comments: {
        color: '#9F2B68',
        marginTop: '80%',
        marginLeft: '23%'
    }
  }) 

export default CommentPage