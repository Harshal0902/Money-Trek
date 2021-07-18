import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import MoneyTrekLogo from "../../assets/Money_Trek_Logo.gif"
import LogoutImg from "../../assets/logout.png"
import fire from "../../fire"
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const handleLogout = () => {
    fire.auth().signOut();
}

const changeLang = (ln) => {
    return () => {
        i18n.changeLanguage(ln);
    };
};

function Header() {
    const { t } = useTranslation();

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
                <nav className='header'>
                    <Link to='/' className='header-logo' onClick={closeMobileMenu}>
                       <img height="80px" src={MoneyTrekLogo} alt="logo" />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            {t('navHome')}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/split'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                {t('navSplitBill')}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/trips' className='nav-links' onClick={closeMobileMenu}>
                            {t('navTrip')}
                            </Link>
                        </li>

                        <li class="dropdown">
                            <span>{t('navChangeLang')}</span>
                            <div class="dropdown-content">
                                <p onClick={changeLang("en")}>English</p>
                                <p onClick={changeLang("hi")}>हिंदी</p>
                                <p onClick={changeLang("de")}>Deutsche</p>
                                <p onClick={changeLang("fr")}>français</p>
                                <p onClick={changeLang("ja")}>日本語</p>
                            </div>
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