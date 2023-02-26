import useAxios from 'axios-hooks';

import useApiConfig from '../../hooks/api-config'

import './movie.css'

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
const Movie: React.FC<{ movie: IMovie}> = ({ movie }) => {
  const { data } = useApiConfig()

  return (
    <div className="movie">
      {data && movie.backdrop_path ? (
        <img src={`${data?.images?.base_url}${data?.images?.backdrop_sizes?.[2]}${movie.backdrop_path}`} />

      ) : null}
      <h2>{movie.title}<br/><small>{`${movie.vote_average} / 10`}</small></h2>
      <p>{movie.overview}</p>
    </div>
  )
}

const PopularMovies = () => {
  const [popular] = useAxios({
    url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    headers: {
      authorization: `Bearer ${environment.ACCESS_TOKEN}`
    }
  })

  return (
    <div>
      <h1>Popular movies</h1>
      {popular.data ? (
        <>
          {popular.data.results.filter(({ adult }: { adult: boolean }) => !adult).map((movie: IMovie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </>
      ) : null}
    </div>
  )
}

export default PopularMovies
