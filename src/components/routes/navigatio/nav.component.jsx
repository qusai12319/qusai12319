import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CartIcon from '../../cart-icon/CartIcon.component';
import CartDropdown from '../../dropdown/DropDown.component'

import { CartContext } from '../../../context/cart.context';

import {ReactComponent as  Crwn} from  '../../../assets/crown.svg'
import { signOutUser } from '../../../utils/firebase/firebase.utils';

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.style';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const  currentUser =useSelector((state)=>state.user.currentUser)
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <Crwn />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <Link to='/checkout'>
          <CartIcon />
          </Link>
          
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;