import { ADD_TO_CARD } from "../constants/cardConstant";

export const cartReducer = (state = { cardItems: [] }, action => {
    switch (action.type) {
        case ADD_TO_CARD:
            const item = action.payload;
            const isItemExict = state.cardItems.find((i) => i.product === item.product);

            if (isItemExict) {
                return {
                    ...state,
                    cardItems: state.cardItems.map((i) => i.product === isItemExict.product ? item : i),
                };
            } else {
                return {
                    ...state,
                    cardItems: [...state.cardItems, item],
                };
            }
        default: return state;
    }
})