import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import React, {useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import RNPickerSelect from 'react-native-picker-select';
import { doc, setDoc } from "firebase/firestore";



const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [selectedUni, setUni] = useState("");
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;
    const [loading, setLoading] = useState(false)

    const uni_list_url = '../university_list.json'

    const email_dict_url = '../university_emails.json'

    const handleRegister = async () => {
        const user = {
            name: name,
            email: email,
            password: password,
            image: image
        };

        


        const uni_emails = require(email_dict_url)

        const corr_uni_ending = uni_emails[selectedUni]

        const curr_email_ending = email.split("@")[1]

        if (corr_uni_ending !== curr_email_ending) {
            Alert.alert(
                "Email Error",
                 `Expected email ending in ${corr_uni_ending} for ${selectedUni}`
                );
            return; 
        };

        setLoading (true);
        try {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user_data = {
                    _id: userCredential?.user.uid,
                    userName: name,
                    uni: selectedUni,
                    providerData: userCredential.user.providerData[0],
                  };
    
                setDoc(doc(FIRESTORE_DB, "users", userCredential?.user.uid), user_data).then(
                    () => {
                        sendEmailVerification(userCredential.user);
                        alert(`Successfully registered! An email has been seent for verification`)
                        navigation.navigate("Login")
                    }
                )
                
            });


        } catch (error) {

        console.log(error);
        alert('Sign in failed: ' + error.message);

        } finally {
        setLoading (false);
        }

    }

    const uniPlaceholder = {
        label: 'Select your university',
        value: null,
        };
        
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

                <View style={{marginBottom:10}}>

                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    University </Text>

                    

                    <RNPickerSelect
                        placeholder={uniPlaceholder}
                        items={require(uni_list_url)}
                        onValueChange={(value) => setUni(value)}
                        value={selectedUni}
                    />

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
                        secureTextEntry={false} // change back to true
                        style={{
                            fontSize: email ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                        }}
                        placeholderTextColor={"black"}
                        placeholder="Password"/>
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