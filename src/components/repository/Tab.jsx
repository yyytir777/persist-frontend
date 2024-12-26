import styled from "styled-components";

const CategoryList = styled.div`
    margin: 0px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 60px;
`;

const TabName = styled.div`
    width: 96px;
    display: flex;
    justify-content: center;

    cursor: pointer;
`;

const Tab = ({ onChangeTab }) => {

    return(
        <CategoryList>

            <TabName onClick={() => onChangeTab('Log')}>
                <p>Log</p>
            </TabName>

            <TabName onClick={() => onChangeTab('Readme')}>
                <p>Readme</p>
            </TabName>

            <TabName onClick={() => onChangeTab('Category')}>
                <p>Category</p>
            </TabName>

        </CategoryList>
    );
}

export default Tab;