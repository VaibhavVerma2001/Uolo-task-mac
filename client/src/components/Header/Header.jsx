import React, { useContext } from 'react';
import './header.css';
import logo from '../../static/image1.png';
import Img2 from '../../static/image2.png';
import downArrow from '../../static/downArrow.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SuccessModal from '../shared/SuccessModal/SuccessModal';
import UserContext from '../../context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [showLogout, setshowLogout] = useState(false);

    const context = useContext(UserContext);
    const { user, setUser } = context;

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
        <div className='header'>
            <Link to={'/'} className='link'>
                <div className="left">
                    <img src={logo} alt="logo-img" />
                </div>
            </Link>


            <div className="right">
                <img src={user.imgUrl ? user.imgUrl : Img2} alt="profile" />
                <div className="inner">
                    <span className='text' onClick={() => setshowLogout(false)} >{(user.name).split(" ")[0]}</span>
                    <img className='arrow' src={downArrow} alt="arrow" onClick={() => setshowLogout(!showLogout)} />
                </div>

                {showLogout && <div className="logout" onClick={handleLogOut}>
                    <LogoutIcon /> Logout
                </div>}

            </div>
            {showModal && <SuccessModal message={"You have been successfully logout"} setShowModal={setShowModal} />}
        </div>
    )
}

export default Header;
