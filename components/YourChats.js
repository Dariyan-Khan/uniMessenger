import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";
import React, { useLayoutEffect, useState, useContext, useEffect } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { faker } from '@faker-js/faker';
import SearchBarComponent from "./Search/GeneralSearch";



const GeneralChat = ({uni, userName}) => {
  const auth = FIREBASE_AUTH;
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigation = useNavigation();



  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
      <SearchBarComponent />
      <TouchableOpacity onPress={() => navigation.navigate("CreateNewChat", {uni: uni, userName: userName})}>
        <Ionicons name="add" size={28} color="#555" />
      </TouchableOpacity>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height:"100%", // Consider setting a background color for consistency // This ensures your view fills the available space
    flexDirection: 'column', // Default is column, so this is not necessary
  },
  scrollView: {
    flex: 1, // This ensures your ScrollView takes up the available space
    flexGrow: 1
  },






  // messagesContainer: {
  //   flex: 0, // Use flex to ensure it expands as needed
  //   paddingHorizontal: 10, // Add some horizontal padding for better spacing
  // },
  // messagesHeader: {
  //   flexDirection: 'row',
  //   // alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: 10, // Uniform padding for the header
  //   //borderBottomWidth: 1, // Adds a subtle line to separate the header
  //   //borderBottomColor: '#ddd', // Light color for the separator line
  // },
  // messagesTitle: {
  //   color: 'black',
  //   fontSize: 20, // Slightly larger for better visibility
  //   fontWeight: 'bold',
  // },
  // loadingContainer: {
  //   flex: 0, // Ensure it takes up the full container height
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // // Other styles remain unchanged
});




  


{/* <View>
<View style={{ padding: 10 }}>
  {users.map((item, index) => (
    <User key={index} item={item} />
  ))}
</View>
</View> */}

export default GeneralChat;