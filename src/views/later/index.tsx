import React from 'react'
import useAxios from 'axios-hooks';

import useApiConfig from '../../hooks/api-config'
import useLocalStorage from '../../hooks/use-local-storage';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Movie, { IMovie } from '../../components/movie';

const MovieWrapper: React.FC<{
  movieId: number,
  posterPath: string
  later: number[],
  favorite: number[],
  setLater: (later: number[]) => void,
  setFavorite: (favorites: number[]) => void
}> = ({ movieId, posterPath, later, favorite, setLater, setFavorite }) => {
  const [{ loading, error, data: movie }] = useAxios<IMovie>({
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    headers: {
      authorization: `Bearer ${environment.ACCESS_TOKEN}`
    }
  })

  return (
    <>
      {loading
      ? 'Loading'
      : error
        ? null
        : movie
          ? (
            <Movie
              key={movie.id}
              movie={movie}
              posterPath={posterPath}
              later={later}
              favorite={favorite}
              setFavorite={setFavorite}
              setLater={setLater}
          />
        ) : null}
    </>
  )
}

const LaterPage: React.FC = () => {
  const { data: apiData } = useApiConfig()
  const [watchLater, setWatchLater] = useLocalStorage<number[]>("watchLater", [])
  const [favorite, setFavorite] = useLocalStorage<number[]>("favorite", [])

  return (
    <>
      <Header active="watchlist" />

      <div className="App">
        {watchLater.length === 0 ? 'No movies added to watchlist yet!' : (
          <>
            {watchLater.map(movieId => (
              <MovieWrapper movieId={movieId} posterPath={`${apiData?.images?.base_url}${apiData?.images?.poster_sizes?.[0]}`} key={movieId}
              later={watchLater}
              favorite={favorite}
              setFavorite={setFavorite}
              setLater={setWatchLater}
              />
            ))}
          </>
        )}
      </div>

      <Footer />
    </>
  )
}

export { MovieWrapper }
export default LaterPage
