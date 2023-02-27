import React from 'react';
import useAxios from 'axios-hooks';

import useApiConfig from '../../hooks/api-config'
import useLocalStorage from '../../hooks/use-local-storage';

import Votes from '../votes';

import './search.css'

const debounce = (fn: Function, ms = 600) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const truncate = (str: string, length = 250, appendEllipsis = true) => {
  if (str.length > length) {
    return `${str.slice(0, length)}${appendEllipsis ? '…' : ''}`
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

const Movie: React.FC<{
  movie: IMovie,
  posterPath: string,
  later: number[],
  favorite: number[],
  setLater: (later: number[]) => void,
  setFavorite: (favorites: number[]) => void}
> = ({ movie, posterPath, favorite, setFavorite, later, setLater }) => {
  return (
    <div className="movie-row">
      {(posterPath && movie.poster_path) ? (
        <img src={`${posterPath}${movie.poster_path}`} />
      ) : <img src="https://via.placeholder.com/100x150?text=" />}
      <div>
        <h3>{movie.original_title}<span className="year">{truncate(movie.release_date, 4, false)}</span></h3>
        <Votes average={movie.vote_average} votes={movie.vote_count} />
        <p>{truncate(movie.overview)}</p>
      </div>

      <button title={later.includes(movie.id) ? 'Remove from watch list' :  'Add to watch list'} className={later.includes(movie.id) ? 'watchLater' : ''} onClick={() => later.includes(movie.id) ? setLater(later.filter(m => m !== movie.id)) : setLater([...later, movie.id])}>
        {later.includes(movie.id) ? '−' : '+'}
      </button>
      <button title={favorite.includes(movie.id) ? 'Remove from favorite' : 'Add to favorite'} className={favorite.includes(movie.id) ? 'starred' : ''} onClick={() => favorite.includes(movie.id) ? setFavorite(favorite.filter(m => m !== movie.id)) : setFavorite([...favorite, movie.id])}>
        {'♥︎'}
      </button>
    </div>
  )
}

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
      {loading ? (
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
