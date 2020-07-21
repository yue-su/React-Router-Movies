import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import { Route } from 'react-router-dom'
//import MovieList from './Movies/MovieList'
//import Movie from './Movies/Movie'
import MovieCard from './Movies/MovieCard';

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);
  
  //Arr is set to store a updated state, since we can't update saved directly but only by setSaved
  let Arr = [...saved]

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    if (Arr.filter(item => item.id == id).length == 0) {
      Arr.push(movieList[id])
      setSaved(Arr)
    } else {
      setSaved(Arr)
      return
    }
  };

  return (
    <div>
      <SavedList list={saved} />
      <Route exact path='/'>
        <MovieCard movies={movieList}></MovieCard>
      </Route>
      <Route path='/movies/:id'>
        <MovieCard movies={movieList} addToSavedList={addToSavedList}></MovieCard>
      </Route>
    </div>
  );
};

export default App;
