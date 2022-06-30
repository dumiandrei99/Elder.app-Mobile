import {View, StyleSheet, ScrollView, Text, useWindowDimensions} from 'react-native'
import React, {useState, useEffect} from 'react'
import GroupCardV2 from '../../components/custom_cards/GroupCardV2'
import * as API from '../../api/group_endpoints';
import { JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';
import CustomButton from '../../components/CustomButton';
import PostCard from '../../components/custom_cards/PostCard'
import * as API_POST from '../../api/post_endpoints'
import { AntDesign } from '@expo/vector-icons'

const GroupsPage = (props) => {
    const [recommendedGroups, setRecommendedGroups] = useState(null)
    const [groupsAlreadyIn, setGroupsAlreadyIn] = useState(null)
    const [allGroups, setAllGroups] = useState(null)
    const [allGroupsShown, setAllGroupsShown] = useState(true)
    const [singleGroupName, setSingleGroupName] = useState('')
    const [singleGroupDescription, setSingleGroupDescription] = useState('')
    const [isUserInSpecificGroup, setIsUserInSpecificGroup] = useState(false)
    const [posts, setPosts] = useState(null)
    const {height} = useWindowDimensions();

    useEffect(async () => { 

        let username_JSON = {
            username: props.loggedInUser.username
        }

        API.recommendGroups(username_JSON, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                setRecommendedGroups(result)
            }
        })

        API.groupsAlreadyIn(username_JSON, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                setGroupsAlreadyIn(result)
            }
        })

        API.getAllGroups((result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                setAllGroups(result)
            }
        })

    }, [])

    
  let [fontsLoaded, error] = useFonts({
    JuliusSansOne_400Regular
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

    const onSingleGroupButtonPress = (group_name, group_description) => {
        // show only the single group page, not all the pages
        setAllGroupsShown(false)
        setSingleGroupName(group_name)
        setSingleGroupDescription(group_description)

        let group_post = {
            username: props.loggedInUser.username,
            group: group_name,
            posts: 'one_group'
        }

        API_POST.getPostsForUser(group_post, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                setPosts(result.reverse())
            }
        })

        for (let i = 0; i < groupsAlreadyIn.length; i++) {
            let group = groupsAlreadyIn[i]
            if (group.group_name == group_name) {
                setIsUserInSpecificGroup(true)
                break
            }
        }

    }

    const onJoinButtonPress = () => {

        let userAndGroup = {
            group_name: singleGroupName,
            username: props.loggedInUser.username
        }

        return API.addUserToGroup(userAndGroup, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
              console.log(status)
              console.log(error)
              console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                setIsUserInSpecificGroup(true)
            }
        })
    } 

    return(
        <View>
            {allGroupsShown ?
                <View style={styles.scroll_view_wrapper}>
                    <ScrollView nestedScrollEnabled={true}>
                        <Text style={styles.first_label}>Your recommended groups...</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                                {
                                    recommendedGroups == null ?
                                    <View>
                                        <AntDesign name="loading1" style={styles.loading}/>
                                    </View>
                                    :
                                    recommendedGroups.length == 0 ?
                                        <Text style={{color: '#dd5785', padding: height * 0.04}}>No recommended groups right now... Check later!</Text>
                                    :
                                        recommendedGroups.map((group,i) => { 
                                        return(
                                            <GroupCardV2 
                                                key={group.group_name} 
                                                groupName={group.group_name}
                                                numberOfAppearances={group.number_of_appearances} 
                                                groupDescription={group.group_description} 
                                                onPress={() => {onSingleGroupButtonPress(group.group_name, group.group_description)}}
                                                loggedInUser={props.loggedInUser}
                                            />
                                        )
                                })}
                        </ScrollView>

                        <Text style={styles.label}>Groups you already joined...</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                                {
                                    groupsAlreadyIn == null ?
                                    <View>
                                        <AntDesign name="loading1" style={styles.loading}/>
                                    </View>
                                    :
                                    groupsAlreadyIn.length == 0 ?
                                        <Text style={{color: '#dd5785', padding: height * 0.04}}>No groups joined... Check all our groups down below !</Text>
                                    :
                                    groupsAlreadyIn.map((group,i) => { 
                                        return(
                                            <GroupCardV2 
                                            key={group.group_name} 
                                                groupName={group.group_name}
                                                groupDescription={group.group_description}
                                                alreadyIn={true}
                                                onPress={() => {onSingleGroupButtonPress(group.group_name, group.group_description, true)}}
                                                loggedInUser={props.loggedInUser}
                                            />
                                        )
                                    })}
                            </ScrollView>

                            <Text style={styles.label}>All available groups...</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                                {   allGroups == null ?
                                    <View>
                                        <AntDesign name="loading1" style={styles.loading}/>
                                    </View>
                                    :
                                    allGroups.map((group,i) => { 
                                        return(
                                            <GroupCardV2 
                                                key={group.group_name} 
                                                groupName={group.group_name}
                                                groupDescription={group.group_description}
                                                alreadyIn={true}
                                                onPress={() => {onSingleGroupButtonPress(group.group_name, group.group_description)}} 
                                                loggedInUser={props.loggedInUser}
                                            />
                                        )
                                    })}
                            </ScrollView>
                        </ScrollView>
                    </View>
                    : 
                    
                    <View>
                        {
                            isUserInSpecificGroup ?
                            <View>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.singleGroupName}> {singleGroupName} </Text>
                                </View>
                                <ScrollView>
                                    {   posts == null ?
                                        <View>
                                            <AntDesign name="loading1" style={styles.loading_post} size={40}/>
                                        </View>
                                        :
                                        posts.length == 0 ? 
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
                                                profile_picture={post.profile_picture}
                                                liked_post={post.liked}
                                            />
                                            )
                                        })  
                                    }
                            </ScrollView>
                            </View>
                            :
                            <View>
                                <View style={styles.titleWrapper}> 
                                    <Text style={styles.singleGroupName}> {singleGroupName} </Text>
                                </View>

                                <View style={styles.descriptionWrapper}> 
                                    <Text style={styles.singleGroupDescription}> {singleGroupDescription} </Text>
                                </View>
                                
                                <View style={styles.buttonView}>
                                    <CustomButton                             
                                    text="Join this group"
                                    action={() => onJoinButtonPress(singleGroupName)} 
                                    type="GROUP_PRIMARY"
                                    /> 
                                </View>
                            </View>
                        }
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    scroll_view_wrapper: {
        height: '90%',
    },

    first_label: {
        marginTop: '10%',
        marginBottom: '2%',
        marginLeft: '1%',
        color: "#dd5785"
    },

    label: {
        marginLeft: '1%',
        marginBottom:'2%',
        color: '#dd5785'
    },

    titleWrapper: {
        width: '100%',
        alignItems: 'center'
    },

    descriptionWrapper: {
        width: '90%',
        marginLeft: '5%',
        alignItems: 'center'
    },

    singleGroupName: {
        marginTop: '10%',
        fontFamily: 'JuliusSansOne_400Regular',
        fontSize: 25,
        color: '#dd5785',
        justifyContent: 'center'
    },

    singleGroupDescription: {
        marginTop: '30%',
        textAlign: 'justify',
        color: '#dd5785'
    },
    
    buttonView: {
        marginTop: '40%',
        marginLeft: '25%'
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
    },

    loading_post: {
        color: '#dd5785',
        marginLeft: '50%',
        marginTop: '50%'
    }
  }) 

export default GroupsPage