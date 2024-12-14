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
`;

const Category = () => {
    return(
        <CategoryList>
            <TabName>
                <p>Log</p>
            </TabName>
            <TabName>
                <p>Readme</p>
            </TabName>
            <TabName>
                <p>Category</p>
            </TabName>
        </CategoryList>
    );
}

export default Category;