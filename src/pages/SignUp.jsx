import { useState } from "react";
import styled from "styled-components";

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

const NameInputWrapper = styled.div`
`;

const LogNameInputWrapper = styled.div`
`;

const SubmitWrapper = styled.div`
`;

export default function SignUpPage() {
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
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('이름 : ', formData.name);
        console.log('로그 이름 : ', formData.logName);
        console.log('submitted');
    }

    const handleSignUp = (event) => {
        console.log('click signup button');
    }

    return(
        <SignUpWrapper>
            <SignUp>
                <Title>회원가입</Title>
                <NameForm onSubmit={handleSubmit}>
                    <NameInputWrapper>
                        <label for="name">이름</label>
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
                        <label for="logName">로그 이름</label>
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
                        <input 
                            type="submit"
                            value="회원가입"
                        />
                    </SubmitWrapper>
                </NameForm>
            </SignUp>
        </SignUpWrapper>
    );
}