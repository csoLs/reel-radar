import React from 'react'
import useAxios from 'axios-hooks';

import useApiConfig from '../../hooks/api-config'
import useLocalStorage from '../../hooks/use-local-storage';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Movie, { IMovie } from '../../components/movie';


const LaterPage: React.FC = () => {
  const { data: apiData } = useApiConfig()
  const [watchLater, setWatchLater] = useLocalStorage<number[]>("watchLater", [])
  const [favorite, setFavorite] = useLocalStorage<number[]>("favorite", [])

  const movies = watchLater.map(movieId => {
    const [{ loading, error, data }] = useAxios<IMovie>({
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      headers: {
        authorization: `Bearer ${environment.ACCESS_TOKEN}`
      }
    })

    return { loading, error, data }
  })

  return (
    <>
      <Header active="watchlist" />

      <div className="App">
        {movies.length === 0 ? 'No movies added to watchlist yet!' : ''}
        {movies.map(({error, loading, data: movie}) => {

          return loading
            ? 'Loading'
            : error
              ? null
              : movie
                ? (
                  <Movie
                    key={movie.id}
                    movie={movie}
                    posterPath={`${apiData?.images?.base_url}${apiData?.images?.poster_sizes?.[0]}`}
                    later={watchLater}
                    favorite={favorite}
                    setFavorite={setFavorite}
                    setLater={setWatchLater}
                />
                ) : null
        })}
      </div>

      <Footer />
    </>
  )
}

export default LaterPage
