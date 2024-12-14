import { useParams } from "react-router-dom";
import styled from "styled-components";
import MemberInfo from "../../components/repository/MemberInfo";
import Category from "../../components/repository/Category";
import { useState } from "react";
import TabContent from "../../components/repository/TabContent";

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
    margin-bottom: 48px;
`;

const CategoryWrapper = styled.div`

`;

const MemberPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Log');
    const [logs, setLogs] = useState();
    const [categories, setCategories] = useState();
    const [readme, setReadme] = useState();

    // useEffect(() => {

    // })();

    const content = (() => {
        switch(activeTab) {
            case "Log":
                return logs;
            case "Readme":
                return readme;
            case "Categories":
                return categories;
            default:
                return null;
        }
    });

    return(
        <MemberPageWrapper>

            <MemberInfoWrapper>
                <MemberInfo id={id}/>
            </MemberInfoWrapper>

            <CategoryWrapper>
                <Category />
            </CategoryWrapper>
            
            <TabContent tab={activeTab} content={content}/>

        </MemberPageWrapper>
    );
}

export default MemberPage;