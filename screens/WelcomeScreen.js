import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
    return (
        <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'}}>

        <Text style={{fontSize: 30,
                    fontWeight: 'bold'}}>
            
            Welcome</Text>
        
        
        </View>

    );
};

export default WelcomeScreen;