import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect, Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import styles from "./components/card/Card.module.scss";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from "./pages/Episode";
import Location from "./pages/Location";
import Favorites from "./pages/Favorites";
import CardDetails from "./components/card/CardDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaRegHeart } from 'react-icons/fa';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart,faHeartCirclePlus,faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart,faHeartCirclePlus,faHeartCircleCheck,FaRegHeart);
// ...
/// ...
function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CardDetails />} />

        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CardDetails />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favorites/:id" element={<CardDetails />} />

        <Route path="/location" element={<Location />} />
        <Route path="/location/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [characters, setCharacters] = useState([]);
  
  // const toggleFavorite = (characterId) => {
  //   let favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : [];
  //   if (favorites.includes(characterId)) {
  //     favorites = favorites.filter(id => id !== characterId);
  //   } else {
  //     favorites.push(characterId);
  //   }
  //   Cookies.set('favorites', JSON.stringify(favorites));
  // };

  // const isFavorite = (characterId) => {
  //   const favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : [];
  //   return favorites.includes(characterId);
  // };


    const isFavorite = (characterId) => {
      const favorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : [];
      return favorites.includes(characterId);
    };

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

  // useEffect(() => {
  //   axios.get('https://rickandmortyapi.com/api/character/')
  //     .then(response => {
  //       const randomCharacters = response.data.results
  //         .sort(() => 0.5 - Math.random())
  //         .slice(0, 5);
  //       setCharacters(randomCharacters);
  //     })
  // }, []);

  useEffect(() => {
    const favorites = Cookies.get("favorites") ? JSON.parse(Cookies.get("favorites")) : [];
    if (favorites.length > 1) {
      axios.get(`https://rickandmortyapi.com/api/character/${favorites.join(",")}`)
        .then(response => {
          const favoriteCharacters = response.data;
          if (favoriteCharacters.length < 5) {
            axios.get('https://rickandmortyapi.com/api/character/')
              .then(response => {
                const randomCharacters = response.data.results
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 5 - favoriteCharacters.length);
                setCharacters(favoriteCharacters.concat(randomCharacters));
              });
          } else {
            setCharacters(favoriteCharacters);
          }
        });
    } else {
      axios.get('https://rickandmortyapi.com/api/character/')
        .then(response => {
          const randomCharacters = response.data.results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);
          setCharacters(randomCharacters);
        });
    }
  }, []);
  


  return (
    <div className="container">
      <h1 className="text-center mb-3">Personnages</h1>
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
          <button onClick={() => toggleFavorite(character.id)}>
            {isFavorite(character.id) ? <FontAwesomeIcon icon="fa-solid fa-heart-circle-check" /> : <FaRegHeart />}
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}


export default App;
