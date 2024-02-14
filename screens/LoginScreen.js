import { View, Text, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = FIREBASE_AUTH;
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    const handleLogin = async () => {

        setLoading(true)

        const checkIfFirstLogin = (docID) => {
            const docRef = doc(FIRESTORE_DB, "users", docID);
            return getDoc(docRef).then((docSnap) => {
                return docSnap.data();
            });
        };

        
        try {
            const response = await signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
                const user = userCredential.user;

                if(!user.emailVerified){
                    sendEmailVerification(user);
                    Alert.alert("Please verify your  email");
                    signOut(auth);
                    setLoading(false);
                    return;
                }
                //console.log(user.uid)
                checkIfFirstLogin(user.uid).then(userData => {
                    if (userData.firstLogin) {
                        navigation.replace("WelcomeNavigator", {uni: userData.uni, userName: userData.userName});
                    } else {
                        navigation.replace("Home")
                    }
                })

            })
        } catch (error){
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
            }
    
        // axios
        //   .post("http://localhost:3000/login", user)
        //   .then((response) => {
        //     // console.log(response);
        //     const token = response.data.token;
        //     AsyncStorage.setItem("authToken", token);
    
        //     navigation.replace("Home");
        //   })
        //   .catch((error) => {
        //     Alert.alert("Login Error", "Invalid email or password");
        //     console.log("Login Error", error);
        //   });
      };

    // useEffect(() => {
    //     navigation.replace("WelcomeNavigator", {uni: "Imperial College London ", userName: "Dariyan"});
    // }, []);

      
     
    return (
        <View style={{flex:1, backgroundColor:"white", padding:10, alignItems:"center"}}>
            <KeyboardAvoidingView>
                <View style={{marginTop: 96, justifyContent: "center", alignItems: "center",}}>
                    <Text style={{color: "#4A55A2", fontSize:17, fontWeight:"600"}}> Sign In</Text>
                    <Text style={{fontSize:17, fontWeight:"600"}}> Sign in to your acccont</Text>
                </View>
                
                <View style={{marginTop:50}}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    Email </Text>

                    <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{
                        fontSize: email ? 18 : 18,
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                        marginVertical: 10,
                        width: 300,
                    }}
                    placeholderTextColor={"black"}
                    placeholder="enter Your Email"/>
                    
                </View>

                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    Password </Text>

                    <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={false} // set to true
                    style={{
                        fontSize: email ? 18 : 18,
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                        marginVertical: 10,
                        width: 300,
                    }}
                    placeholderTextColor={"black"}
                    placeholder="enter Your Password"/>
                </View>

                <Pressable
                    onPress= {handleLogin}//{handleLogin}
                    style={{
                    width: 200,
                    backgroundColor: "#4A55A2",
                    padding: 15,
                    marginTop: 50,
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: 6,
                    }}>
                        <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}>
                        Login
                        </Text>
                </Pressable>

                <Pressable
                onPress={() => navigation.navigate("Register")}
                style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                    Don't have an account? Sign Up
                    </Text>
                </Pressable>

                </View>
            </KeyboardAvoidingView>
        </View>

        
    )
    }

export default LoginScreen