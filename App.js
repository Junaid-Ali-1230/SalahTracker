import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppRegistry } from 'react-native'; // Import AppRegistry
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from './screens/Signup';
import LoginScreen from './screens/Login';
import ForgotPasswordScreen from './screens/ForgotPassword';
import ScheduleScreen from './screens/Schedule';
import DirectionScreen from './screens/Direction';
// import Compass  from './screens/Compass';
import HomeScreen from './screens/Home';
import LandingPage from './screens/LandingPage';
import { Ionicons } from '@expo/vector-icons';
import {auth} from './firebase/firebase.config'




// Register the main component with AppRegistry
AppRegistry.registerComponent('main', () => App);


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LandingPage" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
    </Stack.Navigator>
  );
};

const MyTabBarIcon = ({ route, focused, color, size }) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Direction':
      iconName = focused ? 'compass' : 'compass-outline';
      break;
    case 'Schedule':
      iconName = focused ? 'ios-time' : 'ios-time-outline';
      break;
    default:
      iconName = 'ios-information-circle';
      break;
  }

  // Adjust the size based on the focused state
  const adjustedSize = focused ? size + 10 : size;

  return <Ionicons name={iconName} size={adjustedSize} color={color} />;
};



const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#F4CD00',
        // inactiveTintColor: 'white',
      }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,1)',
          position: 'relative', //general
          borderTopWidth: 0,
          activeTintColor: '#F4CD00',
          height: 60
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MyTabBarIcon
              route={{ name: "Home" }}
              focused={focused}
              color={color}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Direction"
        component={DirectionScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MyTabBarIcon
              route={{ name: "Direction" }}
              focused={focused}
              color={color}
              size={35}
            />
          )
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MyTabBarIcon
              route={{ name: "Schedule" }}
              focused={focused}
              color={color}
              size={35}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthStack" headerMode="none">
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;