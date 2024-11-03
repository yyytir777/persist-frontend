import styled from "styled-components";
import closedImg from '../img/closed_img.png';
import handleHome from "./handler/handleHome";

const MenuOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
`;

const MenuContent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    background: white;
    z-index: 20;
    padding: 5px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;

    border-top-right-radius: 5px; /* 오른쪽 위 모서리 둥글게 */
    border-bottom-right-radius: 5px; /* 오른쪽 아래 모서리 둥글게 */
`;

const MenuHeaderWrapper = styled.div`

    display:flex;
    justify-content: flex-end;
`;

const MenuWrapper = styled.div`

`;

const MenuClosedImg = styled.img`
    cursor: pointer;
    width: 16%;
`;

const MenuItem = styled.div`
    margin: 10px 0px;
    padding: 10px 10px;
    display:flex;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
        background-color: whitesmoke;
    }
`;


export default function MenuBar({ toggleMenu }) {
    return(
        <>
            <MenuOverlay onClick={toggleMenu}></MenuOverlay>
            <MenuContent>
                <MenuHeaderWrapper>
                    <MenuClosedImg src={closedImg} onClick={toggleMenu}/>
                </MenuHeaderWrapper>
                <MenuWrapper>
                    <MenuItem onClick={handleHome}>Home</MenuItem>
                    <MenuItem>Hot</MenuItem>
                    <MenuItem>Most Viewed</MenuItem>
                    <MenuItem>Recent</MenuItem>
                </MenuWrapper>
            </MenuContent>
        </>
    );
}