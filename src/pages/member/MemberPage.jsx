import { useParams } from "react-router-dom";
import styled from "styled-components";
import MemberInfo from "../../components/repository/MemberInfo";
import { useState } from "react";
import TabContent from "../../components/repository/TabContent";
import Tab from "../../components/repository/Tab";

const MemberPageWrapper = styled.div`
    min-height: 100%;
    margin: 0px auto;

    @media screen and (max-width: 1920px) {
        width: 1352px;
    }

    @media screen and (max-width: 1536px) {
        width: 1352px;
    }

    @media screen and (max-width: 1370px) {
        width: 1024px;
    }
    
    @media screen and (max-width: 1024px) {
        width: 90%;
    }
`;

const MemberInfoWrapper = styled.div`
    padding: 10% 20%;
`;

const TabWrapper = styled.div`

`;

const MemberPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Log');

    return(
        <MemberPageWrapper>

            <MemberInfoWrapper>
                <MemberInfo id={id}/>
            </MemberInfoWrapper>

            <TabWrapper>
                <Tab onChangeTab={setActiveTab} />
            </TabWrapper>
            
            <TabContent activeTab={activeTab} memberId={id}/>

        </MemberPageWrapper>
    );
}

export default MemberPage;