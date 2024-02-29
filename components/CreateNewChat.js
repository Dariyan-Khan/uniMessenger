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
  const [title, setTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [subjectStudying, setSubjectStudying] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [message, setMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery) {
        console.log("Searching for:", searchQuery)
        performSearch();
      } else {
        setSearchResults([]); // Clear results if search query is cleared
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timerId);
  }, [searchQuery, subjectStudying, yearOfStudy]); // Add other dependencies as needed



  const toggleItemSelection = (item) => {
    console.log(selectedItems.length, "selectedItems length")
    console.log(item, "item")
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


  // Function to get users by username search query
    async function performSearch() {
    const usersColRef = collection(FIRESTORE_DB, 'users');
    const q = query(usersColRef, where('userName', '>=', searchQuery), where('userName', '<=', searchQuery + '\uf8ff'));

    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }));


    console.log("users", users[0]);
    setSearchResults(users);
    return users;
    }



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


  return (
    <View contentContainerStyle={styles.container}>
      {/* <TextInput
        placeholder="Type in a title..."
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      /> */}

      <TextInput
        placeholder="Search people..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />

      {/* <View style={styles.selectedItemsContainer}>
        {selectedItems.map((item) => (
          <View key={item._id} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{item.userName}</Text>
            <TouchableOpacity onPress={() => toggleItemSelection(item)}>
              <Text style={styles.removeItem}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View> */}

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

        <Text>Search results below:</Text>

      <FlatList
        data={searchResults}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
            <PeopleCard userData={item}/>
        )}
      />

      


        {/* <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={require(uni_list_url)}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select University' : '...'}
        searchPlaceholder="Search..."
        value={selectedUni}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
            setUni(item.value);
            // handleState(item.value);
            // setCountryName(item.label);
            setIsFocus(false);
                }}
        />

      <View style={styles.advancedSearchContainer}>
        <Text onPress={() => setShowAdvanced(!showAdvanced)} style={styles.advancedFilterText}>Advanced Filter</Text>
        {showAdvanced && (
          <View>
            <TextInput
              placeholder="Subject Studying"
              value={subjectStudying}
              onChangeText={setSubjectStudying}
              style={styles.input}
            />
            <TextInput
              placeholder="Year of Study"
              value={yearOfStudy}
              keyboardType="numeric"
              onChangeText={setYearOfStudy}
              style={styles.input}
            />
          </View>
        )}
      </View>

      <TextInput
            style={styles.message_input}
            multiline
            placeholder="Type your message here..."
            value={message}
            onChangeText={setMessage}
          />
      <Button title="Create" onPress={() => console.log('Create button pressed')} /> */}
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
