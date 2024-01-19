// LandingPage.js
import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer); // Clear the timeout if the component is unmounted
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/mosque1.png')} // Replace with the path to your local image or use {uri: 'your-image-url'} for network images
      style={styles.backgroundImage}
    >
      {/* Your content goes here */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    paddingTop: 40,
    // You can add other styles here as needed
  },
});

export default LandingPage;
