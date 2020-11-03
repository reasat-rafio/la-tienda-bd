//Feature-1
import "./App.css";
import React, { Component, useState } from "react";
import data from "./data.json";
import Products from "./components/Products";

const App = () => {
   const [state, setState] = useState({
      products: data.products,
      size: "",
      sort: "",
   });

   console.log(state);

   return (
      <div className="grid-container">
         <header>
            <a href="/">La tienda BD</a>
         </header>
         <main>
            <div className="content">
               <div className="main">
                  <Products products={state.products} />
               </div>
               <div className="sidebar">Cart items</div>
            </div>
         </main>
         <footer>All right is reserved.</footer>
      </div>
   );
};

export default App;
