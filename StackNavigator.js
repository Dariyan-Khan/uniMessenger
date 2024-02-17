import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ChatsScreen from "./screens/ChatsScreen";
import ChatMessagesScreen from "./screens/ChatMessagesScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import PreferenceScreen from "./screens/PreferenceScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GeneralChatPost from "./components/General_Chat/GeneralChatPost";





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

        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Friends" component={FriendsScreen} />

        <Stack.Screen name="Chats" component={ChatsScreen} />

        <Stack.Screen name="Messages" component={ChatMessagesScreen} />

        <Stack.Screen name="WelcomeNavigator" component={SwipeNavigator} options={{ headerShown: false }}/>

        <Stack.Screen name="GeneralChatPost" component={GeneralChatPost} />

        {/* <Stack.Screen name="ChatsNavigator" component={ChatsNavigator} options={{ headerShown: false }}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
