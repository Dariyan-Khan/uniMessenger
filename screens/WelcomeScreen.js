import React, { useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';


const WelcomeScreen = ({uni, userName}) => {
    const { currentUser } = useContext(AuthContext)

    //console.log(currentUser)
    console.log(uni)
    return (
        <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'}}>

        <Text style={{fontSize: 30,
                    fontWeight: 'bold'}}>
            
            {`Welcome ${userName} to ${uni}`}</Text>
        

        </View>

    );
};

export default WelcomeScreen;