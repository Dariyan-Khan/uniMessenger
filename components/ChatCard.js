import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatCard = ({ room }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ChatScreen", { room: room })}
            style={styles.cardContainer}
        >
            {/* images */}
            <View style={styles.imageContainer}>
                <FontAwesome5 name="users" size={24} color="#555" />
            </View>
            {/* content */}
            <View style={styles.contentContainer}>
                <Text style={styles.roomName}>
                    {room.name} | {room.anonymous ? "Anonymous" : room?.userName}
                </Text>
                <Text style={styles.roomText}>
                    Lorem ipsum dolor sit amet consec tetur adipis adip isicing icing
                    elit....
                </Text>
            </View>
            {/* time text */}
            <Text style={styles.timeText}>27 min</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 2,
        width: '100%',
    },
    imageContainer: {
        width: 64,
        height: 64,
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

export default ChatCard;
