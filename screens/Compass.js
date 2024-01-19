import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const Compass = () => {
  const [rotation, setRotation] = useState(0);
  const [magneticDeclination, setMagneticDeclination] = useState(0);

  useEffect(() => {
    const getMagneticDeclination = async () => {
      // Fetch the magnetic declination for your specific location
      // You may need to use an API or a reliable source to get this information
      // Replace the URL with the appropriate source for magnetic declination
      const response = await fetch('https://api.example.com/magnetic-declination');
      const data = await response.json();

      // Set the magnetic declination
      setMagneticDeclination(data.declination || 0);
    };

    getMagneticDeclination();

    const magnetometerSubscription = Magnetometer.addListener((data) => {
      const { x, y } = data.magneticField;
      const newRotation = Math.atan2(y, x) * (180 / Math.PI);
      const adjustedRotation = newRotation + magneticDeclination;

      setRotation(adjustedRotation >= 0 ? adjustedRotation : 360 + adjustedRotation);
    });

    return () => {
      magnetometerSubscription.remove();
    };
  }, [magneticDeclination]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/your-compass-image.jpg' }}
        style={{
          ...styles.compass,
          transform: [{ rotate: `${rotation}deg` }],
        }}
      />
      <Text style={styles.degrees}>{`Degrees: ${rotation.toFixed(2)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compass: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  degrees: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default Compass;
