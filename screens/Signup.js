import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, } from 'react-native';
import CommonBackground from './CommonBackground';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase.config';



const SignupScreen = ({ navigation }) => {



  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPhoneFocused, setPhoneFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const signup = () => {
    if (!isChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        // const user = userCredential.user;
        navigation.replace( 'AuthStack', { screen: 'Login' } )
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;   
        alert(errorMessage);
      });

  };

  const handleCheckboxPress = () => {
    setChecked(!isChecked);
  };

  return (
    <CommonBackground>
      <View style={styles.moonContainer}>
        {/* Custom Image of Moon */}
        <Image source={require('../assets/chand.png')} style={styles.moonImage} />
      </View>

      {/* TextInputs for username, email, phone, password, and confirm password */}
      {/* <TextInput
        style={[styles.input, { borderColor: isUsernameFocused ? '#F4CD00' : 'black' }]}
        placeholder="Username"
        placeholderTextColor="#555"
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
      /> */}

      <TextInput
        label="Email"
        style={[styles.input, { borderColor: isEmailFocused ? '#F4CD00' : 'black' }]}
        placeholder="Email"
        placeholderTextColor="#555"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        label="Password"
        style={[styles.input, { borderColor: isPasswordFocused ? '#F4CD00' : 'black' }]}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry={true}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        label="confirmPassword"
        style={[styles.input, { borderColor: isConfirmPasswordFocused ? '#F4CD00' : 'black' }]}
        placeholder="Confirm Password"
        placeholderTextColor="#555"
        secureTextEntry={true}
        onFocus={() => setConfirmPasswordFocused(true)}
        onBlur={() => setConfirmPasswordFocused(false)}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {/* Checkbox with black tick mark */}
      <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxPress}>
        <View style={[styles.checkbox, isChecked ? styles.checked : null]}>
          {isChecked && <Text style={styles.checkMark}>&#10003;</Text>}
        </View>
        <Text style={styles.checkboxText}>I agree to terms and conditions</Text>
      </TouchableOpacity>

      {/* Signup Button */}
      <TouchableOpacity style={[styles.signupButton, { marginTop: 26 }]} onPress={()=>signup()}>
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>

    </CommonBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
  },

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
  signupButton: {
    backgroundColor: '#F4CD00',
    padding: 15,
    borderRadius: 15,
    paddingTop: 10,
    marginTop: 12,
    width: '60%',
  },
  signupButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#F4CD00',
    backgroundColor: '#F4CD00',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#F4CD00',
  },
  checkMark: {
    color: 'black',
    fontSize: 14,
  },
  checkboxText: {
    color: 'white',
  },
});

export default SignupScreen;
