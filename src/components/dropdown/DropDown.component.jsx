import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';
import CartItem from '../cartitem/cartitem.component'

import './dropdown.style.scss';

const CartDropdown = () => {
  const { cartItems,setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div  onMouseLeave={()=>setIsCartOpen(false)} className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;