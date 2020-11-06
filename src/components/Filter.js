import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productAction";

const Filter = () => {
   const dispatch = useDispatch();
   const { size, sort, items, filteredItems } = useSelector(
      (state) => state.productsReducer
   );

   const [x, setX] = useState(filteredItems);

   // const { size, sort, items, filteredItems } = x;
   console.log(x);
   useEffect(() => {
      setX(filteredItems);
   }, [filteredItems]);

   return !x ? (
      <span>Loading</span>
   ) : (
      <div className="filter">
         <div className="filter-result">{x.length} Products</div>
         <div className="filter-sort">
            Order{" "}
            <select
               value={sort}
               onChange={(e) => dispatch(sortProducts(x, e.target.value))}
            >
               <option>Latest</option>
               <option value="lowest">Lowest</option>
               <option value="highest">Highest</option>
            </select>
         </div>
         <div className="filter-size">
            Filter{" "}
            <select
               value={size}
               onChange={(e) => dispatch(filterProducts(items, e.target.value))}
            >
               <option value="">All</option>
               <option value="XS">XS</option>
               <option value="S">S</option>
               <option value="MD">MD</option>
               <option value="L">L</option>
               <option value="XL">XL</option>
               <option value="XXL">XXL</option>
            </select>
         </div>
      </div>
   );
};

export default Filter;
