import React, { useState } from "react";
import formatCurrency from "../util";

const Cart = ({ cartItems, removeFromCart, createOrder }) => {
   const [showCheckout, setShowCheckout] = useState(false);
   const [inputHnadler, setInputHnadler] = useState({
      name: "",
      email: "",
      address: "",
   });

   const handleInput = (e) => {
      const input = {
         ...inputHnadler,
         [e.target.name]: e.target.value,
      };
      setInputHnadler(input);
   };
   const placeOrder = (e) => {
      e.preventDefault();
      const { name, email, address } = inputHnadler;
      const order = {
         name,
         email,
         address,
         cartItems,
      };
      createOrder(order);
   };

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
               <div>
                  <div className="cart">
                     <div className="total">
                        <div>
                           Total:
                           {formatCurrency(
                              cartItems.reduce(
                                 (a, c) => a + c.price * c.count,
                                 0
                              )
                           )}
                        </div>
                        <button
                           onClick={() => {
                              setShowCheckout(true);
                           }}
                           className="button primary"
                        >
                           Procced
                        </button>
                     </div>
                  </div>
                  {showCheckout && (
                     <div className="cart">
                        <form onSubmit={placeOrder}>
                           <ul className="form-container">
                              <li>
                                 <lebal>Email</lebal>
                                 <input
                                    name="email"
                                    type="email"
                                    required
                                    onChange={handleInput}
                                 ></input>
                              </li>
                              <li>
                                 <lebal>Name</lebal>
                                 <input
                                    name="name"
                                    type="text"
                                    required
                                    onChange={handleInput}
                                 ></input>
                              </li>
                              <li>
                                 <lebal>Address</lebal>
                                 <input
                                    name="address"
                                    type="text"
                                    required
                                    onChange={handleInput}
                                 ></input>
                              </li>
                              <li>
                                 <button
                                    className="button primary"
                                    type="submit"
                                 >
                                    Checkout
                                 </button>
                              </li>
                           </ul>
                        </form>{" "}
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Cart;
