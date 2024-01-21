import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';
import InterestItem from './InterestItem'; // Adjust the path as needed


const InterestBox = () => {
    const [interest, setInterest] = useState("");
    const [interestList, setInterestList] = useState([]);
    const [key, setKey] = useState(0);
    const containerHeight = 190;

    const handleEnterPress = () => {
      setInterestList(oldList => [...oldList, interest]);
      setInterest("");
      setKey(k => k + 1);
    };

    const handleRemoveInterest = (interest) => {
      setInterestList(currentInterests => currentInterests.filter(item => item !== interest));
    };
  
    return (
      <View>
        <TextInput
          key={key}
          value={interest}
          onChangeText={setInterest}
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
        <View style={{ height: containerHeight }}>
          <FlatList
            data={interestList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <InterestItem interest={item} onRemove={handleRemoveInterest} />
            )}
          />
        </View>

        {/* <FlatList
        data={interestList}
        renderItem={({item}) => (
          <Text>{item}</Text>
        )}
       /> */}
        
      </View>
    );
  };

  export default InterestBox;