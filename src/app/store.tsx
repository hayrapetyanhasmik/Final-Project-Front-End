import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productSlice";
import registerReducer from "../features/registerSlice";
import loginReducer from "../features/loginSlice";
import cartReducer from "../features/cartSlice";
import categoryReducer from "../features/categorySlice";

export const store = configureStore({
    reducer:{
        products: productsReducer,
        users: registerReducer,
        login: loginReducer,
        cart: cartReducer,
        categories: categoryReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
//It allows you to specify the expected types of different slices of the state and provides autocompletion and type checking support in your IDE or code editor.
export type AppDispatch = typeof store.dispatch
//the same but for dispatch
