//Feature-1
import "./App.css";
import React, { useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

const App = () => {
   const [cartItems, setCartItems] = useState(
      localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : []
   );
   const [products, setProducts] = useState(data.products);
   const [size, setSize] = useState("");
   const [sort, setSort] = useState("");

   const filterProducts = (event) => {
      if (event.target.value === "") {
         setProducts(data.products);
         setSize(event.target.value);
      } else {
         setSize(event.target.value);
         setProducts(
            data.products.filter(
               (p) => p.availableSizes.indexOf(event.target.value) >= 0
            )
         );
      }
   };

   const sortProducts = (event) => {
      const sort = event.target.value;
      setSort(sort);
      setProducts(
         products
            .slice()
            .sort((a, b) =>
               sort === "lowest"
                  ? a.price > b.price
                     ? 1
                     : -1
                  : sort === "highest"
                  ? a.price < b.price
                     ? 1
                     : -1
                  : a._id > b._id
                  ? 1
                  : -1
            )
      );
   };

   const addToCart = (product) => {
      const incartItems = cartItems.slice();
      let alreadyInCart = false;
      incartItems.forEach((item) => {
         if (item._id === product._id) {
            item.count++;
            alreadyInCart = true;
         }
      });
      if (!alreadyInCart) {
         incartItems.push({ ...product, count: 1 });
      }

      setCartItems(incartItems);
      localStorage.setItem("cartItems", JSON.stringify(incartItems));
   };

   const createOrder = (order) => {
      alert("Need to save order for" + order.name);
   };

   const removeFromCart = (product) => {
      const incartItems = cartItems.slice();
      const newCartItems = incartItems.filter((x) => x._id !== product._id);
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
   };

   return (
      <div className="grid-container">
         <header>
            <a href="/">La tienda BD</a>
         </header>
         <main>
            <div className="content">
               <div className="main">
                  <Filter
                     count={products.length}
                     size={size}
                     sort={sort}
                     filterProducts={filterProducts}
                     sortProducts={sortProducts}
                  />
                  <Products addToCart={addToCart} products={products} />
               </div>
               <div className="sidebar">
                  <Cart
                     createOrder={createOrder}
                     removeFromCart={removeFromCart}
                     cartItems={cartItems}
                  />
               </div>
            </div>
         </main>
         <footer>All right is reserved.</footer>
      </div>
   );
};

export default App;
