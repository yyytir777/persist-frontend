import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';

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
    return (
        <Root>
            <BrowserRouter>
                <Header />
                <Content>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/login' element={<Login />}/>
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