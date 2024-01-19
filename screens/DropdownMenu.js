import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {signOut } from "firebase/auth";
import { auth } from '../firebase/firebase.config';



const DropdownMenu = ({ onClose }) => {


  const navigation = useNavigation();

  const logout = () => {

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate('Login');
      }).catch((error) => {
        // An error happened.
      });

    onClose(); // Close the menu after logout
  };

  const menu1 = () => {
    // Handle menu item 1 logic if needed
    // ...

    // Close the menu after handling the menu item
    onClose();
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={menu1}>
        <Text style={styles.menuItem}>Menu Item 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.menuItem}>Logout</Text>
      </TouchableOpacity>
      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    position: 'absolute',
    top: 60, // Adjust the top position based on your header height
    right: 10,
    borderRadius: 5,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DropdownMenu;
