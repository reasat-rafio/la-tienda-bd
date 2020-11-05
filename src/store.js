import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initalState = {};

const store = createStore(
   combineReducers({
      productsReducer,
   }),
   initalState,
   composeWithDevTools(applyMiddleware(thunk))
);

export default store;
