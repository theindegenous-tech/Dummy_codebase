// import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css'


// This is a function that renders the epub 
function FPress({ url }) {

    // This is a function that appends a script to the body of the indexedDB.html in the public folder upon being called
    const addScript = (bookurl) => {
        const script = document.createElement('script');

        script.src = "renderBook.js";
        script.async = true;

        document.body.appendChild(script);
    }

    // This is a hook that waits for changes to the URL before calling the function to add the script
    useEffect(() => {
        if (url) {
            console.log(url)
            addScript(url)
        }
    }, [url])

    return (
        <div className="FPress">
            <select id="toc"></select>
            <div id="viewer" class="spreads"></div>
            <a id="prev" href="#prev" class="arrow">‹</a>
            <a id="next" href="#next" class="arrow">›</a>
        </div>
    );
}

export { FPress };
