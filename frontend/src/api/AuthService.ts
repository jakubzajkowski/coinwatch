
import {FormDataType} from "../pages/SignUp.tsx";
import axiosClient from "../utils/axiosClient.ts";
import {AxiosResponse} from "axios";
import {FormLoginDataType} from "../pages/SignIn.tsx";

type UserRegisterDataType = FormDataType

type UserLoginDataType = FormLoginDataType

interface UserRegisterResponseTYpe{
    id: number
    email: string
}

interface UserLoginResponseType{
    token: string
    email: string
    firstname: string
    id: number
    lastname: string
}

class AuthService {
    async register(userData: UserRegisterDataType): Promise<AxiosResponse<UserRegisterResponseTYpe>> {
        return await axiosClient.post("/api/auth/signup", userData);
    }
    async login(userData: UserLoginDataType): Promise<AxiosResponse<UserLoginResponseType>> {
        return await axiosClient.post("/api/auth/signin", userData);
    }
}

export default new AuthService();