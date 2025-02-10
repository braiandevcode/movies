/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { ContainerGrid } from './component/ContainerGrid';
import { Movies } from './component/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import debounce from 'just-debounce-it';
import { useSort } from './hooks/useSort';

// APP
export function App() {
  // ESTADO
  const { search, setSearch, error, disabled } = useSearch();
  const { noSort, sortAlfa, sortYear, choiceSort } = useSort();

  // CUSTOM HOOK (GANCHO PERSONALIZADO)
  const { movies, getMovies } = useMovies({
    search,
    error,
    sortAlfa,
    noSort,
    sortYear,
  });

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
  
  // DEBOUNCE
  const debounceGetMovies = useCallback(
    debounce(async (search) => {
      await getMovies({ search });
    }, 500),
    []
  );

  // EVENTO DE CAMBIO
  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  // CLASE CONDICIONAL
  const className =
    error && search !== ''
      ? { color: 'red', visibility: 'visible', opacity: 1 }
      : { color: 'transparent', visibility: 'hidden', opacity: 0 };

  // RENDER APP
  return (
    <>
      <h1>Practica Api Rest OMDb</h1>
      <header className="headerSearch">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              style={{
                border: '4px solid',
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
            >
              Buscar
            </button>
          </div>
          <div className="boxCheckMovies">
            <label>Sin orden</label>
            <input
              type="checkbox"
              name="noSort"
              onChange={handleSort}
              checked={noSort}
            />
            <label>Orden Alfabético</label>
            <input
              type="checkbox"
              name="sortAlfa"
              onChange={handleSort}
              checked={sortAlfa}
            />
            <label>Orden por año</label>
            <input
              type="checkbox"
              name="sortYear"
              onChange={handleSort}
              checked={sortYear}
            />
          </div>
        </form>
        <p style={className}>{error || 'e'}</p>
      </header>
      <main>
        <ContainerGrid
          classNameContainer={'titleAllMovies'}
          title={'All Movies'}
        >
          <Movies movies={movies} />
        </ContainerGrid>
      </main>
    </>
  );
}
