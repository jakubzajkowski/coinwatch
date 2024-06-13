import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PlanScreen from "./screens/PlanScreen";
import Navbar from "./components/Navbar";
import { Provider } from 'react-redux';
import store from "./store/store";


export type RootStackParamList = {
    Login: undefined
    Home: undefined
    Plan: undefined
};




// @ts-ignore
export default function App() {
    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Plan" component={PlanScreen} />
            </Stack.Navigator>
            <Navbar/>
        </NavigationContainer>
        </Provider>
    );
}