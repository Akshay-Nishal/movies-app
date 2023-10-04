import React, { useRef } from 'react';

import './AddMovie.css';

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
    // titleRef.current.value = ''
    // openingTextRef.current.value = ''
    // releaseDateRef.current.value = ''

  }

  return (
    <form onSubmit={submitHandler}>
      <div className='inputDiv'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className='inputDiv'>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className='inputDiv'>
        <label htmlFor='date'>Release Date</label>
        <input placeholder='YYYY-MM-DD' type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
