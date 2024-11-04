import React, { createContext, useContext, useMemo, useState } from 'react';

const LoginContext = createContext();

// LoginProvider 컴포넌트 정의
export function LoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);

    const actions = useMemo(
        () => ({
            login() {
                setIsLogin(true);
            },
            logout() {
                setIsLogin(false);
            }
        }), []
    );

    const value = useMemo(() => [isLogin, actions], [isLogin, actions]);

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}

// 커스텀 훅 정의
export function useLoginState() {
    const value = useContext(LoginContext);
    if (value === undefined) throw new Error('useLoginState must be used within a LoginProvider');
    return value;
}
