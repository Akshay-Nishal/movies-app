import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

import ApiRetryWithCancel from './components/Loading';
function App() {
  const [movies,setMovies]=useState([])
  const [retryCount, setRetryCount] = useState(0);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [retrying, setRetrying] = useState(false)
  const maxRetries = 10;

  useEffect(() => {
    let movieFetchinterval

    async function fetchMovie() {
      setRetryCount(retryCount + 1);
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('https://swapi.dev/api/film/')
        if(!response.ok){
          throw new Error("Something went wrong ...Retrying")
        }
        const data = await response.json()
        const movieList = data.results.map((movie)=>{
          return{
            id:movie.epidode_id,
            title:movie.title,
            openingText:movie.opening_crawl,
            releaseDate:movie.release_date
          }
        })
        setRetrying(false)
        setMovies(movieList)
      }  
      catch (error) {
        setError(error.message) 
        if(retryCount < 10 && retrying){
          movieFetchinterval = setTimeout(fetchMovie,1000)
        }
        else{
          console.log("Max retry reached")
        }
      }
    }
    if(retrying){
      fetchMovie()
    }
    return(
      clearTimeout(movieFetchinterval)
    )
  }, [retryCount, retrying]);

  const fetchMovieHandler =()=>{
    setRetryCount(0);
    setRetrying(true);
  }

const cancelFetchHandler =()=>{
  // retry=0
  setRetrying(false)
  setRetryCount(0)
}

let content = <p>No movies Found</p>
// if(loading){
//   content = (<img style={{height:'50px'}} src='https://imgs.search.brave.com/DTegnv9gRKxB3GEGe9zTa860dsoJfirZ9W7kyEHIens/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/d3BTby04Q3JYcVVB/QUFBai9sb2FkaW5n/LWxvYWRpbmctZm9y/ZXZlci5naWY.gif' alt='Loading....'/>)
// }
if(loading){
  content = (<p>Loading...</p>)
}
if(error){
  content = (<p>{error}</p>)
}

if(movies.length>=1){
  content = <MoviesList movies={movies} />
}


return (
  <React.Fragment>
    {/* <ApiRetryWithCancel/> */}
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        <br/>
        <button style={{marginTop:'10px'}} onClick={cancelFetchHandler}>Cancel Fetch</button>
      </section>
      <section>
        {content}
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
