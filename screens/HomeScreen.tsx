import React, {FC} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {RootState} from "../store/reducers/rootReducer";
import {useSelector} from "react-redux";


// @ts-ignore
function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('PlanDMain')}
            />
        </View>
    );
}

export default HomeScreen;