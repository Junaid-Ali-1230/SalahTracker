import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import RenderCheckboxes from './renderCheckboxes';
import moment from 'moment';
import DropdownMenu from './DropdownMenu';
import { daysInMonth } from 'moment';
import CommonModules from './CommonModules';


const HomeScreen = () => {

  const [isMenuVisible, setMenuVisible] = useState(false);         // used for hamburger-dropdown
  const [selectedMonth, setSelectedMonth] = useState('December'); // Default selected month, you can set it dynamically
  const [isDropdownVisible, setDropdownVisible] = useState(false);       // used for month-dropdown
  const [isYearDropdownVisible, setYearDropdownVisible] = useState(false);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [selectedYear, setSelectedYear] = useState(moment().year().toString());

  const lowerYearLimit = 2000; // Set your lower limit here
  const years = Array.from({ length: moment().year() - lowerYearLimit + 1 }, (_, index) => (moment().year() - index).toString());

  const generateDateViews = () => {
    // Calculate the number of days in the selected month and year
    const daysCount = moment(`${selectedYear}-${selectedMonth}`, 'YYYY-MMM').daysInMonth();
    return Array.from({ length: daysCount }, (_, index) => (
      <View key={index} style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", marginBottom: 40 }}>
        <Text style={{ color: "white", fontSize: 20, paddingLeft: 10, marginRight: 20 }}>{index + 1}</Text>
        <RenderCheckboxes count={5} />
      </View>
    ));
  };

 
  const toggleMonthDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    toggleMonthDropdown();
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    toggleYearDropdown();
  }

  const toggleYearDropdown = () => {
    setYearDropdownVisible(!isYearDropdownVisible);
  }


  const views = Array.from({ length: 30 }, (_, index) => (
    <View key={index} style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", marginBottom: 40 }}>
      <Text style={{ color: "white", fontSize: 20, paddingLeft: 10, marginRight: 20 }}>{index + 1}</Text>
      <RenderCheckboxes count={5} />
    </View>
  ));



  return (
    <View style={styles.container}>
      <LinearGradient colors={['#500000', '#000045']} style={styles.gradientBackground}>

        <View style={styles.header}>
          {/* Moon and Hamburger */}
          <CommonModules>

          </CommonModules>

          {/* Month Heading */}
          <View style={{ alignItems: 'center', }}>
            <TouchableOpacity onPress={toggleMonthDropdown} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.monthText}>{selectedMonth}</Text>
              <Ionicons name="arrow-down" size={20} color="white" style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          </View>
          {/* Year Heading */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={toggleYearDropdown} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: "white" }}>{selectedYear}</Text>
              <Ionicons name="arrow-down" size={15} color="white" style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          </View>

          {/* date and namaz names  */}
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", paddingTop: 20, paddingBottom: 30, position: 'relative' }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, color: '#Fcd400' }}>Date</Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, color: '#Fcd400' }}>Fajr</Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, color: '#Fcd400' }}>Zuhr</Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, color: '#Fcd400' }}>Asr</Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, color: '#Fcd400' }}>Maghrib</Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, color: '#Fcd400' }}>Isha</Text>

          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {generateDateViews()}
        </ScrollView>


        {/* This Modal is of Month DropDown */}
        <Modal
          visible={isDropdownVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleMonthDropdown}
        >
          <TouchableWithoutFeedback onPress={() => { setDropdownVisible(false) }}>
            <View style={{ flex: 1 }}>
              <View style={styles.dropdownContainer}>
                <ScrollView>
                  {months.map((item) => (
                    <TouchableOpacity key={item} onPress={() => handleMonthClick(item)}>
                      <Text style={styles.dropdownItem}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* This Modal is of Year DropDown */}
        <Modal
          visible={isYearDropdownVisible}
          animationType='fade'
          transparent={true}
          onRequestClose={toggleYearDropdown}
        >
          <TouchableWithoutFeedback onPress={toggleYearDropdown}>
            <View style={{ flex: 1 }}>
              <View style={styles.dropdownContainer}>
                <ScrollView style={{ maxHeight: 550 }}>
                  {years.map((year) => (
                    <TouchableOpacity key={year} onPress={() => handleYearClick(year)}>
                      <Text style={styles.dropdownItem}>{year}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </LinearGradient>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    paddingTop: 40,
  },
  header: {
    height: 200,
    // alignItems: 'center',
    // justifyContent:'space-between'
  },
  logoAndHamburgerView: {
    flexDirection: 'row', // Arrange the moon logo and hamburger icon in a row
    justifyContent: 'space-between', // Add space between them
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    // paddingBottom: 100,
  },
  moonLogo: {
    width: 80, // Set the width of your moon logo
    height: 80, // Set the height of your moon logo
  },
  hamburgerIcon: {
    marginRight: 10, // Adjust the margin as needed
    marginTop: 10, // Adjust the margin as needed
  },
  monthText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  dateText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
    width: "100%",
  },
  columnNames: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dates: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkbox: {
    width: 64,
    height: 64
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white', // Set the background color to white
    width: '100%', // Take up the full width
    bottom: 0, // Align the bottom of the dropdown with the bottom of the month text
    borderWidth: 1,
    borderColor: 'gray', // Add a border for better visibility
  },
  dropdownItem: {
    fontSize: 18,
    paddingVertical: 10, // Add padding for better spacing
    paddingHorizontal: 20, // Add padding for better spacing
    color: 'black',
  },
});

export default HomeScreen;