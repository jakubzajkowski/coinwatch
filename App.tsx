import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PlanScreen from "./screens/PlanScreen";
import { Provider } from 'react-redux';
import store from "./store/store";
import LoadingScreen from "./screens/LoadingScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import Theme from "./Theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PlanDetailsScreen from "./screens/PlanDetails";


export type RootStackParamList = {
    MainTabs: undefined
    Loading: undefined
};

export default function App() {
    const Stack = createStackNavigator<RootStackParamList>();
    const PlanStack = createStackNavigator();
    const PlanStackScreen = () => (
        <PlanStack.Navigator screenOptions={{ headerShown: false }}>
            <PlanStack.Screen name="PlanMain" component={PlanScreen} />
            <PlanStack.Screen name="PlanDMain" component={PlanDetailsScreen} />
        </PlanStack.Navigator>
    );
    const MainTabs = () => {
        const Tab = createBottomTabNavigator()
        return (
            <Tab.Navigator screenOptions={{tabBarShowLabel: false,headerShown:false}}>
                <Tab.Screen name={'Home'} component={HomeScreen} options={{
                    tabBarIcon: ()=> <Entypo name="home" size={24} color={Theme.secondary} />,
                }}></Tab.Screen>
                <Tab.Screen name={'Plan'} component={PlanScreen} options={{
                    tabBarIcon: ()=> <MaterialIcons name="fitness-center" size={24} color={Theme.secondary} />,
                }}></Tab.Screen>
                <Tab.Screen name={'Login'} component={LoginScreen} options={{
                    tabBarIcon: ()=> <FontAwesome5 name="hands-helping" size={24} color={Theme.secondary} />,
                }}></Tab.Screen>
                <Tab.Screen name={'User'} component={PlanStackScreen} options={{
                    tabBarIcon: ()=> <FontAwesome name="user" size={24} color={Theme.secondary} />,
                }}></Tab.Screen>
            </Tab.Navigator>
        );
    }

return (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
);

}