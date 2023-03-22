import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"


export const fetchTodos =createAsyncThunk('fetchTodos',async (query)=>{
    const APT_KEY="uxWnsJLmn1nnFEEUlpWKXLhCUl4IYOQVEFd6o4PBFmiVqKrUEYi6B3ke";
    const BASE_URL=`https://api.pexels.com/v1/search?query=${query}&per_page=12`;
    const response =await fetch(BASE_URL,
        {

            method:"GET",
            headers:{
              Accept:"application/json",
              Authorization:APT_KEY
            }
           }
        );
    return response.json();
})
const todoSlice = createSlice({
    name:"todo",
    initialState:{
    isLoading:false,
    data:null,
    isError:false,
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchTodos.pending,(state,action)=>{
            state.isLoading =true;
        })
     builder.addCase(fetchTodos.fulfilled, (state,action)=>{
        state.isLoading =false;
        state.data =action.payload;
     });
     builder.addCase(fetchTodos.rejected,(state,action)=>{
        console.log("Error",action.payload);
        state.isError =true;
     })
    }
});

export default todoSlice.reducer;