import React, { useState } from 'react';
import './navbar.css';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom';

function Navbar() {
    const [active, setActive] = useState(true);
    return (
        <div className='navbar'>
            <Link className='link' to={'/'} onClick={() => setActive(true)}>
                <div className={`item ${active === true ? 'active' : 'inactive'}`}  >
                    <GroupIcon className='icon' />
                    <span className={`${active === true ? 'active-span' : 'inactive-span'}`}>All Team Member</span>
                </div>
            </Link>


            <Link className='link' to={'/create'} onClick={() => setActive(false)}>
                <div className={`item ${active === true ? 'inactive' : 'active'}`}>
                    <PersonAddAltIcon className='icon' />
                    <span className={`${active === true ? 'inactive-span' : 'active-span'}`}>Create Profile</span>
                </div>
            </Link>

        </div>
    )
}

export default Navbar
