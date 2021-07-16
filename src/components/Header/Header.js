import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import LogoutImg from "../../assets/logout.png"
import fire from "../../fire"

const handleLogout = () => {
    fire.auth().signOut();
}

function Header() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='header'>
                <Link to='/' className='header-logo' onClick={closeMobileMenu}>
                    Money Trek
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/split'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Split Billd
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/trips' className='nav-links' onClick={closeMobileMenu}>
                            Trips
                        </Link>
                    </li>

                    <li className='nav-item' >
                    <Link className='nav-links' onClick={handleLogout}>
                        <img alt="logout" width="45px" style={{ marginTop: "20px" }} src={LogoutImg} />
                    </Link>
                    </li>
                </ul>
        </nav>
        </>
    );
}

export default Header;