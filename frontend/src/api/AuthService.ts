
import {FormDataType} from "../pages/SignUp.tsx";
import axiosClient from "../utils/axiosClient.ts";
import {AxiosResponse} from "axios";

type UserDataType = FormDataType

interface UserRegisterResponseTYpe{
    id: number
    email: string
}

class AuthService {
    async register(userData: UserDataType): Promise<AxiosResponse<UserRegisterResponseTYpe>> {
        return await axiosClient.post("/api/signup", userData);
    }
}

export default new AuthService();