import MovieCard from "./MovieCard"

const MovieList = ({title,movies}) => {

  return (
    <div>
    <div>
        <h1>{title}</h1>
        </div>
        <MovieCard/>
    </div>
  )
}

export default MovieList