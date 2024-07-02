import React from 'react';
import './navbar.css';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    
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

        </div>
    )
}

export default Navbar;
