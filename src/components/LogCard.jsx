import React from "react";
import '../css/components/LogCard.css';
import image from "../img/image.png";

export default function LogCard() {
    return(
        <div className="LogCard">
            <div className="Upper">
                <div className="Author">
                    <img className="AuthorImage" src={image} alt=""/>
                    <div className="Name">author</div>
                </div>
                <div className="Date">2024.10.10</div>
            </div>
            <img className="LogCardImage" src={image} alt="Log Thumbnail"/>
            <div className="Title">Demo title</div>
            <div className="Preview">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</div>
        </div>
    );
} 