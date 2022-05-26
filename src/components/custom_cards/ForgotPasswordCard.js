import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text } from 'react-native'
import CustomInput from '../custom_inputs/CustomInput';
import CustomButton from '../CustomButton';
import { AntDesign } from '@expo/vector-icons'; 

const ForgotPasswordCard = (props) => {
    return (
        <LinearGradient
        colors={['#dccfff', '#dd5785']}
        style={styles.gradient}
        >
            <View style={styles.root}>
                
                <View style={styles.instructions_wrapper}>
                    <View style={styles.in_row}>
                        <AntDesign name="infocirlce" size={20} style={styles.infocircle} />
                        <Text style={styles.text}>Enter your email to receive a verification code</Text>
                    </View>
                
                    <View style={styles.in_row}> 
                        <AntDesign name="infocirlce" size={20} style={styles.infocircle} />
                        <Text style={styles.text2}>Enter your code in the 'Verification code' box</Text>
                    </View>
                </View>


                <View style={styles.inputs_wrapper}>
                    <CustomInput
                        placeholder='Enter your email...'
                        value={props.email}
                        setValue={props.setEmail}
                        withButton={true}
                        buttonMessage="GET CODE"
                        inputButtonPressed={props.getCodePressed}
                    />

                    <CustomInput
                        placeholder='Verification code...'
                        value={props.verificationCode}
                        setValue={props.setVerificationCode}
                    />

                    <View style={styles.button_wrapper}>
                        <CustomButton 
                            text="RESET PASSWORD" 
                            action={props.resetPasswordPressed} 
                            type="PRIMARY_REGISTER"
                        />
                    </View> 
                </View>


            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        width: '90%',
        maxHeight: 400,
        height: '75%',
        borderRadius: 15,
        marginTop: '5%',
        marginLeft: '5%',
    },

    root: {
        alignItems: 'center',
        paddingTop: '5%',
    },

    inputs_wrapper: {
        width: '80%',
        height: '55%'
    },
    
    button_wrapper:{
        marginTop: '15%',
        marginLeft: '15%'
    },

    instructions_wrapper: {
        marginTop: '10%',
    },

    in_row: {
        flexDirection: 'row',
        marginTop: '2%',
    },

    text: {
        color: '#dd5790',
        fontSize: 14,
        marginLeft: '2%'
    },

    infocircle: {
        color: '#dd5790',
    },

    text2: {
        color: '#dd5790',
        fontSize: 14,
        marginLeft: '2%'
    }
})

export default ForgotPasswordCard


