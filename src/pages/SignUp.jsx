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
    margin: 30px 0px;
    display:flex;
    flex-direction: column;

    @media screen and (max-width: 620px) {
        width: 70%;
    }
`;

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
`;

const RegisterForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto; 
`;

const SubmitWrapper = styled.div`
    margin: 0 24%;
`;

const InputContainer = styled.div`
`;

const Label = styled.label`
    margin: 16px 0px;
`;

const Input = styled.input`
    width: 100%;
    height: 36px;

    @media screen and (max-width: 1920px) {
        width: 300px;
    }

    @media screen and (max-width: 620px) {
        width: 200px;
    }
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
                    <InputWrapper>
                        <Label htmlFor="email">이메일</Label>
                        <InputContainer>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                value={email}
                                readOnly
                            />
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <Label htmlFor="name">이름</Label>
                        <InputContainer>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="이름을 입력하세요"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </InputContainer>
                    </InputWrapper>

                    <InputWrapper>
                        <Label htmlFor="logName">로그 이름</Label>
                        <InputContainer>
                            <Input 
                                id="logName"
                                type="text"
                                name="logName"
                                placeholder="로그이름을 입력하세요"
                                onChange={handleChange}
                                value={formData.logName}
                            />
                        </InputContainer>
                    </InputWrapper>

                    <SubmitWrapper>
                        <Button type="submit">회원가입</Button>
                    </SubmitWrapper>
                </RegisterForm>
            </SignUp>
        </SignUpWrapper>
    );
}