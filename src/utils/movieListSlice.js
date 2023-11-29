import { createSlice } from "@reduxjs/toolkit";

const movieListSlice = createSlice({
name: 'movieList',
initialState: {
    movieList:null,
    trailerVideo:null
},
reducers :{
    addMovieList:(state,action)=>{
         state.movieList = action.payload
    },
    addTrailerVideo:(state,action)=>{
        state.trailerVideo = action.payload
}
}

})

export const {addMovieList,addTrailerVideo} = movieListSlice.actions;
export default movieListSlice.reducer;