import React, { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [navClass, setNavClass] = useState('nav-hidden');
    const handleNav = () => {
        if (navClass === 'nav-hidden') {
            setNavClass('nav-show')
        }
        else {
            setNavClass('nav-hidden')
        }
    }
    const history = useHistory();
    const handleNavDirection = direction => {
        history.push(direction);
        setNavClass('nav-hidden')
    }
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className='main-header'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav className={navClass}>
                <ul className='nav-items'>
                    <li onClick={() => handleNavDirection('/')}>Home</li>
                    <li onClick={() => handleNavDirection('/orders')}>Orders</li>
                    <li onClick={() => handleNavDirection('/admin')}>Admin</li>
                    <li>Deals</li>
                    {
                        loggedInUser.isSignedIn ? <div className="user-image"> <img src={loggedInUser.picture} alt="" /> </div> :
                            <button onClick={() => handleNavDirection('/login')} className='btn btn-login'> Log in</button>
                    }

                </ul>
            </nav>
            <div className="nav-burger" onClick={handleNav}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Header;