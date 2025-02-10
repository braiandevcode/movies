import PropTypes from 'prop-types';

// renderizado de peliculas
function ListOfMovies({ movies }) {
  return (
    <>
      {movies?.map((movie) => {
        return (
          <article className="articleMovie" key={movie.id}>
            <h4> {movie.title}</h4>
            <span className="articleMovie__year">{movie.year}</span>
            <figure>
              <img src={movie.poster} alt={`Imagen de ${movie.title}.`} />
            </figure>
          </article>
        );
      })}
    </>
  );
}

ListOfMovies.propTypes = {
  movies: PropTypes.array.isRequired,
};

// SI NO HAY PELICULAS.
function NoMoviesResult() {
  return (
    <>
      <p className='no-result'>No se encontraron películas en esta busqueda</p>
    </>
  );
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
};
