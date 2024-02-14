import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import React, {useState, useEffect}  from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import RNPickerSelect from 'react-native-picker-select';
import {Dropdown} from 'react-native-element-dropdown';
import { doc, setDoc, getDoc } from "firebase/firestore";
import {Picker} from '@react-native-picker/picker';


const MyPickerComponent = () => {
    const [selectedUni, setSelectedUni] = useState();
    const [uniItems, setUniItems] = useState([]);
    const uni_list_url = '../university_list.json'
  
    useEffect(() => {
      // Assuming you have a way to import or fetch your list, update it accordingly
      // This is a placeholder for loading your university list items
      const loadUniItems = async () => {
        // Example: const items = await fetchUniItems(uni_list_url);
        // setUniItems(items);
        // For demonstration, let's assume it's loaded here directly
        setUniItems(require(uni_list_url)); // Adjust this line as needed
      };
  
      loadUniItems();
    }, []);
  
    return (
      <Picker
        selectedValue={selectedUni}
        onValueChange={(itemValue, itemIndex) => setSelectedUni(itemValue)}
        style={{height: 214, overflow: 'hidden'}}
        // You might need to adjust styling for Android
      >
        {uniItems.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    );
  };



const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [selectedUni, setUni] = useState("");
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;
    const [loading, setLoading] = useState(false)

    const [isFocus, setIsFocus] = useState(false);
    const [country, setCountry] = useState(null);

    const uni_list_url = '../university_list.json'

    const email_dict_url = '../university_emails.json'

    const countryData = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];


    const handleRegister = async () => {

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
                    firstLogin: true
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
        // flex: 1,
        // backgroundColor: "white",
        // padding: 10,
        // alignItems: "center",
      }}>
     <KeyboardAvoidingView>
                <View style={{marginTop: 96, justifyContent: "center", alignItems: "center"}}>
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
                    {/* style={{marginBottom:10}}> */}

                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    University </Text>

                    {/* <MyPickerComponent/> */}

                    <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={countryData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select country' : '...'}
                    searchPlaceholder="Search..."
                    value={country}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setCountry(item.value);
                        // handleState(item.value);
                        // setCountryName(item.label);
                        setIsFocus(false);
                         }}
                    />

                    {/* <RNPickerSelect
                        placeholder={uniPlaceholder}
                        items={require(uni_list_url)}
                        onValueChange={(value) => setUni(value)}
                        //pickerProps={{ style: { height: 214, overflow: 'hidden' } }}
                        value={selectedUni}
                        useNativeAndroidPickerStyle={true}
                    /> */}

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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#533483',
      padding: 16,
      justifyContent: 'center',
      alignContent: 'center',
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });