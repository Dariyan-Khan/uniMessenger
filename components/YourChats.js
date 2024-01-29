import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState, useContext, useEffect } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { faker } from '@faker-js/faker';
import ChatCard from "./ChatCard";
import SearchComponent from "./SearchUsers";
import Icon from 'react-native-vector-icons/FontAwesome';



const YourChats = () => {
  //const { uni, userName } = route.params;
  const auth = FIREBASE_AUTH;
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);
  

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const chatQuery = query(
      collection(FIRESTORE_DB, "chats"),
      orderBy("_id", "desc") // Desc stands for descending
    );

    console.log("chatQuery", chatQuery);

    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      console.log("chatRooms", chatRooms);
      setIsLoading(false);
    });

    //  Return the unsubscribe funciton to stop listening to the updates
    return unsubscribe;
  }, []);


  return (
    <View style={styles.container}>

      {/* <Text style={styles.messagesTitle}>
                Messages
              </Text> */}

    <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop:16, paddingLeft: 0, paddingRight:8 }}>
    <SearchComponent />
    {/* <TouchableOpacity>
      <Icon name="search" size={20} color="#000"/>
    </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddToChatScreen")}
        style={{}}
      >
        <Ionicons name="add" size={28} color="black" />
      </TouchableOpacity>
    </View>

        <ScrollView style={styles.scrollView}
        alwaysBounceVertical={false}>
          <View style={styles.messagesContainer}>
            <View style={styles.messagesHeader}>

            </View>
            {isLoading ? (
                <>
                  <View className="w-full flex items-center justify-center">
                    <ActivityIndicator size={"large"} color={"#43C651"} />
                  </View>
                </>
              ) : (
                <>
                  {chats && chats?.length > 0 ? (
                    <>
                      {chats?.map((room) => (
                        <ChatCard key={room._id} room={room}/>
                        //<Text>room.uid</Text>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 0,
    height:"100%" // Consider setting a background color for consistency // This ensures your view fills the available space
  },
  scrollView: {
    flex: 0, // This ensures your ScrollView takes up the available space
  },
  messagesContainer: {
    flex: 0, // Use flex to ensure it expands as needed
    paddingHorizontal: 10, // Add some horizontal padding for better spacing
  },
  messagesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10, // Uniform padding for the header
    //borderBottomWidth: 1, // Adds a subtle line to separate the header
    //borderBottomColor: '#ddd', // Light color for the separator line
  },
  messagesTitle: {
    color: 'black',
    fontSize: 20, // Slightly larger for better visibility
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 0, // Ensure it takes up the full container height
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Other styles remain unchanged
});




  


{/* <View>
<View style={{ padding: 10 }}>
  {users.map((item, index) => (
    <User key={index} item={item} />
  ))}
</View>
</View> */}

export default YourChats;