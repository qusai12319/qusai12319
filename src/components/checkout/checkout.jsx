import { useContext } from "react"
import { CartContext } from "../../context/cart.context"
import './checkout.scss'
import CheckoutItem from "../checkout-item/checkout-item.component"
const Checkout=()=>{
    const {cartItems,cartTotal}=useContext(CartContext)
    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                <span className="name">product</span>
                </div>
                <div className="header-block">
 <span>description</span>
                </div>
                <div className="header-block">
 <span className="quantity">quantity</span>
                </div>
                <div className="header-block">
 <span className="price">price</span>
                </div>
                <div className="header-block">
 <span>remove</span>
                </div>
                
            </div>
               {
                cartItems.map((cartItem)=><CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
               }
         
            <span className="total">Total:${cartTotal}</span>
        
       </div>

    )
}
export default Checkout