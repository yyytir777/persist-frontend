import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

// LoginProvider 컴포넌트 정의
export function LoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);

    const setLogin = () => {
        setIsLogin(true);
    }

    const setLogout = () => {
        setIsLogin(false);
    }

    return (
        <LoginContext.Provider value={{isLogin, setLogin, setLogout}}>
            {children}
        </LoginContext.Provider>
    );
}

// 커스텀 훅 정의
export function useLoginState() {
    
    return useContext(LoginContext);
}