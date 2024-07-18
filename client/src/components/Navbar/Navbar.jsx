import React, { useContext, useState } from 'react';
import './navbar.css';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import img from '../../static/image.png';
import SuccessModal from '../shared/SuccessModal/SuccessModal';


function Navbar() {
    const location = useLocation();
    const path = location.pathname;

    const [showModal, setShowModal] = useState(false);

    const context = useContext(UserContext);
    const { toggle,setUser,setToggle } = context;

    const handleLogOut = () => {
        setShowModal(true);
        // after 2 seconds delete use from local storage and navigate to login
        setTimeout(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setUser(null);
            setShowModal(false);
        }, 2000);

    }

    return (
        <>
            {/* for big screen */}
            <div className='side-navbar'>
                <Link className='link' to={'/'}>
                    <div className={`item ${path === "/" ? 'active' : 'inactive'}`}  >
                        <GroupIcon className='icon' />
                        <span>All Team Member</span>
                    </div>
                </Link>


                <Link className='link' to={'/create'}>
                    <div className={`item ${path === "/create" ? 'active' : 'inactive'}`}>
                        <PersonAddAltIcon className='icon' />
                        <span>Create Profile</span>
                    </div>
                </Link>
            </div>


            {/* tablet - size */}
            {toggle &&
                <div className="toggle-sidebar">
                    <div className="backdrop" onClick={() => setToggle(false)}>
                        {/* backdrop */}
                    </div>

                    <div className="sidebar-container">
                        <CloseIcon className="close-icon" onClick={() => setToggle(false)} />

                        <img className="logo" src={img} alt="logo-img" />

                        <Link className='link' to={'/'} onClick={() => setToggle(false)}>
                            <div className={`item ${path === "/" ? 'active' : 'inactive'}`}  >
                                <GroupIcon className='icon' />
                                <span>All Team Member</span>
                            </div>
                        </Link>


                        <Link className='link' to={'/create'} onClick={() => setToggle(false)}>
                            <div className={`item ${path === "/create" ? 'active' : 'inactive'}`}>
                                <PersonAddAltIcon className='icon' />
                                <span>Create Profile</span>
                            </div>
                        </Link>

                        <div className="logout" onClick={handleLogOut}>
                            <LogoutIcon /> Logout
                        </div>

                    </div>
                </ div>
            }
            {showModal && <SuccessModal message={"You have been successfully logout"} setShowModal={setShowModal} />}
        </>

    )
}

export default Navbar;
