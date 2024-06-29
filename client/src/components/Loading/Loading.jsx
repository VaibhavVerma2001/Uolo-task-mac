import React from 'react';
import HashLoader from "react-spinners/HashLoader"; //loading animation


function Loading() {
    return (
        <div className="loading">
            <HashLoader
                // loading={loading}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
                color='#36CEF6'
            />
        </div>
    )
}

export default Loading;
