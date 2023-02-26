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
  const [search, setSearch] = React.useState("interstellar")
  const [{ loading, error, data }] = useAxios({
    url: `https://api.themoviedb.org/3/search/movie?query=${search}`,
    headers: {
      authorization: `Bearer ${environment.ACCESS_TOKEN}`
    }
  })
  const debouncedSetSearch = (e: React.ChangeEvent<HTMLInputElement>) => debounce(setSearch)(e.currentTarget.value)

  return (
    <div>
      <h1>Search movie</h1>
      <input onChange={debouncedSetSearch} type="text" />
      <pre>Query: {search}</pre>
      {(data?.results ?? []).map((movie: IMovie) => (
        <div style={{ border: '1px solid #ccc', display: 'flex', flexFlow: 'row nowrap' }} key={movie.id}>
          {apiData && movie.poster_path ? (
            <img src={`${apiData?.images?.base_url}${apiData?.images?.poster_sizes?.[0]}${movie.poster_path}`} />
          ) : null}
          <div>
            <h3>{movie.original_title} ◎ {movie.vote_average}/10 with {movie.vote_count} votes</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Search
