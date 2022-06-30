import {View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import NewPostCard from '../../components/custom_cards/NewPostCard'

const NewPostPage = (props) => {

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <View style={styles.scroll_view_wrapper}>
                    <NewPostCard loggedInUser={props.loggedInUser}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    scroll_view_wrapper: {
        height: '100%',
    }
}) 

export default NewPostPage