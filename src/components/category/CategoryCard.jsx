import styled from "styled-components";

const CategoryWrapper = styled.div`
    background-color: whitesmoke;
    
`;

const CategoryCard = ({ category }) => {
    return(
        <CategoryWrapper>
            <p>{category.categoryId}</p>
            <p>{category.name}</p>
        </CategoryWrapper>
    );
}

export default CategoryCard;