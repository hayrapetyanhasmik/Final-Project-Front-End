import {decodeToken} from "react-jwt";
import {Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { allCategories, getSingleCategory, getCategories} from "../../features/categorySlice";
import { AppDispatch, RootState } from "../../app/store";
import './header.scss';


export default function Header(){
  const cartCount = useSelector((state:RootState) => state.cart.count);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const categories = useSelector(allCategories);
  const dispatch: AppDispatch = useDispatch();
  const user = localStorage.getItem("token");
  const decoded:any = user && decodeToken(user);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  function showCategory(){
    dispatch(getCategories());
    setShowCategories(!showCategories);
  }

  const handleCategoryClick = (id:number) => {
    if(id){
      dispatch(getSingleCategory(id));
      setShowCategories(!showCategories);
    }
  };

  function handleLogout(){
    localStorage.removeItem('token');
  }


    return(
    <nav>
      <div className="top">
        <div className="leftSide">
          <div className="logoImgDiv">
            <Link className="excludeLink" to="/">
              <img className="logoImg" src="/images/logo.png" alt="Logo" />
              <p>CoffeeShop</p>
            </Link>
          </div>
          <Link to="/">Home</Link>
          <Link to="/shop" onMouseOver={showCategory}>Shop</Link>

          <Link to="/about">About</Link>
        </div>
          {showCategories && (
            <div className="categoryDiv" >
             {categories?.map((category) => (
                <Link key={category.id} to="/shop" ><p  onClick={() => handleCategoryClick(category.id)}>
                 {category.name}
                </p></Link>
              ))} 
            </div>
          )} 
        <div className="rightSide">
          {!user ? (
          <Link to="/login">Sign In</Link>
          ) : (
            <Link to="/" onClick={handleLogout}>Log Out</Link>
          )}
          <input className="search" type="search" placeholder="Search"  />
          <div className="cartDiv">
            {user && (
              <Link to={`/cart/${decoded?.id}`}>
                <img className="cartImg" src="/images/cart.png" alt="Cart" />
                {cartCount>0 && cartCount}
              </Link>
            )}
          </div>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <img src="./images/hamburger.png" alt="Menu" />
        </div>
        <div className={`menu ${showMenu ? 'show-menu' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/shop" onClick={showCategory}>Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Sign In</Link>
        <Link to="/" onClick={handleLogout}>Log Out</Link>
        <input className="search2" type="search" placeholder="Search" />
        <div className="cartDiv">
            {user && (
              <Link to={`/cart/${decoded?.id}`}>
                <img className="cartImg" src="/images/cart.png" alt="Cart" />
              </Link>
            )}
          <span>{cartCount}</span>
        </div>
        {showCategories && (
            <div className="categDiv">
              {categories?.map((category) => (
                <p key={category.id} onClick={() => handleCategoryClick(category.id)}>
                 {category.name}
                </p>
              ))}
            </div>
          )}
      </div>
      </div>
    </nav>
    )
}