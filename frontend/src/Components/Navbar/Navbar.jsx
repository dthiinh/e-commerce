import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const { getTotalCartItems, menu, setMenu } = useContext(ShopContext);
    const [cartCount, setCartCount] = useState(0);
    
    // Cập nhật số lượng giỏ hàng khi có thay đổi
    useEffect(() => {
        setCartCount(getTotalCartItems());
    }, [getTotalCartItems]);

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <Link to='/'><img src={logo} alt="" onClick={() => { setMenu("shop") }} /></Link>
                <p>Áo Shop</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/'>Trang Chủ</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/mens'>Nam</Link>{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/womens'>Nữ</Link>{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/kids'>Trẻ Em</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button>Tài khoản</button></Link>
                <Link to='/cart'>
                    <img src={cart_icon} alt="cart" />
                    {cartCount > 0 && <div className="nav-cart-count">{cartCount}</div>}
                </Link>
            </div>
        </div>
    )
}

export default Navbar