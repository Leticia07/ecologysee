import React from 'react';

import './style.css';

import logoBranca from '../../../assets/logo_branca.png';

const Footer = () => {
    return (
        <footer>
            <div className="footer_container">
                <div className="left">
                    <img src={logoBranca} alt="" />
                    <p>Copyright 2020 - All rights reserved</p>
                </div>
                <div className="right">
                    <p>Clique <a href="">aqui</a> para baixar o nosso aplicativo!</p>
                    <div className="social">
                        <a href=""><i className="fab fa-linkedin fa-2x"></i></a>
                        <a href=""><i className="fab fa-twitter fa-2x"></i></a>
                        <a href=""><i className="fab fa-instagram fa-2x"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;