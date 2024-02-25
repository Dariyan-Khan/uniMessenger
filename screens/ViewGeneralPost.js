import React from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { faker } from '@faker-js/faker';

const ViewGeneralPost = ({ route }) => {
  const { room, userName } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: faker.image.avatar()}} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{room.anonymous ? "Anonymous" : room.userName}</Text>
          {/* Remove the uni text */}
        </View>
      </View>
      <Text style={styles.post}>{room.message}</Text>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comments:</Text>
        {/* Render comments here */}
        <TextInput
          style={styles.commentInput}
          placeholder="Type your reply here..."
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  post: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentsSection: {
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    paddingTop: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
});

export default ViewGeneralPost;
