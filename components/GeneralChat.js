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
import ChatCard from "./ChatCard";
import SearchBarComponent from "./SearchUsers";



const GeneralChat = () => {
  //const { uni, userName } = route.params;
  const auth = FIREBASE_AUTH;
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);
  

  const navigation = useNavigation();

  


  useLayoutEffect(() => {
    const chatQuery = query(
      collection(FIRESTORE_DB, "universities", "Imperial College London", "General"),
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

      <View style={{padding:8}}>
        <SearchBarComponent />
      </View>
      {/* <Text style={styles.messagesTitle}>
                Messages
              </Text> */}

    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("GeneralChatPost")}
        style={{ padding: 4 }}
      >
        <Ionicons name="add" size={28} color="#555" />
      </TouchableOpacity>
    </View>

        <ScrollView style={styles.scrollView}>
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

export default GeneralChat;