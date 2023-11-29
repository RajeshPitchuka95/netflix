import { useSelector } from 'react-redux'
import VideoTitle from './videoTitle'
import VideoBackground from './VideoBackground'

function MainContainer() {
  const nowPlayingMovies = useSelector((appStore)=> appStore.movies.movieList)
 if(!nowPlayingMovies) return;
 const mainMovie = nowPlayingMovies?.movieList[0];
 const {original_title, overview,id } = mainMovie;
  return (
    <div>
      <VideoTitle title = {original_title} overview = {overview}/>
      <VideoBackground movieId = {id}/>
    </div>
  )
}

export default MainContainer