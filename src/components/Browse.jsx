import useMovieListHook from '../utils/useMovieListHook'
import Header from './Header'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'



const Browse = () => {
  const movieList = useMovieListHook()
  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse