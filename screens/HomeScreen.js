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
//import { useSelector } from "react-redux";
//import { Logo } from "../assets";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import User from "../components/User";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";


const HomeScreen = ({route}) => {
  const { uni, userName } = route.params;
  const auth = FIREBASE_AUTH;

  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const chatQuery = query(
      collection(FIRESTORE_DB, "chats"),
      orderBy("_id", "desc")
    );

    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    });

    //  Return the unsubscribe funciton to stop listening to the updates
    return unsubscribe;
  }, []);

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
    <View className="flex-1">
      <SafeAreaView>
        <View className="w-full flex-row items-center justify-between px-4 py-2">
          {/* <Image source={Logo} className="w-12 h-12" resizeMode="contain" /> */}

          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            className="w-12 h-12 rounded-full border border-primary flex items-center justify-center"
          >
            {/* <Image
              source={{ uri: user?.profilePic }}
              className="w-full h-full"
              resizeMode="cover"
            /> */}
          </TouchableOpacity>
        </View>

        {/* scrolling area */}
        <ScrollView className="w-full px-4 pt-4">
          <View className="w-full">
            {/* meesages title */}
            <View className="w-full flex-row items-center justify-between px-2">
              <Text className="text-primaryText text-base font-extrabold pb-2">
                Messages
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("AddToChatScreen")}
              >
                <Ionicons name="chatbox" size={28} color="#555" />
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
                      //<MessageCard key={room._id} room={room} />
                      <Text>Room</Text>
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

export default HomeScreen;

const styles = StyleSheet.create({});


{/* <View>
<View style={{ padding: 10 }}>
  {users.map((item, index) => (
    <User key={index} item={item} />
  ))}
</View>
</View> */}