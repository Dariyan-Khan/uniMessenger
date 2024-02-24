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
import ChatCard from "../components/ChatCard";
import SearchComponent from "../components/Search/SearchUsers";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatToggle from '../components/ChatNavigator';
import YourChats from '../components/YourChats';
import GeneralChat from '../components/General_Chat/GeneralChat';



const HomeScreen = ({route}) => {

  const { uni, userName } = route.params;
  const auth = FIREBASE_AUTH;
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);
  const [parentTab, setParentTab] = useState('YourChats');
  const navigation = useNavigation();
  

  const handleTabFromChild = (data) => {
    setParentTab(data);
    };

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
      <SafeAreaView style={{flex:1}}>

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{`${userName}'s Space`}</Text>
        </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={styles.profileButton}
          >
            <Image
              source={{ uri: faker.image.avatar() }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      
        {/* <ChatToggle setParentTab={handleTabFromChild}/> */}
      

      <View style={styles.scrollView}>
        {parentTab === 'YourChats' ? <YourChats/> :
        parentTab === 'GeneralChat' ? <GeneralChat uni={uni} userName={userName}/> :
        <Text>Something went wrong</Text>}
       </View>

      </SafeAreaView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex:1,
    mainView: {
      width: "100%",
      height: "100%"
   },
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

export default HomeScreen;