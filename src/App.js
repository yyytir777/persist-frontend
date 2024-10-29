import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const Root = styled.div`
    width: 100%;
    height: auto;

    flex-direction: column;
`;

function App() {
    return (
        <Root>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/' element={<Home />}/>
                </Routes>

                <Footer />
            </BrowserRouter>
        </Root>
    );
}

export default App;