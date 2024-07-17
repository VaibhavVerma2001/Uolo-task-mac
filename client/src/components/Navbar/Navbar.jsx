import React, {useContext} from 'react';
import './navbar.css';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function Navbar() {
    const location = useLocation();
    const path = location.pathname;

    const context = useContext(UserContext);
    const { user, setUser, toggle, setToggle } = context;
    console.log(toggle);
    
    return (
        <div className='side-navbar'>

            <Link className='link' to={'/'}>
                <div className={`item ${path === "/" ? 'active' : 'inactive'}`}  >
                    <GroupIcon className='icon' />
                    <span className={`${path === "/" ? 'active-span' : 'inactive-span'}`}>All Team Member</span>
                </div>
            </Link>
            

            <Link className='link' to={'/create'}>
                <div className={`item ${path === "/create" ? 'active' : 'inactive'}`}>
                    <PersonAddAltIcon className='icon' />
                    <span className={`${path === "/create" ? 'active-span' : 'inactive-span'}`}>Create Profile</span>
                </div>
            </Link>


            {/* toggle sidebar */}
            {toggle && <>
                <div style={{zIndex : "999", position:"absolute", top:"50%", left: "50%"}}>
                    <h1 style = {{fontSize:"100px", zIndex : "999", position:"absolute", top:"50%", left: "50%"}}>hello</h1>
                </div>
                
            </>}

        </div>
    )
}

export default Navbar;
