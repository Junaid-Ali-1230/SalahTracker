// Import necessary modules
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Accelerometer } from 'expo-sensors';
import CommonModules from './CommonModules.js';

// Create a new screen component
const DirectionScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [kaabaLocation] = useState({ latitude: 21.3891, longitude: 39.8579 }); // Replace with actual Kaaba coordinates
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Function to toggle the hamburger menu

  useEffect(() => {
    // Function to watch user's location
    const watchLocation = async () => {
      try {
        // Request foreground location permissions from the user
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          // Start watching location with a time interval of 1000 milliseconds
          const locationWatcher = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 1000 },
            (location) => {
              // Update userLocation state with the latest location
              setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
            }
          );

          // Cleanup function to remove the location watcher
          return () => {
            if (locationWatcher) {
              locationWatcher.remove();
            }
          };
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    // Function to listen to accelerometer data for device rotation
    const accelerometerSubscription = Accelerometer.addListener((data) => {
      const { x, y } = data;
      const newRotation = Math.atan2(y, x) * (180 / Math.PI);
      setRotation(newRotation >= 0 ? newRotation : 360 + newRotation);
    });

    // Start watching user's location and listening to accelerometer data
    watchLocation();

    // Cleanup function to remove accelerometer subscription
    return () => {
      accelerometerSubscription.remove();
    };
  }, []); // Empty dependency array ensures it runs once on mount

  // Calculate the angle to rotate the arrow towards the Kaaba
  const getArrowRotation = () => {
    if (userLocation && kaabaLocation) {
      const userLat = userLocation.latitude;
      const userLon = userLocation.longitude;
      const kaabaLat = kaabaLocation.latitude;
      const kaabaLon = kaabaLocation.longitude;

      const angle = Math.atan2(kaabaLat - userLat, kaabaLon - userLon) * (180 / Math.PI);
      return rotation + (angle >= 0 ? angle : 360 + angle);
    }
    return rotation;
  };

  // Render the component
  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient colors={['#500000', '#000045']} style={styles.gradientBackground}>
        {/* Header section */}
        <View style={styles.header}>
          {/* Moon and Hamburger */}
          <CommonModules>
          
          </CommonModules>
        </View>

        {/* Qibla Finder Heading */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Qibla Finder</Text>
        </View>

        {/* Image with an arrow pointing to Qibla */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/qiblaDirection.png')}
            style={{
              // Apply rotation transformation based on the calculated angle
              transform: [{ rotate: `${getArrowRotation()}deg` }],
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

// Export the component
export default DirectionScreen;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    paddingTop: 40,
  },
  header: {
    height: 100,
  },
  moonLogo: {
    width: 80,
    height: 80,
  },
  hamburgerIcon: {
    marginRight: 10,
    marginTop: 10,
  },
});
