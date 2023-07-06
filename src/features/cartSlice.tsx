import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IdType {
    UserId:number,
    ProductId:number,
  }

  interface Image {
    filePath: string;
  }

export interface Product {
    id:number,
    name: string;
    price: number;
    description:string;
    Image: Image[];
    quantity:number;
  }

export interface Cart {
    Product: Product;
    ProductId:number,
    name: string;
    price: number;
    description:string;
    Image: Image[];
    quantity:number;
  }

interface CartState {
    cart: Cart[];
    error: string | null;
    status: "idle" | "loading" | "success" | "error";
    count: number
  }
  
const initialState: CartState = {
    cart: [],
    error: null,
    status: "idle",
    count: parseInt(localStorage.getItem('cartCount') || '0', 10),
  };


export const createCart = createAsyncThunk('cart/createCart', async({ProductId,UserId}:IdType)=>{
    const res = await fetch('http://localhost:5000/cart/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         ProductId,
         UserId,
         quantity:1
        })
    });
      
      const json = await res.json();
      return json;
});



export const getCart = createAsyncThunk('cart/getCart', async(UserId:number)=>{
  const res = await fetch(`http://localhost:5000/cart/getOne/${UserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  });
    
    const json = await res.json();
    return json;
});

export const incQuantity = createAsyncThunk('cartitem/incQuantity', async ({ id, quantity }:any) => {
  const res = await fetch(`http://localhost:5000/cartitem/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity
    })
  });

  const json = await res.json();
  return json;
});

export const decQuantity = createAsyncThunk('cartitem/decQuantity', async ({ id, quantity }:any) => {
  const res = await fetch(`http://localhost:5000/cartitem/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity
    })
  });

  const json = await res.json();
  return json;
});

export const deleteCart = createAsyncThunk('cartitem/deleteCart', async(id:number)=>{
  const res = await fetch(`http://localhost:5000/cartitem/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      
  });
    const data = await res.json();
    return data;
});



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(createCart.pending, (state) => {
          state.status = "loading";
        })
        .addCase(createCart.fulfilled, (state) => {
          state.status = "success";
          state.count += 1;
          localStorage.setItem('cartCount', state.count.toString());
        })
        .addCase(createCart.rejected, (state) => {
          state.status = "error";
        })
        .addCase(getCart.fulfilled, (state,action) => {
          state.status = "success";
          state.cart = action.payload;
        })
        .addCase(incQuantity.fulfilled, (state, action) => {
          state.status = "success";
          const id = action.payload.data?.ProductId;
          const cartItem = state.cart.find((item) => item.ProductId === id);

          if (cartItem && cartItem.quantity < cartItem.Product.quantity) {
            cartItem.quantity++;
            state.count ++;
            localStorage.setItem('cartCount', state.count.toString());
          }
        })
        .addCase(decQuantity.fulfilled, (state, action) => {
          state.status = "success";
          const id = action.payload.data?.ProductId;
          const cartItem = state.cart.find((el) => el.ProductId === id);
          if (cartItem && cartItem.quantity>1) {
            cartItem.quantity--;
            state.count --;
            localStorage.setItem('cartCount', state.count.toString());
          }
        })
        .addCase(deleteCart.fulfilled, (state,action) => {
          state.status = "success";
          const {id} = action.payload;
            if (id) {
              state.cart = state.cart.filter(item => item.ProductId !== +id);
              state.count = state.cart?.reduce(
                (acc, el) => acc + el.quantity,
                0
              );
              localStorage.setItem('cartCount', state.count.toString());
            }
        })
    },
  });

  

export default cartSlice.reducer;
export const cartR = (state:RootState):Cart[] => state.cart.cart;