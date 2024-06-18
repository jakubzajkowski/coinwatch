import React from 'react';
import {Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {AntDesign} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {setPassword, setUsername} from "../store/reducers/appSlice";

// @ts-ignore
function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.app);
    const handleSetUsername = (input:string) => {
        dispatch(setUsername(input));
    };
    const handleSetPassword = (input:string) => {
        dispatch(setPassword(input));
    };
    return (
            <LinearGradient colors={['orange', 'red']} style={styles.gradient}>
                <AntDesign name="login" size={50} color="white" />
                <Text style={styles.header}>Sign up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="white"
                    onChangeText={handleSetUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    onChangeText={handleSetPassword}
                />
                <TouchableOpacity onPress={()=>console.log(count)} style={styles.buttonContainer}>
                    <Text style={styles.button}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.buttonContainer,backgroundColor:"#1877F2",marginTop: 10}}>
                    <Text style={{...styles.button,color:"white"}}><AntDesign name="facebook-square" size={20} color="white" />LOGIN WITH FACEBOOK</Text>
                </TouchableOpacity>
                <Text style={styles.signin}>I don't have an account</Text>
            </LinearGradient>

    );
}

const styles = StyleSheet.create({
    header : {
        marginTop: 20,
        fontSize: 40,
        color: "white"
    },
    input : {
        margin: 10,
        padding: 8,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: "70%",
        color: "white"
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        marginTop: 50,
        width: "70%",
    },
    button: {
        textAlign: "center",
        color: 'red',
        fontSize: 18,
    },
    signin: {
        color: "white",
        marginTop: 10
    }
})

export default LoginScreen;