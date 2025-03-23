import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, ReducerType} from "../redux/store.ts";
import {login} from "../redux/actions.ts";


const Alerts = () =>{
    const { user, isAuthenticated } = useSelector((state: ReducerType) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = { id: '123', name:"awda" };
        dispatch(login(newUser));

    };
    return <div style={{margin: "10rem 0 0 0"}}>
        {isAuthenticated && "Hello World"}
        {user?.name}
        Hello World
        <button onClick={handleSubmit}>Submit</button>
    </div>
}

export default Alerts;