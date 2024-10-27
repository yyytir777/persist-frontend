import React from "react";
import '../css/Home.css';
import LogCard from '../components/LogCard';


export default function Home() {
    return(
        <div className="Home">
            <div className="MainWrapper">
                <div className="SearchBarWrapper">
                    <div className="SearchBar">SearchBar</div>
                </div>
                <div className="LogGrid">
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                    <LogCard />
                </div>
            </div>
        </div>
    );
}