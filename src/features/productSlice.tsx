import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Image {
    filePath: string;
}

export interface Category {
    name: string
}


export interface Product {
    id:number,
    name: string,
    price: number,
    description:string,
    Images: Image[],
    quantity:number,
    Category:Category[],
    
}

interface ProductState {
    products: Product[],
    product: Product,
    page: number,
    totalPages: number,
    error: string | null,
    status: "idle" | "loading" | "success" | "error",
  }
  
  const initialState: ProductState = {
    products: [],
    product: {} as Product,
    totalPages: 0,
    page: 1,
    error: null,
    status: "idle",
  };


export const fetchProductById = createAsyncThunk('products/fetchProductById', async(id:number)=>{
  const res = await fetch(`http://localhost:5000/products/getOne/${id}`);
  const json = res.json();
  return json;
})

export const fetchProductsByPages = createAsyncThunk('products/fetchProductsByPages', async(page:number)=>{
  const res = await fetch(`http://localhost:5000/products?page=${page}`);
  const json = res.json();
  return json;
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductsByPages.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchProductsByPages.fulfilled, (state,  action) => {
          state.status = "success";
          state.products = action.payload.data;
          state.totalPages = action.payload.totalPages;
        })
        .addCase(fetchProductsByPages.rejected, (state) => {
          state.status = "error";
        })
        .addCase(fetchProductById.fulfilled, (state,  action) => {
          state.status = "success";
          state.product = action.payload;
        })
        
    },
  });

export default productsSlice.reducer;

export const allProducts = (state:RootState):Product[]=> state.products.products
export const oneProduct = (state:RootState):Product=> state.products.product