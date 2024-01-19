import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, } from 'react-native';
import CommonBackground from './CommonBackground';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase/firebase.config';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isUsernameFocused, setUsernameFocused] = useState(false);


    const handleResetPassword = () => {
        // Validate the email address
        if (email != null) {

            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Check your email and verify!");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                    // ..
                });
        }


        // TODO: Implement logic to send a reset link or code to the user's email address
        // For simplicity, this example just shows an alert.
        Alert.alert('Password Reset', 'An email has been sent with instructions to reset your password.');
    };

    return (
        <CommonBackground>
            <View style={styles.moonContainer}>
                {/* Custom Image of Moon */}
                <Image source={require('../assets/chand.png')} style={styles.moonImage} />
            </View>
            <View style={styles.content}>
                <Text style={styles.header}>Forgot Password</Text>
                <TextInput
                    style={[styles.input, { borderColor: isUsernameFocused ? '#F4CD00' : 'white' },]}
                    placeholder="Enter your email address"
                    placeholderTextColor="#ccc"
                    onChangeText={(text) => setEmail(text)}
                    onFocus={() => setUsernameFocused(true)}
                    onBlur={() => setUsernameFocused(false)}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleResetPassword()}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </CommonBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    moonContainer: {
        marginBottom: 20,
    },
    moonImage: {
        width: 200,
        height: 200,
    },
    content: {
        width: '80%',
    },
    header: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white',
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 20,
    },
    loginText: {
        color: '#3498db',
    },
});

export default ForgotPasswordScreen;
