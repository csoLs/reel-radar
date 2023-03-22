import React from 'react'
import { useQuery } from 'react-query'

import { useApiConfigFn } from '../../hooks/api-config'
import useLocalStorage from '../../hooks/use-local-storage';

import { MovieWrapper } from '../../components/movie';

const LaterPage: React.FC = () => {
  const { data: apiData } = useQuery('apiData', useApiConfigFn)
  const [watchLater, setWatchLater] = useLocalStorage<number[]>("watchLater", [])
  const [favorite, setFavorite] = useLocalStorage<number[]>("favorite", [])

  return (
    <>
      {watchLater.length === 0 ? 'No movies added to watchlist yet!' : !apiData ? 'Loading…' : (
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
    </>
  )
}

export default LaterPage
