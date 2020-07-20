import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const MovieCard = props => {

  const { movies } = props
  const { id } = useParams()
  const [ stars, setStars] = useState([])

  //only update when id changes
  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setStars(response.data.stars)
      })
    .catch(err => {console.log(err)})
  }, [id])

  if (id >= 0 && id <= movies.length) {

    return (
      <div className="save-wrapper">
        <div className="movie-card">
        <Details movie={movies[id]} />
        <Stars stars={stars} />
        </div>
      </div> 
    )
  }

  else {
    return (
      <div>
        {
          movies.map(item => {
            return (
              <Link to={`/movies/${item.id}`} key={item.id}>
                <div className="movie-card"><Details movie={item} /></div>
              </Link>
            )
          })
        }
      </div>
    )
  }

};

const Details = props => {
  const { movie } = props

  return(
    
    <div>
        <h2>{movie.title}</h2>
        <div className='movie-director'>
          Director: <em>{movie.director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{movie.metascore}</strong>
        </div>
      </div>
    
  )
}

const Stars = props => {
  const {stars} = props
  return (
    <div>
      <h3>Actors</h3>
      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <div className="save-button">Save</div>
    </div>
  )
}

export default MovieCard;
