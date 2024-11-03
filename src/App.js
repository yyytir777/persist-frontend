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

function App() {

    const [isLogIn, setIsLogIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loginSuccess = () => {
        setIsLogIn(true);
    }

    useEffect(() => {
        localStorage.setItem('URL', 'http://localhost:8080');
        updateToken(setIsLogIn).finally(() => setIsLoading(false));
    }, []);

    // 30 분마다 자동으로 accessToken 재발급
    useEffect(() => {
        const intervalRequest = setInterval(() => updateToken(setIsLogIn), 30 * 60 * 1000);
        return () => clearInterval(intervalRequest);
    }, []);

    return (
        <Root>
            {isLoading ? (<SplashScreen />)
            : (
                <BrowserRouter>
                    <Header isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
                    <Content>
                        <Routes>
                            <Route path='/' element={<Home setIsLogIn={setIsLogIn} />} />
                            <Route path='/login' element={<Login />} />

                            <Route path='/logs/:id' element={<LogDetail setIsLogIn={setIsLogIn} />} />
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

export default App;