import { useEffect, useRef, useState } from 'react';

export function useSearch(){
  // STATE
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisable] = useState(false);
  // REF
  const isFirstSearch = useRef(true);

  useEffect(()=>{
    if(isFirstSearch.current){
      isFirstSearch.current = search === '';
      return;
    }
  
    if(search === ''){
      setError('No se puede buscar película con el campo vacio');
      setDisable(true);
      return;
    }

    if(/^\d+$/g.test(search)){
      setError('No se pudo buscar una pelicula con un numero');
      setDisable(true);
      return;
    }

    if(search.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres');
      setDisable(true);
      return;
    }

    setError(null);
    setDisable(false);
  }, [search]);
  return { search, setSearch, error, disabled};
}