import { Link } from 'react-router-dom';
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="contactDiv">
        <h3>Contact Us</h3>
        <ul>
          <li>North Avenue</li>
          <li>Yerevan, Armenia</li>
          <li>(+374) 77 77 77</li>
          <li>info@coffeeshop.com</li>
        </ul>
      </div>
      <div className='menuDiv'>
        <h3>Menu</h3>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
      </div>
      <div className='imgIcons'>
          <img src="./images/google.png"/>
          <img src="./images/facebook.png"/>
          <img src="./images/insta.png"/>
          <img src="./images/linkedin.png"/>
      </div>
    </div>
      <div className="footer-end">
      <p> Copyright © 2023 <Link to='/' style={{color:"cyan"}}>CoffeeShop.</Link></p>
      </div>
  </footer>
  )
}

