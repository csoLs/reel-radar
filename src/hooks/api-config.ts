import { useState, useEffect } from 'react'
import axios from 'axios';

interface ITMDBConfig {
  images?: {
    base_url?: string
    secure_base_url?: string
    backdrop_sizes?: string[]
    logo_sizes?: string[]
    poster_sizes?: string[]
    profile_sizes?: string[]
    still_sizes?: string[]    
  }
  change_keys?: string[]
}

const useApiConfig = () => {
  const [data, setData] = useState<ITMDBConfig | null>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      await axios({
        url: 'https://api.themoviedb.org/3/configuration',
        headers: {
          authorization: `Bearer ${environment.ACCESS_TOKEN}`
        }
      })
      .then(({ data }) => {
        setData(data)
      })
      .catch(setError)
      .finally(() => setLoaded(true))
    };

    loadConfig();
  }, []);

  return { data, error, loaded };
};

const useApiConfigFn = () =>
  fetch('https://api.themoviedb.org/3/configuration', { headers: { authorization: `Bearer ${environment.ACCESS_TOKEN}` } }).then(res =>
    res.json()
  )

export { useApiConfigFn }
export default useApiConfig
