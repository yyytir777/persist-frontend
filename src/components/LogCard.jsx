import React from "react";
import '../css/components/LogCard.css';

export default function LogCard() {
    return(
        <div className="LogCard">
            <div className="upper">
                <div className="author">
                    <img className="image" src="" alt=""/>
                    <div className="name">author</div>
                </div>
                <div className="date">2024.10.10</div>
            </div>
            <img className="LogCardImage" src="" alt="Log Thumbnail"/>
            <div className="Title">Demo title</div>
            <div className="Preview">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</div>
        </div>
    );
} 