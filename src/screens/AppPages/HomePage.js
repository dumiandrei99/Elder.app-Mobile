import {View, StyleSheet, ScrollView, Text} from 'react-native'
import React, {useState, useEffect} from 'react'
import PostCard from '../../components/custom_cards/PostCard'
import * as API_POST from '../../api/post_endpoints'
import { AntDesign } from '@expo/vector-icons'

const HomePage = (props) => {

    const [posts, setPosts] = useState(null)

    useEffect(async () => { 

        let username_JSON = {
            username: props.loggedInUser.username,
            posts: 'all_groups'
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

    return(
        <View>
            <View style={styles.scroll_view_wrapper}>
                <ScrollView>
                    {   posts == null ?
                        <View>
                            <AntDesign name="loading1" style={styles.loading} size={40}/>
                        </View>
                        : posts.length == 0 ? 
                        <View style={styles.no_posts_wrapper}>
                            <Text style={styles.no_posts}>No posts available...</Text>
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
                                profile_picture={post.profile_picture}
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

    no_posts_wrapper:{
        marginTop:'50%',
        marginLeft:'34%',
    },

    no_posts: {
        color: '#dd5785'
    },

    loading: {
        color: '#dd5785',
        marginTop: '65%',
        marginLeft: '45%'
    }
  }) 

export default HomePage