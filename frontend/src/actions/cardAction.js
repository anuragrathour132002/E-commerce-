import { ADD_TO_CARD } from "../constants/cardConstant";
import axios from "axios";
export const addItemsToCart = (id, quantity) => async (dispatch) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CARD,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().card.cartItems));
};
