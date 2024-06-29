import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props) => {
    // loading bar
    const [loading, setLoading] = useState(false);

    return (
        <UserContext.Provider value={{ loading, setLoading }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;