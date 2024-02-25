import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ChatsScreen from "./screens/ChatsScreen";
import ChatMessagesScreen from "./screens/ChatMessagesScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import PreferenceScreen from "./screens/PreferenceScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GeneralChatPost from "./components/General_Chat/GeneralChatPost";
import { faker } from '@faker-js/faker';

import YourChats from './components/YourChats';
import GeneralChat from './components/General_Chat/GeneralChat';
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ProfilePage from "./screens/ProfilePage";
import ViewGeneralPost from "./screens/ViewGeneralPost";






const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();


  const SwipeNavigator = ({route}) =>  {
    const {uni, userName} = route.params
    return (
      <Tab.Navigator
        initialRouteName="Screen1"
        tabBarOptions={{ style: { display: 'none' } }} // Hides the tab bar
        swipeEnabled={true}
      >
        {/* <Tab.Screen name="Welcome" component={WelcomeScreen(uni, userName)} /> */}
        <Tab.Screen name="Welcome">
          {() => <WelcomeScreen uni={uni} userName={userName} />}
        </Tab.Screen>

        <Tab.Screen name="Preferences">
          {() => <PreferenceScreen uni={uni} userName={userName} />}
        </Tab.Screen>

        {/* <Tab.Screen name="Preferences" component={PreferenceScreen} /> */}
      </Tab.Navigator>

    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: true }}/>

        <Stack.Screen name="Friends" component={FriendsScreen} />

        <Stack.Screen name="Chats" component={ChatsScreen} />

        <Stack.Screen name="Messages" component={ChatMessagesScreen} />

        <Stack.Screen name="WelcomeNavigator" component={SwipeNavigator} options={{ headerShown: false }}/>

        <Stack.Screen name="GeneralChatPost" component={GeneralChatPost} />

        <Stack.Screen name="ViewGeneralPost" component={ViewGeneralPost} />

        {/* <Stack.Screen name="ChatsNavigator" component={ChatsNavigator} options={{ headerShown: false }}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

function Home({route}) {
  const Tab = createMaterialTopTabNavigator(); 
  const {uni, userName} = route.params;
  console.log("uni stack navigator", uni);
  console.log("userName stack navigator", userName);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let iconName;
          if (route.name === 'YourChats') {
            // iconName = focused ? 'chatbox' : 'chatbox-outline';
            // return <Ionicons name={iconName} size={20} color={'white'} />;
            return <Text style={{color: 'black'}}>Your Chats</Text>;
          } else if (route.name === 'GeneralChat') {
            iconName = focused ? 'globe' : 'globe-outline';
            return <Text style={{color: 'black'}}>General Chat</Text>;
          } else if (route.name === 'ProfilePage') {
            iconName = focused ? 'globe' : 'globe-outline';
            return <Text style={{color: 'black'}}>Profile</Text>;
          }


        },
        tabBarLabelStyle: {
          color: 'white',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray', // Assuming you have a gray color in your theme
        tabBarStyle: {
          backgroundColor: 'white',
        },
      })}
      initialRouteName="YourChats"
    >

        <Tab.Screen name="YourChats">
          {() => <YourChats uni={uni} userName={userName} />}
        </Tab.Screen>


        <Tab.Screen name="GeneralChat">
          {() => <GeneralChat uni={uni} userName={userName} />}
        </Tab.Screen>

        <Tab.Screen name="ProfilePage">
          {() => <ProfilePage />}
        </Tab.Screen>

    </Tab.Navigator>
  );
}

export default StackNavigator;

const styles = StyleSheet.create({});
