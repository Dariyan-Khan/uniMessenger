import React, { useState } from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';

const InterestBox = () => {
    const [interest, setInterest] = useState(false);
    let interestList = []

    const handleEnterPress = (userInterest) => {
      setInterest(userInterest);
      interestList.push(userInterest)
    };
  
    return (
      <View>
        <TextInput
          value={interest}
          onSubmitEditing={handleEnterPress}
          style={{
              fontSize: interest ? 18 : 18,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
              width: 300,
          }}
          placeholderTextColor={"black"}
          placeholder="enter Your Interests"/>

        <FlatList
        data={interestList}
        renderItem={({item}) => (
          <Text>{item}</Text>
        )}
       />
        
      </View>
    );
  };

  export default InterestBox;