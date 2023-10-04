import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  const [loading,setLoading] = useState(false)
  async function fetchMovies() {
    setLoading(true)
  await(fetch('https://swapi.dev/api/films/')
    .then(res=>{return( res.json() ) } )
    .then(res=>{
      setMovies(res.results )
      setLoading(false)
    } )
  )
}

return (
  <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {loading? <img style={{height:'50px'}} src='https://imgs.search.brave.com/DTegnv9gRKxB3GEGe9zTa860dsoJfirZ9W7kyEHIens/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/d3BTby04Q3JYcVVB/QUFBai9sb2FkaW5n/LWxvYWRpbmctZm9y/ZXZlci5naWY.gif' alt='Loading....'/> : <></>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;



// const dummyMovies = [
//     {
//       id: 1,
//       title: 'Some Dummy Movie',
//       openingText: 'This is the opening text of the movie',
//       releaseDate: '2021-05-18',
//     },
//     {
//       id: 2,
//       title: 'Some Dummy Movie 2',
//       openingText: 'This is the second opening text of the movie',
//       releaseDate: '2021-05-19',
//     },
//   ];
