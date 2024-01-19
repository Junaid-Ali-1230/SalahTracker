import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'; // If you're using Axios
import CommonModules from './CommonModules.js';



const ScheduleScreen = () => {
  const [prayerData, setPrayerData] = useState(null);


  useEffect(() => {

    // Replace these values with your desired city, date, and method
    const city = 'Lahore';
    const country = 'Pakistan';
    const method = 8; // You can choose the calculation method according to the API documentation

    // Format the date as DD-MM-YYYY
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;




    // Define the API endpoint
    const apiUrl = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}&date=${formattedDate}`;

    // Make the API request
    axios.get(apiUrl)
      .then(response => {
        setPrayerData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // console.log("prayer data : ", prayerData.timings)
  const renderPrayerTime = (namaz, time) => {
    const currentTime = new Date();     //output = Wed Jan 18 2024 10:30:00 GMT+0000 (Coordinated Universal Time)
    const prayerTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), time.split(':')[0], time.split(':')[1]);  //this line took 3 days
    // console.log(prayerTime)

    // Find the time of the next prayer
    const nextPrayer = Object.keys(prayerData.timings).find(prayer => {     // prayer variable is initialized
      console.log('prayer time string: ', prayerData.timings[prayer]);
      const prayerDateTime = new Date(currentTime.toDateString() + ' ' + prayerData.timings[prayer]);
      // console.log('prayerDateTimes : ', Date(currentTime.toDateString() + ' ' + prayerData.timings[prayer]))
      console.log('prayerDateTime : ', prayerDateTime)
      return currentTime < prayerDateTime;
    });

    // Set the background color based on whether it's the time of the current prayer
    const isOngoing = currentTime >= prayerTime && (!nextPrayer || currentTime < new Date(currentTime.toDateString() + ' ' + prayerData.timings[nextPrayer]));
    const backgroundColor = isOngoing ? '#fcd400' : '#3498db';
    const borderRadius = 15;

    return (
      <View
        key={namaz}
        style={[
          styles.parallelogram,
          {
            backgroundColor,
            borderRadius,
            borderColor: backgroundColor,
          },
        ]}
      >
        <Text style={styles.prayerText}>{`${namaz}: ${time}`}</Text>
      </View>
    );
  };



  return (
    <View style={styles.container}>
      <LinearGradient colors={['#500000', '#000045']} style={styles.gradientBackground}>
        <View style={styles.header}>
          <CommonModules>

          </CommonModules>
        </View>
        {prayerData ? (
          <View style={[styles.prayerContainer]}>
            {renderPrayerTime('Fajr', prayerData.timings.Fajr)}
            {renderPrayerTime('Sunrise', prayerData.timings.Sunrise)}
            {renderPrayerTime('Dhuhr', prayerData.timings.Dhuhr)}
            {renderPrayerTime('Asr', prayerData.timings.Asr)}
            {renderPrayerTime('Maghrib', prayerData.timings.Maghrib)}
            {renderPrayerTime('Isha', prayerData.timings.Isha)}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </LinearGradient>
    </View>
  );
};

export default ScheduleScreen;


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
  prayerContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
  parallelogram: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    // borderLeftWidth: 20,
    borderRightWidth: 1,
    // borderBottomWidth: 40,
    borderStyle: 'solid',
    transform: [{ skewX: '-45deg' }],
    margin: 10,

  },
  prayerText: {
    color: 'black',
    transform: [{ skewX: '45deg' }],
    padding: 5,
  },
});

//Notes :
// Date()=returns a string representing the current date and time exp:Wed Jan 17 2024 17:23:33 GMT+0000 (Coordinated Universal Time)
// toDateString()= Wed Jan 17 2024
// Object.keys(prayerData.timings)= it's used to get an array of keys from the prayerData.timings object
// .find()= returns the first element in the array that satisfies the provided callback function.