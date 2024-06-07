import React, {FC} from 'react';
import { View, Text, Button } from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack";


// @ts-ignore
function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

export default HomeScreen;