import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcast:[]
}

const podcastSlice = createSlice({
    name:"podcast",
    initialState,
    reducers:{
        setPodcast:(state,action)=>{
            state.podcast = action.payload;
        },
    },
});


export const {setPodcast } = podcastSlice.actions;
export default podcastSlice.reducer;