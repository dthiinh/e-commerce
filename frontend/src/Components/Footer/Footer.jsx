import React from 'react'
import './Footer.css'
import footer_logo from '../Assests/logo_big.png'
import instagram_icon from '../Assests/instagram_icon.png'
import pintester_icon from '../Assests/pintester_icon.png'
import whatsapp_icon from '../Assests/whatsapp_icon.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>Áo Shop</p>
            </div>
            <ul className="footer-links">
                <li onClick={() => window.open('https://www.sgu.edu.vn/', '_blank')}>
                    Công ty</li>
                <li onClick={() => window.open('https://www.sgu.edu.vn/', '_blank')}>
                    Sản phẩm</li>
                <li onClick={() => window.open('https://www.sgu.edu.vn/', '_blank')}>
                    Văn phòng</li>
                <li onClick={() => window.open('https://www.sgu.edu.vn/', '_blank')}>
                    Giới thiệu</li>
                <li onClick={() => window.open('https://www.sgu.edu.vn/', '_blank')}>
                    Liên hệ</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icon-container">
                    <img src={instagram_icon} alt="" onClick={() => window.open('https://www.instagram.com/vu_dthiinh/', '_blank')}/>
                </div>
                <div className="footer-icon-container">
                    <img src={pintester_icon} alt="" onClick={() => window.open('https://www.pinterest.com/', '_blank')}/>
                </div>
                <div className="footer-icon-container">
                    <img src={whatsapp_icon} alt="" onClick={() => window.open('https://www.facebook.com/vu.inh.thinh.508995', '_blank')}/>
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>No Copyright @ 2025 - Made by Kvbe.</p>
            </div>
        </div>
    )
}

export default Footer