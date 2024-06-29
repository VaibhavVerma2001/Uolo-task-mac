import React,{useContext} from 'react';
import HashLoader from "react-spinners/HashLoader"; //loading animation
import UserContext from '../../context/UserContext';


function Loading() {
    const context = useContext(UserContext);
    const { loading } = context;
    return (
        <div className="loading">
            <HashLoader
                loading={loading}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
                color='#36CEF6'
            />
        </div>
    )
}

export default Loading;
