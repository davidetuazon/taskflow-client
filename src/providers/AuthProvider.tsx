import React, {
    createContext, useContext, useState, ReactNode,
} from "react";

type AuthContextValue = {
    user: any,
    setUser: (user: any) => void,
    isLogin: boolean,
    setIsLogin: (login: boolean) => void;
};

type Props = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider(props: Props) {

    const [user, setUser] = useState<any>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return <AuthContext.Provider
        value={{
            user,
            setUser,
            isLogin,
            setIsLogin,
        }}
    >
        {props.children}
    </AuthContext.Provider>
};
