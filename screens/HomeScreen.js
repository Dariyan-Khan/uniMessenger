import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";


const HomeScreen = ({route}) => {
  const { uni, userName } = route.params;
  const navigation = useNavigation();
  //const { userId  , setUserId } = useContext(UserType);
  const auth = FIREBASE_AUTH;
 // const [users, setUsers] = useState([]);


  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "",
  //     headerLeft: () => (
  //       <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
  //     ),
  //     headerRight: () => (
  //       <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
  //         <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
  //         <MaterialIcons
  //           onPress={() => navigation.navigate("Friends")}
  //           name="people-outline"
  //           size={24}
  //           color="black"
  //         />
  //       </View>
  //     ),
  //   });
  // }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const token = await AsyncStorage.getItem("authToken");
  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken.userId;
  //     setUserId(userId);

  //     axios
  //       .get(`http://localhost:3000/users/${userId}`)
  //       .then((response) => {
  //         setUsers(response.data);
  //       })
  //       .catch((error) => {
  //         console.log("error retrieving users", error);
  //       });
  //   };

  //   fetchUsers();
  // }, []);

  return (
    
    <View>
      <View style={{ padding: 10 }}>
          <Text>Hi</Text>
      </View>
    </View>
  );
  
};

export default HomeScreen;

const styles = StyleSheet.create({});


{/* <View>
<View style={{ padding: 10 }}>
  {users.map((item, index) => (
    <User key={index} item={item} />
  ))}
</View>
</View> */}