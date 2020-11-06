import {
   FILTER_PRODUCTS_BY_SIZE,
   FETCH_PRODUCTS,
   ORDER_PRODUCTS_BY_PRICE,
} from "../types";

export const productsReducer = (state = {}, action) => {
   switch (action.type) {
      case FETCH_PRODUCTS:
         return {
            items: action.payload,
            filteredItems: action.payload,
         };
      case FILTER_PRODUCTS_BY_SIZE:
         return {
            ...state,
            size: action.payload.size,
            filteredItems: action.payload.items,
         };
      case ORDER_PRODUCTS_BY_PRICE:
         return {
            ...state,
            sort: action.payload.sort,
            filteredItems: action.payload.items,
         };
      default:
         return state;
   }
};
