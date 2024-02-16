import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, TextInput, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBarComponent from './SearchBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SearchComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationValue = new Animated.Value(0);

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const animatedStyle = {
    width: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [40, screenWidth], // Width from 40 to full screen
    }),
    height: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [40, screenHeight], // Height from 40 to full screen
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        {isExpanded ? (
          //<TextInput style={styles.input} placeholder="Search..." autoFocus />
          <SearchBarComponent style={{justifyContent: 'centre', padding:0}}  />
        ) : (
          <TouchableOpacity onPress={() => setIsExpanded(true)}>
            <Icon name="search" size={18} color="#000" style={{paddingLeft:8, paddingTop:6}}/>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Style your container
  },
  input: {
    // Style your TextInput
  },
});

export default SearchComponent;

