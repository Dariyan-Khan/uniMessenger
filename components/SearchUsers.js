// import React, { useState } from 'react';
// import { StyleSheet, View, TextInput, SafeAreaView, Text } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const SearchBarComponent = () => {
//   const [searchQuery, setSearchQuery] = useState(''); 

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.searchSection}>
//         <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="#000"/>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <Text>more...</Text>
//       </View>
//       {/* Rest of your component */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     margin: 12,
//     paddingHorizontal: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   searchIcon: {
//     padding: 10,
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 20,
//     fontSize: 16,
//   },
// });

// export default SearchBarComponent;
import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, TextInput, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SearchComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationValue = new Animated.Value(0);

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
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
          <TextInput style={styles.input} placeholder="Search..." autoFocus />
        ) : (
          <TouchableOpacity onPress={() => setIsExpanded(true)}>
            <Icon name="search" size={20} color="#000" />
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

