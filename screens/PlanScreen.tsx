import React, {FC} from 'react';
import { View, Text, Button } from 'react-native';

// @ts-ignore
function PlanScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Plan Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Loading')}
            />
        </View>
    );
}

export default PlanScreen;