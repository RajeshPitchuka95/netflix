import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const SecondaryContainer = () => {
  const movies = useSelector((appStore)=> appStore.movies?.movieList)
  return (
    <div>
      <MovieList title = {"Now Playing"} movies = {movies}/>
    </div>
  )
}

export default SecondaryContainer