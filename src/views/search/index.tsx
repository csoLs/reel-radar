import React from 'react';
import useAxios from 'axios-hooks';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query'

import { useApiConfigFn } from '../../hooks/api-config'
import useLocalStorage from '../../hooks/use-local-storage';

import Movie, { IMovie } from '../../components/movie';
import SearchInput from '../../components/searchInput';

const debounce = (fn: Function, ms = 600) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q') ?? ''

  const { data: apiData } = useQuery('apiData', useApiConfigFn)

  const [watchLater, setWatchLater] = useLocalStorage<number[]>("watchLater", [])
  const [favorite, setFavorite] = useLocalStorage<number[]>("favorite", [])

  const [{ loading, error, data }] = useAxios<{results:IMovie[]}>({
    url: `https://api.themoviedb.org/3/search/movie?query=${search}`,
    headers: {
      authorization: `Bearer ${environment.ACCESS_TOKEN}`
    }
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({q: e.target.value})
  }
  const debouncedSetSearch = React.useMemo(
    () => debounce(changeHandler),
    [searchParams]
  )

  return (
    <main>
      <SearchInput onChange={debouncedSetSearch} />
      {search && loading ? (
        'Loading…'
      ) : error ? (
        `Error searching for ${search}`
      ) : search != '' && apiData && (data?.results ?? []).length > 0 ? (data?.results ?? []).map((movie) => (
        <Movie
          key={movie.id}
          movie={movie}
          posterPath={`${apiData?.images?.base_url}${apiData?.images?.poster_sizes?.[0]}`}
          later={watchLater}
          favorite={favorite}
          setFavorite={setFavorite}
          setLater={setWatchLater}
        />
      )) : null}
    </main>
  )
}

export default SearchPage
