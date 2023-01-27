
import styles from "../components/card/Card.module.scss";
import React, { useState, useEffect, Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

function Favorites() {
    const [characters, setCharacters] = useState([]);
    const favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')).slice(-5) : [];
  
    useEffect(() => {
      axios.get(`https://rickandmortyapi.com/api/character/${favorites.join(',')}`)
        .then(response => {
          setCharacters(response.data);
        })
    }, [favorites]);
  
    return (
      <div className="container">
        <h1 className="text-center mb-3">Mes favoris</h1>
        <div className="row">
          {characters.map(character => (
            <div key={character.id} className="col-lg-2 col-md-4 col-sm-6 col-12 ">
              <div className="card">
                <Link to={`/character/${character.id}`}>
                  <img src={character.image} className="card-img-top" alt={character.name} />
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
export default Favorites;
