import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false); // Add retrying state

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/film/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      if (retrying) {
        setError(error.message);
        setTimeout(() => {
          console.log("Fetching again in 5 sec");
          fetchMoviesHandler();
        }, 5000);
      }
    }
    setIsLoading(false);
  }, [retrying]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <div>
        <p>{error}</p>
        {retrying && (
          <button onClick={() => setRetrying(false)}>Cancel Retry</button>
        )}
      </div>
    );
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      {/* <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section> */}
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {retrying || isLoading ? null : (
          <button onClick={() => setRetrying(true)}>Retry</button>
        )}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
