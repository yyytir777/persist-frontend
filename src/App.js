import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/login/Login';
import GoogleLoginHandler from './pages/login/GoogleLoginHandler';
import KakaoLoginHandler from './pages/login/KakaoLoginHandler';
import updateToken from './components/api/UpdateToken';
import SplashScreen from './pages/SplashScreen';
import LogDetail from './components/LogDetail';
import { LoginProvider, useLoginState } from './components/context/LoginContext';
import useUpdateToken from './components/api/UpdateToken';

const Root = styled.div`
    overflow-y: scroll;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    height: 100%;
`;

function AppConent() {
    const {isLogin, setLogin, setLogout} = useLoginState();
    const [isLoading, setIsLoading] = useState(true);

    const loginSuccess = () => {
        setLogin();
    }

    useEffect(() => {
        localStorage.setItem('URL', 'http://localhost:8080');

        try {
            const response = updateToken();
            
            if(!response) setLogout();
            else setLogin();
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 30 분마다 자동으로 accessToken 재발급
    useEffect(() => {
        const intervalRequest = setInterval(() => updateToken(), 30 * 60 * 1000);
        return () => clearInterval(intervalRequest);
    }, []);

    return(
        <Root>
            {isLoading ? (<SplashScreen />)
            : (
                <BrowserRouter>
                    <Header />
                    <Content>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />

                            <Route path='/logs/:id' element={<LogDetail />} />
                            {/* <Route path='/settings' element={<Settings />} /> */}

                            {/* Redirect Login Handler Page */}
                            <Route path='/oauth/callback/google' element={<GoogleLoginHandler onLoginSuccess={loginSuccess} />} />
                            <Route path='/oauth/callback/kakao' element={<KakaoLoginHandler onLoginSuccess={loginSuccess} />} />

                            {/* 404 page */}
                            <Route path="*" element={<NotFoundPage />} />

                        </Routes>

                        <Footer />
                    </Content>
                </BrowserRouter>
            )}
        </Root>
    );
}

function App() {
    return(
        <LoginProvider>
            <AppConent />
        </LoginProvider>
    );
}

export default App;