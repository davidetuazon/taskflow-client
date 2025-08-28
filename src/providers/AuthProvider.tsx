import React, {
    createContext, useContext, useState, ReactNode,
    useEffect,
} from "react";
import { me } from "../services/api";

type AuthContextValue = {
    user: any,
    setUser: (user: any) => void,
    // isLogin: boolean,
    // setIsLogin: (login: boolean) => void;
};

type Props = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider(props: Props) {

    const init = async () => {
        try {
            const res = await me();
            setUser(res);
        } catch (e) {
            setUser(null);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const [user, setUser] = useState<any>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return <AuthContext.Provider
        value={{
            user,
            setUser,
            // isLogin,
            // setIsLogin,
        }}
    >
        {props.children}
    </AuthContext.Provider>
};
