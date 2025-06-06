import { Outlet, Link } from "react-router-dom";
import './navigation.style.scss';
import { useSelector } from "react-redux";
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg';

import { useContext } from "react";
import { signOutAuthUser } from "../../../utils/firebase/firebase.utils";

import CartIcon from "../../cart-icon/CartIcon.component";
import Dropdown from "../../dropdown/DropDown.component";
import { CartContext } from "../../../context/cart.context";
const Navigation = () => {
  const currentUser=useSelector((state)=>state.user.currentUser)

  const {isCartOpen}=useContext(CartContext)

  const handleSignOut = async () => {
    try {
      await signOutAuthUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className='logo' />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              JOIN US
            </Link>
          )}
          <Link className="nav-link" to="/checkout">
           <CartIcon/>
          </Link>
        </div>
        {
          isCartOpen &&

           <Dropdown/>
        }
       
      </div>

      <Outlet />
    </>
  );
};

export default Navigation;
