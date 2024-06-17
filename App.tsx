import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PlanScreen from "./screens/PlanScreen";
import Navbar from "./components/Navbar";
import { Provider } from 'react-redux';
import store from "./store/store";
import LoadingScreen from "./screens/LoadingScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


export type RootStackParamList = {
    Login: undefined
    Home: undefined
    Plan: undefined
    Loading: undefined
};




export default function App() {
    const Stack = createStackNavigator<RootStackParamList>();
    const Tab = createBottomTabNavigator()
    return (
        <Provider store={store}>
        <NavigationContainer >
            <Tab.Navigator>
                <Tab.Screen name={'Loading'} component={LoadingScreen} options={{
                    tabBarIcon: ()=>,
                }}></Tab.Screen>
            </Tab.Navigator>
            {/*<Stack.Navigator initialRouteName={"Loading"} screenOptions={{ headerShown: false }}>*/}
            {/*    <Stack.Screen name="Loading" component={LoadingScreen} />*/}
            {/*    <Stack.Screen name="Home" component={HomeScreen} />*/}
            {/*    <Stack.Screen name="Login" component={LoginScreen} />*/}
            {/*    <Stack.Screen name="Plan" component={PlanScreen} />*/}
            {/*</Stack.Navigator>*/}
            {/*<Navbar />*/}
        </NavigationContainer>
        </Provider>
    );
}