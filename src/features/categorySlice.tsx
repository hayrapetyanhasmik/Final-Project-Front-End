import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";


export interface Category {
    id: number,
    name: string,
    Products: [],
}

interface CategoryState {
    categories: Category[],
    category: Category,
    error: string | null,
    status: "idle" | "loading" | "success" | "error",
  }
  
  const initialState: CategoryState = {
    categories: [],
    category: {} as Category,
    error: null,
    status: "idle",
  };

export const getCategories = createAsyncThunk('getCategories', async()=>{
    const res = await fetch('http://localhost:5000/categories');
    const json = res.json();
    console.log(json,"all-json")
    return json;
})

export const getSingleCategory = createAsyncThunk('getSingleCategory', async(id:number)=>{
  const res = await fetch(`http://localhost:5000/categories/getOne/${id}`);
  const json = res.json();
  console.log(json,"single-json")
  return json;
})


const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCategories.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getCategories.fulfilled, (state,  action) => {
          state.status = "success";
          state.categories = action.payload;
        })
        .addCase(getCategories.rejected, (state) => {
          state.status = "error";
        })
        .addCase(getSingleCategory.fulfilled, (state,  action) => {
          state.status = "success";
          state.category = action.payload;
        })
    },
  });

export default categorySlice.reducer;

export const allCategories = (state:RootState):Category[]=> state.categories.categories
export const oneCategory = (state:RootState):Category=> state.categories.category