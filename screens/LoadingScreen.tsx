import {Image, StyleSheet, View} from "react-native";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";


// @ts-ignore
const LoadingScreen = ({ navigation }) =>{
    const state = useSelector((state: RootState) => state.app);
    useEffect(() => {
        const timer = setTimeout(() => {
            if(state.user){
                navigation.replace('MainTabs');
            }else {
                navigation.replace('Login');
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigation]);
    return <View style={styles.container}>
        <Image
            source={require('../assets/gymfit.jpg')}
            style={styles.image}
        />
    </View>
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    }
})

export default LoadingScreen