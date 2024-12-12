import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import apiClient from "../components/api/AxiosInterceptor";

const SignUpWrapper = styled.div`
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SignUp = styled.div`
    width: 400px;
    height: 800px;
`;
const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
`;

const NameForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const EmailInputWrapper = styled.div`
`;

const NameInputWrapper = styled.div`
`;

const LogNameInputWrapper = styled.div`
`;

const SubmitWrapper = styled.div`
`;

export default function SignUpPage() {
    const location = useLocation();
    const email = location.state?.email || "";
    console.log('location : ', location);

    const [formData, setFormData] = useState({
        name: "",
        logName: "",
        thumbnail: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('이메일 : ', email);
        console.log('이름 : ', formData.name);
        console.log('로그 이름 : ', formData.logName);
        console.log('submitted');
        
        try {
            const response = await apiClient.post('/api/v1/member/register', {
                email: email,
                name: formData.name,
                logName: formData.logName,
                type: 'KAKAO'
            });
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <SignUpWrapper>
            <SignUp>
                <Title>회원가입</Title>
                <NameForm onSubmit={handleSubmit}>
                    <EmailInputWrapper>
                        <label htmlFor="email">이메일</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={email}
                            readOnly
                        />
                    </EmailInputWrapper>

                    <NameInputWrapper>
                        <label htmlFor="name">이름</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </NameInputWrapper>

                    <LogNameInputWrapper>
                        <label htmlFor="logName">로그 이름</label>
                        <input 
                            id="logName"
                            type="text"
                            name="logName"
                            placeholder="logName"
                            onChange={handleChange}
                            value={formData.logName}
                        />
                    </LogNameInputWrapper>

                    <SubmitWrapper>
                        <button type="submit">회원가입</button>
                    </SubmitWrapper>
                </NameForm>
            </SignUp>
        </SignUpWrapper>
    );
}