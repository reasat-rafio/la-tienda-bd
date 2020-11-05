import React, { useEffect, useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productAction";

const Products = ({ addToCart }) => {
   const products = useSelector((s) => s.productsReducer.items);
   const [product, setProduct] = useState(null);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchProducts());
   }, []);

   const openModal = (p) => {
      setProduct(p);
   };

   const closeModal = () => {
      setProduct(null);
   };

   return (
      <div>
         <Fade bottom cascade>
            {!products ? (
               <span>...Loading</span>
            ) : (
               <ul className="products">
                  {products.map((product) => (
                     <li key={product._id}>
                        <div className="product">
                           <a
                              href={"#" + product._id}
                              onClick={() => openModal(product)}
                           >
                              <img src={product.image} alt={product.title} />
                              <p>{product.title}</p>
                           </a>
                           <div className="product-price">
                              <div> {formatCurrency(product.price)}</div>
                              <button
                                 onClick={() => addToCart(product)}
                                 className="button primary"
                              >
                                 Add To Cart
                              </button>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>
            )}
         </Fade>
         {product && (
            <Modal isOpen={true} onRequestClose={closeModal}>
               <Zoom>
                  <button className="close-modal" onClick={closeModal}>
                     x
                  </button>
                  <div className="product-details">
                     <img src={product.image} alt={product.title} />
                     <div className="product-details-description">
                        <p>
                           <strong>{product.title}</strong>
                        </p>
                        <p>{product.description}</p>
                        <p>
                           Available Sizes:{" "}
                           {product.availableSizes.map((x) => (
                              <span>
                                 {" "}
                                 <button className="button">{x}</button>
                              </span>
                           ))}{" "}
                        </p>
                        <div className="product-price">
                           <div>{formatCurrency(product.price)}</div>
                           <button
                              className="button primary"
                              onClick={() => {
                                 addToCart(product);
                                 closeModal();
                              }}
                           >
                              Add to Cart
                           </button>
                        </div>
                     </div>
                  </div>
               </Zoom>
            </Modal>
         )}
      </div>
   );
};
export default Products;
