import React from "react";
import formatCurrency from "../util";

const Cart = ({ cartItems, removeFromCart }) => {
   return (
      <div>
         {cartItems.length === 0 ? (
            <div className="cart cart-header"> Cart is empty </div>
         ) : (
            <div className="cart cart-header">
               You have {cartItems.length} in the cart
            </div>
         )}
         <div className="cart">
            <ul className="cart-items">
               {cartItems.map((item) => (
                  <li key={item._id}>
                     <div>
                        <img src={item.image} alt={item.title} />
                     </div>
                     <div>
                        <div> {item.title}</div>
                        <div className="right">
                           {formatCurrency(item.price) + "X " + item.count}
                           <button
                              className="button"
                              onClick={() => removeFromCart(item)}
                           >
                              Remove
                           </button>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
            {cartItems.length !== 0 && (
               <div className="cart">
                  <div className="total">
                     <div>
                        Total:
                        {formatCurrency(
                           cartItems.reduce((a, c) => a + c.price * c.count, 0)
                        )}
                     </div>
                     <button className="button primary">Procced</button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Cart;
