import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='password' />
        </div>
        <button>Countinue</button>
        <p className='loginsignup-login'>Already have a account? <span>Login</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By Countinuing, i agree to the temp of use and privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup