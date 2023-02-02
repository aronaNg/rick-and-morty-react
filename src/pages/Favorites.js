
import styles from "../components/card/Card.module.scss";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaRegHeart } from 'react-icons/fa';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart,faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart,faHeartCircleCheck,FaRegHeart);
function Favorites() {
  const [characters, setCharacters] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')): [];
 
  const toggleFavorite = (characterId) => {
    let favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : [];
    if (favorites.includes(characterId)) {
      favorites = favorites.filter(id => id !== characterId);
    } else {
      favorites.push(characterId);
    }
    Cookies.set('favorites', JSON.stringify(favorites));
    setCharacters(characters.map(character => (
      character.id === characterId
        ? { ...character, isFavorite: !character.isFavorite }
        : character
    )));
  };
  const isFavorite = (characterId) => {
    const favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : [];
    return favorites.includes(characterId);
  };

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${favorites.join(',')}`)
      .then(response => {
        setCharacters(response.data);
      })
  }, [favorites]);

  

  return (
    <div className="container">
      <h1 className="text-center mb-3">Mes favoris</h1>
      {favorites.length >0 ? (
        <div className="row">
          {characters.map(character => (
            <div key={character.id} className="col-lg-2 col-md-4 col-sm-6 col-12 ">
              <div className="card">
                <Link to={`/character/${character.id}`}>
                  <img src={character.image} className="card-img-top" alt={character.name} />
                </Link>
                <button onClick={() => toggleFavorite(character.id)}>
                {isFavorite(character.id) ? <FontAwesomeIcon icon="fa-solid fa-heart-circle-check" /> : <FaRegHeart />}
              </button>
                  <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                    
                    {(() => {
              if (character.status === "Dead") {
                return (
                  <div
                    className={`${styles.badge} position-absolute badge bg-danger`}
                  >
                    {character.status}
                  </div>
                );
              } else if (character.status === "Alive") {
                return (
                  <div
                    className={`${styles.badge} position-absolute badge bg-success`}
                  >
                    {character.status}
                  </div>
                );
              } else {
                return (
                  <div
                    className={`${styles.badge} position-absolute badge bg-secondary`}
                  >
                    {character.status}
                  </div>
                );
              }
            })()}
                  <p className="card-text">Emplacement : {character.location.name}</p>
                </div>
              </div>
             
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>Aucun favoris</p>
          <Link to="/">Voir la liste des épisodes</Link>
        </div>
      )}
    </div>
  );
}
export default Favorites;
