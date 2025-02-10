import { ContainerGrid } from './component/ContainerGrid';
import { FormSearch } from './component/Form';
import { Movies } from './component/Movies';
import { useMovies } from './hooks/useMovies';
import { useSort } from './hooks/useSort';

// APP
export function App() {
  // CUSTOM HOOKS (GANCHO PERSONALIZADO)
  const { noSort,sortAlfa, sortYear, choiceSort } = useSort();
  const { movies, getMovies } = useMovies({
    noSort,
    sortAlfa,
    sortYear
  });

  // RENDER APP
  return (
    <>
      <h1>Practica Api Rest OMDb</h1>
      <header className="headerSearch">
        <FormSearch getMovies={getMovies} choiceSort={choiceSort} noSort={noSort} sortAlfa={sortAlfa} sortYear={sortYear}/>
      </header>
      <main>
        <ContainerGrid classNameContainer={'titleAllMovies'} title={'All Movies'}>
          <Movies movies={movies} />
        </ContainerGrid>
      </main>
    </>
  );
}
