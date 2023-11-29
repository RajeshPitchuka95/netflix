import { useEffect } from "react";
import { options } from "./constants.js";
import { useDispatch } from "react-redux";
import { addMovieList } from "./movieListSlice.js";




const useMovieListHook = ()=>{
  const dispatch = useDispatch();
   
    useEffect(()=>{
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => dispatch(addMovieList({movieList:response.results})))
        .catch(err => console.error(err));
    
    },[])
}


export default useMovieListHook;