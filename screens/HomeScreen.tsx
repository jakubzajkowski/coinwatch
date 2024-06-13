import React, {FC} from 'react';
import { View, Text, Button } from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootState} from "../store/reducers/rootReducer";
import {useSelector} from "react-redux";


// @ts-ignore
function HomeScreen({ navigation }) {
    const count = useSelector((state: RootState) => state.counter.count);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Text>{count}</Text>
        </View>
    );
}

export default HomeScreen;