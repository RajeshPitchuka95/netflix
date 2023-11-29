import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../utils/userSlice'
import movieListSliceReducer from '../utils/movieListSlice'


const appStore = configureStore({
    reducer:{
        user: userReducer,
        movies: movieListSliceReducer
    },
});

export default appStore;