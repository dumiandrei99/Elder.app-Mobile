import { StyleSheet, View, Text, TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import SelectList from 'react-native-dropdown-select-list';
import * as API from '../../api/group_endpoints';
import * as API_POST from '../../api/post_endpoints'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons'; 
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import RegisterErrorMessage from '../error_messages/RegisterErrorMessage';

const NewPostCard = (props) => {
    const [selected, setSelected] = useState('')
    const [description, setDescription] = useState('')
    const [groupsAlreadyIn, setGroupsAlreadyIn] = useState([])
    const [media, setMedia] = useState(null)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')   
    const [success, setSuccess] = useState(false)

    useEffect(async () => { 
        let username_JSON = {
            username: props.loggedInUser.username
        }

        API.groupsAlreadyIn(username_JSON, (result, status, error) => {
            if (result === null || (status !== 200 && status !== 201)) {
                console.log(status)
                console.log(error)
                console.warn("NOT ABLE TO CONNECT TO SERVER!")
            } else {
                let groups = []
                result.forEach(group => {
                    groups.push(group.group_name.toUpperCase())
                });
                setGroupsAlreadyIn(groups)
            }
        })

    }, [])

    const onAddPhoto = async () => {
        const photo = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })
        
        if (!photo.cancelled) {
            setMedia(photo)
        }
    }

    const onClose = () => {
        setMedia(null)
    }

    const hideMessage = () => {
        setShowMessage(false)
        setMessage('')
    }

    const onAddPost = () => {
        const uploadData = new FormData()
        uploadData.append('post_user', props.loggedInUser.username)

        if (media) { 
            let mediaName = media.uri.split('/')
            mediaName = mediaName[mediaName.length - 1]
            uploadData.append('post_image', {
                uri: media.uri,
                type:'image/jpeg',
                name: mediaName
            })
        } else {
            uploadData.append('post_image', media)
        }
        uploadData.append('post_description', description)
        uploadData.append('post_group', selected)
        uploadData.append('post_likes', 0)
        
        API_POST.addPost(uploadData, (result) => {
            if (result.data.status) {
                setShowMessage(true) 
                setMessage(result.data.message)
                setSuccess(false)
            } else {
                setShowMessage(true)
                setMessage(result.data)
                setSuccess(true)
            }
        })

    } 

    return (
        <LinearGradient
            colors={['#dccfff', '#dd5785']}
            style={styles.gradient}
        >
            <View>
                <View style={{width:'100%', alignItems:'center'}}> 
                    <Text style={styles.new_post_label}>New Post</Text>
                </View>
                
                <TextInput 
                    style={styles.input}
                    onChangeText={setDescription}
                    placeholder="Here you can write your own ideas..."
                    placeholderTextColor='#9F2B68'
                    multiline={true}
                    numberOfLines={10}
                />
                
                <View style={styles.media_wrapper}>
                    <CustomButton 
                        text="ADD MEDIA" 
                        action={onAddPhoto} 
                        type="ADD_PHOTO"
                    /> 
                    {media == null ?
                        <Text style={styles.no_image}>NO IMAGE UPLOADED</Text>
                            :
                        <View style={styles.image_uploaded_wrapper}>
                            <Text style={styles.image_uploaded_message}>IMAGE UPLOADED</Text>
                            
                            <Pressable style={styles.image_uploaded_close} onPress={onClose}> 
                                <AntDesign name='close' size={24} color='#9F2B68' />
                            </Pressable>
                        </View>
                    }
                </View> 

                <View style={styles.dropdownWrapper}>
                    {groupsAlreadyIn.length == 0 ? 
                        <Text style={styles.loading}>You must join a group before posting!</Text>
                        :
                        <SelectList 
                            style={{backgroundColor:'black'}}
                            setSelected={setSelected} 
                            data={groupsAlreadyIn} 
                            placeholder="Select the group you want to post in"
                            boxStyles={{color: '#9F2B68', borderColor:'#9F2B68'}}
                            inputStyles={{color: '#9F2B68'}}
                            dropdownTextStyles={{color:'#9F2B68', borderColor: '#9F2B68'}}
                            dropdownStyles={{borderColor: '#9F2B68'}}
                            maxHeight={100}
                        />
                    }
                </View>

                <View style={styles.message_wrapper}>
                    {showMessage && <RegisterErrorMessage isSuccess={success} text={message} post={true} handlePress={hideMessage}></RegisterErrorMessage>}
                </View>

            </View>

            <View style={styles.add_post_wrapper}>
                    <CustomButton 
                        text="ADD POST" 
                        action={onAddPost} 
                        type="ADD_POST"
                    /> 
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        width: '90%',
        height: '75%',
        marginLeft: '5%',
        marginTop: '5%',
        borderRadius: 15
    },
    
    input: {
        width: '90%',
        marginTop: '5%',
        marginLeft: '5%',
        borderWidth: 1,
        height: 200,
        textAlignVertical: 'top',
        borderRadius: 15,
        borderColor: '#9F2B68',
        padding: 5,
        color: '#9F2B68'
    },

    loading: {
        marginLeft: '2%',
        color: '#9F2B68'
    },

    dropdownWrapper: {
        width: '90%',
        marginTop:'5%',
        marginLeft: '5%'
    },

    media_wrapper: {
        width: '100%',
        flexDirection: 'row'
    },

    no_image: {
        color: '#9F2B68',
        marginLeft: '7.5%',
        marginTop: '10%'  
    }, 

    image_uploaded_wrapper: {
        width: '100%',
        flexDirection:'row'
    },

    image_uploaded_message: {
        color: '#9F2B68',
        marginLeft: '5%',
        marginTop: '10%'
    },

    image_uploaded_close: {
        marginLeft: '3.5%', 
        marginTop:'9%'
    },

    add_post_wrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginBottom:'5%'
    },

    new_post_label:{
        color: '#9F2B68',
        marginTop:'5%',
    },

    message_wrapper: { 
        width: '100%',
        height: '70%',
        marginTop: '5%'
    }
})

export default NewPostCard