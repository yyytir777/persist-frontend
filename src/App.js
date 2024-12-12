import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/SignUp';
import GoogleLoginHandler from './pages/login/GoogleLoginHandler';
import KakaoLoginHandler from './pages/login/KakaoLoginHandler';
import SplashScreen from './pages/SplashScreen';
import LogDetail from './components/LogDetail';
import { LoginProvider, useLoginState } from './components/context/LoginContext';
import checkLogin from './components/api/CheckLogin';
import Editor from './pages/Editor';


const Root = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    height: 100%;
`;

function AppConent() {
    const {setLogin, setLogout} = useLoginState();
    const [isLoading, setIsLoading] = useState(true);

    localStorage.setItem('URL', 'http://localhost:8080');

    // 로그인 시 렌더링할 때 accessToken 업데이트
    useEffect(() => {

        const initLogin = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if(!accessToken) {
                setLogout();
                setIsLoading(false);
                return;
            }
            
            const isLoginValid = await checkLogin();
            if(!isLoginValid) setLogout();
            else setLogin();
            setIsLoading(false);
        }

        initLogin();
    }, [setLogin, setLogout]);

    return(
        <Root> {isLoading ? (<SplashScreen />) : (
            <BrowserRouter>
                <Header />
                <Content>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/SignUpPage' element={<SignUpPage />} />

                        <Route path='/logs/:id' element={<LogDetail />} />
                        {/* <Route path='/settings' element={<Settings />} /> */}

                        {/* Redirect Login Handler Page */}
                        <Route path='/oauth/callback/google' element={<GoogleLoginHandler />} />
                        <Route path='/oauth/callback/kakao' element={<KakaoLoginHandler />} />

                        <Route path='/editor' element={<Editor />} />

                        {/* 404 page */}
                        <Route path="*" element={<NotFoundPage />} />

                        {/* Network Error Page */}

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