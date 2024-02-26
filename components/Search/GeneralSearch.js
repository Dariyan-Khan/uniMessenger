import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, TextInput, StyleSheet, View, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBarComponent from './SearchBar';


const GeneralSearchComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationValue = new Animated.Value(0);
  const screenWidth = Dimensions.get('window').width;
  


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
      outputRange: [40, screenWidth - 14], // Width from 40 to full screen  and 14 is so that the plus goes off screen (this is a bit hacky though)
    }),
    transform: [
      {
        scaleX: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1], // Example scaling, adjust based on needs
        }),
      },
    ],
    opacity: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1], // Keep opacity constant if you don't want it to fade
    }),
  };
  

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        {isExpanded ? (
          //<TextInput style={styles.input} placeholder="Search..." autoFocus />
          <SearchBarComponent parentIsExpanded={setIsExpanded} style={{justifyContent: 'centre', padding:0}}  />
        ) : (
          <TouchableOpacity onPress={() => setIsExpanded(true)}>
            <Icon name="search" size={18} color="#000" style={{paddingLeft:0, paddingTop:0}}/>
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

export default GeneralSearchComponent;

