import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
  } from "firebase/firestore";

const GeneralChatPost = ({ route }) => {
    const { uni, userName } = route.params;
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [title, setTitle] = useState('');
    const auth = FIREBASE_AUTH;
    const user = auth.currentUser;
    


    const sendMessage = async () => {
        const timeStamp = serverTimestamp();
        const id = `${Date.now()}`;
        const _doc = {
        _id: id,
        name: title,
        timeStamp: timeStamp,
        message: message,
        userid: user.uid,
        userName: userName,
        anonymous: isAnonymous

        };

        setMessage("");
        setTitle("");
        await addDoc(
            collection(FIRESTORE_DB, "universities", uni, "General"),
                _doc
            )
        .then(() => {
            navigation.goBack();
        })
        .catch((err) => alert(err));
    };
    // Add logic to send the message

    return (
        <View style={styles.container}>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter title here..."
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            multiline
            placeholder="Type your message here..."
            value={message}
            onChangeText={setMessage}
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setIsAnonymous(!isAnonymous)}>
              {isAnonymous && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Anonymous</Text>
          </View>
          <Button title="Send" onPress={sendMessage} color="#007AFF" />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      titleInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
      },
      input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      },
      checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#555',
      },
      checkboxLabel: {
        fontSize: 16,
      },
    });
    
    export default GeneralChatPost;