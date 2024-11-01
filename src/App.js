import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import './css/App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import GoogleLoginHandler from './pages/GoogleLoginHandler';
import KakaoLoginHandler from './pages/KakaoLoginHandler';
import accessTokenReissueApi from './components/api/AccessTokenReissueApi';

const Root = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    height: 100%;
`;

function App() {

    //15분마다 자동으로 accessToken 재발급
    useEffect(() => {
        const updateToken = async () => {
            const url = localStorage.getItem('URL');
            const accessToken = localStorage.getItem('accessToken');
            
            // login을 안해서 token이 없을때는 상태 유지
            if (accessToken === undefined) {
                console.log('accessToken 없음 -> 상태 유지');
                return;
            }

            try {
                const response = await axios.get(`${url}/health/memberInfo`, {
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log(response.data);

                if (response.data.code === 'T002') { // accessToken Expired
                    console.log('accessToken Expired');
                    await accessTokenReissueApi();
                } else if (response.data.code === 'T005') { // refreshToken Expired
                    alert(response.data.errorMessage);
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
                }

            } catch (error) {
                console.log(error.response.data);
            }
        };

        const intervalRequest = setInterval(updateToken, 15 * 60 * 1000);

        return () => clearInterval(intervalRequest);
    }, []);

    useEffect(() => {
        localStorage.setItem('URL', 'http://localhost:8080');
    }, []);

    return (
        <Root>
            <BrowserRouter>
                <Header />
                <Content>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        {/* <Route path='/settings' element={<Settings />} /> */}

                        {/* Redirect Login Handler Page */}
                        <Route path='/oauth/callback/google' element={<GoogleLoginHandler />} />
                        <Route path='/oauth/callback/kakao' element={<KakaoLoginHandler />} />


                        {/* 404 page */}
                        <Route path="*" element={<NotFoundPage />} />

                    </Routes>

                    <Footer />
                </Content>
            </BrowserRouter>
        </Root>
    );
}

export default App;