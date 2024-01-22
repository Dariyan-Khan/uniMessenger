import { View, Text, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore";
import RNPickerSelect from 'react-native-picker-select';
import InterestBox from '../components/InterestsEnter';

const PreferenceScreen = ({uni, userName}) => {

  useEffect(() => {
    navigation.replace("Home");
}, []);


  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [parentInterestList, setParentInterestList] = useState([]);
  const auth = FIREBASE_AUTH;
  const [loading, setLoading] = useState(false)
  const uni_json = require('../university_subjects.json')[uni.trim()]
  const uni_subjects = Object.keys(uni_json);
  let uni_subject_picker_list = []
  let year_picker_list = []

  const navigation = useNavigation();

  for (el in uni_subjects) {
  uni_subject_picker_list.push({"label": uni_subjects[el], "value": uni_subjects[el]})
  }

  for (el in uni_json[subject]){
    year_picker_list.push({"label": uni_json[subject][el], "value": uni_json[subject][el]})
  }

  const subjectPlaceholder = {
    label: 'Select your subject',
    value: "",
    };

  const yearPlaceholder = {
    label: 'Select your year',
    value: null,
    };

  const handleDataFromChild = (data) => {
    setParentInterestList(data);
    };

  const handlePreferences = async () => {
    if (subject == "" || year == ""){
      Alert.alert("Please enter your subject and year")
      return;
    }

    if (parentInterestList.length < 3){
      Alert.alert("Please enter at least 3 interests!")
      return;
    };

    const user = auth.currentUser;


    const addDataToUser = async () => {
      const docRef = doc(FIRESTORE_DB, "users", user.uid);
      try {
        await setDoc(docRef, {
          subject: subject,
          year: year,
          interests: parentInterestList
        }, { merge: true });

        console.log('Document created/updated successfully');
      } catch (error) {
        console.error('Error creating/updating document:', error);
      }
    };

    addDataToUser().then(() => {
      navigation.replace("Home")

    })
  }

  return (
    <View style={{flex:1, backgroundColor:"white", padding:10, alignItems:"center"}}>
            <KeyboardAvoidingView>
                <View style={{marginTop: 96, justifyContent: "center", alignItems: "center",}}>
                    <Text style={{color: "#4A55A2", fontSize:17, fontWeight:"600"}}> Enter Your Information</Text>
                </View>
                
                <View style={{marginTop:50}}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    Choose your subject </Text>
                    <RNPickerSelect
                        placeholder={subjectPlaceholder}
                        items={uni_subject_picker_list}
                        onValueChange={(value) => setSubject(value)}
                        value={subject}
                    />
                    
                </View>

                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    Choose your year </Text>

                    {(subject != "")   && <RNPickerSelect
                        placeholder={yearPlaceholder}
                        items={year_picker_list}
                        onValueChange={(value) => setYear(value)}
                        value={year}
                    />}
                </View>

                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    Enter your interests </Text>
                    <InterestBox setParentInterest={handleDataFromChild}/> 
                </View>


                <Pressable
                    onPress= {handlePreferences}//{handleLogin}
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
                        Done
                        </Text>
                </Pressable>

                </View>
            </KeyboardAvoidingView>
        </View>





  )
}

export default PreferenceScreen;