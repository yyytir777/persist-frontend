import { useRef } from "react";
import styled from "styled-components";
import uploadImage from "../api/s3/UploadImage";


const InputThumbnailButton = styled.div`
    height: 300px;
    width: 500px;
    background-color: whitesmoke;
    background-image: ${({ $imageUrl }) => $imageUrl ? `url(${$imageUrl})` : "none"};
    background-size: cover;
    background-position: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        ${({ $imageUrl }) => $imageUrl && "display: none;"}
    }
`;

const ButtonWrapper = styled.div`

`;

const ImageDeleteButton = styled.button`

`;

export default function InputThumbnail({ thumbnail, setThumbnail }) {
    const fileInputRef = useRef(null);

    const handleThumbnailClick = async (event) => {
        if(fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = async (event) => {
        const files = event.target.files;
        
        if(files && files.length > 0) {
            const file = files[0];

            if(file.type.startsWith('image/')) {
                const imageUrl = await uploadImage(file);
                console.log('imageUrl : ', imageUrl);
                setThumbnail(imageUrl);
            }    
        }
    }

    const handleImageDeleteClick = async (event) => {
        setThumbnail('');
    }

    const handleThumbnailDrop = async (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;

        if(files && files.length > 0) {
            const file = files[0];

            if(file.type.startsWith('image/')) {
                const imageUrl = await uploadImage(file);
                console.log('imageUrl : ', imageUrl);
                setThumbnail(imageUrl);
            }
        }
    }

    return(
        <>
            <InputThumbnailButton
                onClick={handleThumbnailClick}
                onDrop={handleThumbnailDrop}
                onDragOver={(e) => e.preventDefault()}
                $imageUrl={thumbnail}>
                <p>여기에 썸네일을 놓아주세요</p>
            </InputThumbnailButton>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }} // 화면에 보이지 않도록 숨김
                accept="image/*" // 이미지 파일만 선택 가능
                onChange={handleFileChange} // 파일 선택 시 이벤트 처리
            />
            <ButtonWrapper>
                {thumbnail && (
                    <ImageDeleteButton
                    onClick={handleImageDeleteClick}
                    >사진 삭제하기</ImageDeleteButton>
                )}
            </ButtonWrapper>
        </>
    );
}