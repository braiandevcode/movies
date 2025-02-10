import { CONFIG_API } from '../config/config';

export async function searchMovies({ search }){
  const { URL_DOMAIN, API_KEY, PARAM_SEARCH} = CONFIG_API;
  const URL_SEARCH = `${URL_DOMAIN}${API_KEY}${PARAM_SEARCH}=${search}`;
  if(search === '') return null;
  try {
    const queryMovie = await fetch(URL_SEARCH);

    if(!queryMovie.ok){
      throw new Error('No se pudo hacer la peticion');
    }
    const dataMovies = await queryMovie.json();
    const movies = dataMovies?.Search; 

    return movies?.map(({ imdbID, Title, Year, Poster }) => ({
      id: imdbID,
      title: Title,
      year: Year.includes('–') ? Year.split('–')[1] : Year,
      poster: Poster,
    }));
    
  } catch (e) {
    console.error(e);
  }
}