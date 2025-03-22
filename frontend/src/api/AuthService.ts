
import {FormDataType} from "../pages/SignUp.tsx";
import axiosClient from "../utils/axiosClient.ts";

type UserDataType = FormDataType

interface UserRegisterResponseTYpe{
    id: number
    email: string
}

class AuthService {
    async register(userData: UserDataType): Promise<UserRegisterResponseTYpe> {
        return await axiosClient.post("/api/signup", userData);
    }
}

export default new AuthService();