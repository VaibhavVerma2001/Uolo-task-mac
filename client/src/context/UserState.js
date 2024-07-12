import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))|| null); //if user then set user else null, parse because in localStorage it is in string format\

    return (
        <UserContext.Provider value={{ user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserState;