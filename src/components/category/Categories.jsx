import styled from "styled-components";
import CategoryGrid from "./CategoryGrid";

const CategoryWrapper = styled.div`
    width: 100%;
    min-height: 100px;
`;

const Categories = ({ category }) => {
    return(
        <CategoryWrapper>
            <CategoryGrid categories={category} />
        </CategoryWrapper>
    );
}

export default Categories;