import React, {FC} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {RootState} from "../store/reducers/rootReducer";
import {useSelector} from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";


// @ts-ignore
function HomeScreen({ navigation }) {
    const state = useSelector((state: RootState) => state.app);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <FontAwesome name="user" size={50} color="orange" />
                <View>
                    <Text style={styles.h}>{state.user.firstname} {state.user.lastname}</Text>
                    <Text style={styles.date}>23 June 2024</Text>
                </View>
            </View>
            <Text style={styles.heading}>Workout Plans</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'flex-start',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginLeft: 20
    },
    h: {
        fontSize: 16,
        marginLeft: 15,
    },
    heading: {
        fontSize: 18,
        margin: 20,
    },
    date: {
        fontSize: 11,
        marginLeft: 15,
    },
})

export default HomeScreen;