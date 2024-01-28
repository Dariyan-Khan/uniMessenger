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
import SearchBarComponent from "./SearchUsers";



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
      <SafeAreaView>

      <View style={{padding:8}}>
        <SearchBarComponent />
      </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.messagesContainer}>
            <View style={styles.messagesHeader}>
              <Text style={styles.messagesTitle}>
                Messages
              </Text>
  
              <TouchableOpacity
                onPress={() => navigation.navigate("AddToChatScreen")}
              >
                <Ionicons name="add" size={28} color="#555" />
              </TouchableOpacity>
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24 
  },
  titleView: {
    // Remove flex: 1 and explicitly set the height if needed
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "600",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: 'flex-end'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  profileButton: {
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    borderWidth: 2, 
    borderColor: 'blue', // Replace 'blue' with your primary color
    alignItems: 'center', 
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%', 
    height: '100%',
  },
  scrollView: {
    width: '100%', 
    paddingTop: 16,

  },
  messagesContainer: {
    width: '100%',
  },
  messagesHeader: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 2,
  },
  messagesTitle: {
    color: 'black', // Replace with your primaryText color
    fontSize: 16, 
    fontWeight: 'bold', 
    paddingBottom: 2,
  },
  loadingContainer: {
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  // ... define other styles as needed
  });



  


{/* <View>
<View style={{ padding: 10 }}>
  {users.map((item, index) => (
    <User key={index} item={item} />
  ))}
</View>
</View> */}

export default YourChats;