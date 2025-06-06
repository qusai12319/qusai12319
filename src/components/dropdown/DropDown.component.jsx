import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cartitem/cartitem.component';

import './dropdown.style.scss';

const CartDropdown = () => {
  const { cartItems,setIsCartOpen } = useContext(CartContext);
const navigate=useNavigate();
const goToCheckOutHandler=()=>{
 navigate('/checkout')
}
  return (
    <div onMouseLeave={()=>setIsCartOpen(false)} className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckOutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;