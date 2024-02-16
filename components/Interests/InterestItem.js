import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InterestItem = ({ interest, onRemove }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{interest}</Text>
      <TouchableOpacity onPress={() => onRemove(interest)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0', // Change as needed
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      borderWidth: 1, // Add a black border
      borderColor: 'black', // Border color
    },
    itemText: {
      flex: 1,
    },
    removeButton: {
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
      // Remove background and adjust size as needed
    },
    removeButtonText: {
      color: 'black', // Change text color to black
      fontWeight: 'bold',
      // Remove background-specific styles if any
    },
  });
  

export default InterestItem;