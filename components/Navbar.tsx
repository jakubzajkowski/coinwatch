import {TouchableOpacity, View,StyleSheet} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Theme from "../Theme";
import {useNavigation} from "@react-navigation/native";

// @ts-ignore
const NavBar = () =>{
    const navigation = useNavigation();
    return <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <Entypo name="home" size={24} color={Theme.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <MaterialIcons name="fitness-center" size={24} color={Theme.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <FontAwesome name="user" size={24} color={Theme.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <FontAwesome5 name="hands-helping" size={24} color={Theme.secondary} />
        </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({
   navbar : {
       flexDirection: 'row',
       height: 60,
       alignItems: 'center',
       justifyContent: 'space-between',
       paddingHorizontal: 20
   }
});

export default NavBar