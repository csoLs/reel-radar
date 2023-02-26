import React from 'react';
import useAxios from 'axios-hooks';

import useApiConfig from '../../hooks/api-config'

import './search.css'

const debounce = (fn: Function, ms = 600) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const truncate = (str: string, length = 300) => {
  if (str.length > length) {
    return str.slice(0, length) + '…'
  } else return str;
}

interface IMovie {
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

const Search: React.FC = () => {
  const { data: apiData } = useApiConfig()
  const [search, setSearch] = React.useState("")

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
      <input className="searchInput" onChange={debouncedSetSearch} type="search" placeholder="Search for a movie…" />
      {loading ? (
        'Loading…'
      ) : error ? (
        `Error searching for ${search}`
      ) : search != '' && (data?.results ?? []).length > 0 ? (data?.results ?? []).map((movie: IMovie) => (
        <div className="movie-row" key={movie.id}>
          {(apiData && movie.poster_path) ? (
            <img src={`${apiData?.images?.base_url}${apiData?.images?.poster_sizes?.[0]}${movie.poster_path}`} />
          ) : <img src="https://via.placeholder.com/92x138?text=" />}
          <div>
            <h3>{movie.original_title} ◎ {movie.vote_average}/10 with {movie.vote_count} votes</h3>
            <p>{truncate(movie.overview)}</p>
          </div>
        </div>
      )) : null}
    </div>
  )
}

export default Search
