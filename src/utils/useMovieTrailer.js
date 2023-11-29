import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "./movieListSlice";
import {options} from './constants'

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
    useEffect(() => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          dispatch(addTrailerVideo(response.results?.find((video) => video.type === "Trailer")));
        })
        .catch((err) => console.error(err));
    }, []);
    
  
}

export default useMovieTrailer