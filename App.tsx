import Main from "./Main";
import store from "./store/store";
import {Provider} from "react-redux";
import {SQLiteProvider} from "expo-sqlite";
import {Suspense} from "react";
import {Text} from "react-native";


const App = ()=>{
    return(
        <Suspense fallback={''}>
            <SQLiteProvider databaseName="gymfit" useSuspense={true}>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </SQLiteProvider>
        </Suspense>
        )
}


export default App