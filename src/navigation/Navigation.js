import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginView from '../screens/LoginView';
import RegisterView from '../screens/RegisterView';
import HomeView from '../screens/HomeView';
import ForgotPasswordView from '../screens/ForgotPasswordView';
import ResetPasswordView from '../screens/ResetPasswordView';
import PrefferencesView from '../screens/PrefferencesView'
import WelcomeView from '../screens/WelcomeView';
import RecommendedGroupsView from '../screens/RecommendedGroupsView';
import CommentPage from '../screens/AppPages/CommentPage';
import ChangePasswordView from '../screens/ChangePasswordView'

const Navigation = () => {
    const Stack = createStackNavigator();
    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Log-in" component={LoginView} screenOptions={{gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="Register" component={RegisterView}></Stack.Screen>
                <Stack.Screen name="Home" component={HomeView} options={{gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="Forgotten Password" component={ForgotPasswordView}></Stack.Screen>
                <Stack.Screen name="Reset Password" component={ResetPasswordView}></Stack.Screen>
                <Stack.Screen name="Welcome Page" component={WelcomeView} options={{gestureEnabled: false}}></Stack.Screen>
                <Stack.Screen name="Prefferences" component={PrefferencesView}></Stack.Screen>
                <Stack.Screen name="Recommended Groups" component={RecommendedGroupsView}></Stack.Screen>
                <Stack.Screen name="Comment" component={CommentPage}></Stack.Screen>
                <Stack.Screen name="Change Password" component={ChangePasswordView}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
 
export default Navigation