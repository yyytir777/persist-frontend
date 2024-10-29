import React from "react";
import '../css/components/LogCard.css';

export default function LogCard(props) {
    return(
        <div className="LogCard">
            <div className="Upper">
                <div className="Author">
                    <img className="AuthorImage" src={props.authorThumbnail} alt="authorThumbnail"/>
                    <div className="Name">{props.name}</div>
                </div>
                <div className="Date">{props.createdDate}</div>
            </div>
            <img className="LogCardImage" src={props.thumbnail} alt="logThumbnail" />
            <div className="Title">{props.title}</div>
            <div className="Preview">{props.preview}</div>
        </div>
    );
} 