import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))|| null); 
    const [toggle,setToggle] = useState(false); // for menu item

    return (
        <UserContext.Provider value={{ user, setUser, toggle, setToggle}}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserState;