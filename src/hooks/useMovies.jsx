import { useCallback, useMemo, useRef, useState } from 'react';
import { searchMovies } from '../services/searchMovies';
// HOOKS
export function useMovies({ search, sortAlfa, sortYear, noSort }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(
    async ({ search }) => {
      if (search === previousSearch.current) return;
      try {
        previousSearch.current = search;
        const newMovies = await searchMovies({ search });
        setMovies(newMovies);
      } catch (e) {
        setError(e.message);
      }
    }, []);

  const sortedChoice = useMemo(()=>{
    return ()=>{
      if(movies){
        let sortedMovies = [...movies];
        if(!sortAlfa && !sortYear && noSort){
          return sortedMovies; // Si no se ha seleccionado ningún filtro, devolver las películas sin ordenar
        }

        if(sortAlfa && !noSort){
          sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
        }
      
        if(sortYear && !noSort){
          sortedMovies = [...movies].sort((a,b) => b.year - a.year);
        }
    
        return sortedMovies;
      };
    };
     
  }, [sortAlfa, sortYear, noSort, movies]);

  return { movies: sortedChoice(movies) , error, getMovies };
}
