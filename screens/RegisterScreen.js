import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import React, {useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { FIREBASE_AUTH } from "../FirebaseConfig";



const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        const user = {
            name: name,
            email: email,
            password: password,
            image: image
        };

         // send a POST  request to the backend API to register the user
        // axios
        // .post("https://messenger-project-mern-mtgnrpbza-dariyans-projects.vercel.app/register", user)
        // .then((response) => {
        // console.log(response);
        // Alert.alert(
        //     "Registration successful",
        //     "You have been registered Successfully"
        // );

      
        setLoading (true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
        } catch (error) {
        console.log(error);
        alert('Sign in failed: ' + error.message);
        } finally {
        setLoading (false);
        }

        // setName("");
        // setEmail("");
        // setPassword("");
        // setImage("");
        // })
        // .catch((error) => {
        // Alert.alert(
        //     "Registration Error",
        //     "An error occurred while registering"
        // );
        // console.log("registration failed", error);
        // });
    }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}>
      <KeyboardAvoidingView>
                <View style={{marginTop: 96, justifyContent: "center", alignItems: "center",}}>
                    <Text style={{color: "#4A55A2", fontSize:17, fontWeight:"600"}}> Sign In</Text>
                    <Text style={{fontSize:17, fontWeight:"600"}}> Sign in to your acccont</Text>
                </View>
                
                <View style={{marginTop:50}}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    Name </Text>

                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={{
                            fontSize: email ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                        }}
                        placeholderTextColor={"black"}
                        placeholder="Enter your name"/>
                </View>

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
                        secureTextEntry={true}
                        style={{
                            fontSize: email ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                        }}
                        placeholderTextColor={"black"}
                        placeholder="Passowrd"/>
                </View>

                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    Image </Text>

                    <TextInput
                    value={image}
                    onChangeText={(text) => setImage(text)}
                    style={{
                        fontSize: email ? 18 : 18,
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                        marginVertical: 10,
                        width: 300,
                    }}
                    placeholderTextColor={"black"}
                    placeholder="Image"/>
                </View>

                <Pressable
                    onPress= {handleRegister}//{handleLogin}
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
                        Register
                        </Text>
                </Pressable>

                <Pressable
                onPress={() => navigation.goBack()}
                style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                    Already have an account? Sign in
                    </Text>
                </Pressable>

                </View>
            </KeyboardAvoidingView>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})