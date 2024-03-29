import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
    getDocs,
  } from "firebase/firestore";

import { faker } from '@faker-js/faker';
import { FontAwesome5 } from "@expo/vector-icons";




const SearchScreen = () => {
  const uni="Imperial College London"
  const [title, setTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [message, setMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [subject, setSubject] = useState("");
  const [isSubjectFocus, setIsSubjectFocus] = useState(false);
  const [year, setYear] = useState("");
  const [isYearFocus, setIsYearFocus] = useState(false);

  const [interest1, setInterest1] = useState("");
  const [interest2, setInterest2] = useState("");
  const [interest3, setInterest3] = useState("");
  const [interest4, setInterest4] = useState("");

  const uni_json = require('../university_subjects.json')[uni.trim()]
  const uni_subjects = Object.keys(uni_json);
  let uni_subject_picker_list = []

  const all_years = [
    {"label": "1st Year", "value": 1},
    {"label": "2nd Year", "value": 2},
    {"label": "3rd Year", "value": 3},
    {"label": "4th Year", "value": 4}
  ]

  for (el in uni_subjects) {
    uni_subject_picker_list.push({"label": uni_subjects[el], "value": uni_subjects[el]})
    }

  useEffect(() => {
    console.log("interest1:", interest1);
    const timerId = setTimeout(() => {
      if (searchQuery || subject || year || 
          interest1 || interest2 || interest3 || interest4) {
        console.log("Searching for:", searchQuery)
        performSearch();
      } else {
        setSearchResults([]); // Clear results if search query is cleared
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timerId);
  }, [searchQuery, subject, year, interest1, interest2, interest3, interest4]); // Add other dependencies as needed

  // Function to get users by username search query
  async function performSearch() {
    console.log("performing search");
    let q = collection(FIRESTORE_DB, 'users');


    if (searchQuery.trim() !== '') {
    q = query(q, where('userName', '>=', searchQuery), where('userName', '<=', searchQuery + '\uf8ff'));
     }
  
  if (subject.trim() !== '') {
    q = query(q, where('subject', '==', subject));
    }
  
    
  
  if (typeof year === 'string' && year.trim() !== '') {
    q = query(q, where('year', '==', year));
    }
  
  if (typeof year === 'number' && year !== '') {
      q = query(q, where('year', '==', year));
      }

  
  const interests = [interest1, interest2, interest3, interest4];

  const nonEmptyInterests = interests.filter(interest => interest !== "");

  if (nonEmptyInterests.length > 0) {
    q = query(q, where('interests', 'array-contains-any', nonEmptyInterests));
  }
  



    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }));


    console.log("users", users[0]);
    setSearchResults(users);
    return users;
    }


  const toggleItemSelection = (item) => {
    const index = selectedItems.findIndex(selectedItem => selectedItem._id === item._id);
    console.log(index, "index")
  
    if (index > -1) {
      // If the item is already selected, remove it from the list
      setSelectedItems(currentItems => currentItems.filter((_, idx) => idx !== index));
    } else {
      // If the item is not selected, add it to the list
      setSelectedItems(currentItems => [...currentItems, item]);
    }
  };


  const PeopleCard = ({userData}) => {
    
    
    return (
        <TouchableOpacity
            onPress={() => toggleItemSelection(userData)}
            style={people_styles.cardContainer}
        >
            {/* images */}
            <View style={people_styles.imageContainer}>
                <FontAwesome5 name="users" size={24} color="#555" />
            </View>

            <View style={people_styles.contentContainer}>
                <Text style={people_styles.roomName}>
                    {userData.userName}
                </Text>
                
            </View>
        </TouchableOpacity>
    );
  };


  

  const InputGrid = () => {
    return (
      <View style={styles.grid_container}>
        <View style={styles.grid_row}>
          <TextInput style={styles.grid_input}
           placeholder="Interest 1" value={interest1} onChangeText={setInterest1}/>
          <TextInput style={styles.grid_input} 
          placeholder="Interest 2" value={interest2} onChangeText={setInterest2}/>
        </View>
        <View style={styles.grid_row}>
          <TextInput style={styles.grid_input} 
          placeholder="Interest 3" value={interest3} onChangeText={setInterest3}/>
          <TextInput style={styles.grid_input} 
          placeholder="Interest 4" value={interest4}onChangeText={setInterest4}/>
        </View>
      </View>
    );
  };
  


  return (
    <View contentContainerStyle={styles.container}>

      <TextInput
        placeholder="Search people..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />

      {/* Displays selected people */}
      <FlatList style={styles.selectedItemsContainer}
        data={selectedItems}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <View key={item._id} style={styles.selectedItem}>
          <Text style={styles.selectedItemText}>{item.userName}</Text>
              <TouchableOpacity onPress={() => toggleItemSelection(item)}>
                <Text style={styles.removeItem}>X</Text>
              </TouchableOpacity>
          </View>
        )}
        >
      </FlatList>

      <FlatList
        data={searchResults}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
            <PeopleCard userData={item}/>
        )}
      />



      <View style={styles.advancedSearchContainer}>
        <Text onPress={() => setShowAdvanced(!showAdvanced)} style={styles.advancedFilterText}>{showAdvanced ?'Hide Advanced Filter' : 'Show Advanced Filter'}</Text>
        {showAdvanced && (
          <View>
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
            
            <Dropdown
                    style={[styles.dropdown, isYearFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={all_years}
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
                        setIsYearFocus(false);
                         }}
                    />
            
            <Text> Search by at most four interests</Text>

            <InputGrid/>


          </View>
        )}
      </View>


      <TextInput
        style={styles.message_input}
        multiline
        placeholder="Type your message here..."
        value={message}
        onChangeText={setMessage}
        scrollEnabled={true} // Enable scrolling
      />
      <Button title="Create" onPress={() => console.log('Create button pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  input: {
    width: '100%',
    marginVertical: 15, // Increased space between components
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  message_input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  advancedSearchContainer: {
    width: '100%',
    marginVertical: 15, // Adjusted for consistency
  },
  advancedFilterText: {
    fontWeight: 'bold',
    marginBottom: 10, // Space between the toggle and the inputs
  },

  selectedItemsContainer: {
    flexDirection: 'row', // Or 'column' for a vertical list
    flexWrap: 'wrap',
    padding: 10,
    maxHeight: 100
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedItemText: {
    marginRight: 4,
  },
  removeItem: {
    color: '#999',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  grid_container: {
    padding: 10, // Adjust padding as needed
  },
  grid_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Space between rows
  },
  grid_input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    flex: 1, // Make input boxes expand equally
    margin: 5, // Space between input boxes
  },
  message_input: {
    height: 100, // Adjust based on your line height and number of lines
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textAlignVertical: 'top', // Ensure text starts from the top
    borderRadius: 5, // Optional: for rounded corners
    overflow: 'hidden', // Ensures the content doesn't overflow the container
  },

});

export default SearchScreen;


const people_styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 2,
        padding: 4,
        width: '100%',
    },
    imageContainer: {
        width: 32,
        height: 32,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'blue', // Replace 'blue' with your primary color
        padding: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 4,
    },
    roomName: {
        color: '#333', // Replace with your specific color
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    roomText: {
        color: 'black', // Replace with your primaryText color
        fontSize: 14,
    },
    timeText: {
        color: 'blue', // Replace 'blue' with your primary color
        paddingHorizontal: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    // Add more styles as needed
});
