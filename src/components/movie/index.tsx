import React from 'react';

import Votes from '../votes';

import './movie.css'

const truncate = (str: string, length = 250, appendEllipsis = true) => {
  if (str.length > length) {
    return `${str.slice(0, length)}${appendEllipsis ? '…' : ''}`
  } else return str;
}

export interface IMovie {
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
    <div className="movie" data-test="movie">
      {(posterPath && movie.poster_path) ? (
        <img src={`${posterPath}${movie.poster_path}`} />
      ) : <img src="https://via.placeholder.com/100x150?text=" />}
      <div>
        <div className="meta">
          <h3>{movie.original_title}<span className="year">{truncate(movie.release_date, 4, false)}</span></h3>
          <Votes average={movie.vote_average} votes={movie.vote_count} />

          <div className="cta">
            <button title={favorite.includes(movie.id) ? 'Remove from favorite' : 'Add to favorite'} className={['favorite', favorite.includes(movie.id) && 'active'].filter(Boolean).join(' ')} onClick={() => favorite.includes(movie.id) ? setFavorite(favorite.filter(m => m !== movie.id)) : setFavorite([...favorite, movie.id])}>
              {'♥︎'}
              <span>{favorite.includes(movie.id) ? 'Remove from favorite' : 'Add to favorite'}</span>
            </button>
            <button title={later.includes(movie.id) ? 'Remove from watch list' :  'Add to watch list'} className={['later', later.includes(movie.id) && 'active'].filter(Boolean).join(' ')} onClick={() => later.includes(movie.id) ? setLater(later.filter(m => m !== movie.id)) : setLater([...later, movie.id])}>
              {later.includes(movie.id) ? '−' : '+'}
              <span>{later.includes(movie.id) ? 'Remove from watch list' :  'Add to watch list'}</span>
            </button>
          </div>

        </div>

        {movie.overview ? <p className="description">{truncate(movie.overview)}</p> :  null}
      </div>

    </div>
  )
}

export default Movie
