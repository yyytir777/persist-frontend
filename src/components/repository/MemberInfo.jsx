import { useEffect, useState } from "react";
import getMember from "../api/member/GetMemberApi";
import styled from "styled-components";

const MemberUpperWrapper = styled.div`

    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 24px;
`;

const MemberThumbnail = styled.img`
    width: 192px;
    height: 192px;

    border-radius: 50%;
`;

const MemberLogName = styled.h1`

`;

const MemberLowerWrapper = styled.div`
    margin-top: 24px;
`;

const MemberName = styled.h2``;

const MemberEmailWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const EmailImg = styled.img``;

const MemberEmail = styled.h3``;

const MemberInfo = ({ id }) => {
    const [member, setMember] = useState({});

    useEffect(() => {    
        const fetchData = async() => {
            try {
                const response = await getMember(id);
                setMember(response);
                console.log('response : ', response);
            } catch(error) {
                console.log(error);
            }    
        }
    
        fetchData();
    }, [id]);

    return(
        <>
            <MemberUpperWrapper>
                <MemberThumbnail src={member?.thumbnail}/>
                <MemberLogName>{member?.logName}</MemberLogName>
            </MemberUpperWrapper>

            <MemberLowerWrapper>
                <MemberName>{member?.name}</MemberName>
                <MemberEmailWrapper>
                    <EmailImg />
                    <MemberEmail>{member?.email}</MemberEmail>
                </MemberEmailWrapper>
            </MemberLowerWrapper>
        </>
    );
}

export default MemberInfo;