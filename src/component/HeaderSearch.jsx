// import { useSearch } from '../hooks/useSearch';


import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { useSearch } from '../hooks/useSearch';
export function HeaderSearch() {
  // STATES
  const { search, setSearch, error } = useSearch();
  const { getMovies } = useMovies({ search });
  const [disabled, setDisable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(error){
      setDisable(true);
      return;
    }
    console.log(disabled);
    
    console.log(search);  
    getMovies();
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  //NO CONTROLADA
  // const handleSubmit= (event)=>{
  //   event.preventDefault();
  //   const formData= new window.FormData(event.target);
  //   const fields = Object.fromEntries(formData); //TODOS LOS CAMPOS
  //   console.log(fields);
  // };

  const className =
    error && search !== ''
      ? { color: 'red', visibility: 'visible', opacity: 1 }
      : { color: 'transparent', visibility: 'hidden', opacity: 0 };   

  return (
    <>
      <header className="headerSearch">
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: '2px solid',
              borderColor: `${error && search !== '' ? 'red' : 'green'}`,
            }}
            onChange={handleChange}
            name="query"
            type="text"
            value={search}
            placeholder="Avengers, Toy Story, Transformer"
            autoFocus
          />
          <button type="submit" className="btn btn__search btn-blue" disabled={disabled}>
            Buscar
          </button>
        </form>
        <p style={className}>{error || 'text error'}</p>
      </header>
    </>
  );
}
