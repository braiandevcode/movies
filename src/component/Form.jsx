import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { ContainerSort } from './ContainerSort';
import debounce from 'just-debounce-it';

export function FormSearch( { sortAlfa, noSort, sortYear, choiceSort, getMovies, movies }){
  // ESTADO
  const { search, setSearch, error, disabled } = useSearch();
  const [hideMenu, setHidemenu] = useState(true);
    
  // DEBOUNCE
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetMovies = useCallback(
    debounce(async (search) => {
      await getMovies({ search });
    }, 500),
    []
  );

  // EVENTO SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  // ORDENAR ALFABETICAMENTE
  const handleSort = (e) => {
    const value = e.target.name;
    choiceSort({ value });
  };

  // EVENTO DE CAMBIO
  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  const handleClickiconBurger = () => {
    setHidemenu(!hideMenu); // Cambia el estado de hideMenu
  };
  
  // CLASE CONDICIONAL            
  const className =
    error && search !== ''
      ? { color: 'red', visibility: 'visible', opacity: 1 }
      : { color: 'transparent', visibility: 'hidden', opacity: 0 };


  return(
    <>
      <div className='burger-icon' onClick={handleClickiconBurger}>
        <i className={`bi ${hideMenu ? 'bi-list': 'bi-x-lg'}`}></i>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            style={{
              borderBottom: '2px solid',
              borderColor: `${error && search !== '' ? 'red' : 'green'}`,
            }}
            onChange={handleChange}
            name="query"
            type="text"
            placeholder="Avengers, Toy Story, Transformer"
            autoFocus
          />
          <button
            type="submit"
            className="btn btn__search btn-blue"
            disabled={disabled}
          >Buscar</button>
        </div>
        <ContainerSort movies={movies} className={hideMenu ? 'boxCheckMovies': 'boxCheckMovies boxCheckMovies-active'} noSort={noSort} sortAlfa={sortAlfa} sortYear={sortYear} handleSort={handleSort}/>
      </form>
      <p style={className}>{error || 'e'}</p>
    </>
  );
}

FormSearch.propTypes = {
  sortAlfa: PropTypes.bool.isRequired, 
  noSort: PropTypes.bool.isRequired, 
  sortYear: PropTypes.bool.isRequired,
  movies: PropTypes.array,
  getMovies: PropTypes.func,
  choiceSort: PropTypes.func, 
};