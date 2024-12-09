import styled from "styled-components";

const AuthorWrapper = styled.div`
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 5px;
`;

const AuthorImage = styled.img`
    width: 20px;
    height: 20px;
`;

const AuthorName = styled.div``;

const Author = ({authorThumbnail, authorName}) => {

    return(
        <AuthorWrapper>
            <AuthorImage src={authorThumbnail} alt="authorThumbnail"/>
            <AuthorName>{authorName}</AuthorName>
        </AuthorWrapper>
    );
}

export default Author;