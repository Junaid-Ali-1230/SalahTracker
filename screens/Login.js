import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommonBackground from './CommonBackground';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebase.config';

const LoginScreen = ({ navigation }) => {


  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false); // change the color of text "create new account", when clicked.

  const[email, setEmail] = useState(null);
  const[password, setPassword] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {  //func will be called when user login or logout
      if (user) {
        navigation.navigate('MainTabs', { screen: 'Home' })
      } else {
        // User is signed out
        // ...
      }
    });

  },[]

  )

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.replace('MainTabs', { screen: 'Home' })
      })
        
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  // const handleLogin = () => {
  //   navigation.navigate('MainTabs', { screen: 'Home' })
  // };

  const handlePressIn = () => {
    setIsPressed(true)
  };

  const handlePressOut = () => {
    setIsPressed(false)
    navigation.navigate('Signup')//see this if error
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };



  return (
    // <HomeScreen>
    <CommonBackground>
      <View style={styles.moonContainer}>
        {/* Custom Image of Moon */}
        <Image source={require('../assets/chand.png')} style={styles.moonImage} />
      </View>

      {/* TextInputs for username and password */}
      <TextInput
      label = "Email"
        style={[styles.input, { borderColor: isUsernameFocused ? '#F4CD00' : 'black' },]}
        placeholder="Email"
        placeholderTextColor="#555"
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
      label = "Password"
        style={[
          styles.input,
          { borderColor: isPasswordFocused ? '#F4CD00' : 'black' },
        ]}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry={true} // For password input
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password link in yellow color */}
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: "white", width: 35, fontSize: 15, marginTop: 15, }}>
          OR
        </Text>
      </View>

      {/* Stylish Buttons for Google and Facebook Login */}
      <TouchableOpacity style={[styles.loginWithButton, styles.transparentButton]}>
        <Image source={require('../assets/googleImage.png')} style={styles.loginWithIcon} />
        <Text style={styles.loginWithButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.loginWithButton, styles.transparentButton]}>
        <Image source={require('../assets/facebookImage.png')} style={styles.loginWithIcon} />
        <Text style={styles.loginWithButtonText}>Login with Facebook</Text>
      </TouchableOpacity>

      {/* Create New Account button with less prominent styling */}
      <View style={styles.createAccountButton}
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
      >
        <Text style={[styles.createAccountButtonText, { color: isPressed ? '#fcd400' : '#888' }]}>Don't have an account?  SignUp</Text>
      </View>
    </CommonBackground>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  // gradientBackground: {
  //   flex: 1,
  //   width: '100%',
  //   alignItems: 'center',
  //   paddingTop: 40,
  // },

  moonContainer: {
    marginBottom: 20,
  },
  moonImage: {
    width: 200,
    height: 200,
  },
  input: {
    height: 40,
    width: '60%',
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#F4CD00',
    padding: 15,
    borderRadius: 15,
    paddingTop: 10,
    marginTop: 12,
    width: "60%",

  },
  loginButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#F4CD00',
    textDecorationLine: 'underline',
  },
  lineSeparator: {
    borderWidth: 1,
    borderColor: "white",
    width: "80%",

  },
  createAccountButton: {
    marginBottom: 20,
    marginTop: 20,

  },
  createAccountButtonText: {
    // color: '#fcd400',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    width: '50%', // Adjust the width based on your requirements
    padding: 15,
    borderRadius: 27,
    marginTop: 10, // Adjust the margin based on your requirements
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    // justifyContent: "center"
  },
  loginWithIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  loginWithButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }

});


export default LoginScreen