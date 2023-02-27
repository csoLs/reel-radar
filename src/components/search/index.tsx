import React from 'react';
import useAxios from 'axios-hooks';

import useApiConfig from '../../hooks/api-config'
import useLocalStorage from '../../hooks/use-local-storage';

import Movie, { IMovie } from '../movie';

import './search.css'

const debounce = (fn: Function, ms = 600) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const Search: React.FC = () => {
  const { data: apiData } = useApiConfig()
  const [search, setSearch] = React.useState("")
  const [watchLater, setWatchLater] = useLocalStorage<number[]>("watchLater", [])
  const [favorite, setFavorite] = useLocalStorage<number[]>("favorite", [])

  const [{ loading, error, data }] = useAxios({
    url: `https://api.themoviedb.org/3/search/movie?query=${search}`,
    headers: {
      authorization: `Bearer ${environment.ACCESS_TOKEN}`
    }
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  const debouncedSetSearch = React.useMemo(
    () => debounce(changeHandler),
    [search]
  )

  return (
    <div>
      <div className='searchContainer'>
        <input className="searchInput" onChange={debouncedSetSearch} type="search" placeholder="Search for a movie…" />
      </div>
      {search && loading ? (
        'Loading…'
      ) : error ? (
        `Error searching for ${search}`
      ) : search != '' && (data?.results ?? []).length > 0 ? (data?.results ?? []).map((movie: IMovie) => (
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
    </div>
  )
}

export default Search
