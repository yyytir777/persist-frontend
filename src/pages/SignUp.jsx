import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    width: 50%;
    height: 100%;
    margin: 100px 0px;
    display:flex;
    flex-direction: column;
`;

const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
`;

const RegisterForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const EmailInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const NameInputWrapper = styled.div`
    display: flex;
    flex-direction: column;

`;

const LogNameInputWrapper = styled.div`
    display: flex;
    flex-direction: column;

`;

const SubmitWrapper = styled.div`
`;

const Label = styled.label`
    margin: 16px 0px;
`;

const Input = styled.input`
    width: 80%;
    height: 36px;
`;

const Button = styled.button`

`;

export default function SignUpPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

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
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <SignUpWrapper>
            <SignUp>
                <Title>회원가입</Title>
                <RegisterForm onSubmit={handleSubmit}>
                    <EmailInputWrapper>
                        <Label htmlFor="email">이메일</Label>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            value={email}
                            readOnly
                        />
                    </EmailInputWrapper>

                    <NameInputWrapper>
                        <Label htmlFor="name">이름</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="이름을 입력하세요"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </NameInputWrapper>

                    <LogNameInputWrapper>
                        <Label htmlFor="logName">로그 이름</Label>
                        <Input 
                            id="logName"
                            type="text"
                            name="logName"
                            placeholder="로그이름을 입력하세요"
                            onChange={handleChange}
                            value={formData.logName}
                        />
                    </LogNameInputWrapper>

                    <SubmitWrapper>
                        <Button type="submit">회원가입</Button>
                    </SubmitWrapper>
                </RegisterForm>
            </SignUp>
        </SignUpWrapper>
    );
}