import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PlanScreen from "./screens/PlanScreen";



type RootStackParamList = {
    Login: { }
    Home:{ }
    Plan: {}
};




// @ts-ignore
export default function App() {
    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Plan" component={PlanScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}