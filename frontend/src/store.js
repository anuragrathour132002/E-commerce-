import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-dectools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;