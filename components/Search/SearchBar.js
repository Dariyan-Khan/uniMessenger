import React, { useState } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBarComponent = ({parentIsExpanded}) => {
  const [searchQuery, setSearchQuery] = useState(''); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>

      <Ionicons 
  style={styles.searchIcon} 
  name="arrow-back" 
  size={20} 
  color="#000"
  onPress={() => parentIsExpanded(false)}
/>

        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* <Text>more...</Text> */}
      </View>
      {/* Rest of your component */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
  },
});

export default SearchBarComponent;