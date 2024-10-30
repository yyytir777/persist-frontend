import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './css/App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import LoginHandler from './pages/LoginHandler';
import { useEffect } from 'react';
import tokenReissueApi from "./components/api/TokenReissueApi";

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

    useEffect(() => {
        const errorHandling = async() => {
            const URL = localStorage.getItem('URL');
            const accessToken = localStorage.getItem('accessToken');

            try {
                await axios.get(`${URL}/health/memberInfo`, {
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
            } catch(error) {
                if(error.response.data.errorCode === 'T002') { //accessToken 만료
                    await tokenReissueApi();
                } else if (error.response.data.errorCode === 'T005') { //refreshToken 만료
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
            }
        };

        const intervalRequest = setInterval(errorHandling, 15 * 60 * 1000);
        return () => clearInterval(intervalRequest);
    }, []);

    return (
        <Root>
            <BrowserRouter>
                <Header />
                <Content>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/login' element={<Login />}/>

                        {/* Redirect Login Handler Page */}
                        <Route path='/oauth/callback/google' element={<LoginHandler />}/>


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