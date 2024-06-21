import Main from "./Main";
import store from "./store/store";
import {Provider} from "react-redux";


const App = ()=>{
    return(
        <Provider store={store}>
            <Main/>
        </Provider>
        )
}


export default App