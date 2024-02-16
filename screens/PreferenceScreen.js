import {StyleSheet, View, Text, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import RNPickerSelect from 'react-native-picker-select';
import InterestBox from '../components/InterestsEnter';
import {Dropdown} from 'react-native-element-dropdown';

const PreferenceScreen = ({uni, userName}) => {

//   useEffect(() => {
//     navigation.replace("HomeScreen", {uni: "Imperial College London ", userName: "Dariyan"});
// }, []);


  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [parentInterestList, setParentInterestList] = useState([]);
  const [isSubjectFocus, setIsSubjectFocus] = useState(false);
  const [isYearFocus, setIsYearFocus] = useState(false);


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
      navigation.replace("Home", {uni: uni, userName: userName});

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

                  <Dropdown
                    style={[styles.dropdown, isSubjectFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={uni_subject_picker_list}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isSubjectFocus ? 'Select Subject' : '...'}
                    searchPlaceholder="Search..."
                    value={subject}
                    onFocus={() => setIsSubjectFocus(true)}
                    onBlur={() => setIsSubjectFocus(false)}
                    onChange={item => {
                      setSubject(item.value);
                        // handleState(item.value);
                        // setCountryName(item.label);
                        setIsSubjectFocus(false);
                         }}
                    />
                    
                </View>

                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                    Choose your year </Text>

                    {(subject != "")   && <Dropdown
                    style={[styles.dropdown, isYearFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={year_picker_list}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isYearFocus ? 'Select Year' : '...'}
                    searchPlaceholder="Search..."
                    value={year}
                    onFocus={() => setIsYearFocus(true)}
                    onBlur={() => setIsYearFocus(false)}
                    onChange={item => {
                        setYear(item.value);
                        // handleState(item.value);
                        // setCountryName(item.label);
                        setIsYearFocus(false);
                         }}
                    />
                        }
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
                    marginTop: 0,
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
    marginTop: 10,
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