import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const removeMovie=(id)=>{
    props.onRemove(id)
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onRemove={removeMovie}
        />
      ))}
    </ul>
  );
};

export default React.memo(MovieList);
