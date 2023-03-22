import React from 'react'
import { useQuery } from 'react-query'

import { useApiConfigFn } from '../../hooks/api-config'
import useLocalStorage from '../../hooks/use-local-storage';

import Header from '../../components/header';
import Footer from '../../components/footer';

import { MovieWrapper } from '../later';


const FavoritesPage: React.FC = () => {
  const { data: apiData } = useQuery('apiData', useApiConfigFn)
  const [watchLater, setWatchLater] = useLocalStorage<number[]>("watchLater", [])
  const [favorite, setFavorite] = useLocalStorage<number[]>("favorite", [])

  return (
    <>
      <Header active="favorites" />

      <div className="App">
        {favorite.length === 0 ? 'No favorites added yet!' : !apiData ? 'Loading…' : (
          <>
            {favorite.map(movieId => (
              <MovieWrapper
                movieId={movieId}
                posterPath={`${apiData?.images?.base_url}${apiData?.images?.poster_sizes?.[0]}`}
                key={movieId}
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

export default FavoritesPage
