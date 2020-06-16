import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './styles.css';

import logo from '../../../assets/logo.png';

const Header = (props) => {

    const [toggle, setToggle] = useState(false);

    function handleClick(event) {
        event.preventDefault();
        if (!toggle) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

    useEffect(() => {
        if (toggle) {
            document.querySelector('.menu_mobile').style.display = "block";
        } else {
            document.querySelector('.menu_mobile').style.display = "none";
        }
    }, [toggle]);

    if (props.page == "Partners") {
        return (
            <header>
                {/* menu_container */}
                <div className="menu_container">
                    <div className="logo">
                        <Link to="/"><img src={logo} alt="" /></Link>
                    </div>
                    <div className="menu_desktop">
                        <ul>
                        <li><Link to="/">Inicio</Link></li>
                        </ul>
                    </div>
                    <div className="icon_mobile">
                        <a onClick={handleClick} href=""><i className="fas fa-bars fa-2x"></i></a>
                    </div>
                </div>
                {/* menu_container */}
                <div className="menu_mobile" >
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                    </ul>
                </div>
            </header>
        );
    }

    return (
        <header>
            {/* menu_container */}
            <div className="menu_container">
                <div className="logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className="menu_desktop">
                    <ul>
                        <li><AnchorLink href="#about_us">Quem Somos</AnchorLink></li>
                        <li><AnchorLink href="#understand">Conceitos Importantes</AnchorLink></li>
                        <li><AnchorLink href="#our_partners">Parceiros</AnchorLink></li>
                        <li><AnchorLink href="#partner">Seja um Parceiro</AnchorLink></li>
                    </ul>
                </div>
                <div className="icon_mobile">
                    <a onClick={handleClick} href=""><i className="fas fa-bars fa-2x"></i></a>
                </div>
            </div>
            {/* menu_container */}
            <div className="menu_mobile" >
                <ul>
                    <li><AnchorLink href="#about_us">Quem Somos</AnchorLink></li>
                    <li><AnchorLink href="#understand">Conceitos Importantes</AnchorLink></li>
                    <li><AnchorLink href="#our_partners">Parceiros</AnchorLink></li>
                    <li><AnchorLink href="#partner">Seja um Parceiro</AnchorLink></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;