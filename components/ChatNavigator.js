import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChatToggle = ({setParentTab}) => {
  const [selectedChat, setSelectedChat] = useState('YourChats');


  useEffect(() => {
    setParentTab(selectedChat);
  }, [selectedChat]);

  const handleYourChatsPress = () => {
    setSelectedChat('YourChats');
    // Add navigation or other logic here
  };

  const handleGeneralChatPress = () => {
    setSelectedChat('GeneralChat');
    // Add navigation or other logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, selectedChat === 'YourChats' && styles.activeTab]}
        onPress={handleYourChatsPress}
      >
        <Text style={styles.tabText}>Your Chats</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedChat === 'GeneralChat' && styles.activeTab]}
        onPress={handleGeneralChatPress}
      >
        <Text style={styles.tabText}>General Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
});

export default ChatToggle;

